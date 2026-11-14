import { Injectable } from '@angular/core';
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class DisableService {

  /**
   * Désactive un objet générique (isDeleted = true) et l'envoie au service.
   * @param id Identifiant de l'objet
   * @param object Objet à désactiver
   * @param updateFn Fonction de mise à jour (ex: monService.update)
   * @returns Observable de l'objet mis à jour
   */
  disableObject<T extends { isDeleted: boolean }>(
    id: number,
    object: T,
    updateFn: (id: number, obj: T) => Observable<T>
  ): Observable<T> {
    object.isDeleted = true;
    return updateFn(id, object);
  }
}
