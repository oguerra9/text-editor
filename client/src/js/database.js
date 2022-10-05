import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => {
  const jateDB = await openDB('jate', 1);
  const tx = jateDB.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.add({ id: 1, value: content })
  const result = await request;
  console.log('data saved to database', result);
}

// method that gets all the content from the database
export const getDb = async () => {
  console.log('GET from the database');

  // create a connection to the database database and version we want to use
  const jateDB = await openDB('jate', 1);

  // create a new transaction and specify the database and data privileges
  const tx = jateDB.transaction('jate', 'readonly');

  // open up the desired object store
  const store = tx.objectStore('jate');

  // ust the .getAll() method to get all data in the database
  const request = store.get(1);

  // get confirmation
  const result = await request;
  result 
    ? console.log('data retrieved from database', result.value)
    : console.log('data could not be found in database');
  // if variable is defined, return
  return result?.value;
};

initdb();
