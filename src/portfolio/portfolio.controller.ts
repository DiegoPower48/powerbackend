import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { PortfolioService } from './portfolio.service';
import { Mail } from 'generated/prisma';

@Controller('portfolio')
export class PortfolioController {
  constructor(private readonly portfolioService: PortfolioService) {}

    @Post()
    @HttpCode(201)
    async sendMail(@Body() data:Mail){
      return this.portfolioService.sendMail(data)
    }
    
   


  }
