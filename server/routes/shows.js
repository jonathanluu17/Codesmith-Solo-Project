const express = require('express');
const showController = require('../controllers/showController');
const router = express.Router();

// initial show request route
router.get('/',
    showController.getShows,
    (req, res) => {
        // send back our shows object
        return res.status(200).json({shows: res.locals.shows});
    }
);

// add show post request
router.post('/:name', showController.getShows, showController.addShow,
    (req, res) => {
        return res.status(200).json({shows: res.locals.shows});
    }
);

// add show delete request
route.delete('/:name', showController.getShows, showController.removeShow,
    (req, res) => {
        return res.status(200).json({shows: res.locals.shows});
    }
);

module.exports = router;