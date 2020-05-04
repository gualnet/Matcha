import express from "express";
import graphql from "express-graphql";
import mongoose from "mongoose";


const app = express();


const PORT = 4000;
app.listen(PORT, () =>{
  console.log(`Server listening on port ${PORT}`);
});