import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
  @Post()
  async postMessage(@Body() body: any): Promise<any> {
    return this.appService.Operate(body);
  }
  @Post('receive')
  async receiveMessage(@Body() body: any): Promise<any> {
    return this.appService.ReceiveNextProcess(body);
  }
}
