import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import components & stylesheets here



class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            fetchedShows: false,
            allShows: [],
            netflix: [],
            hulu: [],
            hbo: [],
            disney: [],
            other: [],
        };

        //bind methods here
        this.sortShows = this.sortShows.bind(this);
    }

    // on mount, send fetch request to our database to pull the shows
    componentDidMount() {
        fetch('/showdata/', {
            method: 'GET',
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => {
            const parsedData = JSON.parse(res);
            const {netflix, hulu, hbo, disney, other} = this.sortShows(parsedData)
            return this.setState({
                fetchedShows: true,
                allShows: parsedData,
                netflix,
                hulu,
                hbo,
                disney,
                other
            })
        })
        .catch(err => console.log('App.componentDidMount: get shows: ERROR: ', err));
    }


    sortShows(showArray) {
        const sorted = {
            netflix: [],
            hulu: [],
            hbo: [],
            disney: [],
            other: []
        };
        // iterate through our showArray
        for (let i = 0; i <showArray.length; i++){
            if (showArray[i].streamPlat in sorted) sorted[showArray[i].streamPlat].push(showArray[i])
            else sorted.other.push(showArray[i]);
        };
        return sorted;
    };
}


