export const makeDateForm = (date: Date) => {
  let dayInfo;
  if (date.getMonth() + 1 < 10) {
    if (date.getDate() < 10) {
      dayInfo = String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + "0" + String(date.getDate());
    } else {
      dayInfo = String(date.getFullYear()) + "0" + String(date.getMonth() + 1) + String(date.getDate());
    }
  } else {
    if (date.getDate() < 10) {
      dayInfo = String(date.getFullYear()) + String(date.getMonth() + 1) + "0" + String(date.getDate());
    } else {
      dayInfo = String(date.getFullYear()) + String(date.getMonth() + 1) + String(date.getDate());
    }
  }
  return dayInfo;
};
