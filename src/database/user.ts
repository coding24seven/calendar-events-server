import db from './index'
import { UserData } from '../types'

class UserDatabase {
  public static async getUser(document: UserData) {
    const uniqueUserId = document.sub
    const docRef = db.collection('users').doc(uniqueUserId)

    return await docRef.get()
  }

  public static async userIsInDatabase(document: UserData) {
    return (await UserDatabase.getUser(document)).exists
  }

  public static async addUser(document: UserData) {
    const uniqueUserId = document.sub
    const sessionId = document.session_id
    const docRef = db.collection('users').doc(uniqueUserId)

    await docRef.set({
      id: uniqueUserId,
      sessionId,
      email: document.email,
    })
  }

  public static async deleteUser(document: UserData) {
    const uniqueUserId = document.sub
    const docRef = db.collection('users').doc(uniqueUserId)

    await docRef.delete()
  }
}

export default UserDatabase
