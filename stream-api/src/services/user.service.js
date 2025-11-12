const prisma = require('../config/postgres');
const bcrypt = require('bcrypt');

const getUsers = async () => {
  return await prisma.user.findMany();
};

const getUserById = async (id) => {
  return await prisma.user.findUnique({ where: { id: parseInt(id) } });
};

const createUser = async (data) => {
    const hashedPassword = await bcrypt.hash(data.password, 10);
    return await prisma.user.create({
        data: {
            ...data,
            password: hashedPassword,
        },
    });
};

const updateUser = async (id, data) => {
    if (data.password) {
        data.password = await bcrypt.hash(data.password, 10);
    }
    return await prisma.user.update({
        where: { id: parseInt(id) },
        data,
    });
};

const deleteUser = async (id) => {
  return await prisma.user.delete({ where: { id: parseInt(id) } });
};

module.exports = {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
