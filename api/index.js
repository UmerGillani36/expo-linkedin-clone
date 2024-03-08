const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const crypto = require("crypto");
const nodemailer = require("nodemailer");
const jwt = require("jsonwebtoken");

const app = express();
const PORT = 8000;
const cors = require("cors");

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.json());

mongoose
  .connect("mongodb+srv://omer:Ghost1998*@cluster0.mug4kwa.mongodb.net/", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDB", err);
  });

app.listen(PORT, () => {
  console.log("Server is runing on port", PORT);
});

const User = require("./models/user");
const Post = require("./models/post");
//  endpoint to register a user in the backend

app.post("/register", async (req, res) => {
  try {
    const { name, email, password, profileImage } = req.body;

    // check if the email is already register

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      console.log("Email already registered");
      return res.status(400).json({ message: "Email already registered" });
    }
    // Create a new User
    const newUser = new User({
      name,
      email,
      password,
      profileImage,
    });

    // // generate the verification token
    newUser.verificationToken = crypto.randomBytes(20).toString("hex");

    // save the user to database

    const updatedUser = await newUser.save();

    // send the verification email to the registered email

    sendVerificationEmail(newUser.email, newUser.verificationToken);

    res.status(202).json({
      message:
        "Registration successful. Please check your mail for verfication",
      payload: newUser,
    });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: "Registration failed" });
  }
});

const sendVerificationEmail = async (email, verificationToken) => {
  console.log("sendVerificationEmail");
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "syedomershahgillani@gmail.com",
      pass: "wrdj skin awpz meaz",
    },
  });
  const mailOptions = {
    from: "linkedin@gmail.com",
    to: email,
    subject: "Email Verification",
    text: `Please click the following link to verify your email : http://localhost:8000/verify/${verificationToken}`,
  };
  // send the mail

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.log("Error sending the verification email");
  }
};

// endpoint to verify email

app.get("/verify/:token", async (req, res) => {
  try {
    const token = req.params.token;

    const user = await User.findOne({ verificationToken: token });

    if (!user) {
      return res.status(404).json({ message: "Invalid verification token" });
    }
    // mark the user as verified

    user.verified = true;
    user.verificationToken = undefined;

    await user.save();
    res.status(200).json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(500).json({ message: "Email verification failed" });
  }
});

// generate secret key

const generateSecretKey = () => {
  const secretKey = crypto.randomBytes(32).toString("hex");

  return secretKey;
};
// Assigning secret key

const secretKey = generateSecretKey();

// endpoint for login

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }
    if (user.password !== password) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user._id }, secretKey);

    res.status(200).json({ token });
  } catch (error) {
    console.log("Error while login", error);
  }
});
