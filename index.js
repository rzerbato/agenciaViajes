import express from 'express';
import router from './routes/index.js'
import db from './config/db.js'

const app = express();

//Conecto la db
db.authenticate()
    .then( () => console.log('base de datos conectada') )
    .catch( err => console.log(err) );

//definir port
const port = process.env.PORT || 4000;

//Habilitar PUG
app.set('view engine', 'pug');

//Defino la carpeta publica
app.use(express.static('public'));

// Obtener el año actual
app.use( (req, res, next) => {
    const year = new Date();

    res.locals.actualYear = year.getFullYear();
    res.locals.nombreSitio = "Agencia de Viajes";

    //Este next() hace que siga con el siguiente middleware
    next();
});

//agrego body-parser para leer los datos del formulario
app.use( express.urlencoded( { extended: true } ) )

//Agrego el router
app.use('/', router);

app.listen(port, () => {
    console.log(`El servidor esta corriendo en el puerto ${port}`);
})