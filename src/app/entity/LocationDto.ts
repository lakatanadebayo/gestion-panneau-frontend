import {LocationPanneauDto} from "./LocationPanneauDto";

export class LocationDto {
  constructor(
    public id: any,
    public dateLocation: string,
    public idClient: any,
    public montantLocation: number,
    public locationPanneauDtos: LocationPanneauDto[]
  ) {
  }
}
