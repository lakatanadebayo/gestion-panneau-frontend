import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserService} from "../../service/user/user.service";
import {DataService} from "../../service/data/data.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../entity/LoginRequest";
import {User} from "../../entity/User";
import {AuthService} from "../../service/auth/auth.service";

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
  isAuthenticated: boolean = true

  constructor(private formBuilder: FormBuilder, private userService: UserService,
              private authService: AuthService, private dataService: DataService, private router: Router) { }

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

  login(): void {

    if (this.authenticationForm.invalid) {
      this.authenticationForm.markAllAsTouched();
      return;
    }

    const { username, password } =
      this.authenticationForm.getRawValue();

    console.log('Identifiants :', { username, password: '***' });

    const loginRequest = new LoginRequest(
      username.trim(),
      password
    );

    this.authService.login(loginRequest).subscribe({

      next: (response) => {

        localStorage.setItem('token', response.token);

        this.userService.login(loginRequest).subscribe({

          next: (userFromApi) => {

            if (!userFromApi || !userFromApi.id) {
              this.handleAuthFailure(
                'Utilisateur introuvable.'
              );
              return;
            }

            this.user = userFromApi;
            this.dataService.setUser(userFromApi);
            this.dataService.setAuthStatus(true);

            this.home();
          },

          error: (error) => {
            console.error('Erreur récupération utilisateur :', error);
            this.handleAuthFailure(
              'Impossible de récupérer les informations utilisateur.'
            );
          }

        });

      },

      error: (error) => {

        console.error('Erreur authentification :', error);

        this.authenticationErrorMessage =
          error.error?.message || 'Échec de connexion.';

        this.dataService.setAuthStatus(false);
      }

    });
  }

  home() {
    this.router.navigate(['app/home'])
  }

  private handleAuthFailure(message: string) {
    this.authenticationErrorMessage = message
    this.dataService.setAuthStatus(false)
    this.dataService.setUser(null)
    this.router.navigate(['app/authentication'])
  }

}
