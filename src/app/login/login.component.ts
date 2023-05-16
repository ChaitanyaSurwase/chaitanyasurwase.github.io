  import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string ="";
  password: string="";

  constructor(private http: HttpClient,private router: Router) { }

  submitForm() {
    const user = { email: this.email, password: this.password };

    this.http.post('http://localhost:3000/user', user).subscribe(
      (response: any) => {
        // Handle the response from the API
        const token = response.token;
        console.log('Token:', token);
        this.router.navigate(['/new-project']);

      },
      (error: any) => {
        // Handle errors from the API
        console.error('API Error:', error);
      }
    );
  }
}
