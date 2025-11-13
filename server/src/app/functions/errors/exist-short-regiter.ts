export class ShortUrlAlreadyExists extends Error {
  constructor() {
    super('Existe um link encurtado registrado.')
  }
}