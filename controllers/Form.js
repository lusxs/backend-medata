import Form from "../models/FormModel.js";
import Purpose from "../models/PurposeModel.js";
import Division from "../models/DivisionModel.js";
import { STATUS } from "../utils/constanta.js";
import { Op } from "sequelize";
import moment from "moment";
import { generateReport } from "../controllers/Report.js";

export const getForms = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const status = req.query.status || "";
  const search = req.query.search_query || "";
  const offset = limit * page;

  let response;
  let totalPage;
  let totalRows;

  let whereCondition;

  if (status === "") {
    whereCondition = {
      name: {
        [Op.like]: "%" + search + "%",
      },
    };
  } else {
    whereCondition = {
      name: {
        [Op.like]: "%" + search + "%",
      },
      status: {
        [Op.eq]: status,
      },
    };
  }

  if (req.division === "GENERAL") {
    totalRows = await Form.count({ where: { [Op.or]: [whereCondition] } });
    totalPage = Math.ceil(totalRows / limit);
    response = await Form.findAll({
      where: { [Op.or]: [whereCondition] },
      offset: offset,
      limit: limit,
      order: [["id", "DESC"]],
      include: [
        {
          model: Purpose,
        },
        {
          model: Division,
        },
      ],
    });
  } else {
    let divisionFilter;

    if (req.division === "RESOS") {
      divisionFilter = { divisionId: 2 };
    } else if (req.division === "LINJAMSOS") {
      divisionFilter = { divisionId: 3 };
    } else {
      divisionFilter = { divisionId: 4 };
    }

    totalRows = await Form.count({
      where: { ...divisionFilter, [Op.or]: [whereCondition] },
    });

    totalPage = Math.ceil(totalRows / limit);

    response = await Form.findAll({
      where: { ...divisionFilter, [Op.or]: [whereCondition] },
      offset: offset,
      limit: limit,
      include: [
        {
          model: Purpose,
        },
        {
          model: Division,
        },
      ],
      order: [["id", "DESC"]],
    });
  }

  res.json({
    result: response,
    page: page,
    limit: limit,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};

export const createForm = async (req, res) => {
  const {
    name,
    age,
    phoneNumber,
    citizenNumber,
    profession,
    address,
    division,
    purpose,
  } = req.body;
  let newCitizenNumber;
  const status = STATUS.NOT_COMPLETED;
  if (citizenNumber === "") {
    newCitizenNumber = null;
  } else {
    newCitizenNumber = citizenNumber;
  }

  try {
    Form.create({
      name: name,
      age: age,
      citizenNumber: newCitizenNumber,
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

export const getFormById = async (req, res) => {
  const { id } = req.params;
  try {
    const response = await Form.findOne({
      where: {
        id: id,
      },
      include: [
        {
          model: Purpose,
        },
        {
          model: Division,
        },
      ],
    });
    console.log(response);
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {}
};

export const countDataVisitorToday = async (req, res) => {
  // const { day } = req.params;
  try {
    const response = await Form.count({
      where: {
        createdAt: day,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {}
};

export { generateReport } from "../controllers/Report.js";
