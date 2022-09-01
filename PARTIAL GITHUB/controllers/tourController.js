const fs = require('fs');

const tours = JSON.parse(fs.readFileSync(`${__dirname}/../dev-data/data/tours-simple.json`));

// create a checkbody middleware
// check if body contains the name and price property
// if not send 400 bad request
// add it to the post handler stack
exports.checkBody = (req, res, next) => { // va fi apelata in post createTour
    if(!req.body.name || !req.body.price){
        return res.status(400).json({
            status: "failed",
            message: "Missing name or price"
        });
    }

    next(); // va trece la urmatorul middleware din stack, care va fi createTour, vezi #64
}

exports.checkID = (req, res, next, val) => {
    console.log(`The value of id param is ${val}`); // din ce am putut observa, req.params.id este asemanator parametrului "val"

    if(+req.params.id > tours.length)
    {
        return res.status(404).json({
            status: 'failed',
            message: "Invalid ID"
        }); 
    }

    next();
};

// router handlers
exports.getAllTours = (req, res) => {
    console.log(req.requestTime);
    res.status(200).json({
        status: 'success',
        requestedAt: req.requestTime,
        results: tours.length,
        data: {
            tours
        }  
    });
};

exports.getTour = (req, res) => { // :id este un placeholder url param, si se scrie cu : in fata, :optionalparam? este un parametru optional, marcat obligatoriul prin ? la sfarsitul numelui paramului
    const tour = tours.find(el => el.id === +req.params.id); // tours este un array, ce are ca una dintre functii, functia find(callback(el));

    // conditia (+req.params.id > tours.length || !tour) a fost mutata in checkID

    res.status(200).json({
        status: 'success',
        id: tour.id,
        data: {
            tour
        }
    });
};

exports.createTour = (req, res) => {
    // conditia (+req.params.id > tours.length || !tour) a fost mutata in checkID

    // console.log(req.body); // requestul trimis de postman
    const newId = tours[tours.length - 1].id + 1;
    const newTour = Object.assign({id: newId}, req.body);
    tours.push(newTour);

    fs.writeFile(`${__dirname}/dev-data/data/tours-simple.json`, JSON.stringify(tours), err => {
        res.status(201).json({
            status: "succes",
            data: {
                newTour
            }
        });
    });

    // res.send('Done'); res nu poate fi trimis de 2 ori, o data prin send si o data prin json
};

exports.updateTour = (req, res) => {
    // conditia (+req.params.id > tours.length || !tour) a fost mutata in checkID
    res.status(200).json({
        status: "succes",
        body: {
            tour: "<Updated tour here...>"
        }
    });
};

exports.deleteTour = (req, res) => {
    // conditia (+req.params.id > tours.length || !tour) a fost mutata in checkID
    res.status(204).json({
        status: "succes",
        message: "lipsa continut",
        data: null
    });
};

