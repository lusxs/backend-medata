import User from "../models/UserModel.js";
import argon2 from "argon2";

export const login = async (req, res) => {
  const user = await User.findOne({
    where: {
      username: req.body.username,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan" });
  const match = await argon2.verify(user.password, req.body.password);
  if (!match) return res.status(400).json({ message: "Kata sandi salah" });
  req.session.userId = user.uuid;
  const uuid = user.uuid;
  const username = user.username;
  const role = user.role;
  res.status(200).json({ uuid, username, role });
};

export const me = async (req, res) => {
  if (!req.session.userId) {
    return res.status(401).json({ message: "Mohon masuk ke akun Anda!" });
  }
  const user = await User.findOne({
    attributes: ["uuid", "username", "role"],
    where: {
      uuid: req.session.userId,
    },
  });
  if (!user)
    return res.status(404).json({ message: "Pengguna tidak ditemukan" });
  res.status(200).json(user);
};

export const logout = (req, res) => {
  req.session.destroy((err) => {
    if (err) return res.status(400).json({ message: "Tidak dapat keluar" });
    res.status(200).json({ message: "Anda telah keluar" });
  });
};
