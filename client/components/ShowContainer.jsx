import React, { Component } from 'react';

import ShowCard from './ShowCard';

class ShowContainer extends Component {
    constructor(props){
        super(props);
        // set state?

        // bind methods

    }

    render (){
        // Get date values and generate date object
        const today = new Date();
        const fullDate = today.toLocaleDateString("en-US", {weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'});
        const dayCode = today.getDay();
        const dateObj = {
            '0': 'Sunday',
            '1': 'Monday',
            '2': 'Tuesday',
            '3': 'Wednesday',
            '4': 'Thursday',
            '5': 'Friday',
            '6': 'Saturday'
        };
        // build showarray based on platform
        let showArr = []
        if (this.props.platID in this.props){
            showArr = this.props[this.props.platID];
        }else {
            // not one of our preset categories, so it's our "today" container
            // iterate through our allShows array and pull the ones whose 'newDate' field matches today

            // get today's date (formatted for readability) and day code 

            // look for dayCode
            for (let i = 0; i < this.props.allShows.length; i++){
                if (this.props.allShows[i].newDate === dayCode) showArr.push(this.props.allShows[i])
            }
        }
        // build our array of showcard components
        const showCards = [];
        for (let i = 0; i < showArr.length; i++){
            showCards.push(<ShowCard
            allShows = {this.props.allShows}
            showTitle = {showArr[i].showTitle}
            epNumber = {showArr[i].epNumber}
            streamPlat = {showArr[i].streamPlat}
            newDate = {dateObj[showArr[i].newDate]}
            deleteShow = {this.props.deleteShow}
            >
            </ShowCard>)
        }
        // return a special container for "out today"
        if (this.props.platID === 'today') return (
            <section className = "containersection">
                <header className = "dateheader">
                   <h2>{fullDate}: Out Today</h2> 
                </header>
                <div className = "showcardsection">
                    {showCards}
                </div>
            </section>
        );

        return (
            <section className = "containersection">
                <header className = "platformheader">
                    <h2>{this.props.platform}</h2>
                </header>
                <div className = "showcardsection">
                    {showCards}
                </div>
            </section>
        );
    }
}



export default ShowContainer;