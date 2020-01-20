import { firestore as db } from '../firebaseServices/Firebase';
import { Collections } from './Collections';

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

export async function insertAddressRecord(address) {
  try {
    await db.collection(Collections.address).doc().set(address);
  } catch (err) {
    console.error(err);
  }
}

export async function updateAddressRecord(addressId, address) {
  try {
    await db.collection(Collections.address).doc(addressId).update(address);
  } catch (err) {
    console.error(err);
  }
}
