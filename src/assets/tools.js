const MONTHS = [
  "",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const DAYS_NAMES = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thoursday",
  "Friday",
  "Saturday",
];

export const percent = (partialValue, totalValue) => {
  return (100 * partialValue) / totalValue;
};

export const NUMBER_FORMAT = (cash) =>
  new Intl.NumberFormat("ja-JP").format(cash);

export const STRING_SLICE = (text, len) => {
  if (text !== undefined && text !== null) {
    return text.length > len ? text.slice(0, len) + "..." : text;
  } else {
    return "";
  }
};

export const DATE = (data) => {
  if (data == null || data === undefined) {
    return "";
  } else {
    const date = new Date(data);
    return date.getDate() + "/" + date.getMonth() + "/" + date.getFullYear();
  }
};

export const DATE_CUSTOM = (data) => {
  if (data == null || data === undefined) {
    return "";
  } else {
    const date = new Date(data);
    let monthName = MONTHS[date.getMonth()];
    return date.getMonth() >= 1 || date.getMonth() <= 12
      ? date.getDate() + " " + monthName + " " + date.getFullYear()
      : date.getDate() + " " + date.getMonth() + " " + date.getFullYear();
  }
};

export const TIME = (data) => {
  if (data == null || data === undefined) {
    return "";
  } else {
    const date = new Date(data);
    return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
  }
};
