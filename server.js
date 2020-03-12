const express = require('express');
const connectDB = require('./config/db');
const path = require('path');

const app = express();

//connect database
connectDB();

//init middleware
app.use(express.json({ extended: false}));

//Define routes
app.use('/api/users', require('./routes/api/users'));
app.use('/api/auth', require('./routes/api/auth'));
app.use('/api/posts', require('./routes/api/posts'));
app.use('/api/profile', require('./routes/api/profile'));

// serve static assets in production
if(process.env.NODE_ENV === 'production') {
  //set static folder
  app.use(express.static('frontend/build'));

  app.get('*', (req, res) =>{
    res.sendFile(path.resolve(_dirname, 'frontend', 'build', 'index.html'));
  });
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
