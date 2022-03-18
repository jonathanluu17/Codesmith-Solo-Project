const fs = require('fs');
const path = require('path');

const showController = {};

// MIDDLEWARE: get our shows from the json file
showController.getShows = (req, res, next) => {
    fs.readFile(path.resolve(__dirname, '../data/shows.json'), 'UTF-8',
    (err, data) => {
        if (err) {
            return next ({
                log: `showController.getShows: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
                message: { err: 'Error occurred in showController.getShows. Check server logs for more details.'}
            });
        }
        const parsedData = JSON.parse(data);
        res.locals.shows = parsedData;
        return next()
    });
};

// MIDDLEWARE: Add a show
showController.addShow = (req, res, next) => {
    if (!res.locals.shows || typeof res.locals.shows !== 'object'){
        return next({
            log: 'showController.addShow: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.shows to be an object.',
            message: { err: 'showController.addShow: ERROR: Check server logs for details'}
        })
    }
    // check if the show is already in database
    const newShow = req.params.name;
    if (newShow in res.locals.shows) return next();
    // if it's an actual new show we add it to the response and then write the file
    res.locals.shows[newShow] = req.params;
    // update our json file
    fs.writeFile(path.resolve(__dirname, '../data/shows.json'), JSON.stringify(res.locals.shows), 'UTF-8',
    (err, data) => {
        if (err){
            return next({
                log: `showController.addShow: ERROR: error writing to file`,
                message: { err: 'showController.addShow: ERROR: check server logs for details'}
            })
        }
        return next();
    })
}




// MIDDLEWARE: Remove a show
showController.removeShow = (req, res, next) => {
    if (!res.locals.shows || typeof res.locals.shows !== 'object'){
        return next({
            log: 'showController.removeShow: ERROR: Invalid or unfound required data on res.locals object - Expected res.locals.shows to be an object.',
            message: { err: 'showController.removeShow: ERROR: Check server logs for details'}
        })
    }
    // check if name is in our database
    const deleteShow = req.params.name;
    if (!(deleteShow in res.locals.shows)) return next();
    // if it is, remove it from the response and write the file
    delete res.locals.shows[deleteShow];
    fs.writeFile(path.resolve(__dirname, '../data/shows.json'), 'UTF-8',
    (err, data) => {
        if (err){
        return next({
            log: `showController.removeShow: ERROR: error writing to file`,
            message: { err: 'showController.removeShow: ERROR: check server logs for details'}
        })}
        return next();
    })
}

module.exports = showController;