import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string | null = null;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  onSubmit() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      this.http.post<any>('http://localhost:8080/api/v1/users/login', { email, password })
        .pipe(
          catchError((error) => {
            console.error('Error during login:', error);
            this.errorMessage = 'Error during login. Please try again.';
            return throwError(error);
          })
        )
        .subscribe(
          (response) => {
            console.log('Login successful:', response);

            // Guardar información de sesión en localStorage
            localStorage.setItem('userId', response.id);
            localStorage.setItem('userEmail', response.email);
            localStorage.setItem('userName', response.name);
            localStorage.setItem('token', response.token);

            // Redirigir al usuario a la página deseada
            this.router.navigate(['/posts']);
          }
        );
    }
  }
}
