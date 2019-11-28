const util = require('util');
const sqlite3 = require('sqlite3').verbose();
const Mercury = require('@postlight/mercury-parser');
const dbFile = '/path/to/your/mwi.db';

const landId = 1;
const minRelevance = 5;
const pageNumber = 1; // Page number
const pageLimit = 1000; // Results per page
const pageOffset = pageLimit * (pageNumber - 1);

const db = new sqlite3.Database(dbFile, (err) => {
  if (err) throw err;
});

const saveReadable = (id, content) => {
  db.run(
    'UPDATE expression SET readable = ? WHERE id = ?',
    [content, id],
    err => {
      if (err) {
        console.log(util.format('Error : %s on processing expression #%s', err.code, id));
      } else {
        byteSize = Buffer.from(content).length;
        console.log(util.format('Saved %s bytes from expression readable #%s', byteSize, id));
      }
    }
  );
};

db.serialize(() => {
  const sql = util.format(
    'SELECT id, url, readable FROM expression WHERE land_id = %s AND relevance >= %s LIMIT %s OFFSET %s',
    landId, minRelevance, pageLimit, pageOffset
  );
  
  db.each(sql, (err, row) => {
    if (err) throw err;
    console.log(util.format('Processing expression #%s', row.id));
 
 Mercury.parse(row.url, {
      contentType: 'markdown',
    })
    .then(result => {
      saveReadable(row.id, result.content);
    }).catch(err => {
      console.log(err);
    });
  });
});
