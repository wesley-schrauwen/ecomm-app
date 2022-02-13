import { Controller, Get } from '@nestjs/common';

@Controller()
export default class HealthController {
  @Get('/ping')
  async getHealthCheck() {
    // this is a potential place for future db connection checks
    return {
      health: 'OK',
    };
  }
}
