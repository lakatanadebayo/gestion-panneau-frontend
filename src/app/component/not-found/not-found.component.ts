import { Component } from '@angular/core';
import {NavigationService} from "../../service/navigation/navigation.service";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.css'
})
export class NotFoundComponent {

  constructor(private navigationService: NavigationService) {
  }

  accueil(){
    this.navigationService.home()
  }

}
