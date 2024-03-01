import {} from 'dotenv/config';
import connectToDB from './config/DBConnect.js';
import app from './app.js';
import {v2 as cloudinary} from 'cloudinary';
const PORT = process.env.PORT || 5001;

cloudinary.config({
    cloud_name: 'dacafjeag',
    api_key: '574477448174444',
    api_secret: 'yngLYLzcTwiXqVirsqR0rBKr-GM'
});
  
app.listen(PORT, async() => {
    await connectToDB();
    console.log(`App is running at http:localhost:${PORT}`);
});