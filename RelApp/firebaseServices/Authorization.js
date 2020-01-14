import firebase from './Firebase';
import { addUser } from '../databaseServices/UserService';

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
    const user = firebase.auth().currentUser;
    return user;
  } catch (err) {
    console.log(err);
    throw err;
  }
}