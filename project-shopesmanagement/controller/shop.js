const model = require("../model/shop");
const jwt=require("jsonwebtoken");
var nodemailer = require('nodemailer');
exports.sendregister = (req, res) => {
  const user = req.body;
  model.userregister(user, (err) => {
    if (err) {

      console.error('Error creating login ', err);
      res.status(500).send('Error creating user');
      return;
    }
  // const token=jwt.sign({user},"vashnavai",{expiresIn:"1d"})
    res.status(201).send('user register successfully');
    // const form=document.getElementById("");

  })
}
var secretkey="myscretkey";
exports.secretkey=secretkey;
exports.checkUserStatus = (req, res) => {
  // const userId = req.params.id;
  const user=req.body;
 
  model.checkUserStatus(user, (err, result) => {
    if (err) {
      console.error("Error finding user by this id", err);
      res.status(500).send("Error finding user");
      res.status(404).send("user is not found");
      return;
    }
    console.log(result);
    if (!result) {
      res.status(404).send('user not found');
      return;
    }
    const token=jwt.sign({user},secretkey,{expiresIn:"1d"})
    
    res.status(201).json({user:result,token:token});
    // res.send(user);
    // console.log(res);

  });
}

// --------------------------

exports.getAllShopsloc = (req, res) => {
  const loc=req.params.location;
  // console.log(req);
  model.getAllShopsloc(loc,(err, shops) => {
    if (err) {
      console.error('Error getting shops', err);
      res.status(500).send('Error getting shops');
      res.status(404).send("no shops found");
      return;
    }
    res.send(shops);
  });
};

exports.getAllShops=(req,res)=>{
model.getAllShops((err,shops)=>{
if(err){
  console.error("internsl server error");
res.status(500).send(" internal server error");
return;
}
res.send(shops);
})
}




exports.showUsers = (req, res) => {
  model.showUsers((err, users) => {
    if (err) {
      console.error("error getting users", err);
      res.status(500).send("error getting users");
      return;
    }
    res.send(users);
  })
}




// -------------verifing user 
exports.acceptUserRequest = (req, res) => {
  console.log(req.params);
  const Id = req.params.id;
  const updatedUser = req.body;
  model.acceptUserRequest(Id, updatedUser, (err, result) => {
    if (err) {
      console.error('Error updating shop', err);
      res.status(500).send('Error updating shop');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('user not found');
      return;
    }

    var transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'noreplymail1234abcd@gmail.com',
        pass: 'mltdzlrgkltpvkcx'
      }
    });
    
    var mailOptions = {
      from: 'noreplymail1234abcd@gmail.com',
      to: `${Id}`,
      subject: 'user verified',
      text: 'admin accepted your request'
    };

    transporter.sendMail(mailOptions, function(error, info){
      if (error) {
        console.log(error);
      } else {
        console.log('Email sent: ' + info.response);
      }
    });

    res.send('user updated successfully');
  });
};


// ---------deleting user request
exports.deleteUserRequest = (req, res) => {
  console.log(req.params.id);
  const email = req.params.id;
  model.deleteUserRequest(email, (err, result) => {
    if (err) {
      console.error('Error deleting user', err);
      res.status(500).send('Error deleting user');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('user not found');
      return;
    }
    res.send('user deleted successfully');
  });
}
//------ deleting shop
exports.deleteShop = (req, res) => {
  const Id = req.params.id;
  model.deleteShop(Id, (err, result) => {
    if (err) {
      console.error("error deleting shop", err);
      res.status(500).send("error deleting user");
      return;
    }
    if (result.afftectedRows === 0) {
      res.status(404).send("shop not found")
    }
    res.send("shop deleted successfully");
  });

}
// update a shop
exports.updateShop = (req, res) => {
  const Id = req.params.id;
  const updatedShop = req.body;
  model.updateShop(Id, updatedShop, (err, result) => {
    if (err) {
      console.error('Error updating shop', err);
      res.status(500).send('Error updating shop');
      return;
    }
    if (result.affectedRows === 0) {
      res.status(404).send('shop not found');
      return;
    }
    res.send('shop updated successfully');
  });
};



// create new shop

exports.createShop = (req, res) => {
  const shop = req.body;
  model.createShop(shop, (err) => {
    if (err) {
      console.error('Error creating shop', err);
      if(err.errno===1062){
        res.send("duplicate entry");
      }
      res.status(500).send('Error creating shop');
      return;
    }
    res.status(201).send('shop created successfully');
  });
};


// ---
exports.checkAdmin = (req, res) => {
  // const userId = req.params.id;
  const user=req.body;
  // console.log(user);
 
  model.checkAdminStatus(user, (err, result) => {
    if (err) {
      console.error(" internal server error", err);
      res.status(500).send("internal server erroe");
      return;
    }

    // console.log(result);
    if (!result) {
      res.status(404).send('admin not found');
      return;
    }

    const tokenadmin=jwt.sign({user},secretkey,{expiresIn:"1d"})
    
    res.status(201).json({user:result,token:tokenadmin});
    // res.send(user);

  });
}
