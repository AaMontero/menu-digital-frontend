import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { encryptionService } from './encrypt.service';
import { UserEncryptedInfo, UserLogin } from '../models/interfaces/login.interface';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private apiUrl = 'http://localhost:3000/api/login';

  constructor(
    private http: HttpClient,
    private encryptionService: encryptionService
  ) {}

  login(credentials: { username: string; password: string }) {
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

  registerUser(userData: UserLogin) {
    const encryptedPassword = this.encryptionService.encryptPassword(userData);
    userData.password = encryptedPassword;

    return this.http.post<UserEncryptedInfo>(this.apiUrl, userData).pipe(
      tap((response) => {
        if (response.token) {
          localStorage.setItem('auth_token', response.token);
        }
      })
    );
  }
}
