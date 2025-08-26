const express = require('express');
const cookieParser = require('cookie-parser');
const connect_DB = require('../src/config/mongoose')
const userRoutes = require('./routes/user.route')
const taskRoutes = require('./routes/task.route')
connect_DB();

const app = express();
app.use(express.json());
app.use(cookieParser())
app.use('/users', userRoutes)
app.use('/tasks', taskRoutes)


app.listen(3001, () => {
  console.log("Server is running on port 3001")
})
