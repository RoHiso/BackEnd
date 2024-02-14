import { Router } from "express";
import { crearPersona, editPerson, getAllPersonas, getPersona } from "../Controllers/PersonaController";

const routes = Router();

routes.get('/',getAllPersonas);

routes.get('/:id',getPersona);

routes.put('/:id',editPerson);

routes.post('/',crearPersona);

export default routes;