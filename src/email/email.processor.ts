import { Processor, Process } from '@nestjs/bull';
import { Job } from 'bull';

@Processor('email')
export class EmailProcessor {
  @Process('sendEmail')
  async handleSendEmail(job: Job) {
    const { data } = job;
    // Simulate email sending

    //Start the new timeout
    const timeoutId = setTimeout(function () {
      console.log('Sending email to:', data.email);
    }, 5000);
    console.log('Sending email to:', data);
    console.log('Sending email to:', data.email);
    // Add your email sending logic here
    return {};
  }
}
