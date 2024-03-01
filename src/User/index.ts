import { jwtDecode } from 'jwt-decode'
import { Tokens, UserData } from '../types'
import UserDatabase from '../database/user-database'
import crypto from 'crypto'

class User {
  public buildUserData(tokens: Tokens): UserData {
    return {
      ...jwtDecode(tokens.id_token),
      access_token: tokens.access_token,
      access_token_expiry_date: tokens.expiry_date,
      session_id: crypto.randomBytes(24).toString('hex'),
    }
  }

  public async addToDatabase(data: UserData) {
    await UserDatabase.addUser(data)
  }

  public async removeFromDatabase(sessionId: string) {
    await UserDatabase.deleteUser(sessionId)
  }
}

export default User
