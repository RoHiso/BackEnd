import { Router } from "express";

import { crearTipoEmpleado, editTipoEmpleado, getAllTiposEmpleados, getTipoEmpleado } from "../Controllers/TipoEmpleadoController";

const routes = Router();

routes.get('/',getAllTiposEmpleados);

routes.get('/:id',getTipoEmpleado);

routes.put('/:id',editTipoEmpleado);

routes.post('/',crearTipoEmpleado);

//routes.delete('/:id',eliminarCliente)

export default routes;  