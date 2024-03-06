import { Router } from "express";
import { obtenerUsuario, obtenerUsuarios, agregarUsuarioConToken } from "../Controllers/UsuarioController";

const routes = Router();

routes.get('/',obtenerUsuarios);

routes.get('/:id',obtenerUsuario);

// routes.put('/:id',editPerson);

routes.post('/',agregarUsuarioConToken);

export default routes;