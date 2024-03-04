import { Router } from "express";
import { obtenerUsuario, obtenerUsuarios } from "../Controllers/UsuarioController";

const routes = Router();

routes.get('/',obtenerUsuarios);

routes.get('/:id',obtenerUsuario);

// routes.put('/:id',editPerson);

// routes.post('/',crearPersona);

export default routes;