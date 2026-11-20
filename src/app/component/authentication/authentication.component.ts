import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {DataService} from "../../service/data/data.service";
import {LoginRequest} from "../../entity/LoginRequest";
import {User} from "../../entity/User";
import {NavigationService} from "../../service/navigation/navigation.service";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {ClientService} from "../../service/client/client.service";
import {ProprietaireService} from "../../service/proprietaire/proprietaire.service";
import {Client} from "../../entity/Client";
import {Proprietaire} from "../../entity/Proprietaire";
import {catchError, forkJoin, of, switchMap, tap, throwError} from "rxjs";
import {UserId} from "../../entity/UserId";

@Component({
  selector: 'app-authentication',
  templateUrl: './authentication.component.html',
  styleUrl: './authentication.component.scss'
})
export class AuthenticationComponent implements OnInit {

  authenticationErrorMessage: string
  authenticationForm: FormGroup
  submitted= false
  user: User
  client: Client
  proprietaire: Proprietaire
  isAuthenticated: boolean = true

  constructor(private formBuilder: FormBuilder, private userService: UserService, private clientService: ClientService,
              private proprietaireService: ProprietaireService, private authenticationService: AuthenticationService,
              private navigationService: NavigationService, private dataService: DataService) { }

  ngOnInit(): void {
    this.authenticationForm = this.formBuilder.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });

    this.dataService.authStatus$.subscribe(authStatus => {
      this.isAuthenticated = authStatus;
    });
  }

  submitAuthenticationForm(){
    this.submitted = true
    this.login()
  }

  /*login(): void {

    if (this.authenticationForm.invalid) {
      this.authenticationForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.authenticationForm.getRawValue();

    const loginRequest = new LoginRequest(username.trim(), password);

    this.authenticationService.login(loginRequest).pipe(

      // Récupération du token
      tap(response => {
        localStorage.setItem('token', response.token);
      }),

      // Récupération des informations utilisateur
      switchMap(() => this.userService.login(loginRequest)),

      // Vérification de l'utilisateur
      switchMap(user => {

        if (!user?.id) {
          return throwError(() => new Error('Utilisateur introuvable.'));
        }

        this.user = user;
        this.dataService.setUser(user);

        const userId = new UserId(user.id);

        // Récupération simultanée du client et du propriétaire
        return forkJoin({
          client: this.clientService.getByUserId(userId),
          proprietaire: this.proprietaireService.getByUserId(userId)
        });
      })

    ).subscribe({

      next: ({ client, proprietaire }) => {

        this.client = client;
        this.proprietaire = proprietaire;

        this.dataService.setClient(client);
        this.dataService.setProprietaire(proprietaire);

        this.dataService.setAuthStatus(true);

        this.home();
      },

      error: error => {

        console.error('Erreur authentification :', error);

        this.handleAuthFailure(
          error.error?.message ||
          error.message ||
          'Échec de connexion.'
        );
      }

    });
  }*/

  login(): void {

    if (this.authenticationForm.invalid) {
      this.authenticationForm.markAllAsTouched();
      return;
    }

    const { username, password } = this.authenticationForm.getRawValue();

    const loginRequest = new LoginRequest(username.trim(), password);

    this.authenticationService.login(loginRequest).pipe(

      // Récupération du token
      tap(response => {
        localStorage.setItem('token', response.token);
      }),

      // Récupération des informations utilisateur
      switchMap(() => this.userService.login(loginRequest)),

      // Vérification de l'utilisateur
      switchMap(user => {

        if (!user?.id) {
          return throwError(() => new Error('Utilisateur introuvable.'));
        }

        this.user = user;
        this.dataService.setUser(user);

        const userId = new UserId(user.id);

        // Récupération facultative du client et du propriétaire
        return forkJoin({

          client: this.clientService.getByUserId(userId).pipe(
            catchError(() => of(null))
          ),

          proprietaire: this.proprietaireService.getByUserId(userId).pipe(
            catchError(() => of(null))
          )
        });
      })

    ).subscribe({

      next: ({ client, proprietaire }) => {

        this.client = client;
        this.proprietaire = proprietaire;

        this.dataService.setClient(client);
        this.dataService.setProprietaire(proprietaire);

        // Authentification réussie
        this.dataService.setAuthStatus(true);

        this.home();
      },

      error: error => {

        console.error('Erreur authentification :', error);

        this.handleAuthFailure(
          error.error?.message ||
          error.message ||
          'Échec de connexion.'
        );
      }

    });
  }

  home() {
    this.navigationService.home()
  }

  private handleAuthFailure(message: string): void {
    localStorage.removeItem('token');
    this.authenticationErrorMessage = message;
    this.dataService.setUser(null);
    this.dataService.setClient(null);
    this.dataService.setProprietaire(null);
    this.dataService.setAuthStatus(false);
    this.navigationService.authentication();
  }

}
