
import express, {NextFunction, Request,Response} from 'express';
import { PersonaModelo, PersonaAttributes } from  '../models/PersonaModel'


export const getAllPersonas = async (req:Request, res:Response)=>{
    const listPersonas = await PersonaModelo.findAll();
    res.json({
        listPersonas
    })
}

export const getPersona =async (req:Request, res:Response) => {
    const {id}= req.params;

    try {
        const persona = await PersonaModelo.findByPk(id);
        if(persona){
            res.status(200).json(persona)
        }else{
            res.json({
                msg:"No se encontro al usuario con identificacion : " + id
            })
        }
    } catch (error) {
        console.log(error)
    }
       
    }

export const editPerson =async (req:Request, res:Response):Promise<void>  => {
    const {id}= req.params;
    const nuevosDatos = req.body;

    // const personaNuevosDatos:<PersonaAttributes> 

    //Obtener la persona existente a editar
    try {
        const personaExistente = await PersonaModelo.findByPk(id)
        if (personaExistente) {

             // Crear un nuevo objeto personaNueva con los datos del cuerpo
            const personaNueva: PersonaAttributes  = {
                DNI: nuevosDatos.DNI || personaExistente.DNI,
                nombres: nuevosDatos.nombres || personaExistente.nombres,
                apellidos: nuevosDatos.apellidos || personaExistente.apellidos,
                direccion: nuevosDatos.direccion || personaExistente.direccion,
                telefono: nuevosDatos.telefono || personaExistente.telefono,
                email: nuevosDatos.email || personaExistente.email,
                // Puedes ajustar esto según tus necesidades
            };
        // Lógica para editar la persona
        const [filasActualizadas, personasActualizadas=''] = await PersonaModelo.update(personaNueva, {
            where: { Id_Persona: id },
        });

        if (filasActualizadas === 0) {
            res.status(404).json({ error: 'No se pudo actualizar la persona' });
        } else {
            res.status(200).json({ mensaje: 'Persona actualizada con éxito', persona: personasActualizadas[0] });
        }    

            
        } else {
            res.status(404).json({ error: 'Persona no encontrada' });
            return;
        }
        
    } catch (error) {
         console.error('Error al editar persona:', error);
         res.status(500).json({ error: 'Error interno del servidor' });
    }
    
}    

export const crearPersona =async (req:Request, res:Response) => {
    const {body}=req;

    try {
        const nuevaPersona = await PersonaModelo.create(body);

        console.log('Persona creada:', nuevaPersona.toJSON());
        res.status(200).json({nuevaPersona});
        
    } catch (error) {
        console.error('Error al crear persona:', error);
        throw error;
    }
}

