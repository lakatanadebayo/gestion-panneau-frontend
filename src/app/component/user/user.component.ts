import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {uniqueUsernameValidator} from "../../validator/unique-username-validator";
import {frenchPhoneValidator} from "../../validator/french-phone-validator";
import {isoDateFormatValidator} from "../../validator/date-format-validator";
import {User} from "../../entity/User";
import {Role} from "../../entity/Role";
import {Subject, takeUntil} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {DataService} from "../../service/data/data.service";
import {ToastrService} from "ngx-toastr";
import {UserService} from "../../service/user/user.service";
import {HasRoleService} from "../../service/has-role/has-role.service";
import {HighestRoleService} from "../../service/highest-role/highest-role.service";
import {DisableService} from "../../service/disable/disable.service";
import {passwordMatchingValidator} from "../../validator/password-matcher.validator";
import {Pays} from "../../entity/Pays";
import {PaysService} from "../../service/pays/pays.service";
import {UserDto} from "../../entity/UserDto";

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.scss'
})
export class UserComponent {

  localIsUpdateProcess: boolean
  localAuthStatus: boolean = false
  localUserRoles: Role[] = []
  localUserRolesString: string[] = []
  userRole: string | null = null
  user: User
  users: User[]
  pays: Pays[]
  submitted = false
  userForm: FormGroup
  idUser: number = 0

  currentFonction: {} = {}
  currentIndex = -1

  page = 1
  count = 0
  pageSize = 6
  pageSizes = [3, 6, 9]

  searchTerm: string = ''

  sortColumn = ''
  sortDirection = 'asc'

  private destroy$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: ToastrService,
              public hasRoleService: HasRoleService, private highestRoleService: HighestRoleService, private dataService: DataService,
              private paysService: PaysService, private router: Router, private activatedRoute: ActivatedRoute,
              private disableService: DisableService) { }

  ngOnInit(): void {
    this.getIsUpdateProcessFromDataService()
    this.getAllUser()
    this.initUserForm()
    this.getUserRolesFromDataService()
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

    if (this.localIsUpdateProcess) {
      this.idUser = this.activatedRoute.snapshot.params['idUser']
      this.loadUser(this.idUser)
    }
  }

  saveUser(){
    const userFormValues = this.userForm.value
    const isUpdate = this.localIsUpdateProcess
    const userObject = new UserDto(isUpdate ? this.idUser : null, userFormValues['titre'], userFormValues['nomUser'],
      userFormValues['prenomUser'], userFormValues['dateNaissance'], userFormValues['adresse'], userFormValues['idPays'],
      userFormValues['ville'], userFormValues['codePostal'], userFormValues['email'], userFormValues['telephone'],
      userFormValues['username'], userFormValues['password'], userFormValues['photo'], 'Inactive', [], false)

    const userServiceCall = isUpdate ? this.userService.update(this.idUser, userObject) : this.userService.save(userObject)

    userServiceCall.subscribe({
      next: () => {
        this.toastrService.success(`Utilisateur ${isUpdate ? 'modifié' : 'enregistré'} avec succès !`)
        if (isUpdate) {
          this.dataService.setIsUpdateProcess(false)
          this.router.navigate(['app/user'])
        } else {
          this.initUserForm()
          this.getAllUser()
        }
      },
      error: (error) => {
        this.toastrService.error("Une erreur est survenue au cours de l'enregistrement de l'utilisateur")
        console.log(error)
      }
    })
  }

  updateUser(idUser: number) {
    const selectedUser = this.users.find(u => u.id === idUser)
    if (selectedUser) {
      this.userForm.patchValue({ titre: selectedUser.titre, nomUser: selectedUser.nom,
        prenomUser: selectedUser.prenom, dateNaissance: selectedUser.dateNaissance,
        adresse: selectedUser.adresse, pays: selectedUser.pays.id, ville: selectedUser.ville, codePostal: selectedUser.codePostal,
        email: selectedUser.email, telephone: selectedUser.telephone, username: selectedUser.username,
        password: selectedUser.password, confirmPassword: selectedUser.password, photo: selectedUser.photo});
    }

    this.dataService.setIsUpdateProcess(true);
    this.router.navigate([`app/user/${idUser}`])
  }

  loadUser(idUser: number) {
    this.userService.getById(idUser).subscribe({
      next: (userFromApi) => this.userForm.patchValue(userFromApi),
      error: (error) => console.error('Erreur lors de la récupération de l\'utilisateur :', error)
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

  getAllUser(){
    this.userService.getAll().subscribe({
      next:usersFromApi => {
        this.users = usersFromApi
      },
      error:error => console.log(error)
    })
  }

  changerStatutUtilisateur(idUser: number, statut: 'Active' | 'Inactive') {
    this.userService.getById(idUser).subscribe({
      next: userFromApi => {
        const userObject = new UserDto(
          idUser,
          userFromApi.titre,
          userFromApi.nom,
          userFromApi.prenom,
          userFromApi.dateNaissance,
          userFromApi.adresse,
          userFromApi.pays.id,
          userFromApi.ville,
          userFromApi.codePostal,
          userFromApi.email,
          userFromApi.telephone,
          userFromApi.username,
          userFromApi.password,
          userFromApi.photo,
          statut,
          userFromApi.roles,
          userFromApi.isDeleted
        );

        this.userService.update(idUser, userObject).subscribe({
          next: () => {
            const action = statut === 'Active' ? 'activé' : 'désactivé';
            this.toastrService.success(`Utilisateur ${action} avec succès !`);
            this.getAllUser();
          },
          error: error => {
            console.error(error);
            const action = statut === 'Active' ? 'l\'activation' : 'la désactivation';
            this.toastrService.error(`Une erreur est survenue au cours de ${action} de l'utilisateur`);
            this.getAllUser();
          }
        });
      },
      error: error => console.error('Erreur lors de la récupération de l\'utilisateur :', error)
    });
  }

  desactiverUser(idUser: any, user: any) {
    this.disableService.disableObject(idUser, user, this.userService.update.bind(this.userService))
      .subscribe({
        next: (updated) => {
          this.toastrService.success("Utilisateur désactivé avec succès !");
          this.getAllUser();
        },
        error: (err) => {
          this.toastrService.error("Erreur lors de la désactivation");
          console.error(err);
        }
      });
  }

  home() {
    this.dataService.setIsUpdateProcess(false)
    this.router.navigate(['app/home'])
  }

  getIsUpdateProcessFromDataService(): void {
    this.dataService.isUpdateProcess$.subscribe(isUpdateProcess => {
      this.localIsUpdateProcess = isUpdateProcess
    })
  }

  getUserRolesFromDataService(): void {
    this.dataService.userRoles$.pipe(takeUntil(this.destroy$)).subscribe(userRoles => {
      this.localUserRoles = userRoles
      this.localUserRolesString = userRoles.map(role => role.libelle)
      this.userRole = this.highestRoleService.getHighestRole(this.localUserRolesString)
    })
  }

  getRequestParams(page: number, pageSize: number): any {
    let params: any = {};

    if (page) {
      params['page'] = page - 1;
    }

    if (pageSize) {
      params['size'] = pageSize;
    }

    return params;
  }

  handlePageChange(event: number): void {
    this.page = event;
    this.getAllUser();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getAllUser();
  }

  refreshList(): void {
    this.getAllUser();
    this.currentFonction = {};
    this.currentIndex = -1;
  }

  sortBy(column: string) {
    if (this.sortColumn === column) {
      this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    } else {
      this.sortColumn = column;
      this.sortDirection = 'asc';
    }

    this.users.sort((a, b) => {
      const valA = a[column]?.toString().toLowerCase() || '';
      const valB = b[column]?.toString().toLowerCase() || '';

      if (this.sortDirection === 'asc') {
        return valA.localeCompare(valB);
      } else {
        return valB.localeCompare(valA);
      }
    });
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

}
