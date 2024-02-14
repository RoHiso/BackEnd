
import { PersonaModelo } from '../models/PersonaModel'
import { EmpleadoModelo } from '../models/EmpleadoModelo';
import { TipoEmpleadoModelo } from '../models/TipoEmpleadoModelo';
import { ClienteModelo } from '../models/ClienteModelo';

// Relaciones entre Persona y Empleado
PersonaModelo.hasOne(EmpleadoModelo, { foreignKey: 'Id_Persona', as: 'empleado' });
EmpleadoModelo.belongsTo(PersonaModelo, { foreignKey: 'Id_Persona', as: 'persona' });

// Relaciones entre Empleado y TipoEmpleado
EmpleadoModelo.belongsTo(TipoEmpleadoModelo, { foreignKey: 'Id_TipoEmp', as: 'tipoEmpleado' });
TipoEmpleadoModelo.hasMany(EmpleadoModelo, { foreignKey: 'Id_TipoEmp', as: 'empleados' });

// Relaciones entre Persona y Cliente
PersonaModelo.hasOne(ClienteModelo, { foreignKey: 'Id_Persona', as: 'cliente' });
ClienteModelo.belongsTo(PersonaModelo, { foreignKey: 'Id_Persona', as: 'persona' });

export { PersonaModelo, EmpleadoModelo, TipoEmpleadoModelo, ClienteModelo };