import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatBoxComponent } from "./chat-box/chat-box.component";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, ChatBoxComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'ai-chat-bot';
}
