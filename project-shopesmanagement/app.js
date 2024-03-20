const express = require('express');
const app = express();
const cors = require('cors');
const bodyparser = require('body-parser');
const routes = require('./routes/shop');
const port = 3306;

app.use(cors({
    credentials:true,
    origin:["https://finalprojectvaishnavi-16.onrender.com"]
}));
app.use(bodyparser.json());
app.use(routes);

app.use("/", express.static('./public'));

app.listen(port, () => {
    console.log("listening to port 3330");
})

