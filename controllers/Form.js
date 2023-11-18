import Form from "../models/FormModel.js";
import { STATUS } from "../utils/constanta.js";
import { Op } from "sequelize";

export const getForms = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await Form.count({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
  });
  const totalPage = Math.ceil(totalRows / limit);
  const result = await Form.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    offset: offset,
    limit: limit,
    order: [["id", "DESC"]],
  });
  res.json({
    result: result,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

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
      divisionId: division,
      purposeId: purpose,
      status: status,
    });
    res.status(201).json({ message: "Formulir berhasil dibuat" });
  } catch (error) {
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export const updateStatus = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  try {
    const updatedForm = await Form.update(
      { status: status },
      { where: { id: id } }
    );

    if (updatedForm[0] === 1) {
      res.status(200).json({ message: "Status formulir berhasil diperbarui" });
    } else {
      res.status(404).json({ error: "Formulir tidak ditemukan" });
    }
  } catch (error) {
    console.error("Error memperbarui status formulir:", error);
    res.status(500).json({ error: "Kesalahan server internal" });
  }
};
