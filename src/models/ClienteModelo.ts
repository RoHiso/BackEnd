import { Model, DataTypes } from 'sequelize';
import { PersonaAttributes, PersonaModelo } from '../models/PersonaModel';
import { sequelize } from '../Configuraciones/Sequelize'; // Asegúrate de tener configurada tu instancia de Sequelize

export interface ClienteAttributes {
    Id_Persona: number;
    ultimaCompra?: Date | null;
}

interface ClienteCreationAttributes extends ClienteAttributes {}

export interface ClienteModelo extends Model<ClienteAttributes, ClienteCreationAttributes>, ClienteAttributes {
    // Relación con Persona
    persona?: PersonaAttributes;
}

export const ClienteModelo = sequelize.define<ClienteModelo>('ClienteModelo', {
    Id_Persona: {
        type: DataTypes.INTEGER.UNSIGNED,
        primaryKey: true,
        allowNull: false,
        references: {
            model: PersonaModelo,
            key: 'Id_Persona',
        },
    },
    ultimaCompra: {
        type: DataTypes.DATE,
        allowNull: true,
    },
}, {
    tableName: 'clientes',
    modelName: 'ClienteModelo',
    timestamps: false, // Puedes ajustar esto según tus necesidades
});

// Definición de la relación con Persona
ClienteModelo.belongsTo(PersonaModelo, { foreignKey: 'Id_Persona', as: 'persona' });