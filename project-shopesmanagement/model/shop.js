const config = require("../config/config.js");
const mysql = require('mysql2');

const db = mysql.createConnection({
  host: config.config.host,
  user: config.config.user,
  password: config.config.password,
  database: config.config.database
});

db.connect((err) => {
  if (err) {
    console.error('Error connecting to the database', err);
    return;
  }
  console.log('Connected to the database');
});


// ---------------------

function userregister(user, callback) {
  db.query(
    `INSERT INTO users (name,email) VALUES ('${user.name}', '${user.email}')`,
    callback
  );
};

exports.userregister =userregister ;

function checkUserStatus(user, callback) {
  console.log(user);
  db.query('SELECT * FROM users WHERE email = ?', user.email, (err, result) => {
    if (err) {
      callback(err, null);
      return;
    }
    
    console.log(result[0]);
    //  callback(null, result[0]);
    if(result.affectedRows==0){
      var data="user not found";
      callback(null,data);
    }

    if( result[0].name==user.name&&result[0].email==user.email&&result[0].role=="user"){
      // console.log(result[0].verified=="true");
      if(result[0].verified=="true"){
          callback(null, {name:result[0].name,verified:result[0].verified});
      }
    }
else{
    callback(null,null);
}

  });
};

exports.checkUserStatus = checkUserStatus;


// ----------------------for shopes db-------------


function getAllShopsloc(location,callback) {
  // let location='hyderabad';
  db.query('SELECT * FROM shopes WHERE location LIKE ?',['%'+location+'%'], callback);
  // udb.query('SELECT * FROM shopes', callback);
}
exports.getAllShopsloc = getAllShopsloc;


function getAllShops(callback){
  db.query('SELECT * FROM shopes ',callback);
}
exports.getAllShops=getAllShops;


// -----------for getting users db-----------

function showUsers(callback) {
  db.query('SELECT * FROM users', callback);
}
exports.showUsers = showUsers;

// --------verifing user-------
function acceptUserRequest(Id, updatedUser, callback) {
  db.query('UPDATE users SET ? WHERE email = ?', [updatedUser, Id], callback);
};
exports.acceptUserRequest = acceptUserRequest;

// deleting user request
function deleteUserRequest(email, callback) {
  db.query('DELETE FROM users WHERE email = ?', email, callback);
}
exports.deleteUserRequest = deleteUserRequest;

// deleting shop
function deleteShop(Id, callback) {
  db.query('DELETE FROM shopes WHERE id = ?', Id, callback);
};
exports.deleteShop = deleteShop;



// update shop
function updateShop(Id, updatedShop, callback) {
  db.query('UPDATE shopes SET ? WHERE id = ?', [updatedShop, Id], callback);
};

exports.updateShop = updateShop;


// creating shop

function createShop(shop, callback) {
  db.query(
    `INSERT INTO shopes ( name, location,contact_number,opening_hours,on_maps,website,rating) VALUES ('${shop.name}', '${shop.location}','${shop.contact_number}','${shop.opening_hours}','${shop.on_maps}','${shop.website}','${shop.rating}')`,
    callback
  );
};
exports.createShop = createShop;


function checkAdminStatus(user, callback) {
  console.log("Checking admin status for:", user.email);
  
  const email = user.email;
  
  db.query('SELECT * FROM users WHERE email = ?', email, (err, result) => {
    if (err) {
      console.error("Error while querying database:", err);
      return callback(err, null);
    }
    
    if (result.length === 0) {
      console.log("User not found in the database.");
      return callback(null, null);
    }
    
    const userData = result[0]; 
    
    if (userData.name === user.name && userData.email === user.email && userData.verified === "true"&&userData.role=="admin") {
      console.log("User is verified admin.");
      const adminInfo = {
        name: userData.name,
        verified: userData.verified
      };
      return callback(null, adminInfo);
    } else {
      console.log("User is not a verified admin.");
      return callback(null, null);
    }
  });
}

exports.checkAdminStatus = checkAdminStatus;
