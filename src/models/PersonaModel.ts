import { Model, DataTypes } from 'sequelize';

import {sequelize} from "../Configuraciones/Sequelize";

import { ClienteModelo,  ClienteAttributes } from './ClienteModelo';


export interface PersonaAttributes {
    Id_Persona?: number;
    DNI?: string | null;
    nombres?: string | null;
    apellidos?: string | null;
    direccion?: string | null;
    telefono?: string | null;
    email?: string | null;
}

interface PersonaCreationAttributes extends PersonaAttributes {}

export interface PersonaModelo extends Model<PersonaAttributes, PersonaCreationAttributes>, PersonaAttributes {
    // Relación con Cliente
    cliente?: ClienteAttributes;
}    

export class PersonaModelo extends Model<PersonaAttributes> implements PersonaAttributes {
    public Id_Persona!: number;
    public DNI!: string | null;
    public nombres!: string | null;
    public apellidos!: string | null;
    public direccion!: string | null;
    public telefono!: string | null;
    public email!: string | null;
}

PersonaModelo.init(
    {
        Id_Persona: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true,
        },
        DNI: {
            type: DataTypes.CHAR(8),
            allowNull: true,
        },
        nombres: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        apellidos: {
            type: DataTypes.STRING(100),
            allowNull: true,
        },
        direccion: {
            type: DataTypes.STRING(255),
            allowNull: true,
        },
        telefono: {
            type: DataTypes.STRING(15),
            allowNull: true,
        },
        email: {
            type: DataTypes.STRING(55),
            allowNull: true,
        }
    },
          
    {
        sequelize,
        tableName: 'personas',
        modelName: 'PersonaModelo',
        createdAt:true,
        updatedAt:true
    }
);



