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
  const totalRows = await Purpose.count({
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
  const result = await Purpose.findAll({
    where: {
      [Op.or]: [
        {
          name: {
            [Op.like]: "%" + search + "%",
          },
        },
      ],
    },
    include: [
      {
        model: Division,
        attributes: ["name"],
      },
    ],
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
