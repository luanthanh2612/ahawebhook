const express = require('express');
const app = express();
const port = 3000 || process.env.PORT;
const bodyParser = require('body-parser');
const cancelStatus = "CANCELLED";
const admin = require('firebase-admin');
const { getFirestore, Timestamp, FieldValue } = require('firebase-admin/firestore');

const serviceAccount = require("./sercet.json");

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
})

const db = getFirestore();

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/update_ahamove_status', (req, res) => {

    const body = req.body;

    const id = body._id;
    const status = body.status;
    const trackingNumber = body.path[1].tracking_number;
    const phone = body.supplier_id;
    const supplierName = body.supplier_name;
    const cancelComment = body.cancel_comment;
    const cancelByUser = body.cancel_by_user;
    const today = new Date();
    

    const obj = {
        id : id,
        status : status,
        trackingNumber : trackingNumber,
        phone : phone,
        supplierName : supplierName,
        cancelComment : cancelComment,
        cancelByUser : cancelByUser,
        created : new Date(),
        createdDate : `${today.getDay}/${today.getMonth}/${today.getFullYear}`
    }

    const collection = db.collection('test');
    
    if(!trackingNumber.trim()){
         collection.doc().set(obj,{merge : true});
    }else{
         collection.doc(obj.trackingNumber).set(obj,{merge:true});
    }

    res.json({ sucessful: true, msg: 'Ahamove webhook!!' });
});

app.get('/', (req, res) => {
    res.send("Hello everyone!!!");
})

app.listen(port, () => {
    console.log("Server is running at " + port);
})