const express = require('express')
const mongoose = require('mongoose')
const multer = require('multer')
const UsersController = require('./controllers/UserControllers');
const manageFiles = require('./middlewares/manageFiles');
const app = express();
const MONGO_URI = "mongodb+srv://edw01:1234@cluster0.tqsmr.mongodb.net/apimongo?retryWrites=true&w=majority"

const storage = process.env.NODE_ENV ==="production" ? multer.memoryStorage() : multer.diskStorage({
    destination: function(req, file,cb){
        cb(null,'uploads')
    },
    filename: function(req,file,cb){
        cb(null,`${Date.now()}_${file.originalname}`)
    }
})

const mult =  multer({
    storage,
    limits: {
        fileSize: 5 * 1024 * 1024
    }
})

app.use(express.urlencoded({extended:true}))
app.use(express.json());
app.use('/uploads',express.static('uploads'))

mongoose.connect(MONGO_URI,{
    useNewUrlParser: true,
    useUnifiedTopology:true,
    useCreateIndex:true
})
const db = mongoose.connection

db.on('error',function(err){
    console.log('Connection error', err);

})

db.once('open', function(){
    console.log('connected to db!');
})

app.get('/users',UsersController.fetch)

app.post('/users', [mult.single('photo'),manageFiles],UsersController.create)

app.get('/users/:id',UsersController.findOne)

app.patch('/users', [mult.single('photo'),manageFiles],UsersController.update)

app.delete('/users/:id',UsersController.remove)
//manageFiles] ,async(req,res) => {
//     // if(req.file){
//     //     const url = await storage(req.file)
//     //     req.body.photo = url
//     // }
//     Users.create(req.body).then((user) => {
//         res.status(201).send(user)
//     }).catch((err) => {
//         res.status(400).send(err)
//     })
// })
const port = process.env.PORT || 3000
app.listen(port, () => {
    console.log("Server Ready!");
})