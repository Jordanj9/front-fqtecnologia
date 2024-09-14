import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, map, Observable, of, tap } from 'rxjs';
import { environment } from "../environments/environment";
import { AuthLoginApi } from "./modules/auth/pages/login/models/user.model";
import { CookieService} from "ngx-cookie-service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private csrfTokenSet = false;
  constructor(private readonly http: HttpClient, private readonly cookieService: CookieService) { }

  getCsrfToken(): Observable<any> {
    return this.http.get(`http://127.0.0.1:8000/sanctum/csrf-cookie`,{withCredentials:true});
  }

  getToken(): string | null {
    const token = localStorage.getItem('access_token');
    if (token) {
      return token;
    }
    return null;
  }


  setToken(token: string): void {
    this.cookieService.set('access_token', token);
  }

  isAuthenticated(): boolean {
    const token = localStorage.getItem('access_token');
    return !!token;

  }

  register(data: any): Observable<AuthLoginApi> {
    return this.http.post<AuthLoginApi>(`${environment.host}/register`, data,{withCredentials:true}).pipe(
        tap(response => {
          localStorage.setItem('access_token', response.data.access_token);
        })
    );
  }

  login(data: any): Observable<AuthLoginApi> {
    return this.http.post<AuthLoginApi>(`${environment.host}/login`, data, {withCredentials: true}).pipe(
        tap(response => {
          localStorage.setItem('access_token', response.data.access_token);
        })
    );
  }

  logout(): Observable<any> | any {
    return this.http.get(`${environment.host}/logout`, { withCredentials: true }
    ).subscribe(response => {
      localStorage.removeItem('access_token');
    });
  }
}
