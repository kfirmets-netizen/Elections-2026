function validSeats(value) {
  if (!value || typeof value !== "object" || Array.isArray(value)) {
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
    values.reduce((sum, seats) => sum + seats, 0) === 120
  );
}
