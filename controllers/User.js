import User from "../models/UserModel.js";
import { DIVISION } from "../utils/constanta.js";
import argon2 from "argon2";
import { Op } from "sequelize";

export const getUsers = async (req, res) => {
  const page = parseInt(req.query.page) || 0;
  const limit = parseInt(req.query.limit) || 10;
  const search = req.query.search_query || "";
  const offset = limit * page;
  const totalRows = await User.count({
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
  const result = await User.findAll({
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

export const getUserById = async (req, res) => {
  try {
    const response = await User.findOne({
      attributes: ["uuid", "roleId"],
      where: {
        uuid: req.params.id,
      },
    });
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const createAdmin = async (req, res) => {
  const { username, password, confirmPassword, role, email, name } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Kata Sandi dan Konfirmasi Kata Sandi tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      username: username,
      email: email,
      name: name,
      password: hashPassword,
      division: DIVISION.GENERAL,
      isActive: true,
      role: role,
    });

    res.status(201).json({ message: "Pengguna berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

export const createDivision = async (req, res) => {
  const { username, password, confirmPassword, role, email, name } = req.body;
  if (password !== confirmPassword)
    return res
      .status(400)
      .json({ message: "Kata Sandi dan Konfirmasi Kata Sandi tidak cocok" });
  const hashPassword = await argon2.hash(password);
  try {
    await User.create({
      username: username,
      email: email,
      name: name,
      password: hashPassword,
      division: DIVISION.PERLINDUNGAN_JAMINAN_SOSIAL,
      isActive: true,
      role: role,
    });

    res.status(201).json({ message: "Pengguna berhasil ditambahkan" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};
