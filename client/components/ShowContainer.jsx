import factoryWithThrowingShims from 'prop-types/factoryWithThrowingShims';
import React, { Component } from 'react';

import ShowCard from './ShowCard.jsx';

class ShowContainer extends Component {
    constructor(props){
        super(props);
        // set state?

        // bind methods
        this.deleteCard = this.deleteCard.bind(this);
        this.updateCard = this.updateCard.bind(this);
    }

    // set up remove button?
    // needs to send a delete request to /showdata (responds with json object of show we remove)
    // {showTitle: ... epNumber: ... streamPlat: ...}
    // run this.props.deleteShow with the res object removed
    deleteCard(showname) {
        // build our form body
        const details = {
            showTitle: showname
        };
        let formbody = [];
        for (let property in details){
            let encodedkey = encodeURIComponent(property)
            let encodedvalue = encodeURIComponent(details[property])
            formbody.push(encodedkey + "=" + encodedvalue)
        };
        formbody = formbody.join("&") 

        fetch(`/showdata/${showname}`, {
            method: 'DELETE',
            body: formbody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
         .then(res => res.json())
         .then(parsedData => {
            const newshowArr = this.props.allShows;
            for (let i = 0; i < newshowArr; i++){
                if (parsedData.showTitle === newshowArr[i].showTitle){
                    newshowArr.splice(i,1);
                };
            }
            this.props.deleteShow(newshowArr)
            return window.location.reload()
         })
         .catch(err => console.log('deleteShow: ERROR: ', err)); 
    }


    // set up update episode number button
    updateCard(showname, input){
        const details = {
            showTitle: showname,
            action: input
        };
        let formbody = [];
        for (let property in details){
            let encodedkey = encodeURIComponent(property)
            let encodedvalue = encodeURIComponent(details[property])
            formbody.push(encodedkey + "=" + encodedvalue)
        };
        formbody = formbody.join("&")
        
        fetch(`/showdata/${showname}`, {
            method: 'POST',
            body: formbody,
            headers:{
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(parsedData => {
            const newshowArr = this.props.allShows;
            for (let i = 0; i < newshowArr; i++){
                if (parsedData.showTitle === newshowArr[i].showTitle){
                    newshowArr.splice(i, 1, parsedData);
                };
            }
            this.props.updateShow(newshowArr)
            return window.location.reload()
        })
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
            deleteCard = {this.deleteCard}
            updateCard = {this.updateCard}
            platID = {this.props.platID}
            >
            </ShowCard>)
        }

        // if (showCards.length === 0) return (
        //     <div className = "noshowmessage">No shows available</div>
        // )
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