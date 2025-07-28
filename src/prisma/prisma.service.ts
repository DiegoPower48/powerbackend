import { Injectable, Logger, OnModuleInit } from "@nestjs/common";
import { PrismaClient } from "@prisma/client";

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit{

    private readonly logger = new Logger(PrismaService.name)

    async onModuleInit() {
        try{
        await this.$connect();
        this.logger.log("⭐⭐⭐Conectado a la base de datos")
        }catch(error){
         return this.logger.error("❌ No se puede conectar a la base de Datos")
           
        }
    }

}