import { MongoClient } from 'mongodb';
import mongoose from "mongoose";
import nextConnect from 'next-connect';

let connectionString: string = process.env.MONGODB_CONNECTION_STRING || ""

/*const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});*/

async function database(req, res, next) {
  //console.log(client)
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(con => {
    console.log("connected to database!")
    next()
  }).catch(err => console.log("Failed to connect to the database!"))
  /*if (!client) await client.connect();
  req.dbClient = client;
  req.db = client.db('Exalted');
  next();*/
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;