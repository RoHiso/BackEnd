import express, {Application, Request, Response} from "express";
import cors from 'cors';
import routesPersonas from '../routes/routesPersonas';
import routesClientes from '../routes/routesClientes';
import routesTipoEmpleados from '../routes/routesTipoEmpleados'

class Server {
    
    private app:Application;
    private PORT:string;
    
    constructor(){
        this.app = express();
        this.PORT = process.env.PORT ||"3001";
        this.listen();
        this.middlewares();
        this.router();
        //console.log(process.env);
    }
    
    
    listen(){
        
        this.app.listen(this.PORT, ()=>{
            console.log("Api corriendo en puerto :" +this.PORT);
        })
    }

    middlewares(){
        //parseamos el Body
        this.app.use(express.json())
        //cors
        this.app.use(cors());
       }

    router(){
    
        this.app.get('/', (req:Request, res:Response)=>{
       
            res.status(200).json({
                msg:"Api Working"
            })
        });

        this.app.use('/api/personas', routesPersonas);

        this.app.use('/api/clientes', routesClientes);

        this.app.use('/api/TipoEmpleados', routesTipoEmpleados);
    }
}
export default Server;

