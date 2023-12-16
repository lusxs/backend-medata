import moment from "moment";

export function generateWeeklyData() {
  // Mendapatkan tanggal saat ini
  let currentDate = moment();

  // Membuat array untuk menyimpan data harian selama 7 hari kerja
  let weeklyData = [];

  // Loop untuk 7 hari terakhir
  for (let i = 0; i < 7; i++) {
    // Mengurangkan i hari dari tanggal saat ini
    let currentDay = currentDate.clone().subtract(i, "days");

    // Memeriksa apakah hari ini adalah hari kerja (Senin-Jumat)
    if (currentDay.isoWeekday() >= 1 && currentDay.isoWeekday() <= 5) {
      // Menambahkan data harian ke dalam array dalam format yang diinginkan
      weeklyData.push({
        date: currentDay.format("YYYY-MM-DD"),
        formattedDate: currentDay.format("MMMM D, YYYY"),
      });
    }
  }

  // Mengembalikan array data harian
  return weeklyData;
}
