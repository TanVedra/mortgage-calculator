const Router = require('express');
const route = Router();
const getAllMortgage = require('../controllers/getAllMortgage');
const deleteMortgage = require('../controllers/deleteMortgage');
const updateMortgage = require('../controllers/updateMortgage');
const createMortgage = require('../controllers/createMortgage');

route.get('/', getAllMortgage);
route.post('/', createMortgage);
route.put('/', updateMortgage);
route.delete('/', deleteMortgage);

module.exports = route;
