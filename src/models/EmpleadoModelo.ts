
import { Model, DataTypes, Optional } from 'sequelize';
import { sequelize } from "../Configuraciones/Sequelize";
import { PersonaModelo } from "./PersonaModel";

import { TipoEmpleadoModelo } from "./TipoEmpleadoModelo";

export interface EmpleadoAttributes {
     Id_Persona: number;
     Id_TipoEmp?: number | null;
 }

interface EmpleadoCreationAttributes extends Optional<EmpleadoAttributes, 'Id_Persona'> {}

class EmpleadoModelo extends Model<EmpleadoAttributes, EmpleadoCreationAttributes> implements EmpleadoAttributes {
    public Id_Persona!: number;
    public Id_TipoEmp?: number | null;

    // Relaciones
    public readonly persona?: PersonaModelo;
    public readonly tipoEmpleado?: TipoEmpleadoModelo;

    // Automáticamente generará los métodos: getPersona, setPersona, createPersona, getTipoEmpleado, setTipoEmpleado, createTipoEmpleado, etc.
}

EmpleadoModelo.init(
    {
        Id_Persona: {
            type: DataTypes.INTEGER.UNSIGNED,
            primaryKey: true,
            allowNull: false,
        },
        Id_TipoEmp: {
            type: DataTypes.INTEGER.UNSIGNED,
            allowNull: true,
        },
    },
    {
        sequelize,
        tableName: 'empleados',
        modelName: 'EmpleadoModelo',
    }
);

// Definición de relaciones
EmpleadoModelo.belongsTo(PersonaModelo, { foreignKey: 'Id_Persona', as: 'persona' });
EmpleadoModelo.belongsTo(TipoEmpleadoModelo, { foreignKey: 'Id_TipoEmp', as: 'tipoEmpleado' });

// Sincronización del modelo con la base de datos (asegúrate de hacer esto en algún lugar de tu aplicación)
EmpleadoModelo.sync();

export { EmpleadoModelo };