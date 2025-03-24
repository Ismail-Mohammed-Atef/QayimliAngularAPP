import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { PrimengtoolsModule } from '../primengtools/primengtools.module';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [PrimengtoolsModule],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent {
  name: string = '';
  email: string = '';
  message: string = '';
  ourEmail: string = 'qayimliweb@gmail.com';

  constructor(private http: HttpClient) {}

  sendMessage() {
    const emailData = {
      name: this.name,
      email: this.email,
      message: this.message,
    };

    this.http.post('http://localhost:3000/send-email', emailData).subscribe(
      (response) => {
        console.log('Email sent successfully');
        alert('Message sent successfully!');
      },
      (error) => {
        console.error('Error sending email', error);
        alert('There was an error sending your message.');
      }
    );
  }
}
