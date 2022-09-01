const express = require("express");
const tourController = require('./../controllers/tourController');

const router = express.Router(); // este folosit tourRouter in loc de app (pentru tururi)

// router.param('id', (req, res, next, val) => { // este un middleware ce functioneaza daca un anumit parametru exista intr-un url specificat la montarea route-ului. val reprezinta valoarea parametrului id in functia param()
//     console.log(`Tour id is ${val}`); // acest param middleware este valabil doar pentru subaplicatia "tourRoutes", ce reprezinta resursa "tours"
//     next();
// });

router.param('id', tourController.checkID); // este primul middleware care se executa inaintea celor de mai jos middleware-uri

router.route('/').get(tourController.getAllTours)
                 .post(tourController.checkBody, tourController.createTour); // #64

router.route('/:id/:optionalparam?').get(tourController.getTour) // testRouter ruleaza numa prin adresa specificata in primul parametru, asadar poate fi scoase adresele, si puse numai cu param-ul
                                    .patch(tourController.updateTour)
                                    .delete(tourController.deleteTour);

module.exports = router;

/* exemplu fara inlantuire
app.get('/api/v1/tours', getAllTours);
app.post('/api/v1/tours', createTour);
app.get('/api/v1/tours/:id/:optionalparam?', getTour);
app.patch('/api/v1/tours/:id', updateTour);
app.delete('/api/v1/tours/:id', deleteTour);

// exemplu cu inlantuire
router.route('/:id/:optionalparam?').get(getTour)
                                    .patch(updateTour)
                                    .delete(deleteTour);
*/