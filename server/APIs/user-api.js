// create user api app (mini application)
const exp = require("express");
const nodemailer = require("nodemailer");
const userApp = exp.Router();
const bcryptjs = require("bcryptjs");
const expressAsyncHandler = require("express-async-handler");
const jwt = require("jsonwebtoken");
const verifyToken = require("../Middlewares/verifyToken");
require("dotenv").config();

async function sendUserDataToDatabase(registeredData){
  await usersCollection.insertOne(registeredData);
}

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL,
    pass: process.env.PASSWORD,
  },
});

let usersCollection;
let temporaryCollection;
let hospitalsCollection;
// get userCollection App
userApp.use((req, res, next) => {
  usersCollection = req.app.get("usersObj");
  temporaryCollection=req.app.get("temporaryObj");
  hospitalsCollection=req.app.get("hospitalsObj");
  next();
});

// user registration route
userApp.post(
  "/user",
  expressAsyncHandler(async (req, res) => {
    // get user resource from client
    const newUser = req.body;
    console.log("new user",newUser);
    // check for duplicate user based on username
    const dbuser = await usersCollection.findOne({
      emailId: newUser.emailId,
    });
    console.log(dbuser)
    // if user found in db
    if (dbuser !== null) {
      res.send({ message: "User existed" });
    } else {
      // hash the password
      // check password and confirmpassword are same
      console.log(newUser.password," ",newUser.confirmPassword)
      if (newUser.password !== newUser.confirmPassword) {
        console.log("Password and confirm password should be same");
        res.send({ message: "Password and confirm password should be same" });
        return;
      }
      const hashedpassword = await bcryptjs.hash(newUser.password, 8);
      //replace plain password with hashed password
      newUser.password = hashedpassword;
      // generate otp with 4 digits
      const otp = Math.floor(1000 + Math.random() * 9000);
      console.log(otp);
      
      const tempData = {
        emailId: newUser.emailId,
        password: newUser.password,
        username: newUser.username,
        otp: otp,
        hospitals: [] ,
        role: "user"
      };

      // store otp in temporary collection 
      const tempUser=await temporaryCollection.findOne({emailId: newUser.emailId});
      if(tempUser!==null){
        await temporaryCollection.updateOne({emailId: newUser.emailId},{$set: tempData});
      }
      else
      await temporaryCollection.insertOne(tempData);

      // send email with otp
      const mailOptions = {
        from: process.env.EMAIL,
        to: newUser.emailId,
        subject: "OTP for registration",
        text: `Your OTP is ${otp}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });

      res.send({message:"User is created"});

      
    }
  })
);

// checking the otp
userApp.post("/check-otp",expressAsyncHandler(async(req,res)=>{
  const otp = req.body.otp;
  const tempData = await temporaryCollection.findOne({otp: otp});
  if(tempData===null){
    res.send({message:"Invalid OTP"})
  }
  else{
    await temporaryCollection.deleteOne({otp: otp});
    const registeredData = {
      username: tempData.username,
      emailId: tempData.emailId,
      password: tempData.password,
      hospitals: [],
      role: "user"
    }
    sendUserDataToDatabase(registeredData);
    res.send({ message: "User is created" });
  }

}))

userApp.get("/get-tempuser/:emailId",expressAsyncHandler(async(req,res)=>{
  const emailId = req.params.emailId;
  const tempData = await temporaryCollection.findOne({emailId: emailId});
  res.send({payload:tempData});
}))

userApp.put('/resend-otp/:emailId',expressAsyncHandler(async(req,res)=>{
  const emailId = req.params.emailId;
  const tempData = await temporaryCollection.findOne({emailId: emailId});
  const otp = Math.floor(1000 + Math.random() * 9000);
  const mailOptions = {
    from: process.env.EMAIL,
    to: tempData.emailId,
    subject: "OTP for registration",
    text: `Your OTP is ${otp}`,
  };
  transporter.sendMail(mailOptions, function (error, info) {
    if (error) {
      console.log(error);
    } else {
      console.log("Email sent: " + info.response);
    }
  });
  await temporaryCollection.updateOne({emailId: tempData.emailId},{$set: {otp: otp}});
  res.send({message:"OTP has been sent"});
}))

// user login route
userApp.post(
  "/login",
  expressAsyncHandler(async (req, res) => {
    // get cred object from client
    const userCred = req.body;
    // check for username
    const dbuser = await usersCollection.findOne({
      emailId: userCred.emailId,
    });
    if (dbuser === null) {
      // check mail and password in hospital collection
      const dbhospital = await hospitalsCollection.findOne({
        emailId: userCred.emailId,
        password: userCred.password
      });
      if (dbhospital === null) {
        res.send({ message: "Invalid Email" });
        return;
      }
      res.send({ message: "login success", user: dbhospital });

    } else {
      // check for password
      const status = await bcryptjs.compare(userCred.password, dbuser.password);
      if (status === false) {
        res.send({ message: "Invalid Password" });
      } else {
        // create jwt token and encode it
        const signedToken = jwt.sign(
          { username: dbuser.username },
          process.env.SECRET_KEY,
          { expiresIn: "1d" }
        );
        // send res
        res.send({
          message: "login success",
          token: signedToken,
          user: dbuser,
        });
      }
    }
  })
);


userApp.get(
  "/check-hospital/:username/:hospitalId",
  expressAsyncHandler(async (req, res) => {
    const { username, hospitalId } = req.params;
    // const hospitalId = new ObjectId(hospital);

    try {
      // Find the user document by username
      const user = await usersCollection.findOne({ username: username });
    
      if (!user) {
        // Respond false if user is not found
        return res.send(false);
      }
    
      // Find the hospital object with the specified hospitalId
      const hospitalObj = user.hospitals.find(
        (hospital) => hospital.hospitalId.toString() === hospitalId
      );
    
      // Check if the hospital object exists
      if (hospitalObj) {
        // Respond with true and the meeting schedule data
        res.send({ exists: true, meetingSchedule: hospitalObj.meetingSchedule });
      } else {
        // Respond with false if the hospital is not found
        res.send({ exists: false });
      }
    } catch (error) {
      console.error("Error checking hospital:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }

  })
);



userApp.put(
  "/connect-hospital/:username/:hospitalId",
  expressAsyncHandler(async (req, res) => {
    const { username, hospitalId } = req.params;
    // const hospitalId = new ObjectId(hospital);

    

    //insert the hospital id into the user document
    try {
      const response = await usersCollection.updateOne(
        { username: username },
        { $push: { hospitals: hospitalId } }
      );
      res.send({ message: "Hospital connected successfully" });
    } catch (error) {
      console.error("Error connecting hospital:", error);
      res.status(500).send({ message: "Internal Server Error" });
    }

  })
);

userApp.get('/particular-hospital/:username/:hospitalId', expressAsyncHandler(async (req, res) => {
  const username = req.params.username;
  const hospitalId = req.params.hospitalId;

  try {
      // Find the user document by username
      const user = await usersCollection.findOne({ username: username });

      if (!user) {
          return res.status(404).send({ message: "User not found" });
      }

      // Find the specific hospital in the user's hospitals array
      const hospital = user.hospitals.find(hospital => hospital.hospitalId.toString() === hospitalId);

      if (!hospital) {
          return res.status(404).send({ message: "Hospital not found in user's hospitals" });
      }

      // If the hospital is found, return its details
      res.send(hospital);
  } catch (error) {
      console.error("Error fetching hospital:", error);
      res.status(500).send({ message: "Internal Server Error" });
  }
}));


module.exports = userApp;