import moment from "moment";
import Form from "../models/FormModel.js";
import Purpose from "../models/PurposeModel.js";
import { STATUS } from "../utils/constanta.js";

const currentDate = moment().format("YYYY-MM-DD");

export const countDataVisitorByStatus = async (req, res) => {
  try {
    let result;
    if (req.division === "REHSOS") {
      result = await Promise.all(
        Object.values(STATUS).map(async (status) => {
          const count = await Form.count({
            where: {
              divisionId: 2,
              date: currentDate,
              status: status,
            },
          });
          return count;
        })
      );
    } else if (req.division === "LINJAMSOS") {
      result = await Promise.all(
        Object.values(STATUS).map(async (status) => {
          const count = await Form.count({
            where: {
              divisionId: 1,
              date: currentDate,
              status: status,
            },
          });
          return count;
        })
      );
    } else {
      result = await Promise.all(
        Object.values(STATUS).map(async (status) => {
          const count = await Form.count({
            where: {
              divisionId: 3,
              date: currentDate,
              status: status,
            },
          });
          return count;
        })
      );
    }

    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const countDataVisitorByPurpose = async (req, res) => {
  try {
    let purposes;
    if (req.division === "REHSOS") {
      purposes = await Purpose.findAll({ where: { divisionId: 2 } });
    } else if (req.division === "LINJAMSOS") {
      purposes = await Purpose.findAll({ where: { divisionId: 1 } });
    } else {
      purposes = await Purpose.findAll({ where: { divisionId: 3 } });
    }
    // Use Promise.all to count data for each purpose
    const result = await Promise.all(
      purposes.map(async (purpose) => {
        const count = await Form.count({
          where: {
            date: currentDate,
            purposeId: purpose.id,
          },
        });
        return { purpose: purpose.name, count: count };
      })
    );

    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal", error: error.message });
  }
};
