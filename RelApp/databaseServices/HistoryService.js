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

export async function getHistoryByUserId(userId) {
  try {
    const historyList = [];
    const historySnapshot = await db.collection(Collections.history).where('userId', '==', userId).get();

    historySnapshot.forEach(doc => {
      const data = doc.data();
      const date = new Date(data.date * 1000);

      const history = {
        id: doc.id,
        date: date,
        ...data
      };
      
      historyList.push(history);
    })
    
    return historyList;
  } catch (err) {
    console.error(err);
  }
}

export async function insertHistoryRecord(history) {
  try {
    await db.collection(Collections.history).doc().set(history);
  } catch (err) {
    console.err(err);
  }
}

export function calculateHistoryStatistics(historyList) {
  let routeCount = 0;
  let totalDistance = 0;
  let totalTime = 0;

  historyList.forEach(history => {
    routeCount++;
    totalDistance += history.distance;
    totalTime += history.duration;
  })

  const totalHours = totalTime / 60;

  return { totalDistance, routeCount, totalHours }
}