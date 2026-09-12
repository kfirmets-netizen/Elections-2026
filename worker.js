const PARTIES = [
  "אורות השחר מפלגה של כולם",
  "אני ואתה מפלגת העם הישראלית",
  "בטח",
  "ביחד בראשות נפתלי בנט",
  "ביחד נצליח - רשימה משותפת ערבית יהודית",
  "ביטחון אישי",
  "ברית עולם לגאולת ישראל",
  "גח״ת-גוש התנ״כי",
  "גן עדן בראשות ישוע ישראל בן דוד",
  "הדמוקרטים בראשות יאיר גולן",
  "הקהל - מפלגה כלל חרדית שנציגיה נבחרים על ידי הציבור בראשות הרב שלמה אלבוים",
  "המילואימניקים והכלכלית בראשות יועז הנדל וירון זליכה",
  "הציבור החרדי בראשות מוטי לורנר",
  "הציונות הדתית בראשות בצלאל סמוטריץ׳ יהדות בראשות משה פייגלין",
  "הרשימה המשותפת",
  "השותפות לכולם",
  "התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ״ל",
  "התיקון לשיטת הבחירות והממשל",
  "הפיראטים – צפים לטוב",
  "יהדות התורה והשבת אגודת ישראל - דגל התורה",
  "ישראל ביתנו בראשות אביגדור ליברמן",
  "ישראל תחילה - בראשות שרן השכל",
  "ישר! עם איזנקוט לראשות הממשלה מאחדים את ישראל",
  "כחול לבן",
  "הליכוד עם בנימין נתניהו לראשות הממשלה",
  "משפט צדק",
  "מפלגת תקומה",
  "נעם לישראל",
  "סדר חדש",
  "עוצמה יהודית",
  "עמך ישראל",
  "צבע שחור - מגן עולם התורה",
  "צומת בית ישראל",
  "קול הנשים",
  "רע״ם - הרשימה הערבית המאוחדת",
  "שמע בראשות נפתלי גולדמן",
  "שרשר לאהבה ואחדות העם",
  "תנועת אחי תנועתו של הרב יורם אברג׳ל זצ״ל"
].sort((a, b) => a.localeCompare(b, "he"));

const OLD_NAMES = {
  "ביחד בראשות נפתלי בנט": "ביחד",
  "הדמוקרטים בראשות יאיר גולן": "הדמוקרטים",
  "הציונות הדתית בראשות בצלאל סמוטריץ׳ יהדות בראשות משה פייגלין": "הציונות הדתית",
  "הרשימה המשותפת": "המשותפת",
  "התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ״ל": "ש״ס",
  "יהדות התורה והשבת אגודת ישראל - דגל התורה": "יהדות התורה",
  "ישראל ביתנו בראשות אביגדור ליברמן": "ישראל ביתנו",
  "ישר! עם איזנקוט לראשות הממשלה מאחדים את ישראל": "ישר!",
  "הליכוד עם בנימין נתניהו לראשות הממשלה": "הליכוד",
  "רע״ם - הרשימה הערבית המאוחדת": "רע״ם"
};

const encoder = new TextEncoder();
const decoder = new TextDecoder();

function json(data, status = 200) {
  return Response.json(data, {
    status,
    headers: { "cache-control": "no-store" }
  });
}

function randomToken(bytes = 24) {
  const data = crypto.getRandomValues(new Uint8Array(bytes));

  return Array.from(data, byte =>
    byte.toString(16).padStart(2, "0")
  ).join("");
}

function toBase64(bytes) {
  let value = "";

  for (const byte of bytes) {
    value += String.fromCharCode(byte);
  }

  return btoa(value);
}

function fromBase64(value) {
  return Uint8Array.from(
    atob(value),
    character => character.charCodeAt(0)
  );
}

async function hash(value) {
  const digest = await crypto.subtle.digest(
    "SHA-256",
    encoder.encode(value)
  );

  return toBase64(new Uint8Array(digest));
}

async function encryptionKey(env) {
  if (!env.SEAL_KEY) {
    throw new Error("SEAL_KEY is missing");
  }

  const raw = fromBase64(env.SEAL_KEY);

  if (raw.byteLength !== 32) {
    throw new Error("SEAL_KEY must contain 32 bytes");
  }

  return crypto.subtle.importKey(
    "raw",
    raw,
    "AES-GCM",
    false,
    ["encrypt", "decrypt"]
  );
}

async function seal(value, env) {
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const cleartext = encoder.encode(JSON.stringify(value));

  const encrypted = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    await encryptionKey(env),
    cleartext
  );

  return {
    ciphertext: toBase64(new Uint8Array(encrypted)),
    iv: toBase64(iv)
  };
}

async function unseal(ciphertext, iv, env) {
  const cleartext = await crypto.subtle.decrypt(
    {
      name: "AES-GCM",
      iv: fromBase64(iv)
    },
    await encryptionKey(env),
    fromBase64(ciphertext)
  );

  return JSON.parse(decoder.decode(cleartext));
}

function normalizeSeats(seats) {
  if (!seats || typeof seats !== "object") {
    return seats;
  }

  return Object.fromEntries(PARTIES.map(party => {
    const oldName = OLD_NAMES[party];

    const legacyValue =
      party === "עמך ישראל"
        ? seats["וינטר"]
        : undefined;

    return [
      party,
      seats[party] ??
      (oldName ? seats[oldName] : undefined) ??
      legacyValue ??
      0
    ];
  }));
}

function validSeats(value) {
  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return false;
  }

  const values = Object.values(value);

  return (
    values.length === PARTIES.length &&
    values.every(seats =>
      Number.isInteger(seats) &&
      seats >= 0 &&
      seats <= 120
    ) &&
    values.reduce(
      (sum, seats) => sum + seats,
      0
    ) === 120
  );
}

async function createRoom(request, env) {
  const body = await request.json();

  const title =
    typeof body.title === "string"
      ? body.title.trim()
      : "";

  const closeAt = Date.parse(body.closeAt || "");
  const revealAt = Date.parse(body.revealAt || "");

  if (
    !title ||
    !Number.isFinite(closeAt) ||
    closeAt <= Date.now()
  ) {
    return json({
      error: "יש להזין שם ומועד עתידי לסגירת ההגשות"
    }, 400);
  }

  if (
    !Number.isFinite(revealAt) ||
    revealAt <= closeAt
  ) {
    return json({
      error: "מועד החשיפה חייב להיות אחרי מועד סגירת ההגשות"
    }, 400);
  }

  let code;

  for (let attempt = 0; attempt < 10; attempt++) {
    code = randomToken(5).slice(0, 6).toUpperCase();

    const existing = await env.DB
      .prepare("SELECT code FROM rooms WHERE code = ?")
      .bind(code)
      .first();

    if (!existing) {
      break;
    }
  }

  const adminToken = randomToken(24);

  await env.DB.prepare(
    `INSERT INTO rooms
    (code, title, close_at, reveal_at, admin_hash, created_at)
    VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(
    code,
    title.slice(0, 80),
    closeAt,
    revealAt,
    await hash(adminToken),
    Date.now()
  ).run();

  return json({
    code,
    adminToken
  });
}

async function getRoom(code, env) {
  const room = await env.DB.prepare(
    `SELECT code, title, close_at, reveal_at, results_json
     FROM rooms
     WHERE code = ?`
  ).bind(code).first();

  if (!room) {
    return json({
      error: "החדר לא נמצא"
    }, 404);
  }

  const rows = await env.DB.prepare(
    `SELECT name, ciphertext, iv, updated_at
     FROM predictions
     WHERE room_code = ?
     ORDER BY updated_at`
  ).bind(room.code).all();

  const closeAt = room.close_at ?? room.reveal_at;
  const revealed = Date.now() >= room.reveal_at;

  const base = {
    code: room.code,
    title: room.title,
    closeAt: new Date(closeAt).toISOString(),
    revealAt: new Date(room.reveal_at).toISOString(),
    closed: Date.now() >= closeAt,
    revealed,
    count: rows.results.length,
    participants: rows.results.map(row => row.name)
  };

  if (!revealed) {
    return json(base);
  }

  const predictions = await Promise.all(
    rows.results.map(async row => ({
      name: row.name,
      seats: normalizeSeats(
        await unseal(
          row.ciphertext,
          row.iv,
          env
        )
      ),
      submittedAt: new Date(
        row.updated_at
      ).toISOString()
    }))
  );

  return json({
    ...base,
    predictions,
    results: room.results_json
      ? normalizeSeats(JSON.parse(room.results_json))
      : null
  });
}

async function savePrediction(request, code, env) {
  const body = await request.json();

  const name =
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  if (!name || !validSeats(body.seats)) {
    return json({
      error: "יש להזין שם ולחלק בדיוק 120 מנדטים"
    }, 400);
  }

  const room = await env.DB.prepare(
    `SELECT close_at, reveal_at
     FROM rooms
     WHERE code = ?`
  ).bind(code).first();

  if (!room) {
    return json({
      error: "החדר לא נמצא"
    }, 404);
  }

  if (
    Date.now() >=
    (room.close_at ?? room.reveal_at)
  ) {
    return json({
      error: "מועד הגשת התחזיות הסתיים"
    }, 403);
  }

  const editToken =
    body.token || randomToken(24);

  const tokenHash =
    await hash(editToken);

  const encrypted =
    await seal(body.seats, env);

  const now = Date.now();

  if (body.token) {
    const existing = await env.DB.prepare(
      `SELECT id
       FROM predictions
       WHERE room_code = ?
       AND token_hash = ?`
    ).bind(
      code,
      tokenHash
    ).first();

    if (!existing) {
      return json({
        error: "קישור העריכה אינו תקין"
      }, 403);
    }

    await env.DB.prepare(
      `UPDATE predictions
       SET name = ?,
           ciphertext = ?,
           iv = ?,
           updated_at = ?
       WHERE id = ?`
    ).bind(
      name.slice(0, 40),
      encrypted.ciphertext,
      encrypted.iv,
      now,
      existing.id
    ).run();
  } else {
    await env.DB.prepare(
      `INSERT INTO predictions
       (id, room_code, name, ciphertext, iv, token_hash, updated_at)
       VALUES (?, ?, ?, ?, ?, ?, ?)`
    ).bind(
      crypto.randomUUID(),
      code,
      name.slice(0, 40),
      encrypted.ciphertext,
      encrypted.iv,
      tokenHash,
      now
    ).run();
  }

  return json({
    ok: true,
    token: editToken
  });
}

async function saveResults(request, code, env) {
  const body = await request.json();

  if (
    !body.adminToken ||
    !validSeats(body.seats)
  ) {
    return json({
      error: "נתונים לא תקינים"
    }, 400);
  }

  const room = await env.DB.prepare(
    `SELECT admin_hash
     FROM rooms
     WHERE code = ?`
  ).bind(code).first();

  if (
    !room ||
    await hash(body.adminToken) !==
      room.admin_hash
  ) {
    return json({
      error: "אין הרשאת מנהל"
    }, 403);
  }

  await env.DB.prepare(
    `UPDATE rooms
     SET results_json = ?
     WHERE code = ?`
  ).bind(
    JSON.stringify(body.seats),
    code
  ).run();

  return json({
    ok: true
  });
}

async function handleApi(request, env) {
  if (!env.DB) {
    return json({
      error: "מסד הנתונים אינו מחובר"
    }, 500);
  }

  const url = new URL(request.url);

  const path =
    url.pathname.replace(/\/+$/, "") || "/";

  if (
    request.method === "POST" &&
    path === "/api/rooms"
  ) {
    return createRoom(request, env);
  }

  const roomMatch =
    path.match(
      /^\/api\/rooms\/([A-Za-z0-9]+)$/
    );

  if (
    request.method === "GET" &&
    roomMatch
  ) {
    return getRoom(
      roomMatch[1].toUpperCase(),
      env
    );
  }

  const predictionMatch =
    path.match(
      /^\/api\/rooms\/([A-Za-z0-9]+)\/predictions$/
    );

  if (
    request.method === "POST" &&
    predictionMatch
  ) {
    return savePrediction(
      request,
      predictionMatch[1].toUpperCase(),
      env
    );
  }

  const resultsMatch =
    path.match(
      /^\/api\/rooms\/([A-Za-z0-9]+)\/results$/
    );

  if (
    request.method === "POST" &&
    resultsMatch
  ) {
    return saveResults(
      request,
      resultsMatch[1].toUpperCase(),
      env
    );
  }

  return json({
    error: "הכתובת לא נמצאה"
  }, 404);
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (url.pathname.startsWith("/api/")) {
        return await handleApi(
          request,
          env
        );
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);

      return json({
        error: "אירעה שגיאה. נסו שוב בעוד רגע"
      }, 500);
    }
  }
};
