
import express, { Request, Response } from 'express';
import { ClienteModelo, ClienteAttributes } from '../models/ClienteModelo';
import { PersonaModelo, PersonaAttributes } from  '../models/PersonaModel'

const router = express.Router();

// Create - Crear un nuevo cliente

export const crearCliente =async (req:Request, res:Response) => {
    const {body}=req;

    try {
        const nuevoCliente: ClienteAttributes = body;

        const clienteCreado = await ClienteModelo.create(nuevoCliente);
        res.status(201).json(clienteCreado);
        
    } catch (error) {
        console.error('Error al crear persona:', error);
        throw error;
    }
}

// Read - Obtener todos los clientes

export const getAllClientes = async (req:Request, res:Response)=>{
    try {
        const clientes = await ClienteModelo.findAll({
            include: [{ model: PersonaModelo, as: 'persona' }],
        });
        res.status(200).json(clientes);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener los clientes' });
    }
}

// Read - Obtener un cliente por Id

export const getClliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const cliente = await ClienteModelo.findByPk(id, {
            include: [{ model: PersonaModelo, as: 'persona' }],
        });
        if (cliente) {
            res.status(200).json(cliente);
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al obtener el cliente' });
    }
}

// Update - Actualizar un cliente por Id
export const editCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const clienteExistente = await ClienteModelo.findByPk(id);
        if (clienteExistente) {
            const nuevosDatos: ClienteAttributes = req.body;
            const [filasActualizadas] = await ClienteModelo.update(nuevosDatos, {
                where: { Id_Persona: id },
            });

            if (filasActualizadas === 0) {
                res.status(404).json({ error: 'No se pudo actualizar el cliente' });
            } else {
                const clienteActualizado = await ClienteModelo.findByPk(id);
                res.status(200).json({ mensaje: 'Cliente actualizado con éxito', cliente: clienteActualizado });
            }
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al actualizar el cliente' });
    }
}

// Delete - Eliminar un cliente por Id
export const eliminarCliente = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const clienteExistente = await ClienteModelo.findByPk(id);
        if (clienteExistente) {
            await ClienteModelo.destroy({
                where: { Id_Persona: id },
            });
            res.status(204).end();
        } else {
            res.status(404).json({ error: 'Cliente no encontrado' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Error al eliminar el cliente' });
    }
}

