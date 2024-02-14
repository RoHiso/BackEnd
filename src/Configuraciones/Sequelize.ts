// sequelize.ts
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize('cafebar', 'root', 'xAcademy2023', {
    host: 'localhost',
    dialect: 'mysql', // Ajusta según tu base de datos
});

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

