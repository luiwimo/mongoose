const UserService = require('../services/UserServices');

const create = async(req, res) => {
    try{
        const user = UserService.createUser(req.body)
        return res.status(201).send(user);
    }catch(error){
        return res.status(400).send(error);
    }
}

const fetch = async(req,res) => {
    try{
        const users = await UserService.findUsers();
        return res.status(200).send(users);
    }catch(error){
        return res.status(400).send(error);
    }
}

const findOne = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await UserServices.findUserbyId(id);
        return res.status(200).send(user);
    }catch(error){
        return res.status(400).send(error);
    }
}


const update = async(req, res) => {
    try{
        const { id } = req.params;
        const user = await UserServices.updateUser(id);
        return res.status(200).send(user);
    }catch(error){
        return res.status(400).send(error);
    }
}

const remove = async(req, res) => {
    try{
        const { id } = req.params;
        const user = UserServices.deleteUser(id);
        return res.status(204);
    }catch(error){
        return res.status(400).send(error);
    }
}

module.exports = {
    create,
    fetch,
    findOne,
    update,
    remove
}