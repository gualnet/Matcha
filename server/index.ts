import express from "express";
import graphqlHTTP from 'express-graphql' ;
// import mongoose from "mongoose";
import db from './src/database/config';

import userSchema from "./src/graphql/User/schema";



const app = express();


async function main(){
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