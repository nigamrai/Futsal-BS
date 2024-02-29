import {} from 'dotenv/config';
import connectToDB from './config/DBConnect.js';
import app from './app.js'
const PORT = process.env.PORT || 5001;
  
app.listen(PORT, async() => {
    await connectToDB();
    console.log(`App is running at http:localhost:${PORT}`);
});