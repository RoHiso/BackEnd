// sequelize.ts
 import dotenv from "dotenv";
 dotenv.config()

import { Sequelize } from 'sequelize';


const sequelize = new Sequelize({
    username: process.env.DB_User,
    password: process.env.DB_PASS,
    database: process.env.DB_Name,
    host: 'localhost',
    dialect: 'mysql'
});

console.log('el nombre de la base de datos es ' + process.env.DB_Name)

export { sequelize };

//Prueba de conexion
export async function probarConexion() {
    try {
        await sequelize.authenticate();
        console.log('Conexión exitosa a la base de datos.');
    } catch (error) {
        console.error('Error al conectar a la base de datos:', error);
    } finally {
        // Cierra la conexión después de la prueba
        await sequelize.close();
    }
}

