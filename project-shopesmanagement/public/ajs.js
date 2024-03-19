var token;

window.onload = function () {
    token = localStorage.getItem("tokenadmin");
    console.log(token);
    if (!token) {
        window.location.href = "index.html";
       
    }
}


function showUsers() {
   

    console.log(token);
    if (token) {
        fetch("http://sql.freedb.tech:3330/users",{
            method:"get",
            headers: {
                'Authorization': 'Bearer ' + token
                }
    
        })
            .then(response => response.json())
            .then(data => { displayUsers(data) })
            .catch(error => console.error('Error:', error));
    }
}


function displayUsers(users) {
   
    document.getElementById("usersTable").style.visibility = "visible";
    document.getElementById("userTablediv").style.display = "inline";
    const tableBody = document.querySelector('#usersTable tbody');
    tableBody.style.opacity = 1;
    tableBody.innerHTML = '';
    console.log(users);

    users.forEach(user => {
        if (user.role === "user") {
            const row = tableBody.insertRow();
           
            row.insertCell(0).textContent = user.name;
            row.insertCell(1).textContent = user.email;
            row.insertCell(2).textContent = user.verified;

            let Accept = document.createElement('button');
            Accept.innerText = 'Accept';

            Accept.email = user.email;
            Accept.style.height = "40px";
            row.insertCell(3).appendChild(Accept);
            Accept.onclick = function () {
                let a = Accept.email;
                console.log(a);
                acceptUserRequest(a);
            };
            let del = document.createElement('button');
            del.innerText = 'delete';

            del.email = user.email;
            del.style.height = "40px";
            row.insertCell(4).appendChild(del);
            del.onclick = function () {
                let a = del.id;
                console.log(a);
                deleteUserRequest(del.email);
            };
        }
    })
}

var shopsdata;

function getAllShops() {
    // location.reload();
    if (token) {
        console.log(token)
        if(shopsdata){
            displayShops(shopsdata);
        }
        else {
            const token=localStorage.getItem("tokenadmin");
        fetch('http://sql.freedb.tech:3330/shops',{
        method:"GET",
        headers: {
            'Authorization': 'Bearer ' + token
            }
        }
        )
            .then(response => response.json())
            .then(data => {
                shopsdata=data;
                displayShops(data)
                 })
            .catch(error => console.error('Error:', error));
    }
}
}

function displayShops(shops) {

    var container=document.getElementById("container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
}

    document.getElementById("shopform").style.visibility = "hidden";
    document.getElementById("formdiv").style.display = "none";

    document.getElementById("usersTable").style.visibility = "hidden";
    document.getElementById("userTablediv").style.display = "none";

    
    document.getElementById("shopsTableAdmindiv").style.display = "inline";
    document.getElementById("container").style.display = "flex";
    


    console.log(shops);
    
    shops.forEach(shop => {
        const shopsdiv = document.getElementById("shopsTableAdmindiv");

        const box = document.getElementById("container");

        let div = document.createElement("div");
        div.id = shop.id;
        div.className = "box"


        const name = document.createElement("H3");
        const address = document.createElement("p");
        name.innerHTML = `<u>${shop.name}</u>`;
        address.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${shop.location}`;

        const rating = document.createElement("p");
        rating.innerHTML = `<i class="fa-solid fa-star"></i>   ${shop.rating}`
        const contact = document.createElement("p");
        contact.innerHTML = `<i class="fa-solid fa-phone-volume"></i>  ${shop.contact_number}`
        const website = document.createElement("p");
        website.innerHTML = `<i class="fa-solid fa-earth-americas"></i>   ${shop.website}`
        const openinghrs = document.createElement("p");
        openinghrs.innerHTML = `<i class="fa-solid fa-door-open"></i>  ${shop.opening_hours}`
        const link = document.createElement("a");
        link.href = shop.on_maps;
        link.target = "_blank";
        link.innerHTML = `<i class="fa-solid fa-link"></i>see on maps `
        link.style.color = "sky blue";
        div.appendChild(name);
        div.appendChild(address);
        div.appendChild(rating);
        div.appendChild(contact);
        div.appendChild(website);
        div.appendChild(openinghrs);
        div.appendChild(link);

        box.appendChild(div);


        const buttons = document.createElement("p");

        let update = document.createElement('button');
        update.innerText = 'Update';

        update.id = shop.id;
        update.style.height = "40px";
        buttons.appendChild(update);
        update.onclick = function () {
            let a = update.id;
            console.log(a);
            formforupdate(a, shop.name, shop.location, shop.contact_number, shop.opening_hours, shop.on_maps, shop.website, shop.rating);
        };

        let del = document.createElement('button');
        del.innerHTML = 'Delete';
        del.className = "delbutton";
        del.id = shop.id;
        del.style.height = "40px";

        buttons.appendChild(del);
        del.onclick = function () {
            let a = del.id;
            console.log(a);
            deleteShop(a);
        };
        div.appendChild(buttons);
        
        shopsdiv.append(box);
    }
    )

}

function formforupdate(id, b, c, d, e, f, h, i) {
    document.getElementById("shopsTableAdmindiv").style.display = "none";
    document.getElementById("container").style.visibility = "hidden";


    document.getElementById("shopform").style.visibility = "visible";
    document.getElementById("formdiv").style.display = "inline";

    // document.getElementById('id').value = id,
        document.getElementById('name').value = b,
        document.getElementById('loc').value = c,
        document.getElementById('contno').value = d,
        document.getElementById('openhrs').value = e,
        document.getElementById('onmap').value = f,
        document.getElementById('website').value = h,
        document.getElementById('rate').value = i


    let update = document.createElement('button');
    update.innerText = "update shop";
    document.getElementById("shopform").appendChild(update);
    update.style.width = "100%";
    update.onclick = function () {
        updateShop(id);
        console.log(id);
    }
}

function updateShop(id) {
    if (token) {
        var data = {
            // id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            location: document.getElementById('loc').value,
            contact_number: document.getElementById('contno').value,
            opening_hours: document.getElementById('openhrs').value,
            on_maps: document.getElementById('onmap').value,
            website: document.getElementById('website').value,
            rating: document.getElementById('rate').value,
        }

        fetch(`http://sql.freedb.tech:3330/shop/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response);
            document.getElementById("shopform").reset();
            getAllShops();
            alert("shop updated successfully");

        });
    }
}
function deleteShop(id) {
    if (token) {
        fetch(`http://sql.freedb.tech:3330/shop/${id}`, {
            method: "DELETE"
        })
            .then(response => {
                location.reload();
                getAllShops();
                alert("shop deleted successfully")
            })
    }
}


function acceptUserRequest(id) {
    if (token) {
        var data = {
            verified: "true"
        }

        fetch(`http://sql.freedb.tech:3330/user/${id}`, {
            method: "PUT",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(response => {
            console.log(response);
            showUsers();
            alert("user is verified");
            // var transporter = nodemailer.createTransport({
            //     service: 'gmail',
            //     auth: {
            //       user: 'admin',
            //       pass: 'admin@1234'
            //     }
            //   });
              
            //   var mailOptions = {
            //     from: 'noreplymail1234abcd',
            //     to: `${id}`,
            //     subject: 'user verified',
            //     text: 'admin accepted your request'
            //   };
              
            //   transporter.sendMail(mailOptions, function(error, info){
            //     if (error) {
            //       console.log(error);
            //     } else {
            //       console.log('Email sent: ' + info.response);
            //     }
            //   });





        });
    }
}





function deleteUserRequest(email) {
    if (token) {
        fetch(`http://sql.freedb.tech:3330/user/${email}`, {
            method: "DELETE"
        })
            .then(response => {
                showUsers();

                alert("User deleted successfully")
            })
    }
}


function createShop() {
// location.reload();
console.log(document.getElementById("shopform").contains(document.getElementById("create")));

    document.getElementById("usersTable").style.visibility = "hidden";
    document.getElementById("userTablediv").style.display = "none";

    document.getElementById("container").style.display = "none";
    document.getElementById("shopsTableAdmindiv").style.display = "none";


    document.getElementById("shopform").style.visibility = "visible";
    document.getElementById("formdiv").style.display = "inline";

    var create = document.createElement('button');
    create.innerText = "Create Shop";
    create.style.width = "100%";
    create.id="create";
   
    if(!(document.getElementById("shopform").contains(document.getElementById("create")))){
    document.getElementById("shopform").appendChild(create);
    console.log(document.getElementById("shopform").contains(document.getElementById("create")));

    }
    
    // document.getElementById("shopform").appendChild(create)

    create.onclick = function () {
        var data = {
            name: document.getElementById('name').value,
            location: document.getElementById('loc').value,
            contact_number: document.getElementById('contno').value,
            opening_hours: document.getElementById('openhrs').value,
            on_maps: document.getElementById('onmap').value,
            // owner_name: document.getElementById('ownname').value,
            website: document.getElementById('website').value,
            rating: document.getElementById('rate').value,

        }
        fetch("http://sql.freedb.tech:3330/shop", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(response => {
                if (response.status >= 400) {
                    console.log(data);
                    throw new Error("Bad response from server");
                }
            })
            .then(data => {
                // getAllShops();
                document.getElementById("shopform").reset();
                alert("shop created successfully");
            })

    }

}

function logout() {
    window.localStorage.removeItem("tokenadmin");
    location.reload();
}
