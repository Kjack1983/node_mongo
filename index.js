const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dbOper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);
    console.log('Connected successfully to the server');
    const db = client.db(dbname);
    
    dbOper.insertDocument(db, { name: "Vadonut", description: 'Test'}, 'dishes', (result) => {
        console.log('Insert Document: \n', result.ops);

        dbOper.findDocuments(db, 'dishes', (docs) => {
            console.log('Found the documents \n' + docs);
            dbOper.updateDocument(db, {name: 'Vadonut'}, {description: 'Update Value test'}, 'dishes', (result) => {
                console.log('update document \n', result.result.n);

                dbOper.findDocuments(db, 'dishes', (docs) => {
                    console.log('Found the documents \n' + docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('dropped collection: ', result);

                        client.close();
                    })
                });
            });
        })

    });
});

