import { Component } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { FormFieldComponent } from '../../shared/components/form/form-field/form-field.component';
import { AuthService } from '../../core/services/auth.service';
import { UserLogin } from '../../core/models/interfaces/login.interface';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
})
export class RegisterComponent {
  registerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private auth: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      firstName: [''],
      lastName: [''],
      birthDate: [''],
      gender: [''],
      address: [''],
      country: [''],
      phoneNumber: [''],
    });
  }

  onSubmit() {
    const userLogin: UserLogin = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };
    console.log('Primer user login', userLogin); 
    if (this.registerForm.valid) {
      this.auth.registerUser(userLogin, this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => alert('Usuario o contraseña inválidos'),
      });
    }else{
        console.log(userLogin); 
    }
  }

  onClick() {
    const userLogin: UserLogin = {
      username: this.registerForm.get('username')?.value,
      password: this.registerForm.get('password')?.value,
    };
    if (this.registerForm.valid) {
      this.auth.registerUser(userLogin, this.registerForm.value).subscribe({
        next: () => this.router.navigate(['/home']),
        error: (err) => alert('Usuario o contraseña inválidos'),
      });
    }
  }
}
