import { Router } from "express";

import { crearCliente, editCliente, eliminarCliente, getAllClientes, getClliente } from "../Controllers/ClienteController";

const routes = Router();

routes.get('/',getAllClientes);

routes.get('/:id',getClliente);

routes.put('/:id',editCliente);

routes.post('/',crearCliente);

routes.delete('/:id',eliminarCliente)

export default routes; 