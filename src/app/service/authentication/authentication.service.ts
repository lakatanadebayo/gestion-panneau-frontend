import {Injectable} from '@angular/core';
import {DataService} from "../data/data.service";
import {NavigationService} from "../navigation/navigation.service";

@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {

  constructor(private dataService: DataService, private navigationService: NavigationService) { }

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

    /*this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.router.navigate(['app/home'])
    })*/
  }
}
