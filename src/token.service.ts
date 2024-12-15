import { HttpStatus, Injectable } from '@nestjs/common';
import { Payload } from './interface/payload.interface';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Token, TokenDocument } from './schema/token.schema';
import { Model } from 'mongoose';

@Injectable()
export class TokenService {
  constructor(
    @InjectModel(Token.name) private readonly tokenModel:Model<TokenDocument>,
    private readonly jwtService:JwtService
  ){}
   
  async createToken(payload:Payload){
       const token= this.jwtService.sign(payload,{
        expiresIn:60*60*24,
        secret:"secrettoken@11_45"
       })
       const userToken=await this.tokenModel.findOne({userId:payload.userId})
       if(userToken){
        userToken.token=token
        await userToken.save()
       }else{
        await this.tokenModel.create({
          userId:payload.userId,
          token
        })
       }

       return{
        status:HttpStatus.CREATED,
        message:"token created",
        data:{
          token
        }
       }
  }
}
