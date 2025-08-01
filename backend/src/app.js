import express from "express";
import{ createServer } from "node:http";
import { Server } from "socket.io";
import mongoose from "mongoose";
import cors from "cors";
import { connect } from "node:http2";
import {connectToSocket} from "./controllers/socketManager.js"
import userRoutes from "./routes/users.routes.js";

const app =express();
const server =createServer(app);
const io =connectToSocket(server);

app.set("port",(process.env.PORT || 8000))

app.use(cors());
app.use(express.json({limit:"40kb"}))
app.use(express.urlencoded({limit:"40kb",extended:true}));
app.use("/api/v1/users", userRoutes);

const start =async ()=>{
    const connectionDb= await mongoose.connect("mongodb+srv://abhishek9410dwivedi:Asjok22ab@cluster0.lxrcb.mongodb.net/")
    console.log(`mongo:${connectionDb.connection.host}`)
    server.listen(app.get("port"),()=>{
        console.log("listen on port 8000");

    })
}
start()
