import {Injectable} from '@angular/core';
import {DataService} from "../data/data.service";
import {NavigationService} from "../navigation/navigation.service";
import {LoginRequest} from "../../entity/LoginRequest";
import {Observable, tap} from "rxjs";
import {LoginResponse} from "../../entity/LoginResponse";
import {HttpClient} from "@angular/common/http";
import {Global} from "../../../global";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  baseUrl = Global.authBaseUrl;

  constructor(private http: HttpClient, private dataService: DataService, private navigationService: NavigationService) { }

  login(request: LoginRequest): Observable<LoginResponse> {
    return this.http.post<LoginResponse>(`${this.baseUrl}/auth/login`, request)
      .pipe(
        tap(response => {
          localStorage.setItem('token', response.token);
          localStorage.setItem('username', response.username);
          localStorage.setItem('authorities', JSON.stringify(response.authorities));
        })
      );
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  logout(): void {

    // 1. Supprimer les informations d'authentification
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    localStorage.removeItem('authorities');

    // 2. Réinitialiser les données utilisateur
    this.dataService.setUser(null);
    this.dataService.setAuthStatus(false);
    this.dataService.setIsUpdateProcess(false);

    // 3. Rediriger vers la page de connexion
    this.navigationService.authentication();
  }
}
