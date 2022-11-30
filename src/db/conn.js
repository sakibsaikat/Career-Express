const mongo = require('mongoose');

mongo.connect('mongodb://0.0.0.0:27017/CareerExpress', {
    useNewUrlParser: true,
    useUnifiedTopology:true
    //useCreateIndex: true,
    //useFindAndModify: false
}).then(() => {
    console.log("Database Connected.");
    
}).catch((err) => {
    console.log(err);
});