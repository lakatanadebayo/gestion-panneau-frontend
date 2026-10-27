import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../../service/authentication/authentication.service";
import {UserService} from "../../service/user/user.service";
import {DataService} from "../../service/data/data.service";
import {Router} from "@angular/router";
import {LoginRequest} from "../../entity/LoginRequest";
import {User} from "../../entity/User";

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

  constructor(private formBuilder: FormBuilder, private authenticationService: AuthenticationService,
              private userService: UserService, private dataService: DataService, private router: Router) { }

  ngOnInit(): void {
    this.authenticationForm = this.formBuilder.group({
      username: [null],
      password: [null]})

    this.dataService.authStatus$.subscribe(authStatus => {
      this.isAuthenticated = authStatus
    })
  }

  submitAuthenticationForm(){
    this.submitted = true
    this.login()
  }

  login() {
    const { username, password } = this.authenticationForm.value;
    const loginRequest = new LoginRequest(username, password)

    this.userService.login(loginRequest).subscribe({
      next: userFromApi => {
        if (!userFromApi || userFromApi.id === null) {
          this.handleAuthFailure('Nom d\'utilisateur et/ou mot de passe incorrects')
          return
        }

        this.user = userFromApi
        this.dataService.setAuthStatus(true)
        this.dataService.setUser(this.user)
        this.home()
      },
      error: error => console.error(error)
    })
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
