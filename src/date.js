const getToday = () => {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);

  const year = today.getUTCFullYear();
  const month = String(today.getUTCMonth() + 1).padStart(2, '0');
  const day = String(today.getUTCDate()).padStart(2, '0');
  return `${year}-${month}-${day}T00:00:00+00:00`;
};

export { getToday };
