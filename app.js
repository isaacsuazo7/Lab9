//Servidor
const path = require('path');
const express = require('express');
const morgan = require('morgan');
const app = express();
const moongose = require('mongoose');

//Conectar Base de Datos
moongose.connect('mongodb://localhost/crud-mongo')
    .then(db => console.log('DB connected'))
    .catch(err => console.log(err));

//Importar rutas
const indexRoutes= require('./src/routes/index');
//Configuracion
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname,'./src/views'));
app.set('view engine', 'ejs');

//Middlewares
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));

//routes
app.use('/',indexRoutes);

//Iniciar el servidor
app.listen(app.get('port'), ()=>{
    console.log(`Server on port ${app.get('port')}`);
})
