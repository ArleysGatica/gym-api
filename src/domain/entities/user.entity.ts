export class UserEntity {
  constructor(
    public readonly id: string,
    public readonly username: string,
    public readonly password: string,
    public readonly role: string,
  ) {}
}
