
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UsuarioModelo from '../models/UsuarioModelo';
import { PersonaModelo } from '../models/PersonaModel';


//Nuevo usuario con Token


const generarToken = (usuarioId: number) => {
  const token = jwt.sign({ id: usuarioId }, 'secreto', { expiresIn: '1h' });
  return token;
};

export const agregarUsuarioConToken = async (req: Request, res: Response) => {
  const { Id_Persona, username, password, rol } = req.body;

  try {
    const usuarioExistente = await UsuarioModelo.findOne({ where: { username } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario sin el Id_Usuario
    const nuevoUsuario = await UsuarioModelo.create({ Id_Persona, username, password: hashedPassword, rol });

    // Obtener el Id_Usuario generado
    const usuarioId = nuevoUsuario.Id_Usuario;

    // Generar el token con el Id_Usuario
    const token = generarToken(usuarioId);
    console.log(token);

    res.status(201).json({ usuario: nuevoUsuario, token });
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};


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