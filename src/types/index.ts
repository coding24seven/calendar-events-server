interface IdTokenUserData {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  iat: number
  exp: number
}

export { IdTokenUserData }
