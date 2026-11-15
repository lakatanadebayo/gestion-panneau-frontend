import {Component} from '@angular/core';
import {Role} from "../../entity/Role";
import {User} from "../../entity/User";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Subject, takeUntil} from "rxjs";
import {UserService} from "../../service/user/user.service";
import {ToastrService} from "ngx-toastr";
import {HasRoleService} from "../../service/has-role/has-role.service";
import {HighestRoleService} from "../../service/highest-role/highest-role.service";
import {DataService} from "../../service/data/data.service";
import {Panneau} from "../../entity/Panneau";
import {Client} from "../../entity/Client";
import {PanneauService} from "../../service/panneau/panneau.service";
import {ClientService} from "../../service/client/client.service";
import {LocationDto} from "../../entity/LocationDto";
import {LocationService} from "../../service/location/location.service";
import {NavigationService} from "../../service/navigation/navigation.service";
import {LocationPanneauDto} from "../../entity/LocationPanneauDto";

@Component({
  selector: 'app-location',
  templateUrl: './location.component.html',
  styleUrl: './location.component.scss'
})
export class LocationComponent {

  localIsUpdateProcess: boolean
  localAuthStatus: boolean = false
  localUserRoles: Role[] = []
  localUserRolesString: string[] = []
  userRole: string | null = null
  user: User
  users: User[]
  panneaux: Panneau[]
  clients: Client[]
  locationPanneauDtos: LocationPanneauDto[]
  submitted = false
  locationForm: FormGroup

  private destroy$ = new Subject<void>()

  constructor(private formBuilder: FormBuilder, private userService: UserService, private toastrService: ToastrService,
              public hasRoleService: HasRoleService, private highestRoleService: HighestRoleService, private dataService: DataService,
              private clientService: ClientService, private panneauService: PanneauService,
              private locationService: LocationService, private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.getIsUpdateProcessFromDataService()
    this.getClients()
    this.getPanneaux()
    this.initLocationForm()
    this.getUserRolesFromDataService()
  }

  getClients(){
    this.clientService.getAll().subscribe({
      next:clientFromApi => {
        this.clients = clientFromApi
      },
      error:error => console.log(error)
    })
  }

  getPanneaux(){
    this.panneauService.getAll().subscribe({
      next:panneauFromApi => {
        this.panneaux = panneauFromApi
      },
      error:error => console.log(error)
    })
  }

  initLocationForm(): void {
    this.locationForm = this.formBuilder.group({
      dateLocation: ['', Validators.required],
      idClient: ['', Validators.required],
      montantLocation: ['', Validators.required],
      locationPanneaux: this.formBuilder.array([])
    });
    // Ajouter automatiquement un premier panneau
    this.addLocationPanneau();
  }

  save(): void {

    const locationFormValues = this.locationForm.value;

    const locationPanneauDtos: LocationPanneauDto[] = locationFormValues.locationPanneaux.map((item: any) => new LocationPanneauDto(null, null, item.idPanneau, item.dateDebut, item.dateFin, item.montantLigne));

    const locationObject = new LocationDto(null, locationFormValues.dateLocation, locationFormValues.idClient, locationFormValues.montantLocation, locationPanneauDtos);

    this.locationService.save(locationObject).subscribe({
      next: () => {
        this.toastrService.success('Location enregistrée avec succès !');
        this.initLocationForm();
        this.getClients();
        this.getPanneaux();
      },
      error: error => {
        this.toastrService.error("Une erreur est survenue au cours de l'enregistrement de la location");
        console.log(error);
      }
    });
  }

  submitLocationForm(): void {
    this.submitted = true;

    if (this.locationForm.invalid) {
      this.locationForm.markAllAsTouched();
      return;
    }

    this.save();
  }

  home() {
    this.dataService.setIsUpdateProcess(false)
    this.navigationService.home()
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

  /**
   * Vérifie si un champ est invalide et a été modifié.
   */
  isInvalid(controlName: string): boolean {
    const control = this.locationForm.get(controlName);

    return !!control &&
      control.invalid &&
      (control.touched || control.dirty);
  }

  /**
   * Vérifie si un champ possède une erreur donnée.
   */
  hasError(controlName: string, errorName: string): boolean {
    return this.isInvalid(controlName) &&
      !!this.locationForm.get(controlName)?.hasError(errorName);
  }

  get locationPanneaux(): FormArray {
    return this.locationForm.get('locationPanneaux') as FormArray;
  }

  addLocationPanneau(): void {
    const locationPanneauForm = this.formBuilder.group({
      idPanneau: ['', Validators.required],
      dateDebut: ['', Validators.required],
      dateFin: ['', Validators.required],
      montantLigne: ['', Validators.required]
    });

    this.locationPanneaux.push(locationPanneauForm);
  }

  removeLocationPanneau(index: number): void {
    if (this.locationPanneaux.length > 1) {
      this.locationPanneaux.removeAt(index);
    } else {
      this.toastrService.warning(
        'Une location doit contenir au moins un panneau.'
      );
    }
  }

  isLocationPanneauInvalid(index: number, controlName: string): boolean {
    const control = this.locationPanneaux.at(index).get(controlName);

    return !!control &&
      control.invalid &&
      (control.touched || control.dirty);
  }

  hasLocationPanneauError(
    index: number,
    controlName: string,
    errorName: string
  ): boolean {
    return this.isLocationPanneauInvalid(index, controlName) &&
      !!this.locationPanneaux.at(index).get(controlName)?.hasError(errorName);
  }

}
