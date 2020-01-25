import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from './Collections';
import uuid from 'react-native-uuid';

export async function getAddressByRouteId(routeId) {
  try {
    const addressSnapshot = await db.collection(Collections.address).where('routeId', '==', routeId).limit(1).get();
    let address;
    addressSnapshot.forEach(doc => {
      const data = doc.data();

      address = {
        id: doc.id,
        ...data
      };
    });

    return address;
  } catch (err) {
    console.error(err);
  }
}

export async function insertAddressRecord(city, region, country, routeId, coordinates) {
  try {
    const id = uuid.v4();
    const address = {
      city,
      region,
      country,
      routeId,
      coordinates
    };
    await db.collection(Collections.address).doc(id).set(address);

    return id;
  } catch (err) {
    console.error(err);
  }
}

export async function updateAddressRecord(addressId, city, region, country, coordinates) {
  try {
    const address = {
      city,
      region,
      country,
      coordinates
    };

    await db.collection(Collections.address).doc(addressId).update(address);
  } catch (err) {
    console.error(err);
  }
}
