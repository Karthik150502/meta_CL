import express, { Application } from "express";
import indexRouter from "./routes/v1/index"
import cors from "cors"




let app: Application = express();
app.use(express.json())
app.use(cors({
    origin: "*",
    credentials: true
}));


// v1 APIs
app.use("/api/v1", indexRouter);




app.listen(process.env.PORT || 3001)












