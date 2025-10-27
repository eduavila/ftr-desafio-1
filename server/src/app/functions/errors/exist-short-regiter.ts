export class ShortUrlAlreadyExists extends Error {
  constructor() {
    super('There is a registered short URL.')
  }
}