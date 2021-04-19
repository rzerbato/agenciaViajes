import { Viaje } from '../models/Viaje.js';
import { Testimonial } from '../models/Testimoniales.js';

const paginaInicio = async (req, res) =>{

    //Consultar 3 viajes del modelo viaje y 3 testimoniales
    const PromiseDB = [];
    promiseDB.push( Viaje.findAll({ limit: 3 }) );
    promiseDB.push( Testimonial.findAll({ limit: 3 }) );

    try {

        
        const resultado = await Promise.all( promiseDB );

        res.render('inicio', {
            pagina: 'Inicio',
            clase: 'home',
            viajes: resultado[0],
            testimoniales: resultado[1]
        });
    } catch (error) {
        console.log(error);
    }

    
}

const paginaNosotros = (req, res) =>{
    res.render('nosotros', {
        pagina: 'Nosotros'
    });
}

const paginaTestimoniales = async(req, res) =>{

    //Busco los testimoniales
    try {
        const testimoniales = await Testimonial.findAll();

        res.render('testimoniales', {
            pagina: 'testimoniales',
            testimoniales
        });                
    } catch (error) {
        
    }


}

const paginaViajes = async (req, res) =>{

    //Recupero los viajes
    const viajes = await Viaje.findAll();
    
    res.render('viajes', {
        pagina: 'Próximos Viajes',
        viajes
    });
}

//Muestra un viaje por su slug
const paginaDetalleViaje = async (req, res) => {
    const { slug } = req.params;
    try{
        const viaje = await Viaje.findOne({ where: { slug } });
        res.render('viaje', { 
            pagina: 'Información Viaje',
            viaje
        })
    }catch (err) {
        console.log(err)
    }
}

export {
    paginaInicio,
    paginaNosotros,
    paginaTestimoniales,
    paginaViajes,
    paginaDetalleViaje
}