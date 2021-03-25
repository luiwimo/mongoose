const {Storage} = require('@google-cloud/storage');

const storage = new Storage({
    projectId: "master-307902",
    keyFilename: "/service.json"
})

const bucket = storage.bucket("master-307902.appspot.com");

 module.exports = (file) => {

    return new Promise((resolve, reject) =>{
        if(!file) reject("No hay archivos")

        const newFilename = `${file.originalname}_${Date.now()}`;//Renombra el archivo

        const fileUpload = bucket.file(newFilename); //Voy a crear un nuevo archivo

        const valid_mimetypes = ['image/jpeg', 'image/png']

        if(valid_mimetypes.indexOf(file.mimetype) ===-1) reject('Archivo invalido')

        const blobStream = fileUpload.createWriteStream({ //Crea Stream de datos
            metadata: {
                contentType: file.mimetype
            }
        })

        blobStream.on('error', (error) => {
            reject(error)
        }) //Con error la promesa regresa error

        blobStream.on('finish', () => {
            const url = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media`
            resolve(url)  //Regresa url
        })

        blobStream.end(file.buffer); //Empieza transmision BKND -> BUCKET
    })
}