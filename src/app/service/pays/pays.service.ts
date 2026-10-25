import {Injectable} from '@angular/core';
import {Global} from "../../../global";
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {Pays} from "../../entity/Pays";

@Injectable({
  providedIn: 'root'
})
export class PaysService {

  baseUrl = Global.baseUrl;

  constructor(private httpClient : HttpClient) { }

  save(pays: Pays): Observable<any> {
    return this.httpClient.post(this.baseUrl+"/pays/save", pays)
  }

  update(id: number, pays: Pays): Observable<any> {
    return this.httpClient.put(this.baseUrl+"/pays/update/"+id, pays)
  }

  getAll(): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/pays/all")
  }

  getById(id: number): Observable<any> {
    return this.httpClient.get(this.baseUrl+"/pays/"+id)
  }
}
