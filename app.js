const express = require('express');
const app = express();
const mongoose = require('mongoose')
const db = require('./config/keys')
var cors = require('cors')
const path = require('path');
const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');
const PORT =process.env.PORT || 5000
const options = {
    swaggerOptions: {
      authAction :{ authentication: {name: "authentication", schema: {type: "apiKey", in: "header", name: "Authorization", description: ""}, value: "Bearer <JWT>"} }
    }
  };
app.use(express.static(path.resolve('../server')));
app.use(cors())
app.use(express.json())
app.use(require('./routes/auth'))
app.use(require('./routes/category'))
app.use(require('./routes/unit'))
app.use(require('./routes/area'))
app.use(require('./routes/item'))
app.use(require('./routes/regulateItems'))
app.use(require('./routes/complaint'))
app.use( '/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

if(process.env.NODE_ENV=='production'){
    app.use(express.static('client/build'))
    const path = require('path')
    app.get("*", (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client','build','index.html'))
    });
}

app.listen(PORT,()=>{
    console.log('Port is running on PORT: ' , PORT)
})