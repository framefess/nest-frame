import { Injectable } from '@nestjs/common';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class EmailService {
  constructor(@InjectQueue('email') private emailQueue: Queue) {}

  async sendEmail(emailData: any) {
    await this.emailQueue.add('sendEmail', emailData);
  }

  async getJobStatus(jobId: string) {
    const job = await this.emailQueue.getJob(jobId);
    if (!job) {
      return { status: 'Job not found' };
    }
    const state = await job.getState();
    const progress = job.progress();
    return { state, progress };
  }

  async logAllJobs() {
    const jobs = await this.emailQueue.getJobs([
      'waiting',
      'active',
      'completed',
      'failed',
      'delayed',
    ]);
    jobs.forEach((job) => {
      console.log(`Job ID: ${job.id}`);
      console.log(`Job Name: ${job.name}`);
      console.log(`Job Data: ${JSON.stringify(job.data)}`);
      console.log(`Job Status: ${job.getState()}`);
      console.log(`Job Progress: ${job.progress()}`);
      console.log('-------------------------');
    });
    return jobs;
  }
}
