import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { EmailService } from './email.service';

@Controller('email')
export class EmailController {
  constructor(private readonly emailService: EmailService) {}

  @Post('send')
  async sendEmail(@Body() emailData: any) {
    await this.emailService.sendEmail(emailData);
    return { message: 'Email job added to the queue' };
  }

  @Get('status/:id')
  async getJobStatus(@Param('id') jobId: string) {
    return this.emailService.getJobStatus(jobId);
  }

  @Get('log-all-jobs')
  async logAllJobs() {
    const result = await this.emailService.logAllJobs();
    return { listAllJob: result, message: 'Logged all jobs' };
  }
}
