import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { error, log } from 'console';
import { Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}


@Component({
  selector: 'app-chat-box',
  imports: [CommonModule,FormsModule],
  templateUrl: './chat-box.component.html',
  styleUrl: './chat-box.component.css'
})
export class ChatBoxComponent {
  messages: Message[] = [];
  userMessage: string = '';
  apiUrl = 'http://localhost:11434/api/chat'; // Change to your LLM API

  constructor(private http: HttpClient) {}

  sendMessage() {

    if (!this.userMessage.trim()) 
      return;

    // Add User Message
    this.messages.push({ sender: 'user', text: this.userMessage });

    // Send Request to LLM
    this.getBotResponse(this.userMessage).subscribe(
      response => {
       // console.log(response)
      this.messages.push({ sender: 'bot', text: response.message.content.replace(/<think>|<\/think>/g, '') });
    },
    error=>{
      console.error('Error communicating with Deepseek:', error);
          this.messages.push({
            sender: 'bot',
            text: 'Sorry, I am unable to process your request at the moment.',
          });
    }
  );

    this.userMessage = ''; // Clear input
  }

  getBotResponse(message: string): Observable<any> {
    return this.http.post<{ reply: string }>(this.apiUrl, { 
      "model": "deepseek-r1:1.5b",
      "messages": [{ "role": "user", "content": message }],
      "stream": false
      } );
  }
}
