const mongo = require('mongoose');

mongo.connect('mongodb://localhost:27017/CareerExpress', {
    useNewUrlParser: true,
    useUnifiedTopology:true
}).then(() => {
    console.log("Database Connected.");
    
}).catch((err) => {
    console.log(err);
});