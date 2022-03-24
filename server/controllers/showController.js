const Show = require('../models/showModel')
const showController = {};

// MIDDLEWARE: get our shows from the json file
showController.getShows = (req, res, next) => {

    // MONGOOSE CODE
    Show.find({}, (err, allShows) => {
        console.log('GETTING SHOWS')
        if (err) return res.status(400).json(err.message);
        return res.status(200).json(allShows);
    })
};

// MIDDLEWARE: Add a show
showController.addShow = (req, res, next) => {
    // MONGOOSE CODE
    const { showTitle, epNumber, streamPlat, newDate } = req.body;
    Show.create({showTitle, epNumber, streamPlat, newDate}, (err, show) => {
        console.log('ADDING SHOW')
        if (err) return res.status(400).json(err.message);
        return res.status(200).json(show);
    })
}


// MIDDLEWARE: Remove a show
showController.removeShow = (req, res, next) => {

    // MONGOOSE CODE
    // const { showTitle } = req.body
    // console.log(req.body)
    const showquery = Object.keys(req.body)[0] 
    Show.findOneAndDelete({showTitle: showquery}, (err, show) => {
        console.log('DELETING SHOW: ', show)
        if (err) return res.status(400).json(err.message);
        if (!show) return res.status(404).json(`Unable to find show ${showquery}`);
        return res.status(200).json(show)
    })
}

module.exports = showController;