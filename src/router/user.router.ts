import { UserController } from "../controllers/user.controller";
import { BaseRouter } from "./router";

export class UserRouter extends BaseRouter<UserController>{

    constructor(){
        super(UserController)
    }

    routes(): void{
        // Se puede simplificar esta ruta quitando el (req, res)
        this.router.get('/user', (req, res) => this.controller.getUsers(req, res))
    }

}