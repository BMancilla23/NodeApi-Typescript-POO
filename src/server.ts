import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import { UserRouter } from './router/user.router';
import { ConfigServer } from './config/config';
import { DataSource } from 'typeorm';

class ServerBootstrap extends ConfigServer {
    public app: express.Application = express();
    private port: number = this.getNumberEnv("PORT")

    constructor() {
        super()
        /* console.log("Port:", this.port);
        console.log("Port", this.getNumberEnv("PORT")); */

        // Middlewares
        this.app.use(express.json())
        this.app.use(express.urlencoded({ extended: true }))
        /* this.dbConnect(); */
        this.app.use(morgan('dev'))
        this.app.use(cors())

        /* this.app.use("/api", this.routers()) */
        this.listen()
    }

    routers(): Array<express.Router> {

        return [
            new UserRouter().router
        ];

    }

    async dbConnect(): Promise<void> {
        try {
            await new DataSource(this.typeORMConfig).initialize();
            console.log(`Database Connected`);
        } catch (error) {
            console.log(`Database Connection Error: ${error}`);
        }
    }

    public async listen() {
        try {
            await this.dbConnect()
            this.app.use("/api", this.routers());
            this.app.listen(this.port, () => {
                console.log('Server listening on port => ' + this.port);
            });


        } catch (error) {
            console.error(error)
        }
    }
}

/* console.log('NODE_ENV:', process.env.NODE_ENV);
console.log("Port", process.env.PORT) */

new ServerBootstrap()
