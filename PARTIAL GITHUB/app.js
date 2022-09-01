const express = require("express");
const morgan = require('morgan');

const app = express();

// imports (creating) routes
const tourRouter = require("./routes/tourRoutes");
const userRouter = require("./routes/userRoutes");

// 1) MIDDLEWARES
if(process.env.NODE_DEV === "development"){
    app.use(morgan("dev"));
}

app.use(express.json()); // aceasta linie este un middleware, reprezinta datele din body in format JSON in metoda POST

// serving static files
// felul in care este facuta accesarea este http://127.0.0.1:3000/overview.html#, fiindca adresa principala este data in express.static()
// accesarea se face numai pentru fisiere, nu si pentru foldere ce contin fisiere http://127.0.0.1:3000/img nu va functiona, dar http://127.0.0.1:3000/img/img.png va functiona
app.use(express.static(`${__dirname}/public`)); // browserul nu poate accesa fisierul overview.html sau orice alt fisier fiindca nu era un middleware ca sa gestioneze ruta asta, acest middlware face posibila accesarea

app.use((req, res, next) => { // this is added to middleware stack
    req.requestTime = new Date().toISOString();
    next();
});

app.use((req, res, next) => { // this is added to middleware stack
    console.log("hello from middleware ❤️❤️");
    next();
});


// mounting router for each resource
app.use('/api/v1/tours', tourRouter); // tourRouter este un middleware pentru adresa din primul parametru
app.use('/api/v1/users', userRouter); // tourRouter este un middleware pentru adresa din primul parametru


module.exports = app;