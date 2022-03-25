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
    const { showTitle } = req.body
    // console.log(req.body)
    // const showquery = Object.keys(req.body)[0] 
    Show.findOneAndDelete({showTitle: showTitle}, (err, show) => {
        console.log('DELETING SHOW')
        if (err) return res.status(400).json(err.message);
        if (!show) return res.status(404).json(`Unable to find show ${showTitle}`);
        return res.status(200).json(show)
    })
}

// MIDDLEWARE: INCREASE / DECREASE EPISODE NUMBER
showController.updateShow = (req, res, next) => {
    // MONGOOSE CODE
    const { showTitle, action } = req.body;
    let incrementer 
    if (action === 'increase') incrementer = 1;
    else if (action ==='decrease') incrementer = -1;
    Show.findOneAndUpdate({showTitle: showTitle}, {$inc: {epNumber : incrementer}}, {new:true}, (err, show) => {
        if (err){
            return res.status(400).json(err.message);
        }
        if (!show) return res.status(404).json(`Unable to find show: ${showTitle}`);

        return res.status(200).json(show);
    });
}

module.exports = showController;