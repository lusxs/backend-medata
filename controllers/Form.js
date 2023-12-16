import Form from "../models/FormModel.js";
import Purpose from "../models/PurposeModel.js";
import Division from "../models/DivisionModel.js";
import { STATUS } from "../utils/constanta.js";
import { Op } from "sequelize";
import moment from "moment";

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

// export const countDataVisitorToday = async (req, res) => {
//   // const { day } = req.params;
//   try {
//     const response = await Form.count({
//       where: {
//         createdAt: day,
//       },
//     });
//     res.status(200).json({ message: "Berhasil", result: response });
//   } catch (error) {}
// };
export const countDataVisitorToday = async (date) => {
  try {
    const formattedDate = moment(date).format("YYYY-MM-DD");

    const response = await Form.count({
      where: {
        createdAt: {
          [Op.between]: [
            moment(formattedDate).startOf("day").toDate(),
            moment(formattedDate).endOf("day").toDate(),
          ],
        },
      },
    });

    return response;
  } catch (error) {
    console.error("Error counting visitors:", error);
    throw new Error("Internal server error");
  }
};

function generateWeeklyData() {
  const currentDate = moment();
  const weeklyData = [];

  for (let i = 0; i < 7; i++) {
    const currentDay = currentDate.clone().subtract(i, "days");

    weeklyData.push({
      date: currentDay.format("YYYY-MM-DD"),
      formattedDate: currentDay.format("MMMM D, YYYY"),
    });
  }

  return weeklyData;
}

export const generateWeeklyDataWithCounts = async (req, res) => {
  try {
    const weeklyData = generateWeeklyData();

    const dataWithCounts = await Promise.all(
      weeklyData.map(async (day) => {
        const count = await countDataVisitorToday(day.date);
        return { ...day, count };
      })
    );

    res.status(200).json(dataWithCounts);
  } catch (error) {
    console.error("Error generating weekly data with counts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const countDataVisitorByDivision = async (req, res) => {
  const { divisionId } = req.params;

  try {
    const response = await Form.count({
      where: {
        // createdAt: today,
        divisionId: divisionId,
      },
    });
    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {}
};

export const countDataVisitorByStatus = async (req, res) => {
  const { status } = req.params;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const response = await Form.count({
      where: {
        status: status,
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal" });
  }
};

export const countDataVisitorByStatusAndDivision = async (req, res) => {
  const { status, divisionId } = req.params;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const response = await Form.count({
      where: {
        divisionId: divisionId,
        status: status,
        createdAt: {
          [Op.gte]: today,
        },
      },
    });

    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal" });
  }
};

export const countDataVisitorByPurpose = async (req, res) => {
  const { purposeId } = req.params;
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Set the time to the beginning of the day

    const purpose = await Form.findOne({
      where: {
        purposeId: purposeId,
      },
    });

    const response = await Form.count({
      where: {
        createdAt: {
          [Op.gte]: today,
        },
        purposeId: purposeId,
      },
    });

    res.status(200).json({ message: "Berhasil", result: response });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Gagal" });
  }
};

// export
export { generateReport } from "../controllers/Report.js";
