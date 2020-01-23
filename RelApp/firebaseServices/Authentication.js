import firebase from './Firebase';
import { addUser } from '../databaseServices/UserService';
import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from '../databaseServices/Collections';

export async function handleUserSignUp(email, password, name) {
  try {
    const result = await firebase.auth().createUserWithEmailAndPassword(email, password);
    const user = result.user;
    await addUser(user.uid, email, name);
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function handleUserLogIn(email, password) {
  try {
    result = await firebase.auth().signInWithEmailAndPassword(email, password);
    return result.user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function handlerUserSignOut() {
  try {
    await firebase.auth().signOut();
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function checkUserAuth() {
  try {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // goto main screen
      } else {
        // goto log in screen
      }
    });
  } catch (err){
    console.log(err);
    throw err;
  }
}

export async function changeUserPassword(currentPassword, newPassword) {
  try {
    const user = firebase.auth().currentUser;
    const credentials = firebase.auth.EmailAuthProvider.credential(user.email, currentPassword);
    await user.reauthenticateWithCredential(credentials);
    await user.updatePassword(newPassword);
  } catch(err) {
    console.log(err);
    throw err;
  }
}

export async function getCurrentUser() {
  try {
    const userFromService = firebase.auth().currentUser;
    const userDoc = await db.collection(Collections.users).doc(userFromService.uid).get();
    const data = userDoc.data();

    const user = {
      id: userFromService.uid,
      ...data
    };

    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}