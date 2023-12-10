import Form from "../models/FormModel.js";
import Purpose from "../models/PurposeModel.js";
import Division from "../models/DivisionModel.js";
import { Op } from "sequelize";
import moment from "moment";

const generateReport = async (req, res) => {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res
        .status(400)
        .json({ error: "Tanggal mulai dan akhir diperlukan" });
    }

    const startMoment = moment(startDate);
    const endMoment = moment(endDate);

    if (!startMoment.isBefore(endMoment)) {
      return res
        .status(400)
        .json({ error: "Tanggal mulai harus sebelum tanggal akhir" });
    }

    const whereCondition = {
      createdAt: {
        [Op.between]: [startMoment.toDate(), endMoment.endOf("day").toDate()],
      },
    };

    const reports = await Form.findAll({
      where: whereCondition,
      include: [
        {
          model: Purpose,
        },
        {
          model: Division,
        },
      ],
      order: [["createdAt", "DESC"]],
      logging: (sql) => {
        console.log("Generated SQL Query:", sql);
      },
    });

    res.status(200).json({ result: reports });
  } catch (error) {
    console.error("Error menghasilkan laporan:", error);
    // res.status(500).json({ error: "Kesalahan server internal" });
  }
};

export { generateReport };
