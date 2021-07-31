import mongoose from "mongoose";
import nextConnect from 'next-connect';

let connectionString: string = process.env.MONGODB_CONNECTION_STRING || ""

async function database(req: any, res: any, next: any) {
  mongoose.connect(connectionString, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  }).then(con => {
    console.log("connected to database!")
    next()
  }).catch(err => console.log("Failed to connect to the database!"))
}

const middleware = nextConnect();

middleware.use(database);

export default middleware;