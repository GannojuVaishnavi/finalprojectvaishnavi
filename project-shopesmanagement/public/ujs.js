var token;
window.onload = function () {
  token = localStorage.getItem("token");
  console.log(token);
  if (!token) {

    window.location.href = "index.html";
    console.log(token)
  }
  else {

    getuserlocation();

  }
}

function userlocation() {
  const location = document.getElementById("enter-location").value;
  console.log(location);
  getAllShopsloc(location);
}


function getAllShopsloc(location) {

  // console.log(location);
  const token = localStorage.getItem("token");
  fetch(`http://localhost:3330/shops/${location}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer ' + token
    }
  })
    .then(response => response.json())
    .then(data => {
      displayShopsloc(data);
    
    })
    .catch(error => console.error('Error:', error));
}




function displayShopsloc(shops) {
  console.log(shops);
  var container = document.getElementById("container");
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }

  shops.forEach(shop => {
    console.log(shop);
    const box = document.getElementById("container");
    // box.style.backgroundColor="blue";
    const div = document.createElement("div");
    // div.style.backgroundColor="blue";
    const moredetails=document.getElementById("moredetails")
    const innerdiv = document.createElement("div");
    // innerdiv.style.visibility = "hidden";
    div.id = shop.id;
    div.className = "box"
    const name = document.createElement("H4");
    const address = document.createElement("p");
    name.innerHTML = `<u>${shop.name}</u>`;
    address.innerHTML = `<i class="fa-solid fa-location-dot"></i> ${shop.location}`;
    const moredetailsbutton = document.createElement("button");
// moredetailsbutton.href="#moredetails";
    moredetailsbutton.innerHTML = "more details";



    const rating = document.createElement("p");
    rating.innerHTML = `<i class="fa-solid fa-star"></i>   ${shop.rating}`
    const contact = document.createElement("p");
    contact.innerHTML = `<i class="fa-solid fa-phone-volume"></i>  ${shop.contact_number}`
    const website = document.createElement("a");
    website.href = shop.website;
    website.innerHTML=`<i class="fa-solid fa-earth-americas"></i>${shop.website} `;
    const openinghrs = document.createElement("p");
    openinghrs.innerHTML = `<i class="fa-solid fa-door-open" ></i> ${shop.opening_hours}`
    const link = document.createElement("a");
    link.href = shop.on_maps;
    link.target = "_blank";
    link.innerHTML = `<i class="fa-solid fa-link"></i> see on maps `
    link.style.color = "sky blue";
    div.appendChild(name);
    div.appendChild(address);
    div.appendChild(moredetailsbutton);
box.appendChild(div);


moredetailsbutton.onclick = function () {

      const id = div.id;
      const remove = document.getElementById(id);

      document.getElementById("detailsandmap").style.visibility = "visible";
      // document.getElementById("mapContainer").style.visibility = "visible";
      // document.getElementById("mapContainer").style.backgroundColor = "black";

      document.getElementById("container").removeChild(remove);
      console.log(id);


      while (moredetails.firstChild) {
        moredetails.removeChild(moredetails.firstChild);
      }

        innerdiv.appendChild(name);
        innerdiv.appendChild(address);
        innerdiv.appendChild(rating);
        innerdiv.appendChild(contact);
        innerdiv.appendChild(website);
        innerdiv.appendChild(openinghrs);
        // innerdiv.appendChild(link);
        moredetails.appendChild(innerdiv);

        const mapContainer = document.getElementById("mapContainer");
        var divmapcontainer = document.createElement("div");

        while (mapContainer.firstChild) {
          mapContainer.removeChild(mapContainer.firstChild);
        }

const src=shop.src;
        divmapcontainer.innerHTML = `<iframe src=${src} width="600" height="500" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>`;
        mapContainer.appendChild(divmapcontainer);

      }
    }
  
  )
}




function logout() {
  window.localStorage.removeItem("token");
  location.reload();
}


function getuserlocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      const { latitude, longitude } = position.coords;
      const url = `https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`;
      fetch(url).then(res => res.json()).then(data => {
        console.log(data);
        console.log(data.address.state);
        getAllShopsloc(data.address.state);

      }).catch(() => {
        console.log("error fetching data");
      });

    }, (error) => {
      console.error(error);
    });
  }
};


