import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { CreateMailDto } from './dto/create-mail.dto';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

    @Post()
    @HttpCode(201)
    async sendMail(@Body() data:CreateMailDto){
      return this.portfolioService.sendMail(data)
    }
    
   


  }
