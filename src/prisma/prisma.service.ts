import { Injectable, NotAcceptableException, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        try{
        await this.$connect();
        console.log("⭐Conectado a la base de datos")
        }catch(error){
         return console.log("❌ Error de conexion a DB: ",error )
           
        }
    }

}