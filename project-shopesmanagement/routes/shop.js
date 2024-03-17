const express = require("express");
const router = express.Router();
const controller = require("../controller/shop");
const jwt = require("jsonwebtoken");
const uverify = function (req, res, next) {
    
    try{
    const authHeader = req.headers['authorization'];
    const  token= authHeader.substring('Bearer '.length);
    req.token= token;
    console.log(token);
    const secretkey = controller.secretkey;
    console.log(secretkey);
    
    
    if (!token) {
        return res.status(401).send("no token");
    }

    jwt.verify(token, secretkey, (err, result) => {
        if (err) {
            // Token verification failed
            console.error('Token verification failed:', err.message);
            return res.status(403).send("token unverified");
        } else {
            console.log('Token verified successfully');
            console.log('Decoded token payload:', result);
            next();
        }

    })
}
catch(err){
    console.log(err);
    res.send("No token");
}

}
const averify = function (req, res, next) {
    
    try{
    const authHeader = req.headers['authorization'];
    const  token= authHeader.substring('Bearer '.length);
    req.token= token;
    console.log(token);
    const secretkey = controller.secretkey;
    console.log(secretkey);
    
    
    if (!token) {
        return res.status(401).send("no token");
    }

    jwt.verify(token, secretkey, (err, result) => {
        if (err) {
            // Token verification failed
            console.error('Token verification failed:', err.message);
            return res.status(403).send("token unverified");
        } else {
            console.log('Token verified successfully');
            console.log('Decoded token payload:', result);
            next();
        }

    })
}
catch(err){
    console.log(err);
    res.send("No token");
}

}



router.post('/user', controller.sendregister);
router.post('/login', controller.checkUserStatus);

router.get("/shops/:location", uverify, controller.getAllShopsloc);
router.get("/shops",averify ,controller.getAllShops);
router.get("/users", averify,controller.showUsers);
router.put("/user/:id", controller.acceptUserRequest);
router.delete("/user/:id", controller.deleteUserRequest);
router.delete("/shop/:id", controller.deleteShop);
router.put("/shop/:id", controller.updateShop);
router.post("/shop", controller.createShop);
router.post("/admin", controller.checkAdmin);
module.exports = router;
