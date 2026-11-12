export class LoginResponse {
  constructor(
    public token: string,
    public username: string,
    public authorities: string[]
  ) {
  }
}
