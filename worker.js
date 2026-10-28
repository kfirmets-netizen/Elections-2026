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

const OFFICIAL_RESULTS_URLS = [
  "https://votes26.bechirot.gov.il/nationalresults?lang=he",
  "https://cdn-votes26.bechirot.gov.il/nationalresults?lang=he"
];

const OFFICIAL_BALLOT_MAP = {
  "בקר": "אורות השחר מפלגה של כולם", "פה": "אני ואתה מפלגת העם הישראלית",
  "ז": "בטח", "רק": "ביחד בראשות נפתלי בנט",
  "בד": "ביחד נצליח - רשימה משותפת ערבית יהודית", "נץ": "ביטחון אישי",
  "זץ": "ברית עולם לגאולת ישראל", "יק": "גח״ת-גוש התנ״כי",
  "ה": "גן עדן בראשות ישוע ישראל בן דוד", "אמת": "הדמוקרטים בראשות יאיר גולן",
  "רץ": "הקהל - מפלגה כלל חרדית שנציגיה נבחרים על ידי הציבור בראשות הרב שלמה אלבוים",
  "די": "המילואימניקים והכלכלית בראשות יועז הנדל וירון זליכה",
  "זך": "הציבור החרדי בראשות מוטי לורנר",
  "ט": "הציונות הדתית בראשות בצלאל סמוטריץ׳ יהדות בראשות משה פייגלין",
  "ודם": "הרשימה המשותפת", "ד": "השותפות לכולם",
  "שס": "התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ״ל",
  "נקי": "התיקון לשיטת הבחירות והממשל", "צף": "הפיראטים – צפים לטוב",
  "ג": "יהדות התורה והשבת אגודת ישראל - דגל התורה",
  "ל": "ישראל ביתנו בראשות אביגדור ליברמן", "י": "ישראל תחילה - בראשות שרן השכל",
  "דרך": "ישר! עם איזנקוט לראשות הממשלה מאחדים את ישראל", "כן": "כחול לבן",
  "מחל": "הליכוד עם בנימין נתניהו לראשות הממשלה", "קץ": "משפט צדק",
  "ק": "מפלגת תקומה", "ני": "נעם לישראל", "קך": "סדר חדש",
  "ב": "עוצמה יהודית", "ך": "עמך ישראל", "נר": "צבע שחור - מגן עולם התורה",
  "בי": "צומת בית ישראל", "קה": "קול הנשים",
  "עם": "רע״ם - הרשימה הערבית המאוחדת", "נף": "שמע בראשות נפתלי גולדמן",
  "צדק": "שרשר לאהבה ואחדות העם", "צבי": "תנועת אחי תנועתו של הרב יורם אברג׳ל זצ״ל"
};

const SURPLUS_AGREEMENTS = [
  ["הליכוד עם בנימין נתניהו לראשות הממשלה", "הציונות הדתית בראשות בצלאל סמוטריץ׳ יהדות בראשות משה פייגלין"],
  ["התאחדות הספרדים שומרי תורה תנועתו של מרן הרב עובדיה יוסף זצ״ל", "יהדות התורה והשבת אגודת ישראל - דגל התורה"],
  ["ישר! עם איזנקוט לראשות הממשלה מאחדים את ישראל", "הדמוקרטים בראשות יאיר גולן"],
  ["ביחד בראשות נפתלי בנט", "ישראל ביתנו בראשות אביגדור ליברמן"],
  ["הרשימה המשותפת", "רע״ם - הרשימה הערבית המאוחדת"]
];

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
  for (const byte of bytes) value += String.fromCharCode(byte);
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
  if (!env.SEAL_KEY) throw new Error("SEAL_KEY is missing");

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
  if (!seats || typeof seats !== "object") return seats;

  return Object.fromEntries(
    PARTIES.map(party => {
      const oldName = OLD_NAMES[party];
      const legacyValue =
        party === "עמך ישראל" ? seats["וינטר"] : undefined;

      return [
        party,
        seats[party] ??
          (oldName ? seats[oldName] : undefined) ??
          legacyValue ??
          0
      ];
    })
  );
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
    values.every(
      seats =>
        Number.isInteger(seats) &&
        seats >= 0 &&
        seats <= 120
    ) &&
    values.reduce((sum, seats) => sum + seats, 0) === 120
  );
}

function normalizeBallot(value) {
  return String(value || "").replace(/[״׳"'\`]/g, "").replace(/[\s\-–—]/g, "").trim();
}

function textFromHtml(value) {
  return String(value || "").replace(/<br\s*\/?\s*>/gi, " ").replace(/<[^>]*>/g, " ").replace(/&nbsp;/gi, " ").replace(/&quot;/gi, '"').replace(/&#39;/gi, "'").replace(/&amp;/gi, "&").replace(/\s+/g, " ").trim();
}

function numericCell(value) {
  const plain = textFromHtml(value).replace(/[٠-٩]/g, digit => String("٠١٢٣٤٥٦٧٨٩".indexOf(digit))).replace(/[۰-۹]/g, digit => String("۰۱۲۳۴۵۶۷۸۹".indexOf(digit)));
  if (!/^[-+%\d,\.\s]+$/.test(plain)) return null;
  const digits = plain.replace(/\D/g, "");
  return digits ? Number(digits) : null;
}

function parseOfficialVotes(html) {
  const votes = Object.fromEntries(PARTIES.map(party => [party, 0]));
  let matchedRows = 0;
  let totalVotes = 0;

  for (const rowMatch of html.matchAll(/<tr\b[^>]*>([\s\S]*?)<\/tr>/gi)) {
    const cells = Array.from(rowMatch[1].matchAll(/<t[dh]\b[^>]*>([\s\S]*?)<\/t[dh]>/gi)).map(match => match[1]);
    if (!cells.length) continue;

    const party = cells.map(textFromHtml).map(normalizeBallot).map(ballot => OFFICIAL_BALLOT_MAP[ballot]).find(Boolean);
    if (!party) continue;

    const rowVotes = Math.max(0, ...cells.map(numericCell).filter(Number.isFinite));
    if (!rowVotes) continue;

    votes[party] = rowVotes;
    totalVotes += rowVotes;
    matchedRows++;
  }

  if (matchedRows < 20 || totalVotes < 100000) {
    throw new Error("לא נמצאו נתוני תוצאות תקינים באתר ועדת הבחירות");
  }

  return { votes, totalVotes, matchedRows };
}

function calculateSeatsFromVotes(votes, totalVotes) {
  const seats = Object.fromEntries(PARTIES.map(party => [party, 0]));
  const threshold = totalVotes * 0.0325;
  const eligible = PARTIES.filter(party => votes[party] >= threshold);

  if (!eligible.length) throw new Error("אין עדיין מספיק נתונים לחישוב מנדטים");

  const eligibleVotes = eligible.reduce((sum, party) => sum + votes[party], 0);
  const quota = eligibleVotes / 120;
  for (const party of eligible) seats[party] = Math.floor(votes[party] / quota);

  const groups = [];
  const grouped = new Set();
  for (const agreement of SURPLUS_AGREEMENTS) {
    if (agreement.every(party => eligible.includes(party))) {
      groups.push(agreement);
      agreement.forEach(party => grouped.add(party));
    }
  }
  for (const party of eligible) if (!grouped.has(party)) groups.push([party]);

  while (Object.values(seats).reduce((sum, value) => sum + value, 0) < 120) {
    const winningGroup = [...groups].sort((left, right) => {
      const leftVotes = left.reduce((sum, party) => sum + votes[party], 0);
      const rightVotes = right.reduce((sum, party) => sum + votes[party], 0);
      const leftSeats = left.reduce((sum, party) => sum + seats[party], 0);
      const rightSeats = right.reduce((sum, party) => sum + seats[party], 0);
      return (rightVotes / (rightSeats + 1)) - (leftVotes / (leftSeats + 1));
    })[0];

    const winningParty = [...winningGroup].sort((left, right) => (votes[right] / (seats[right] + 1)) - (votes[left] / (seats[left] + 1)))[0];
    seats[winningParty]++;
  }

  return { seats, eligible };
}

async function fetchOfficialResults() {
  let lastError;

  for (const url of OFFICIAL_RESULTS_URLS) {
    try {
      const response = await fetch(url, {
        headers: { accept: "text/html,application/xhtml+xml" }
      });

      if (!response.ok) {
        throw new Error(
          `אתר ועדת הבחירות החזיר שגיאה ${response.status}`
        );
      }

      const html = await response.text();
      const { votes, totalVotes, matchedRows } = parseOfficialVotes(html);
      const { seats, eligible } = calculateSeatsFromVotes(votes, totalVotes);
      const importedAt = Date.now();

      return {
        seats,
        source: {
          provider: "central-election-committee",
          label: "ועדת הבחירות המרכזית",
          url,
          importedAt,
          totalVotes,
          matchedRows,
          eligibleCount: eligible.length
        }
      };
    } catch (error) {
      lastError = error;
    }
  }

  throw lastError instanceof Error
    ? lastError
    : new Error("אתר ועדת הבחירות אינו זמין כרגע");
}

function unpackResults(resultsJson) {
  if (!resultsJson) return { seats: null, source: null };
  const parsed = JSON.parse(resultsJson);
  if (parsed && parsed.seats && parsed.source) {
    return { seats: normalizeSeats(parsed.seats), source: parsed.source };
  }
  return { seats: normalizeSeats(parsed), source: null };
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
    return json(
      {
        error:
          "יש להזין שם ומועד עתידי לסגירת ההגשות"
      },
      400
    );
  }

  if (
    !Number.isFinite(revealAt) ||
    revealAt <= closeAt
  ) {
    return json(
      {
        error:
          "מועד החשיפה חייב להיות אחרי מועד סגירת ההגשות"
      },
      400
    );
  }

  let code;

  for (let attempt = 0; attempt < 10; attempt++) {
    code = randomToken(5).slice(0, 6).toUpperCase();

    const existing = await env.DB
      .prepare("SELECT code FROM rooms WHERE code = ?")
      .bind(code)
      .first();

    if (!existing) break;
  }

  const adminToken = randomToken(24);

  await env.DB.prepare(
    `INSERT INTO rooms
    (code, title, close_at, reveal_at, admin_hash, created_at)
    VALUES (?, ?, ?, ?, ?, ?)`
  )
    .bind(
      code,
      title.slice(0, 80),
      closeAt,
      revealAt,
      await hash(adminToken),
      Date.now()
    )
    .run();

  return json({
    code,
    adminToken
  });
}

async function getRoom(code, env) {
  const room = await env.DB.prepare(
    `SELECT
      code,
      title,
      close_at,
      reveal_at,
      results_json
    FROM rooms
    WHERE code = ?`
  )
    .bind(code)
    .first();

  if (!room) {
    return json(
      { error: "החדר לא נמצא" },
      404
    );
  }

  const rows = await env.DB.prepare(
    `SELECT
      name,
      ciphertext,
      iv,
      updated_at
    FROM predictions
    WHERE room_code = ?
    ORDER BY updated_at`
  )
    .bind(room.code)
    .all();

  const closeAt =
    room.close_at ?? room.reveal_at;

  const revealed =
    Date.now() >= room.reveal_at;

  const savedResults = unpackResults(room.results_json);

  const base = {
    code: room.code,
    title: room.title,
    closeAt: new Date(closeAt).toISOString(),
    revealAt: new Date(room.reveal_at).toISOString(),
    closed: Date.now() >= closeAt,
    revealed,
    count: rows.results.length,
    participants: rows.results.map(row => row.name),
    source: savedResults.source
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
    results: savedResults.seats
  });
}

async function savePrediction(request, code, env) {
  const body = await request.json();

  const name =
    typeof body.name === "string"
      ? body.name.trim()
      : "";

  if (!name || !validSeats(body.seats)) {
    return json(
      {
        error:
          "יש להזין שם ולחלק בדיוק 120 מנדטים"
      },
      400
    );
  }

  const room = await env.DB.prepare(
    `SELECT close_at, reveal_at
    FROM rooms
    WHERE code = ?`
  )
    .bind(code)
    .first();

  if (!room) {
    return json(
      { error: "החדר לא נמצא" },
      404
    );
  }

  if (
    Date.now() >=
    (room.close_at ?? room.reveal_at)
  ) {
    return json(
      {
        error:
          "מועד הגשת התחזיות הסתיים"
      },
      403
    );
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
    )
      .bind(code, tokenHash)
      .first();

    if (!existing) {
      return json(
        {
          error:
            "קישור העריכה אינו תקין"
        },
        403
      );
    }

    await env.DB.prepare(
      `UPDATE predictions
      SET
        name = ?,
        ciphertext = ?,
        iv = ?,
        updated_at = ?
      WHERE id = ?`
    )
      .bind(
        name.slice(0, 40),
        encrypted.ciphertext,
        encrypted.iv,
        now,
        existing.id
      )
      .run();
  } else {
    await env.DB.prepare(
      `INSERT INTO predictions
      (
        id,
        room_code,
        name,
        ciphertext,
        iv,
        token_hash,
        updated_at
      )
      VALUES (?, ?, ?, ?, ?, ?, ?)`
    )
      .bind(
        crypto.randomUUID(),
        code,
        name.slice(0, 40),
        encrypted.ciphertext,
        encrypted.iv,
        tokenHash,
        now
      )
      .run();
  }

  return json({
    ok: true,
    token: editToken
  });
}

async function verifyAdmin(request, code, env) {
  const body = await request.json();

  const adminToken =
    typeof body.adminToken === "string"
      ? body.adminToken.trim()
      : "";

  if (!adminToken) {
    return json(
      { error: "יש להזין קוד מארגן" },
      400
    );
  }

  const room = await env.DB.prepare(
    `SELECT admin_hash
    FROM rooms
    WHERE code = ?`
  )
    .bind(code)
    .first();

  if (!room) {
    return json(
      { error: "החדר לא נמצא" },
      404
    );
  }

  if (
    await hash(adminToken) !==
    room.admin_hash
  ) {
    return json(
      {
        error:
          "קוד המארגן אינו תקין"
      },
      403
    );
  }

  return json({ ok: true });
}

async function updateCloseAt(
  request,
  code,
  env
) {
  const body = await request.json();

  const adminToken =
    typeof body.adminToken === "string"
      ? body.adminToken.trim()
      : "";

  const closeAt =
    Date.parse(body.closeAt || "");

  if (
    !adminToken ||
    !Number.isFinite(closeAt)
  ) {
    return json(
      {
        error:
          "יש להזין קוד מארגן ומועד חדש"
      },
      400
    );
  }

  const room = await env.DB.prepare(
    `SELECT admin_hash, reveal_at
    FROM rooms
    WHERE code = ?`
  )
    .bind(code)
    .first();

  if (!room) {
    return json(
      { error: "החדר לא נמצא" },
      404
    );
  }

  if (
    await hash(adminToken) !==
    room.admin_hash
  ) {
    return json(
      { error: "אין הרשאת מארגן" },
      403
    );
  }

  if (Date.now() >= room.reveal_at) {
    return json(
      {
        error:
          "לא ניתן לשנות את מועד ההגשה לאחר חשיפת התחזיות"
      },
      400
    );
  }

  if (closeAt <= Date.now()) {
    return json(
      {
        error:
          "המועד החדש חייב להיות בעתיד"
      },
      400
    );
  }

  if (closeAt >= room.reveal_at) {
    return json(
      {
        error:
          "מועד ההגשה חייב להיות לפני מועד החשיפה"
      },
      400
    );
  }

  await env.DB.prepare(
    `UPDATE rooms
    SET close_at = ?
    WHERE code = ?`
  )
    .bind(closeAt, code)
    .run();

  return json({
    ok: true,
    closeAt:
      new Date(closeAt).toISOString()
  });
}

async function revealNow(request, code, env) {
  const auth = await requireOrganizer(request, code, env);
  if (auth.error) return auth.error;

  const room = await env.DB.prepare(
    "SELECT reveal_at FROM rooms WHERE code = ?"
  )
    .bind(code)
    .first();

  if (Date.now() >= room.reveal_at) {
    return json({ error: "התחזיות כבר נחשפו" }, 400);
  }

  const now = Date.now();

  await env.DB.prepare(
    `UPDATE rooms
    SET close_at = ?, reveal_at = ?
    WHERE code = ?`
  )
    .bind(now, now, code)
    .run();

  return json({
    ok: true,
    revealAt: new Date(now).toISOString()
  });
}

async function updateRevealAt(
  request,
  code,
  env
) {
  const body = await request.json();

  const adminToken =
    typeof body.adminToken === "string"
      ? body.adminToken.trim()
      : "";

  const revealAt =
    Date.parse(body.revealAt || "");

  if (
    !adminToken ||
    !Number.isFinite(revealAt)
  ) {
    return json(
      {
        error:
          "יש להזין קוד מארגן ומועד חשיפה חדש"
      },
      400
    );
  }

  const room = await env.DB.prepare(
    `SELECT admin_hash, reveal_at
    FROM rooms
    WHERE code = ?`
  )
    .bind(code)
    .first();

  if (!room) {
    return json(
      { error: "החדר לא נמצא" },
      404
    );
  }

  if (
    await hash(adminToken) !==
    room.admin_hash
  ) {
    return json(
      { error: "אין הרשאת מארגן" },
      403
    );
  }

  if (Date.now() >= room.reveal_at) {
    return json(
      { error: "התחזיות כבר נחשפו" },
      400
    );
  }

  if (revealAt <= Date.now()) {
    return json(
      {
        error:
          "מועד החשיפה החדש חייב להיות בעתיד"
      },
      400
    );
  }

  if (revealAt >= room.reveal_at) {
    return json(
      {
        error:
          "אפשר רק להקדים את מועד החשיפה"
      },
      400
    );
  }

  const closedAt = Date.now();

  await env.DB.prepare(
    `UPDATE rooms
    SET
      close_at = ?,
      reveal_at = ?
    WHERE code = ?`
  )
    .bind(closedAt, revealAt, code)
    .run();

  return json({
    ok: true,
    revealAt:
      new Date(revealAt).toISOString()
  });
}

async function importOfficialResults(request, code, env) {
  const body = await request.json();
  const adminToken = typeof body.adminToken === "string" ? body.adminToken.trim() : "";
  if (!adminToken) return json({ error: "יש להזין קוד מארגן" }, 400);

  const room = await env.DB.prepare("SELECT admin_hash FROM rooms WHERE code = ?").bind(code).first();
  if (!room) return json({ error: "החדר לא נמצא" }, 404);
  if (await hash(adminToken) !== room.admin_hash) return json({ error: "אין הרשאת מארגן" }, 403);

  const imported = await fetchOfficialResults();
  await env.DB.prepare("UPDATE rooms SET results_json = ? WHERE code = ?").bind(JSON.stringify(imported), code).run();
  return json({ ok: true, ...imported });
}

async function syncOfficialResults(code, env) {
  const room = await env.DB.prepare("SELECT reveal_at, results_json FROM rooms WHERE code = ?").bind(code).first();
  if (!room) return json({ error: "החדר לא נמצא" }, 404);
  if (Date.now() < room.reveal_at) return json({ error: "התחזיות טרם נחשפו" }, 403);

  const saved = unpackResults(room.results_json);
  if (saved.source?.provider !== "central-election-committee") {
    return json({ error: "עדכון רשמי לא הופעל בחדר הזה" }, 403);
  }

  if (Date.now() - Number(saved.source.importedAt || 0) < 120000) {
    return json({ ok: true, updated: false, source: saved.source });
  }

  const imported = await fetchOfficialResults();
  await env.DB.prepare("UPDATE rooms SET results_json = ? WHERE code = ?").bind(JSON.stringify(imported), code).run();
  return json({ ok: true, updated: true, ...imported });
}

async function saveResults(
  request,
  code,
  env
) {
  const body = await request.json();

  if (
    !body.adminToken ||
    !validSeats(body.seats)
  ) {
    return json(
      { error: "נתונים לא תקינים" },
      400
    );
  }

  const room = await env.DB.prepare(
    `SELECT admin_hash
    FROM rooms
    WHERE code = ?`
  )
    .bind(code)
    .first();

  if (
    !room ||
    await hash(body.adminToken) !==
      room.admin_hash
  ) {
    return json(
      { error: "אין הרשאת מנהל" },
      403
    );
  }

  await env.DB.prepare(
    `UPDATE rooms
    SET results_json = ?
    WHERE code = ?`
  )
    .bind(
      JSON.stringify(body.seats),
      code
    )
    .run();

  return json({ ok: true });
}

async function requireOrganizer(request, code, env) {
  const body = await request.json();
  const adminToken =
    typeof body.adminToken === "string"
      ? body.adminToken.trim()
      : "";

  if (!adminToken) {
    return { error: json({ error: "יש להזין קוד מארגן" }, 400) };
  }

  const room = await env.DB.prepare(
    "SELECT admin_hash FROM rooms WHERE code = ?"
  )
    .bind(code)
    .first();

  if (!room) {
    return { error: json({ error: "החדר לא נמצא" }, 404) };
  }

  if (await hash(adminToken) !== room.admin_hash) {
    return { error: json({ error: "אין הרשאת מנהל" }, 403) };
  }

  return { body };
}

async function listAdminPredictions(request, code, env) {
  const auth = await requireOrganizer(request, code, env);
  if (auth.error) return auth.error;

  const rows = await env.DB.prepare(
    `SELECT id, name, updated_at
    FROM predictions
    WHERE room_code = ?
    ORDER BY updated_at DESC`
  )
    .bind(code)
    .all();

  return json({
    predictions: rows.results.map(row => ({
      id: row.id,
      name: row.name,
      updatedAt: new Date(row.updated_at).toISOString()
    }))
  });
}

async function listKfirPredictions(request, code, env) {
  const auth = await requireOrganizer(request, code, env);
  if (auth.error) return auth.error;

  const rows = await env.DB.prepare(
    `SELECT name, ciphertext, iv, updated_at
    FROM predictions
    WHERE room_code = ? AND name = ?
    ORDER BY updated_at DESC`
  )
    .bind(code, "כפיר")
    .all();

  const predictions = await Promise.all(
    rows.results.map(async row => ({
      name: row.name,
      seats: normalizeSeats(
        await unseal(row.ciphertext, row.iv, env)
      ),
      submittedAt: new Date(row.updated_at).toISOString()
    }))
  );

  return json({ predictions });
}

async function deleteAdminPrediction(request, code, predictionId, env) {
  const auth = await requireOrganizer(request, code, env);
  if (auth.error) return auth.error;

  const deleted = await env.DB.prepare(
    "DELETE FROM predictions WHERE id = ? AND room_code = ?"
  )
    .bind(predictionId, code)
    .run();

  if (!deleted.meta?.changes) {
    return json({ error: "התחזית לא נמצאה" }, 404);
  }

  return json({ ok: true });
}

async function handleApi(request, env) {
  if (!env.DB) {
    return json(
      {
        error:
          "מסד הנתונים אינו מחובר"
      },
      500
    );
  }

  const url = new URL(request.url);

  const path =
    url.pathname.replace(/\/+$/, "") ||
    "/";

  if (
    request.method === "POST" &&
    path === "/api/rooms"
  ) {
    return createRoom(request, env);
  }

  const roomMatch = path.match(
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

  const predictionMatch = path.match(
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

  const adminMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/admin$/
  );

  if (
    request.method === "POST" &&
    adminMatch
  ) {
    return verifyAdmin(
      request,
      adminMatch[1].toUpperCase(),
      env
    );
  }

  const closeAtMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/close-at$/
  );

  if (
    request.method === "PUT" &&
    closeAtMatch
  ) {
    return updateCloseAt(
      request,
      closeAtMatch[1].toUpperCase(),
      env
    );
  }

  const revealNowMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/reveal-now$/
  );

  if (
    request.method === "POST" &&
    revealNowMatch
  ) {
    return revealNow(
      request,
      revealNowMatch[1].toUpperCase(),
      env
    );
  }

  const revealAtMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/reveal-at$/
  );

  if (
    request.method === "PUT" &&
    revealAtMatch
  ) {
    return updateRevealAt(
      request,
      revealAtMatch[1].toUpperCase(),
      env
    );
  }

  const importMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/import-official-results$/
  );

  if (request.method === "POST" && importMatch) {
    return importOfficialResults(request, importMatch[1].toUpperCase(), env);
  }

  const syncMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/sync-official-results$/
  );

  if (request.method === "POST" && syncMatch) {
    return syncOfficialResults(request, syncMatch[1].toUpperCase(), env);
  }

  const adminPredictionsMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/admin\/predictions$/
  );

  if (
    request.method === "POST" &&
    adminPredictionsMatch
  ) {
    return listAdminPredictions(
      request,
      adminPredictionsMatch[1].toUpperCase(),
      env
    );
  }

  const kfirPredictionsMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/admin\/kfir-predictions$/
  );

  if (
    request.method === "POST" &&
    kfirPredictionsMatch
  ) {
    return listKfirPredictions(
      request,
      kfirPredictionsMatch[1].toUpperCase(),
      env
    );
  }

  const deletePredictionMatch = path.match(
    /^\/api\/rooms\/([A-Za-z0-9]+)\/admin\/predictions\/([0-9a-f-]+)$/
  );

  if (
    request.method === "DELETE" &&
    deletePredictionMatch
  ) {
    return deleteAdminPrediction(
      request,
      deletePredictionMatch[1].toUpperCase(),
      deletePredictionMatch[2],
      env
    );
  }

  const resultsMatch = path.match(
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

  return json(
    { error: "הכתובת לא נמצאה" },
    404
  );
}

export default {
  async fetch(request, env) {
    try {
      const url = new URL(request.url);

      if (
        url.pathname.startsWith("/api/")
      ) {
        return await handleApi(
          request,
          env
        );
      }

      return env.ASSETS.fetch(request);
    } catch (error) {
      console.error(error);

      const message =
        error instanceof Error ? error.message : "";

      const importErrors = [
        "אתר ועדת הבחירות אינו זמין כרגע",
        "לא נמצאו נתוני תוצאות תקינים באתר ועדת הבחירות",
        "אין עדיין מספיק נתונים לחישוב מנדטים"
      ];

      const isOfficialImport =
        new URL(request.url).pathname.includes("official-results");

      return json(
        {
          error: isOfficialImport && message
            ? `ייבוא התוצאות נכשל: ${message}`
            : importErrors.includes(message)
              ? message
              : "אירעה שגיאה. נסו שוב בעוד רגע"
        },
        500
      );
    }
  }
};