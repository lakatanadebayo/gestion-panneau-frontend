import {Injectable} from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PanneauDto} from "../../entity/PanneauDto";

@Injectable({
  providedIn: 'root'
})
export class PanneauService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(panneauDto: PanneauDto): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/panneau/save", panneauDto)
  }

  update(id: any, panneauDto: PanneauDto): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/panneau/update/"+id, panneauDto)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/panneau/all")
  }

  getById(id: any): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/panneau/"+id)
  }

}
