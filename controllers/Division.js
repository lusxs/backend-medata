import Division from "../models/DivisionModel.js";

export const createDivision = async (req, res) => {
  const { name } = req.body;

  try {
    await Division.create({
      name: name,
    });
    res.status(201).json({ message: "Bidang Berhasil Ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: "Bidang Tidak Berhasil Ditambahkan" });
  }
};

export const getDivisions = async (req, res) => {
  try {
    const data = await Division.findAll();
    res
      .status(200)
      .json({ message: "Berhasil Mendapatkan Data Bidang", result: data });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ message: "Gagal Mendapatkan Data Bidang", error: error.message });
  }
};
