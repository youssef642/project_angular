// src/app/features/auth/services/auth-api.service.ts
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthApiService {
  private apiUrl = 'http://localhost:3000'; // غير ده لو API شغال في مكان تاني

  constructor(private http: HttpClient) {}

  register(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/register`, user);
  }

  
  login(user: { username: string; password: string }): Observable<any> {
    return this.http.post(`${this.apiUrl}/login`, user);
  }
}
