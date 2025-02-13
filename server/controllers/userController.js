const User = require("../models/User"); // Import User Model Schema
const bcrypt = require("bcryptjs"); // Import Bcrypt Package
const jwt = require("jsonwebtoken"); // Import Jsonwebtoken Package
require("dotenv").config(); // Import dotenv Package

// Register User
// Register User
exports.register = async (req, res) => {
  try {
    // Get user input
    const { first_name, last_name, email, password } = req.body; // Removed 'picture'

    // Validate user input
    if (!(email && password && first_name && last_name)) {
      return res.status(400).send("All input is required");
    }

    // Check if user already exists
    const oldUser = await User.findOne({ email });

    if (oldUser) {
      return res.status(409).send("User Already Exist. Please Login");
    }

    // Encrypt user password
    const encryptedPassword = await bcrypt.hash(password, 10);

    // Create user in our database
    const user = await User.create({
      first_name,
      last_name,
      email: email.toLowerCase(), // sanitize: convert email to lowercase
      password: encryptedPassword
    });

    // Create token
    const token = jwt.sign(
      { user_id: user._id, email },
      process.env.TOKEN_KEY,
      {
        expiresIn: "2h",
      }
    );
    
    // Return new user and token (without 'picture' field)
    res.status(201).json({ user, token });
  } catch (err) {
    console.log(err);
    res.status(500).send("Server error");
  }
};



// Login User
// Login User
exports.login = async (req, res) => {
  try {
    // Get user input
    const { email, password } = req.body;

    // Validate user input
    if (!(email && password)) {
      return res.status(400).send("All input is required");
    }
    
    // Validate if user exists in our database
    const user = await User.findOne({ email });

    if (user && (await bcrypt.compare(password, user.password))) {
      // Create token
      const token = jwt.sign(
        { user_id: user._id, email },
        process.env.TOKEN_KEY,
        {
          expiresIn: "2h",
        }
      );

      // Exclude password from the response
      user.password = undefined;  // Removing the password field

      // Send user response (without the password)
      return res.status(200).json({ user, token });
    }

    // Invalid credentials
    return res.status(400).send("Invalid Credentials");
  } catch (err) {
    console.log(err);
  }
}

