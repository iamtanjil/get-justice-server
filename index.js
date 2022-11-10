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
        const addedServiceCollection = client.db('getjustice').collection('addedService');

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

        //get review data by query
        app.get('/myreview', async (req, res) => {
            let query = {};

            if (req.query.email) {
                query = {
                    email: req.query.email
                }
            }
            const cursor = reviewCollection.find(query);
            const review = await cursor.toArray();
            res.send(review);
        });

        //delete review
        app.delete('/review/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const result = await reviewCollection.deleteOne(query);
            res.send(result);
        })

        //post addedService Data
        app.post('/addedservice', async (req, res) => {
            const order = req.body;
            const result = await addedServiceCollection.insertOne(order);
            res.send(result);
        });

        //get added service data
        app.get('/addedservice', async(req, res) => {
            const query = {};
            const cursor = addedServiceCollection.find(query)
            const addedService = await cursor.toArray();
            res.send(addedService)
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