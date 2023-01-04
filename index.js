const express = require('express');

const app = express();
const port = 3000 || process.env.PORT;
const admin = require('firebase-admin');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./sercet.json");

admin.initializeApp({
    credential : admin.credential.cert(serviceAccount)
})

const db = getFirestore();

app.post('/update_ahamove_status',(req,res)=>{
    
    const body = res.body;
    const collection = db.collection('test');
    collection.doc().set(body,{merge : true});

    res.send("Hello!!");
});

app.listen(port,()=>{
    console.log("Server is running at " + port);
})