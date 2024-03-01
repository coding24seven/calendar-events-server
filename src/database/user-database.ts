import db from './index'
import { UserData } from '../types'

class UserDatabase {
  public static async getUser(sessionId: string) {
    const docRef = db.collection('users').where('sessionId', '==', sessionId)
    const user = await docRef.get()

    return user.docs[0].data()
  }

  public static async addUser(document: UserData) {
    const uniqueUserId = document.sub
    const sessionId = document.session_id
    const accessToken = document.access_token
    const docRef = db.collection('users').doc(uniqueUserId)

    await docRef.set({
      id: uniqueUserId,
      sessionId,
      accessToken,
      email: document.email,
    })
  }

  public static async deleteUser(sessionId: string) {
    const docRef = db.collection('users').where('sessionId', '==', sessionId)
    const user = await docRef.get()

    user.docs[0].ref.delete()
  }
}

export default UserDatabase
