import Form from "../models/FormModel.js";

export const createForm = async (req, res) => {
  try {
    res.status(201).json({ message: "Formulir berhasil dibuat" });
  } catch (error) {
    console.error("Error membuat formulir:", error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const updateStatus = async (req, res) => {
  try {
    res.status(200).json({ message: "Status formulir berhasil diperbarui" });
  } catch (error) {
    console.error("Error memperbarui status formulir:", error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};
