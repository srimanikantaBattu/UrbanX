//create express mini user api App
const exp = require('express')
const hospitalsApp = exp.Router();
const axios = require('axios');
const fs = require('fs');
const { ObjectId } = require('mongodb');

//import asynchrous handler to handle asynchronous error
const expressAsyncHandler = require('express-async-handler');

require('dotenv').config()


let hospitalsCollection;
let usersCollection;
//get userCollection this app level middleware--- it is required by every route
hospitalsApp.use((req,res,next)=>{
    hospitalsCollection = req.app.get('hospitalsObj')
    usersCollection = req.app.get('usersObj')
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

hospitalsApp.get('/waiting-users/:id',expressAsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const hospital = await hospitalsCollection.findOne({ _id: new ObjectId(id) });
    res.send(hospital.waitingUsers);
}))

hospitalsApp.get('/connected-users/:id',expressAsyncHandler(async(req,res)=>{
    const id = req.params.id;
    const hospital = await hospitalsCollection.findOne({ _id: new ObjectId(id) });
    res.send(hospital.connectedUsers);
}))

hospitalsApp.put('/add-to-waiting-list/:username/:emailId/:hospitalId',expressAsyncHandler(async(req,res)=>{
    const username = req.params.username;
    const emailId = req.params.emailId;
    const hospitalId = req.params.hospitalId;
    //add user to waiting list if the by checking email and username such that they are not already in the waiting list

    const hospital = await hospitalsCollection.findOne({ _id: new ObjectId(hospitalId) });
    if (hospital.waitingUsers.some(user => user.emailId === emailId && user.username === username)) {
        return res.status(400).send({ message: "User already in waiting list" });
    }
    await hospitalsCollection.updateOne({ _id: new ObjectId(hospitalId) }, { $push: { waitingUsers: { username: username, emailId: emailId } } });
    res.send({message:"Added to waiting list"})
}))

hospitalsApp.put('/add-to-connected-list/:username/:emailId/:hospitalId',expressAsyncHandler(async(req,res)=>{
    const username = req.params.username;
    const emailId = req.params.emailId;
    const hospitalId = req.params.hospitalId;
    await hospitalsCollection.updateOne({ _id: new ObjectId(hospitalId) }, { $pull: { waitingUsers: { username: username, emailId: emailId } } });
    await hospitalsCollection.updateOne({ _id: new ObjectId(hospitalId) }, { $push: { connectedUsers: { username: username, emailId: emailId, requestedMeeting: false } } });

    await usersCollection.updateOne(
        { username: username },
        { 
          $push: { 
            hospitals: { 
              hospitalId: hospitalId, 
              meetingSchedule:""
            } 
          } 
        }
      );      

    res.send({message:"Added to connected list"})
}))

hospitalsApp.put('/send-request/:username/:emailId/:hospitalId',expressAsyncHandler(async(req,res)=>{
    const username = req.params.username;
    const emailId = req.params.emailId;
    const hospitalId = req.params.hospitalId;
    // await hospitalsCollection.updateOne({ _id: new ObjectId(hospitalId) }, { $push: { connectedUsers: { username: username, emailId: emailId } } });

    await hospitalsCollection.updateOne(
        { _id: new ObjectId(hospitalId), "connectedUsers.username": username },
        { $set: { "connectedUsers.$.requestedMeeting": true } }
      );
      
    res.send({message:"Request sent"})
}))

hospitalsApp.put('/send-meeting-link/:username/:emailId/:hospitalId/:meetingLink', expressAsyncHandler(async (req, res) => {
    const { username, emailId, hospitalId, meetingLink } = req.params;

    console.log("Username:", username);
    console.log("Email ID:", emailId);
    console.log("Hospital ID:", hospitalId);
    console.log("Meeting Link:", meetingLink);

    try {
        // Update the meetingSchedule for the specified hospitalId
        const updateResult = await usersCollection.updateOne(
            { username, "hospitals.hospitalId": hospitalId },
            { $set: { "hospitals.$.meetingSchedule": meetingLink } } // Use `$` positional operator
        );

        // Check if the update was successful
        if (updateResult.modifiedCount === 0) {
            return res.status(400).json({ message: "Failed to update meeting schedule" });
        }

        // Respond with a success message
        res.json({ message: "Meeting link sent successfully" });
    } catch (error) {
        console.error("Error sending meeting link:", error); // Log the full error for debugging
        res.status(500).json({ message: "Internal Server Error" });
    }
}));





module.exports = hospitalsApp;