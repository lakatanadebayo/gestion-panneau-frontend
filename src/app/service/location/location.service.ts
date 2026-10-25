import { Injectable } from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Location} from "../../entity/Location";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(location: Location): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/location/save", location)
  }

  update(id: number, location: Location): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/location/update/"+id, location)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/location/all")
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/location/"+id)
  }
}
