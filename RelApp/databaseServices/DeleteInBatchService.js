

export async function deleteQueryBatch(db, query) {
  try {
    const querySnapshot = await query.get();

    if (querySnapshot.size === 0) return 0;

    let batch = db.batch();
    querySnapshot.docs.forEach(doc => {
      batch.delete(doc.ref);
    });

    await batch.commit();
  } catch(err) {
    console.error(err);
  }
}