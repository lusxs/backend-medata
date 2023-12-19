import moment from "moment";

export function generateWeeklyData() {
  let currentDate = moment();
  let weeklyData = [];

  for (let i = 0; i < 7; i++) {
    let currentDay = currentDate.clone().subtract(i, "days");

    if (currentDay.isoWeekday() >= 1 && currentDay.isoWeekday() <= 5) {
      weeklyData.push({
        date: currentDay.format("YYYY-MM-DD"),
        formattedDate: currentDay.format("MMMM D, YYYY"),
      });
    }
  }

  return weeklyData;
}

export function generateWeekdayData() {
  const currentDate = moment();
  const weekdayData = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = currentDate.clone().subtract(i, "days");

    if (currentDay.day() !== 6 && currentDay.day() !== 0) {
      weekdayData.push({
        date: currentDay.format("YYYY-MM-DD"),
        formattedDate: currentDay.format("MMMM D, YYYY"),
        count: 0,
      });
    }
  }

  return weekdayData;
}

export function generateMonthArray(year) {
  const result = [];
  for (let month = 1; month <= 12; month++) {
    const monthStr = month < 10 ? `0${month}` : `${month}`;
    result.push(`${year}-${monthStr}`);
  }
  return result;
}

export function getLastFiveYears() {
  let currentYear = new Date().getFullYear();
  let yearsArray = [];

  for (let i = 0; i < 5; i++) {
    yearsArray.push(currentYear - i);
  }

  return yearsArray;
}
