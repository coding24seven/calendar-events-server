import { jwtDecode } from 'jwt-decode'
import { UserData } from '../types'
import UserDatabase from '../database/user'
import crypto from 'crypto'

class User {
  public buildUserData(idToken: string, expiryDate: number): UserData {
    return {
      ...jwtDecode(idToken),
      access_token_expiry_date: expiryDate,
      session_id: crypto.randomBytes(24).toString('hex'),
    }
  }

  public async isInDatabase(data: UserData) {
    return await UserDatabase.userIsInDatabase(data)
  }

  public async addToDatabase(data: UserData) {
    await UserDatabase.addUser(data)
  }

  public async removeFromDatabase(data: UserData) {
    await UserDatabase.deleteUser(data)
  }
}

export default User
