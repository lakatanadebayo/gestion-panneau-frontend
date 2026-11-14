import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {UserDto} from "../../entity/UserDto";
import {UserService} from "../../service/user/user.service";
import {ToastrService} from "ngx-toastr";
import {HighestRoleService} from "../../service/highest-role/highest-role.service";
import {DataService} from "../../service/data/data.service";
import {PaysService} from "../../service/pays/pays.service";
import {Router} from "@angular/router";
import {isoDateFormatValidator} from "../../validator/date-format-validator";
import {frenchPhoneValidator} from "../../validator/french-phone-validator";
import {uniqueUsernameValidator} from "../../validator/unique-username-validator";
import {passwordMatchingValidator} from "../../validator/password-matcher.validator";
import {User} from "../../entity/User";
import {Pays} from "../../entity/Pays";

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.component.html',
  styleUrl: './inscription.component.scss'
})
export class InscriptionComponent {

  user: User
  pays: Pays[]
  submitted = false
  userForm: FormGroup

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: ToastrService,
              private highestRoleService: HighestRoleService, private dataService: DataService,
              private paysService: PaysService, private router: Router,
              ) { }

  ngOnInit(): void {
    this.initUserForm()
  }

  getAllPays(){
    this.paysService.getAll().subscribe({
      next:paysFromApi => {
        this.pays = paysFromApi
      },
      error:error => console.log(error)
    })
  }

  initUserForm(){
    this.getAllPays()

    this.userForm = this.formBuilder.group({
      titre: ['', [Validators.required]],
      nomUser: ['', [Validators.required]],
      prenomUser: ['', [Validators.required]],
      dateNaissance: ['', [Validators.required, isoDateFormatValidator]],
      adresse: ['', [Validators.required]],
      idPays: ['', [Validators.required]],
      ville: ['', [Validators.required]],
      codePostal: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.pattern(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/)]],
      telephone: ['', [Validators.required, frenchPhoneValidator()]],
      username: ['', [Validators.required], [uniqueUsernameValidator(this.userService)]],
      password: ['', [Validators.required]],
      confirmPassword: ['', [Validators.required]],
      photo: ['']
    })

    this.userForm.setValidators(passwordMatchingValidator)
  }

  saveUser(){
    const userFormValues = this.userForm.value
    const userObject = new UserDto(null, userFormValues['titre'], userFormValues['nomUser'],
      userFormValues['prenomUser'], userFormValues['dateNaissance'], userFormValues['adresse'], userFormValues['idPays'],
      userFormValues['ville'], userFormValues['codePostal'], userFormValues['email'], userFormValues['telephone'],
      userFormValues['username'], userFormValues['password'], userFormValues['photo'], 'Inactive', [], false)

    this.userService.save(userObject).subscribe({
      next:userFromApi => {
        this.toastrService.success('Utiliateur enregistré avec succès !')
        this.initUserForm()
      },
      error:error => {
        this.toastrService.error('Une erreur est survenue au cours de l\'enregistrement de l\'utilisateur')
        console.log(error)
      }
    })
  }

  submitUserForm(){
    this.submitted = true
    this.saveUser()
  }

  get passwordMismatch() {
    return this.userForm.hasError('passwordMismatch') &&
      (this.userForm.get('password')?.dirty || this.userForm.get('password')?.touched) &&
      (this.userForm.get('confirmPassword')?.dirty || this.userForm.get('confirmPassword')?.touched);
  }

  /**
   * Vérifie si un champ est invalide et a été modifié.
   */
  isInvalid(controlName: string): boolean {
    const control = this.userForm.get(controlName);

    return !!control &&
      control.invalid &&
      (control.touched || control.dirty);
  }

  /**
   * Vérifie si un champ possède une erreur donnée.
   */
  hasError(controlName: string, errorName: string): boolean {
    return this.isInvalid(controlName) &&
      !!this.userForm.get(controlName)?.hasError(errorName);
  }

  home() {
    this.router.navigate(['app/home'])
  }

}
