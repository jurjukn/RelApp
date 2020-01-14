import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from './Collections';

export async function getAverageRouteRating(routeId) {
  try {
    const historySnapshot = await db.collection(Collections.history).where('routeId', '==', routeId).get();
    let sum = 0;
    let elements = 0;

    historySnapshot.forEach(doc => {
      const data = doc.data();
      sum += data.rating;
      elements++;
    })

    const average = sum / elements;
    return average;
  } catch (err) {
    console.log(err);
    throw err;
  }
}