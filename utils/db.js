const mongoose = require('mongoose');
mongoose.set('strictQuery', true);

mongoose.connect('mongodb://127.0.0.1:27017/PointOfSale', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('err', (err) => {
    console.log('Error connecting to database', err);
})
db.once('open', () => {
    console.log('Connected to database');
})