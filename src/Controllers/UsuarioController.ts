
import express, { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import UsuarioModelo from '../models/UsuarioModelo';
import { PersonaModelo } from '../models/PersonaModel';


//Nuevo Usuario
const generarToken = (username: string) => {
  const token = jwt.sign({ username: username }, process.env.SECRET_KEY || 'secreto', { expiresIn: '1h' });
  return token;
};

export const agregarUsuario = async (req: Request, res: Response) => {
  const { Id_Persona, username, password, rol } = req.body;

  try {
    const usuarioExistente = await UsuarioModelo.findOne({ where: { username } });
    if (usuarioExistente) {
      return res.status(400).json({ error: 'El usuario ya existe' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    // Crear el nuevo usuario sin el Id_Usuario

      const nuevoUsuario = await UsuarioModelo.create({ 
      Id_Persona: Id_Persona,
      username:username,
      password:hashedPassword,
      rol:rol });

    // Obtener el Id_Usuario generado
    const usuarioId = nuevoUsuario.Id_Usuario;

    res.status(201).json({ usuario: nuevoUsuario });
    
  } catch (error) {
    console.error('Error al crear usuario:', error);
    res.status(500).json({ error: 'Error al crear usuario' });
  }
};

//Login User

export const loginUser = async (req:Request, res:Response) =>{
  const {username, password} = req.body

  //identificamos que exista el usuario
try {
  const usuario: any = await UsuarioModelo.findOne({ where: { username: username } });
  if (!usuario) {
    return res.status(400).json({ error: `No existe el usuario ${username} en la base de datos` });
  }
  
  //Validamos el password
  const passwordValid = await bcrypt.compare(password, usuario.password)
  console.log(passwordValid);
  
  //generamos el Token y lo enviamos
  if (passwordValid) {
    const token = generarToken(username);
    return res.status(200).json( {
      msg:"Usuario y contraseña correctos, se genero el  siguiente token",
      token: token
    })
  }else {
    return res.status(400).json({
      msg: 'Error, Contraseña incorrecta'
    });
  }

} catch (error) {
  console.log(error);
}



}


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