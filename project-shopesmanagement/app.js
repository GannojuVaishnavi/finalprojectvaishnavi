const express = require('express');
const app = express();

const bodyparser = require('body-parser');
const routes = require('./routes/shop');
const port = 3330;

app.use(bodyparser.json());
app.use(routes);

app.use("/", express.static('./public'));

app.listen(port, () => {
    console.log("listening to port 3330");
})

