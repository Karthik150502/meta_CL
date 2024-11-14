import express, { Application } from "express";
import indexRouter from "./routes/v1/index"





let app: Application = express();
app.use(express.json())



// v1 APIs
app.use("/api/v1", indexRouter);




app.listen(process.env.PORT || 3000)












