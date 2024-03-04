import express, { Request, Response } from 'express';
import UsuarioModelo from '../models/UsuarioModelo';
import { PersonaModelo } from '../models/PersonaModel';



// Obtener un Usuario

export const obtenerUsuario = async (req: Request, res: Response) => {
    const { id } = req.params;
  
    try {
      const usuario = await UsuarioModelo.findByPk(id, {
        include: [{ model: PersonaModelo, as: 'persona' }],
    });
      if (!usuario) {
        return res.status(404).json({ error: 'Usuario no encontrado' });
      }
      res.json(usuario);
    } catch (error) {
      console.error('Error al obtener usuario:', error);
      res.status(500).json({ error: 'Error al obtener usuario' });
    }
  };

 
  export const obtenerUsuarios = async (req: Request, res: Response) => {
    try {
      const usuarios = await UsuarioModelo.findAll({
        include: [{ model: PersonaModelo, as: 'persona' }],
    });
      res.json(usuarios);
    } catch (error) {
      console.error('Error al obtener usuarios:', error);
      res.status(500).json({ error: 'Error al obtener usuarios' });
    }
  };