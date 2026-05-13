import {v2 as cloundinary } from "cloudinary"
import {config} from  "dotenv"
config();

cloundinary.config({
  cloud_name: process.env.CLOUNDINARY_CLOUD_NAME,
  api_key: process.env.LOUNDINARY_API_KEY,
  api_secret: process.env.CLOUNDINARY_API_SECRET

});

export default cloundinary