import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from './Collections';

export async function getRouteComments(routeId) {
  try {
    const comments = [];
    const commentsSnapshot = db.collection(Collections.comments).where('routeId', '==', routeId);

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
  } catch (err) {
    console.log(err);
    throw err;
  }
}