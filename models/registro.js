const mongoose = require('mongoose')
const Schema = mongoose.Schema

let Registro = new Schema({
    nombre: {
        type: String
    },
    hamburguesa: {
        type: String
    },
    papa: {
        type: String
    },
    bebida: {
        type: String
    },
    gerente: {
        type: String
    },
    salida: {
        type: String
    },
    regreso: {
        type: String
    }
},{
    collection: 'registros'
})

module.exports = mongoose.model('Registro',Registro)