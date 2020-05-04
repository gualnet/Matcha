import express from "express";
import graphqlHTTP from 'express-graphql' ;
import mongoose from "mongoose";

import userSchema from "./src/graphql/User/schema";



const app = express();

app.use("/graphql", graphqlHTTP({
  schema: userSchema,
  graphiql: true,
}));

const PORT = 4000;
app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`);
});