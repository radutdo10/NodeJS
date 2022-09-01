require('dotenv').config();

const mongoose = require('mongoose');
const DB = process.env.DATABASE.replace("<password>", process.env.DATABASE_PASSWORD);
mongoose.connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false
}).then(con => console.log(con.connections));

const app = require('./app');
app.listen(process.env.PORT, () => console.log(`App running on port ${process.env.PORT}...`)); // process.env.PORT reprezinta variabila de mediu adaugata prin fisierul config.env
