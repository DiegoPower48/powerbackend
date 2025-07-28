import { Body, Controller, Get, Param } from '@nestjs/common';
import { PeluchesService } from './peluches.service';

@Controller('peluche')
export class PeluchesController {
  constructor(private readonly peluchesService: PeluchesService) {}


    @Get("/all")
    getAll(){
      return  this.peluchesService.getAll()
    }

    @Get("/slider")
    getSlider(){
      return this.peluchesService.getSlider()
    }

    @Get("/:id")
    getOne(@Param("id") id:String){      
      return this.peluchesService.getOne(+id);
    }

    @Get()    
    findOne(@Body("nombre") nombre:string){
      return this.peluchesService.findOne(nombre)
    }

    @Get()
    findMany(){
      return this.peluchesService.findMany()
    }

    @Get()
    findFilter(){
      return this.peluchesService.findFilter()
    }




    
  
}
