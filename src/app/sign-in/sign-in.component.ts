import {Component} from '@angular/core';
import {MatButton} from "@angular/material/button";
import {Title} from "@angular/platform-browser";
import {AuthService} from "../service/auth.service";

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    MatButton
  ],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.css'
})
export class SignInComponent {

  /* injecting Auth Service and Title Service */
  constructor(public authService: AuthService,
              titleService: Title) {
    /* changing title */
    titleService.setTitle("Sign-in To-do list app");
  }


  protected readonly AuthService = AuthService;
}
