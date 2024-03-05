import express, { Request, Response } from 'express';
import {TipoEmpleadoModelo} from '../models/TipoEmpleadoModelo'; // Importa el modelo de TipoEmpleado


// Obtener todos los tipos de empleado

export const getAllTiposEmpleados = async (req:Request, res:Response)=>{
    try {
        const tiposEmpleado = await TipoEmpleadoModelo.findAll();
        res.json(tiposEmpleado);

    } catch (error) {
        
    console.error('Error al obtener tipos de empleado:', error);
    res.status(500).json({ error: 'Error al obtener tipos de empleado' });
  }
}
  
// Obtener un TipoEmpleado por su ID

export const getTipoEmpleado = async (req:Request, res:Response)=>{
  const {id} = req.params;
  try {
    const tipoEmpleado = await TipoEmpleadoModelo.findByPk(id)
    if (tipoEmpleado) {
      res.status(200).json(
        tipoEmpleado
      )
    } else {
      res.status(404).json({
        error:'No existe el empleado con el id: '+ id
      })
    }
  } catch (error) {
    console.error(error);
        res.status(500).json({ error: 'Error al obtener el Tipo de Empleado' });
    
  }

}

// Crear un nuevo tipo de empleado
export const crearTipoEmpleado = async (req: Request, res: Response) => {
  try {
    const { nombre, descripcion } = req.body;
    const nuevoTipoEmpleado = await TipoEmpleadoModelo.create({ nombre, descripcion });
    res.status(201).json(nuevoTipoEmpleado);
  } catch (error) {
    console.error('Error al crear tipo de empleado:', error);
    res.status(500).json({ error: 'Error al crear tipo de empleado' });
  }
};

// Actualizar un tipo de empleado existente
export const editTipoEmpleado = async (req: Request, res: Response) => {
   try {
     const { id } = req.params;
     const { nombre, descripcion } = req.body;
     const tipoEmpleado = await TipoEmpleadoModelo.findByPk(id);
     if (!tipoEmpleado) {
       return res.status(404).json({ error: 'Tipo de empleado no encontrado' });
     }
     await tipoEmpleado.update({ nombre, descripcion });
     res.json(tipoEmpleado);
   } catch (error) {
     console.error('Error al actualizar tipo de empleado:', error);
     res.status(500).json({ error: 'Error al actualizar tipo de empleado' });
   }
 };

// // Ruta para eliminar un tipo de empleado existente
// router.delete('/tipos-empleado/:id', async (req: Request, res: Response) => {
//   try {
//     const { id } = req.params;
//     const tipoEmpleado = await TipoEmpleado.findByPk(id);
//     if (!tipoEmpleado) {
//       return res.status(404).json({ error: 'Tipo de empleado no encontrado' });
//     }
//     await tipoEmpleado.destroy();
//     res.json({ mensaje: 'Tipo de empleado eliminado con éxito' });
//   } catch (error) {
//     console.error('Error al eliminar tipo de empleado:', error);
//     res.status(500).json({ error: 'Error al eliminar tipo de empleado' });
//   }
// });

// export default router;
