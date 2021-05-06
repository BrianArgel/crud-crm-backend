const bodyParser = require('body-parser')
const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose')
require('dotenv').config({ path: 'variables.env' })
//cors permite que un cliente conecte a otro servidor
const cors = require('cors')
//contectar mongose
mongoose.Promise = global.Promise;
mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true
})

//creando el servidor
const app = express();

//carpeta publica 
app.use(express.static('uploads'))

//habilitar bodyParser
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

//definir dominios para recibir peticiones
const whitelist = [process.env.FRONTEND_URL];
const corsOptions = {
    origin: (origin, callback) => {
        //revisiar si la peticion viene de un sitio whitelist
        const existe = whitelist.some(dominio => dominio == origin)
        if (existe) {
            callback(null, true)
        } else {
            callback(new Error(' NO permitido por cors'))
        }
    }
}
//habilitar cors
app.use(cors(corsOptions))
//rutas
app.use('/', routes())

const host = process.env.HOST || '0.0.0.0';
const port = process.env.PORT || 50000;

//puerto del servidor
app.listen(port, host, () => {
    console.log('running server.....')
})