import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {NavigationService} from "../../service/navigation/navigation.service";
import {NotificationService} from "../../service/notification/notification.service";

@Component({
  selector: 'app-notification',
  templateUrl: './notification.component.html',
  styleUrl: './notification.component.css'
})
export class NotificationComponent {

  notificationStatusMessage: string;
  notificationMessage: string

  constructor(private activatedRoute: ActivatedRoute, private notificationService: NotificationService,
              private navigationService: NavigationService) { }

  ngOnInit(): void {
    this.notificationStatusMessage = this.notificationService.notificationStatusMessage;
    this.notificationMessage = this.notificationService.notificationMessage;
  }

  notificationMessageProperty = this.notificationService.notificationStatusMessage === 'success' ? 'marge-bas text-success text-center' : 'marge-bas text-danger text-center';
  notificationButtonProperty = this.notificationService.notificationStatusMessage==='success' ? 'btn btn-outline-success mt-3 ms-3' : 'btn btn-outline-danger mt-3 ms-3';
  home() {
    this.navigationService.home()
  }

}
