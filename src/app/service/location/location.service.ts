import {Injectable} from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {LocationDto} from "../../entity/LocationDto";

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(location: LocationDto): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/location/save", location)
  }

  update(id: any, location: LocationDto): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/location/update/"+id, location)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/location/all")
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/location/"+id)
  }
}
