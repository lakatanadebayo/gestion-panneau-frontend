import {Component} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Role} from "../../entity/Role";
import {Panneau} from "../../entity/Panneau";
import {Proprietaire} from "../../entity/Proprietaire";
import {Subject, takeUntil} from "rxjs";
import {PanneauService} from "../../service/panneau/panneau.service";
import {ProprietaireService} from "../../service/proprietaire/proprietaire.service";
import {HasRoleService} from "../../service/has-role/has-role.service";
import {HighestRoleService} from "../../service/highest-role/highest-role.service";
import {DataService} from "../../service/data/data.service";
import {DisableService} from "../../service/disable/disable.service";
import {NavigationService} from "../../service/navigation/navigation.service";
import {ToastrService} from "ngx-toastr";
import {PanneauDto} from "../../entity/PanneauDto";

@Component({
  selector: 'app-panneau-new',
  templateUrl: './panneau-new.component.html',
  styleUrl: './panneau-new.component.scss'
})
export class PanneauNewComponent {

  localIsUpdateProcess: boolean
  localAuthStatus: boolean = false
  localUserRoles: Role[] = []
  localUserRolesString: string[] = []
  userRole: string | null = null
  panneau: Panneau
  panneaux: Panneau[]
  proprietaires: Proprietaire[]
  submitted = false
  panneauForm: FormGroup
  idPanneau: any

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

  constructor(private formBuilder: FormBuilder, private panneauService: PanneauService, private proprietaireService: ProprietaireService,
              public hasRoleService: HasRoleService, private highestRoleService: HighestRoleService, private dataService: DataService,
              private disableService: DisableService, private navigationService: NavigationService, private toastrService: ToastrService) { }

  ngOnInit(): void {
    this.getPanneaux()
    this.getUserRolesFromDataService()
    this.getIsUpdateProcessFromDataService()
    this.initPanneauForm()
  }

  getPanneaux(){
    this.panneauService.getAll().subscribe({
      next:panneauxFromApi => {
        this.panneaux = panneauxFromApi
      },
      error:error => console.log(error)
    })
  }

  getProprietaires(){
    this.proprietaireService.getAll().subscribe({
      next:proprietairesFromApi => {
        this.proprietaires = proprietairesFromApi
      },
      error:error => console.log(error)
    })
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

  initPanneauForm(){
    this.getProprietaires()
    this.panneauForm = this.formBuilder.group({
      emplacement: ['', [Validators.required]],
      idProprietaire: ['', [Validators.required]]
    })

    if (this.localIsUpdateProcess) {
      this.idPanneau = this.navigationService.getIdPanneauFromRequestParam()
      this.loadPanneau(this.idPanneau)
    }
  }

  loadPanneau(idPanneau: any) {
    this.panneauService.getById(idPanneau).subscribe({
      next: (panneauFromApi) => this.panneauForm.patchValue(panneauFromApi),
      error: (error) => console.error('Erreur lors de la récupération du panneau :', error)
    })
  }

  save(){
    const panneauFormValues = this.panneauForm.value
    const isUpdate = this.localIsUpdateProcess
    const panneauObject = new PanneauDto(isUpdate ? this.idPanneau : null, panneauFormValues['emplacement'],
      panneauFormValues['idProprietaire'])

    const panneauServiceCall = isUpdate ? this.panneauService.update(this.idPanneau, panneauObject) :
      this.panneauService.save(panneauObject)

    panneauServiceCall.subscribe({
      next: () => {
        this.toastrService.success(`Panneau ${isUpdate ? 'modifié' : 'enregistré'} avec succès !`)
        if (isUpdate) {
          this.dataService.setIsUpdateProcess(false)
          this.navigationService.getPanneaux()
        } else {
          this.initPanneauForm()
          this.getProprietaires()
        }
      },
      error: (error) => {
        this.toastrService.error("Une erreur est survenue au cours de l'enregistrement du panneau")
        console.log(error)
      }
    })
  }

  update(idPanneau: any) {
    const selectedPanneau = this.panneaux.find(p => p.id === idPanneau)
    if (selectedPanneau) {
      this.panneauForm.patchValue({ emplacement: selectedPanneau.emplacement, idProprietaire: selectedPanneau.proprietaire.id});
    }
    this.dataService.setIsUpdateProcess(true)
    this.navigationService.getIdPanneauFromRequestParam
  }

  desactiver(id: any, panneau: any) {
    this.disableService.disableObject(id, panneau, this.panneauService.update.bind(this.panneauService))
      .subscribe({
        next: (updated) => {
          this.toastrService.success("Panneau désactivé avec succès !");
          this.getPanneaux();
        },
        error: (err) => {
          this.toastrService.error("Erreur lors de la désactivation");
          console.error(err);
        }
      });
  }

  submitPanneauForm(){
    this.submitted = true
    this.save()
  }

  /**
   * Gestion de la pagination et du filtrage
   */
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
    this.getPanneaux();
  }

  handlePageSizeChange(event: any): void {
    this.pageSize = event.target.value;
    this.page = 1;
    this.getPanneaux();
  }

  refreshList(): void {
    this.getPanneaux();
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

    this.proprietaires.sort((a, b) => {
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
    const control = this.panneauForm.get(controlName);
    return !!control && control.invalid && (control.touched || control.dirty);
  }

  /**
   * Vérifie si un champ possède une erreur donnée.
   */
  hasError(controlName: string, errorName: string): boolean {
    return this.isInvalid(controlName) && !!this.panneauForm.get(controlName)?.hasError(errorName);
  }

  home() {
    this.dataService.setIsUpdateProcess(false)
    this.navigationService.home()
  }

}
