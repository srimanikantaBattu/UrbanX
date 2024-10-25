//create express mini user api App
const exp = require('express')
const hospitalsApp = exp.Router()
const { ObjectId } = require('mongodb');

//import asynchrous handler to handle asynchronous error
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config()


let hospitalsCollection;
//get userCollection this app level middleware--- it is required by every route
hospitalsApp.use((req,res,next)=>{
    hospitalsCollection = req.app.get('hospitalsObj')
    next()
})

hospitalsApp.get('/hospitals',expressAsyncHandler(async(req,res)=>{
    

    const hospitals = await hospitalsCollection.find({}).toArray()
    //send response
    res.send(hospitals)
}))


hospitalsApp.post('/new-hospital',expressAsyncHandler(async(req,res)=>{
    //get user resource from client
    const hospital = req.body;
    await hospitalsCollection.insertOne(hospital)
    //send response
    res.send({message:"Hospital added"})
}))

hospitalsApp.put('/update-hospital/:id', expressAsyncHandler(async (req, res) => {
    const hospital = req.body;
    const id = req.params.id;

    // Ensure ObjectId conversion
    try {
        const objectId = new ObjectId(id);
        await hospitalsCollection.updateOne({ _id: objectId }, { $set: { status: hospital.status } });
        res.send({ message: "hospital updated" });
    } catch (error) {
        res.status(400).send({ message: "Invalid hospital ID" });
    }
}));

module.exports = hospitalsApp;