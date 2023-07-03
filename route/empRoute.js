const express = require('express');
const emp  = express()  

const multer = require('multer')
const path = require('path'); 
const bodyParser = require('body-parser')

emp.use(bodyParser.urlencoded({extended:true}))

emp.use(express.static(path.resolve(__dirname,'public')))
var storage = multer.diskStorage({
    destination:(req , file , cb)=>{
        cb(null , './public/upload')
    },
    filename:(req , file , cb)=>{
        cb(null, file.originalname )
    }
})

var upload = multer({storage:storage})

const empController = require('../controller/empController')

emp.post('/uploadCsv', upload.single('file'),empController.importEmp )


module.exports = emp