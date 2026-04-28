
export function formatDate(inputDate) {
  if (!inputDate) {
    return false;
  }

  const [year, month, day] = inputDate.split("-");

  const date = new Date(Number(year), Number(month) - 1, Number(day));

  if (isNaN(date.getTime())) {
    return "Data inválida";
  }

  const formattedDay = String(date.getDate()).padStart(2, "0");
  const formattedMonth = String(date.getMonth() + 1).padStart(2, "0");
  const formattedYear = date.getFullYear();

  return `${formattedDay}/${formattedMonth}/${formattedYear}`;
}
