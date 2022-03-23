import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';

// import components & stylesheets here
import Shows from './components/Shows';
import NewShow from './components/NewShow';


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
        this.addShow = this.addShow.bind(this);
        this.deleteShow = this.deleteShow.bind(this);
    }

    // on mount, send fetch request to our database to pull the shows
    // set our state within fetch request
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
        .catch(err => console.log('App.componentDidMount: getshows: ERROR: ', err));
    }

    // add methods
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


    addShow(allShows) {
        return this.setState({ allShows });
    }

    deleteShow(allShows) {
        return this.setState({ allShows });
    }

    // render
    render () {
        // show a loading page until shows are fetched
        if (!this.state.fetchedShows) return (
            <div>
                <h1>Loading data, please wait...</h1>
            </div>
        );
        const sharedProps = {
            allShows: this.state.allShows,
            netflix: this.state.netflix,
            hulu: this.state.hulu,
            hbo: this.state.hbo,
            disney: this.state.disney,
            other: this.state.other,
        };
        return (
            <div className="router">
                <main>
                    <Switch>
                        <Route
                        exact
                        path="/"
                        component ={
                            () => <Shows
                            {...sharedProps}
                            deleteShow={this.deleteShow}
                            />
                        }
                        />
                        <Route
                        exact
                        path="/newshow"
                        component={
                            () => <NewShow
                                {...sharedProps}
                                addShow={this.addShow}
                                />   
                        }
                        />
                    </Switch>
                </main>
            </div>
        )
    }
};

export default App;

