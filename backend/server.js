const app = require('./app');  
const http = require('http');
require('dotenv').config();
const { connectDB, configs } = require('./config')

connectDB();  
const server = http.createServer(app);

// Start the server
server.listen(configs.port, () => {
  console.log(`Server is running on port ${configs.port}`);
});
