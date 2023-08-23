import { UnauthorizedException } from "../../core/exception/http-exceptions";
import { ConfigService } from "../../utils/config";

const jwt = require("jsonwebtoken");
export class JwtAuthGuard{
    private readonly config: ConfigService
    constructor(){
        this.config = new ConfigService()
    }

    async verifyToken(event: any){
        const token = event.Authorization.replace("Bearer ", "");
        if (!token) return new UnauthorizedException(141,'No autorizado.');   
        const decoded = jwt.verify(token, this.config.get("SECRET_JWT"));
        return decoded;
    }

}