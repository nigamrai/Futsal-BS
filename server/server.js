import { v2 as cloudinary } from 'cloudinary';
import { } from 'dotenv/config';
import server from './app.js';
import connectToDB from './config/DBConnect.js';
const PORT = process.env.PORT || 5001;


cloudinary.config({
    cloud_name: 'dacafjeag',
    api_key: '574477448174444',
    api_secret: 'yngLYLzcTwiXqVirsqR0rBKr-GM'
});
  
server.listen(PORT, async() => {
    await connectToDB();
    console.log(`App is running at http:localhost:${PORT}`);
});