const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion } = require('mongodb');

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


//username: getJustice
//password: aIjlmZjQMOIaSQZY



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Password}@cluster0.jwdgd43.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });



app.get('/', (req, res) => {
    res.send('getjustice server is running')
})

app.listen(port, () => {
    console.log(`GetJustice server running on ${port}`);
})