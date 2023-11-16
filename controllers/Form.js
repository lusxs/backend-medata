import Form from "../models/FormModel.js";
import { STATUS } from "../utils/constanta.js";

export const createForm = async (req, res) => {
  const { name, email, phoneNumber, profession, address, division, purpose } =
    req.body;
  const status = STATUS.NOT_COMPLETED;
  try {
    Form.create({
      name: name,
      email: email,
      phoneNumber: phoneNumber,
      profession: profession,
      address: address,
      division: division,
      purpose: purpose,
      status: status,
    });
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
