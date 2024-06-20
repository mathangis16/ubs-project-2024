import dotenv from 'dotenv'; //from chatgpt
dotenv.config(); // Load environment variables from .env file
import app from "./app.js";
import {connectToDatabase} from "./db/connection.js";

const PORT= process.env.PORT || 3000;
connectToDatabase()  //connections and listeners
  .then(() => {
    app.listen(PORT, ()=>
        console.log(`Server is open and connected to database on port ${PORT}`)
      );
  })
  .catch((err) => console.log(err));

