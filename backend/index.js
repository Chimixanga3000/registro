const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const cors = require('cors')


//conexion con la base de datos
mongoose
    //.connect('mongodb://127.0.0.1:27017/empleados')
    .connect('mongodb+srv://gabrielrrti21:3AcLxeHoChJjwQDk@registro.4r43te8.mongodb.net/registro-comida?retryWrites=true&w=majority&appName=registro')
    .then((x) => {
            console.log(`Conectado exitosamente a la base de datos ${x.connections[0].name}`)
    })
    .catch((error) => {
        console.log('Error de conexión: ',error.reason)
    })


//configuracion del servidor
const registroRouter = require('./routes/registro.routes')
const app = express()

app.use(bodyParser.json())
app.use(
    bodyParser.urlencoded({
        extended: false,
    })
)
app.use(cors())
app.use('/api',registroRouter)


//habilitar el puerto
const port = process.env.PORT || 4000
const server = app.listen(port, () => {
    console.log('Escuchando en el puerto: '+port)
})


//manejador
app.use((req,res,next) => {
    next(createError(404))
})


//manejador
app.use(function(err,req,res,next){
    console.log(err.message)
    if(!err.statusCode) err.statusCode = 500
    res.status(err.statusCode).send(err.message)
})