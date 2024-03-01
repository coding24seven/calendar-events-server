export interface UserData {
  iss: string
  azp: string
  aud: string
  sub: string
  email: string
  email_verified: boolean
  at_hash: string
  iat: number
  exp: number
  access_token: string
  access_token_expiry_date: number
  session_id: string
}

export interface Tokens {
  id_token: string
  access_token: string
  expiry_date: number
}
