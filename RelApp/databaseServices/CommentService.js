import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from './Collections';
import uuid from 'react-native-uuid';

export async function getRouteComments(routeId) {
  try {
    const comments = [];
    const commentsSnapshot = await db.collection(Collections.comments).where('routeId', '==', routeId).get();

    commentsSnapshot.forEach(doc => {
      const data = doc.data();
      const comment = {
        id: doc.id,
        comment: data.comment,
        routeId: data.routeId,
        username: data.username
      };

      comments.push(comment);
    }) 

    return comments;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function insertRouteComment(comment, username, routeId) {
  try {
    const id = uuid.v4();
    const commentObject = {
      comment,
      username,
      routeId
    };

    await db.collection(Collections.comments).doc(id).set(commentObject);

    return id;
  } catch (err) {
    console.error(err);
  }
}