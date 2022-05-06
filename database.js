const mongoose = require('mongoose');
const uri = "mongodb+srv://jesscode:admin123@cluster0.qcre9.mongodb.net/usersTasks";

mongoose.connect(uri, {
    useMongoClient: true,
    useUnifiedTopology: true
}, () => {
    console.log("Connection to database has been sucessfully!");
});
