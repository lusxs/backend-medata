import Purpose from "../models/PurposeModel.js";
import Division from "../models/DivisionModel.js";
import { Model, Op } from "sequelize";

export const createPurpose = async (req, res) => {
  const { name, divisionId } = req.body;

  try {
    await Purpose.create({
      name: name,
      divisionId: divisionId,
    });

    res.status(201).json({ message: "Maksud Tujuan Berhasil Ditambahkan" });
  } catch (error) {
    res
      .status(400)
      .json({ message: "Maksud Tujuan Tidak Berhasil Ditambahkan" });
  }
};

export const getPurposeByDivision = async (req, res) => {
  const { id } = req.params;
  try {
    const data = await Purpose.findAll({ where: { divisionId: id } });
    res.status(200).json({ message: "Berhasil ", result: data });
  } catch (error) {
    res.status(400).json({ message: "Gagal" });
  }
};

export const getPurposes = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  let response;
  let totalPage;
  let totalRows;

  const length_purposes = await Purpose.count();
  let whereCondition = {
    name: {
      [Op.like]: "%" + search + "%",
    },
  };

  if (req.division === "GENERAL") {
    totalRows = await Purpose.count({ where: { [Op.or]: [whereCondition] } });
    totalPage = Math.ceil(totalRows / limit);
    response = await Purpose.findAll({
      where: { [Op.or]: [whereCondition] },
      offset: offset,
      limit: limit,
      include: [
        {
          model: Division,
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
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

    totalRows = await Purpose.count({
      where: { ...divisionFilter, [Op.or]: [whereCondition] },
    });

    totalPage = Math.ceil(totalRows / limit);

    response = await Purpose.findAll({
      where: { ...divisionFilter, [Op.or]: [whereCondition] },
      offset: offset,
      limit: limit,
      include: [
        {
          model: Division,
          attributes: ["name"],
        },
      ],
      order: [["id", "DESC"]],
    });
  }

  res.json({
    result: response,
    page: page,
    limit: limit,
    total: length_purposes,
    totalRows: totalRows,
    totalPage: totalPage,
  });
};
