import express from "express";
import graphqlHTTP from 'express-graphql' ;
import cors from 'cors';

// import mongoose from "mongoose";
import db from './src/database/config';

import userSchema from "./src/graphql/User/schema";




async function main(){

  const app = express();

  app.use(cors())

  await db.initialiseConnection()
  
  app.use("/graphql", graphqlHTTP({
    schema: userSchema,
    graphiql: true,
  }));
  
  const PORT = 4000;
  app.listen(PORT, () =>{
    console.log(`Server listening on port ${PORT}`);
  });
}

main();