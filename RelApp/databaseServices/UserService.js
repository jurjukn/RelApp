import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from './Collections';

export async function addUser(uid, email, name) {
  try {
    const user = {
      email: email, 
      name: name};

    await db.collection(Collections.users).doc(uid).set(user);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function updateUserName(uid, newName) {
  try {
    const updatedUser = {
      name: newName
    };

    await db.collection(Collections.users).doc(uid).update(updatedUser);
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function deleteUser(uid) {
  try {
    await db.collection(Collections.users).doc(uid).delete();
  } catch (err) {
    console.log(err);
    throw err;
  }
}