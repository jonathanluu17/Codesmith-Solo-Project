const express = require('express');
const showController = require('../controllers/showController');
const router = express.Router();

// initial show request route
router.get('/', showController.getShows);

// add show post request
router.post('/newshow', showController.addShow);

// add show delete request
router.delete('/:showtitle', showController.removeShow,);

module.exports = router;