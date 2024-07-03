const express = require('express')
const registroRouter = express.Router()

//declaramos un objeto de nuestro modelo
let registro = require('../models/registro')

//agregar un registro nuevo
registroRouter.route('/agregar').post((req,res) => {
    registro.create(req.body)
    .then((data) => {
        console.log('Se registro la comida')
        res.send(data)
    }).catch((error) => {
        console.log(error)
    })
})

//obtener todos los empelados de las bases de datos
registroRouter.route('/registros').get((req,res) => {
    registro.find()
    .then((data) => {
        res.send(data)
    }).catch((error) => {
        console.error(error)
    })
})


//obtener a los registros solo pr su id
registroRouter.route('/registro/:id').get((req,res) => {
    registro.findById(req.params.id)
    .then((data) => {
        res.send(data)
    }).catch((error) => {
        console.error(error)
    })
})

//actualizar un registro
registroRouter.route('/actualizar/:id').put((req,res) => {
    registro.findByIdAndUpdate(req.params.id,{
        $set: req.body
    }).then((data) => {
        console.log('Se actualizo al registro')
        res.send(data)
    }).catch((error) => {
        console.error(error)
    })
})

//eliminar un registro
registroRouter.route('/delete/:id').delete((req,res) => {
    registro.findByIdAndDelete(req.params.id)
    .then((data) => {
        console.log('Se elimino al registro')
        res.send(data)
    }).catch((error) => {
        console.error(error)
    })
})

module.exports = registroRouter;