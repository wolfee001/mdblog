const app = require('./app');
const mongoose = require('mongoose');

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log('DBConnection successfull!');
    app.listen(process.env.PORT || 5000, () => {
      console.log('Backend server is running!');
    });
  })
  .catch(err => console.log(err));
