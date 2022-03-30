export const getTodayInfo = () => {
  return String(new Date().getFullYear()) + String(new Date().getMonth() + 1) + String(new Date().getDate());
};
