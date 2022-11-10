const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config();


const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());


const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_Password}@cluster0.jwdgd43.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run () {
    try{
        const serviceCollection = client.db('getjustice').collection('services');
        const reviewCollection = client.db('getjustice').collection('review');

        //display 3 services
        app.get('/limitedservice', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const services = await cursor.limit(3).toArray();
            res.send(services)
        });

        //display all service data
        app.get('/allservices', async(req, res) => {
            const query = {};
            const cursor = serviceCollection.find(query)
            const services = await cursor.toArray();
            res.send(services)
        });

        //load service data by id
        app.get('/services/:id', async(req, res) => {
            const id = req.params.id;
            const query = {_id: ObjectId(id)};
            const selectedService = await serviceCollection.findOne(query);
            res.send(selectedService);
        })

        //post review data
        app.post('/review', async(req, res) => {
            const review = req.body;
            const result = await reviewCollection.insertOne(review);
            res.send(result);
        });

        //get review data
        app.get('/review', async(req, res) => {
            const query = {};
            const cursor = reviewCollection.find(query)
            const review = await cursor.toArray();
            res.send(review)
        });
    }
    finally{

    }
}
run()


app.get('/', (req, res) => {
    res.send('getjustice server is running')
})

app.listen(port, () => {
    console.log(`GetJustice server running on ${port}`);
})