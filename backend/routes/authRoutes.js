const express = require("express");
const router = express.Router();
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { isLoggedIn } = require("../middleware");
const Product = require("../models/product");

router.post("/register", async (req, res) => {
  try {
    const { email, password, passwordVerify } = req.body;

    // Validation on input fields

    if (!email || !password || !passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all the required credentials" });
    }

    if (password.length < 4) {
      return res.status(400).json({
        errorMessage: "Please enter password of atleast 4 characters",
      });
    }

    if (password !== passwordVerify) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter the same password twice" });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res
        .status(400)
        .json({ errorMessage: "An account with this email is already exists" });
    }

    // now we will have to create new User,
    // and for doing so we need to hash the password
    const salt = await bcrypt.genSalt();

    // using this salt we will create hashed password
    const passwordHash = await bcrypt.hash(password, salt);

    // save the new user account to the database
    const newUser = new User({
      email,
      passwordHash,
    });

    // save new user to the database
    const savedUser = await newUser.save();

    // log the user in
    const token = jwt.sign(
      {
        user: savedUser._id,
      },
      process.env.JWT_SECRET
    );

    res.cookie("token", token, {
      httpOnly: true,
    });

    res.status(200).send("Registered Successfully");
    //res.status(200).json(savedUser);
    //res.status(200).send("User Registered successfully")
  } 
  catch (e) {
    console.error(err.message);
    res.status(500).send();
  }
});

// login the existing user

router.post("/login", async (req, res) => {
  //console.log(req.body);
  //res.send('Hit Login');

  //email and password Authentication
  try {
    const { email, password } = req.body;

    // Validation

    if (!email || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Please enter all the required credentials" });
    }

    // check whether user exist or not
    const existingUser = await User.findOne({ email });

    if (!existingUser) {
      return res.status(400).json({ errorMessage: "Wrong email or password" });
    }

    // match password of user
    // compare the give user password with hashed password
    const passwordCorrect = await bcrypt.compare(
      password,
      existingUser.passwordHash
    );

    if (!passwordCorrect) {
      return res.status(400).json({ errorMessage: "Wrong email or password." });
    }

    // sign the token

    const token = jwt.sign(
      {
        user: existingUser._id,
      },
      process.env.JWT_SECRET
    );

    // this will not be accessed through javascript anymore,
    //it will accessed through http request Only
    res
      .cookie("token", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      })
      .send("sign in successfully");
    //res.send("User LoggedIn(sent u a user token)");
  } 
  catch (e) {
    console.log(e);
    res.status(500).send("Login Error");
  }
});

// logic to logged out the user:logout end point

router.get("/logout", (req, res) => {
  res
    .cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
      secure: true,
      sameSite: "none",
    })
    .send("Sign Out");
  //res.status(200).send("Logged Out SuccessFully");
});

// check whther user is logged in or not

router.get("/loggedIn", (req, res) => {
  try {
    const token = req.cookies.token;
    // if no token available,it will return false
    if (!token) return res.status(200).json(false);

    // otherwise it will try to verify the signature(JWT secret)
    // and return true for successful verification
    jwt.verify(token, process.env.JWT_SECRET);

    res.send(true);
  } 
  catch (err) {
    // if signature is not verified, it will generate the error in catch block
    console.error(err);
    res.status(200).json(false);
  }
});

//user Cart end points
// to get the current user's cart
router.get("/user/cart", isLoggedIn, async (req, res) => {
  try {
    const userId = req.user;
    //console.log(userId);
    // using user's id we will populate cart
    const user = await User.findById(userId).populate("cart");

    res.status(200).json(user.cart);
    //res.send(userId);
  } 
  catch (e) {
    console.log(e.message);
    res.status(400).json();
  }
});

// to add the item in the cart

router.post("/user/cart/add", isLoggedIn, async (req, res) => {

  //console.log(req.body);
  //res.send(req.body);

  try {
    //will get the product id in request body
    const { productid } = req.body;

    // and find the particular product
    const product = await Product.findById(productid);
    console.log(product);

    // once we find the product,next we will add the product's reference to the user's Cart
    // so for this we will find user's id
    const userid = req.user;

    const user = await User.findById(userid);
    console.log(user);

    // add product reference to user's cart array
    user.cart.push(product);

    // then save the user to the cart
    await user.save();

    res.status(200).json('Added to cart successfully');

  } 
  catch (e) {
    console.log(e.message);
    res.status(400).json();
  }

});

router.post('/user/cart/remove',isLoggedIn,async(req,res)=>{

  try{
      const { productid } = req.body;
      const userid = req.user;

      const user = await User.findByIdAndUpdate(userid,{$pull:{cart:productid}})
      console.log(user);
      res.status(200).json('Item removed from cart successfully');
    }
  catch(err){
    console.log(err.message);
    res.status(400).send('cannot remove from Cart');
  }
  
})

module.exports = router;
