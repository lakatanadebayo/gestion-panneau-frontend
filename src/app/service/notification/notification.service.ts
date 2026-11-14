import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  notificationStatusMessage: string;
  notificationMessage: string

  constructor() { }
}
