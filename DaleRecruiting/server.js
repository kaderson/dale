const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT || 3000

const corsOption = {
    origin: '*',
    optionsSuccessStatus: 200
}
    
app.use(bodyParser.json());
app.use(cors(corsOption));

app.use(bodyParser.urlencoded(
    { extended: false }
));

var routes = require('./routes/app.routes');

app.use('/api', routes);

app.listen(port, function(){
    console.log("Server is running on port: " + port);
    }
);
