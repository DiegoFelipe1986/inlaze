import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm: FormGroup | any;

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(18)]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required]
    }, {
      validators: this.passwordMatchValidator
    });
  }
  passwordMatchValidator(form: FormGroup) {
    const password = form.get('password')?.value;
    const confirmPassword = form.get('confirmPassword')?.value;
    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  errorMessage: string | null = null;

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...formDataWithoutConfirm } = this.registerForm.value;

      this.http.post('http://localhost:8080/api/v1/users', formDataWithoutConfirm)
        .pipe(
          catchError((error) => {
            console.error('Error durante el registro:', error);
            this.errorMessage = 'El correo ya existe. Por favor, inténtelo de nuevo.';
            return throwError(error);
          })
        )
        .subscribe(
          (response) => {
            console.log('Registro exitoso:', response);
            this.router.navigate(['/login']);
          }
        );
    }
  }


}
