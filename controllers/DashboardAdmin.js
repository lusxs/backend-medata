import moment from "moment";
import Form from "../models/FormModel.js";
import Purpose from "../models/PurposeModel.js";
import { STATUS } from "../utils/constanta.js";
import Division from "../models/DivisionModel.js";

const currentDate = moment().format("YYYY-MM-DD");
export const countDataVisitorByDivision = async (req, res) => {
  const divisions = [1, 2, 3];

  try {
    const result = await Promise.all(
      divisions.map(async (division) => {
        const count = await Form.count({
          where: {
            date: currentDate,
            divisionId: division,
          },
        });
        return count;
      })
    );

    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal", error: error.message });
  }
};

export const countDataVisitorByStatus = async (req, res) => {
  try {
    const result = await Promise.all(
      Object.values(STATUS).map(async (status) => {
        const count = await Form.count({
          where: {
            date: currentDate,
            status: status,
          },
        });
        return count;
      })
    );

    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export const countDataVisitorByPurpose = async (req, res) => {
  try {
    // Fetch all purposes
    const purposes = await Purpose.findAll({
      include: {
        model: Division,
      },
    });

    // Use Promise.all to count data for each purpose
    const result = await Promise.all(
      purposes.map(async (purpose) => {
        const count = await Form.count({
          where: {
            date: currentDate,
            purposeId: purpose.id,
          },
        });
        return {
          purpose: purpose.name,
          division: purpose.division.name,
          count: count,
        };
      })
    );

    res.status(200).json({ message: "Berhasil", result: result });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Gagal", error: error.message });
  }
};
