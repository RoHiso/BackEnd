import { sequelize } from "../Configuraciones/Sequelize";
import { Model, DataTypes } from 'sequelize';
import { PersonaModelo } from "./PersonaModel";


interface UsuarioAttributes {
  Id_Usuario?: number;
  Id_Persona: number;
  username: string;
  password: string;
  rol: 'admin' | 'empleado' | 'cliente';
}

class UsuarioModelo extends Model<UsuarioAttributes> implements UsuarioAttributes {
  public Id_Usuario!: number;
  public Id_Persona!: number;
  public username!: string;
  public password!: string;
  public rol!: 'admin' | 'empleado' | 'cliente';
}

UsuarioModelo.init(
  {
    Id_Usuario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    Id_Persona: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    rol: {
      type: DataTypes.ENUM('admin', 'empleado', 'cliente'),
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Usuario',
    timestamps: false,
  }
);

// Relación con Persona (Uno a Uno)

UsuarioModelo.belongsTo(PersonaModelo, { foreignKey: 'Id_Persona', as: 'persona' });

//UsuarioModelo.sync();

export default UsuarioModelo


