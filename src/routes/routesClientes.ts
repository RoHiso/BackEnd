import { Router } from "express";

import { crearCliente, editCliente, eliminarCliente, getAllClientes, getClliente } from "../Controllers/ClienteController";
import { validateToken } from "./validate-Token";

const routes = Router();

routes.get('/',validateToken, getAllClientes);

routes.get('/:id',validateToken, getClliente);

routes.put('/:id',editCliente);

routes.post('/',crearCliente);

routes.delete('/:id',eliminarCliente)

export default routes; 