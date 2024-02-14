// TipoEmpleadoAttributes.ts

import { Model, DataTypes } from 'sequelize';
import { sequelize } from '../Configuraciones/Sequelize';

export interface TipoEmpleadoAttributes {
    Id_TipoEmp: number;
    descripcion: string;
}

interface TipoEmpleadoCreationAttributes extends Omit<TipoEmpleadoAttributes, 'Id_TipoEmp'> {}

export interface TipoEmpleadoModelo extends Model<TipoEmpleadoAttributes, TipoEmpleadoCreationAttributes>, TipoEmpleadoAttributes {}

export const TipoEmpleadoModelo = sequelize.define<TipoEmpleadoModelo>('TipoEmpleado', {
    Id_TipoEmp: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
    },
}, {
    tableName: 'tipoempleado',
    modelName: 'TipoEmpleadoModelo',
});