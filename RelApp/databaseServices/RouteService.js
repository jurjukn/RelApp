import { firestore as db } from '../firebaseServices/Firebase';
import { getCurrentUser } from '../firebaseServices/Authentication';
import { Collections } from './Collections';
import { deleteBatchQuery } from './DeleteInBatchService';
import uuid from 'react-native-uuid';

export async function getAllRoutes() {
  try {
    const routes = [];
    const routesSnapshot = await db.collection(Collections.routes).get();
    const currentUser = await getCurrentUser();

    routesSnapshot.forEach(doc => {
      const route = formatRoute(doc.id, doc.data(), currentUser.id);
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
    const route = formatRoute(doc.id, doc.data(), currentUser.id);

    return route;
  } catch (err) {
    console.log(err);
    throw err;
  }
}

function formatRoute(id, data, userId) {
  const isFavorite = data.userFavorite.includes(userId);
  const route = {
    id: id,
    title: data.title,
    description: data.description,
    ownerId: data.ownerId,
    playlistUrl: data.playlistUrl,
    isFavorite: isFavorite
  };

  return route;
}

export async function searchRouteByTitle(searchText) {
  try {
    const routes = [];
    const currentUser = await getCurrentUser();
    const routesSnapshot = db.collection(Collections.routes)
      .where('title', '>=', searchText)
      .where('title', '<=', searchText);

    routesSnapshot.forEach(doc => {
      const route = formatRoute(doc.id, doc.data(), currentUser.id);
      routes.push(route);
    })

    return routes;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteRoute(routeId) {
  try {
    const deleteQueries = [
      db.collection(Collections.history).where('routeId', '==', routeId),
      db.collection(Collections.comments).where('routeId', '==', routeId),
      db.collection(Collections.address).where('routeId', '==', routeId)
    ];

    deleteQueries.forEach(async query => {
      await deleteBatchQuery(db, query);
    })

    await db.collection(Collections.routes).doc(routeId).delete();
  } catch (err) {
    console.error(err);
  }
}

export async function updateRoute(description, title, playlistUrl, routeId) {
  try {
    const route = {
      description,
      title,
      playlistUrl
    };

    await db.collection(Collections.routes).doc(routeId).update(route);
  } catch (err) {
    console.error(err);
  }
}

export async function insertRoute(description, title, ownerId, playlistUrl) {
  try {
    const id = uuid.v4();
    const route = {
      title,
      description,
      ownerId,
      playlistUrl,
      userFavorite: []
    }

    await db.collection(Collections.routes).doc(id).set(route);
  
    return id;
  } catch (err) {
    console.error(err);
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
    } else if (add && !isFound) {
      favorites.push(userId);
    }

    await db.collection(Collections.routes).doc(routeId).update({userFavorite: favorites});
  } catch (err) {
    console.log(err);
    throw err;
  }
}