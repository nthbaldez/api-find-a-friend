export class OrgAlreadyExistsError extends Error {
  constructor() {
    super('ORG com o mesmo e-mail já existe!')
  }
}
