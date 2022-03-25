import React, { Component } from 'react';

// require icon for removing card

// const ShowCard = ({
//     allShows, showTitle, epNumber, streamPlat, newDate, deleteCard, platID
// }) => {

class ShowCard extends Component {
    constructor(props){
        super(props)
        this.state = {
            epNum: this.props.epNumber
        }

        // bind episode updater here

    }
    //set up show details here, won't have a newDate if it doesnt exist

    render(){
        const converter = {
            netflix: 'Netflix',
            hulu: 'Hulu',
            hbo: 'HBO',
            disney: 'Disney+'
        }

    let showDetailList;
    if (this.props.platID === 'today'){
        showDetailList = (
            <ul className="showdetails">
                <li className="showdetail">Streaming On: {converter[this.props.streamPlat]}</li>
                <li className="showdetail">Current Episode: {this.props.epNumber}</li>
                <li className="showdetail">New Episodes out: {this.props.newDate}</li>
            </ul>
        )
    }
    else if (this.props.newDate && this.props.platID === 'other'){
        showDetailList = (
            <ul className="showdetails">
                <li className="showdetail">Streaming On: {this.props.streamPlat}</li>
                <li className="showdetail">Current Episode: {this.props.epNumber}</li>
                <li className="showdetail">New Episodes out: {this.props.newDate}</li>
            </ul>
        )
    } else if(!this.props.newDate && this.props.platID === 'other'){
        showDetailList=(
            <ul className="showdetails">
                <li className="showdetail">Streaming On: {this.props.streamPlat}</li>
                <li className="showdetail">Current Episode: {this.props.epNumber}</li>
            </ul>
        )      
    } else if(this.props.newDate && this.props.platID !=='other'){
        showDetailList=(
            <ul className="showdetails">
                <li className="showdetail">Current Episode: {this.props.epNumber}</li>
                <li className="showdetail">New Episodes out: {this.props.newDate}</li>
            </ul>
        )   
    } else if (!this.props.newDate && this.props.platID !== 'other'){
        showDetailList=(
            <ul className="showdetails">
                <li className="showdetail">Current Episode: {this.props.epNumber}</li>
            </ul>
        )   
    }

    return (
        <article className = "showcard">
            <div className = "showcardheadercontainer">
                <div>
                    <h3 className ="showtitle">{this.props.showTitle}</h3>
                    <button
                    type = "button"
                    className = "deletebutton"
                    onClick ={() => this.props.deleteCard(this.props.showTitle)}>
                        Remove
                    </button>
                </div>
            </div>
            {showDetailList}
            <div className = "updatebuttons">
                <button
                type = "button"
                className = "minusbutton"
                onClick = {() => this.props.updateCard(this.props.showTitle, 'decrease')}>
                     - 
                </button>
                <button
                type = "button"
                className = "plusbutton"
                onClick = {() => this.props.updateCard(this.props.showTitle, 'increase')}>
                     + 
                </button>
            </div>
        </article>
    )
}
}
export default ShowCard;