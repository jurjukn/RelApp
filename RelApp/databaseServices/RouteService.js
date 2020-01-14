import { firestore as db } from '../firebaseServices/Firebase';
import { getCurrentUser } from '../firebaseServices/Authorization';
import { Collections } from './Collections';

export async function getAllRoutes() {
  try {
    const routes = [];
    const routesSnapshot = await db.collection(Collections.routes).get();
    const currentUser = await getCurrentUser();

    routesSnapshot.forEach(doc => {
      const route = formatRoute(doc.data(), currentUser.uid);
      routes.push(route);
    });

    return routes;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

export async function getRouteById(routeId) {
  try {
    const doc = await db.collection(Collections.routes).doc(routeId).get();
    const currentUser = await getCurrentUser();
    const route = formatRoute(doc.data(), currentUser.uid)

    return route;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function formatRoute(data, userId) {
  const isFavorite = data.userFavorite.includes(userId);
  const route = {
    id: doc.id,
    name: data.name,
    description: data.description,
    ownerId: data.ownerId,
    isFavorite: isFavorite
  };

  return route;
}

export async function insertRoute(route) {
  try {
    await db.collection(Collections.routes).doc().set(route);
  } catch (err) {
    console.log(err);
    throw err;
  } 
}

export async function addRouteAsFavorite(userId, routeId) {
  await updateFavorites(userId, routeId, true);
}

export async function removeRouteFromFavorites(userId, routeId) {
  await updateFavorites(userId, routeId, false);
}

async function updateFavorites(userId, routeId, add) {
  try {
    const doc = await db.collection(Collections.routes).doc(routeId).get();
    const data = doc.data();
    let favorites = data.userFavorite;
    const isFound = favorites.includes(userId);

    if (!add && isFound) {
      const idx = favorites.indexOf(userId);
      favorites.splice(idx, 1);
      await db.collection(Collections.routes).doc(routeId).update();
    } else if (add && !isFound) {
      favorites.push(userId);
      await db.collection(Collections.route).doc(routeId).update(favorites);
    }
  } catch (err) {
    console.log(err);
    throw err;
  }
}