import { Router } from "express";

import { crearTipoEmpleado, getAllTiposEmpleados, getTipoEmpleado } from "../Controllers/TipoEmpleadoController";

const routes = Router();

routes.get('/',getAllTiposEmpleados);

routes.get('/:id',getTipoEmpleado);

// routes.put('/:id',editCliente);

routes.post('/',crearTipoEmpleado);

//routes.delete('/:id',eliminarCliente)

export default routes;  