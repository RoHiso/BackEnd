import { Router } from "express";
import { obtenerUsuario, obtenerUsuarios, agregarUsuario, loginUser } from "../Controllers/UsuarioController";

const routes = Router();

routes.get('/',obtenerUsuarios);

routes.get('/:id',obtenerUsuario);

routes.post('/login',loginUser);

// routes.put('/:id',editPerson);

routes.post('/',agregarUsuario);

export default routes;