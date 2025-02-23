require('dotenv').config();
const app = require('./app');  
const http = require('http');

const { connectDB, configs } = require('./config')

connectDB();  
const server = http.createServer(app);


server.listen(configs.port, () => {
  console.log(`Server is running on port ${configs.port}`);
});
