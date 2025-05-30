import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  // Funcion Principal
  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
