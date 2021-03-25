//Aqui debe estar todo lo relacionado a la DB
const Users = require('../models/Users')

const createUser = async(user) => {
    if(!user) throw new Error("No hay usuario")
    const dbUser = await Users.create(user)
    return dbUser
}

const findUsers = async() => {
    return await Users.find({});
}

const findUserbyId = async(id) => {
    const user = await Users.findById(id);
    if(user) throw new Error("Usuario no encontrado")
    return user
}

const updateUser = async(id,user) =>{
    const userDB = Users.updateOne({_id:id},{$set:{...user}},{new:true})
    if(!userDB) throw new Error("Usuario no encontrado")
    return user
}

const deleteUser = async(id) => {
    return await Users.deleteOne({_id:id})
}

module.exports = {
    createUser,
    findUsers,
    findUserbyId,
    updateUser,
    deleteUser
}