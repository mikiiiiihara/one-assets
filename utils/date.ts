export const formatDateToJST = (date: Date): string => {
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    timeZone: "Asia/Tokyo",
  };

  // 日付を日本標準時でフォーマット
  const jstDate = new Date(date.toLocaleString("en-US", options));

  // YYYY/MM/DD形式に整形
  const year = jstDate.getFullYear();
  const month = String(jstDate.getMonth() + 1).padStart(2, "0"); // 月は0から始まるため+1
  const day = String(jstDate.getDate()).padStart(2, "0");

  return `${year}/${month}/${day}`;
};
