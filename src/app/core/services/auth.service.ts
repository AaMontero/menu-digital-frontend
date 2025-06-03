import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { encryptionService } from './encrypt.service';
import {
  UserEncryptedInfo,
  UserInfoRegister,
  UserLogin,
} from '../models/interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/security/login';
  private registerUrl = 'http://localhost:3000/security/register';

  constructor(
    private http: HttpClient,
    private encryptionService: encryptionService
  ) {}

  login(credentials: UserLogin) {
    const encryptedPassword =
      this.encryptionService.encryptPassword(credentials);
    credentials.password = encryptedPassword;
    return this.http.post<{ token: string }>(this.apiUrl, credentials).pipe(
      tap((response) => {
        localStorage.setItem('token', response.token);
      })
    );
  }

  logout() {
    localStorage.removeItem('token');
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('token');
  }

  registerUser(userData: UserLogin, userInfoRegister: UserInfoRegister) {
    const encryptedPassword = this.encryptionService.encryptPassword(userData);
    userInfoRegister.password = '';
    const payload = {
      encryptedData: encryptedPassword,
      user: userInfoRegister,
    };
    return this.http.post<UserEncryptedInfo>(this.registerUrl, payload).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }

  
}
