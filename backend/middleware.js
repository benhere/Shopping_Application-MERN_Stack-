const jwt = require('jsonwebtoken');

// cookies are send with each subsequent requests
//in order to see the cookies, we need to parse it.
// so for parsing we will use cookie-parser 
const isLoggedIn = (req,res,next) => {
    
    try {
        
        const token = req.cookies.token;

        if(!token) return res.status(401).json({errorMessage:"Unautharised User"})

        //JWT will verify the token with secret and
        // if it is verified then it will return payload data, payload data is the existing user id.
        // if it is not verified then it will through an error that will be catched in catch block
        const verified = jwt.verify(token, process.env.JWT_SECRET);
        
        // add user id(payload data) with this
        req.user = verified.user

        next();
    }
    catch (err) {
        console.log(err);
        res.status(401).json({errorMessage:"Unautharised User"})
    }
}


module.exports={isLoggedIn};