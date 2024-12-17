import { Controller, Get } from "@nestjs/common";
import { TokenService } from "./token.service";
import { MessagePattern } from "@nestjs/microservices";
import { Payload } from "./interface/payload.interface";


@Controller()
export class TokenController {
  constructor(private readonly tokenService: TokenService) {}

  @MessagePattern("create_token_user")
  createToken(payload:Payload){
    return this.tokenService.createToken(payload)
  }
  @MessagePattern("verify_token")
  verifyToken(token:string){
    console.log(token)
    return this.tokenService.verifyToken(token)
  }

}
