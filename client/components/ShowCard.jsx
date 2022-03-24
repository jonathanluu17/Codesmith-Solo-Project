import React from 'react';

// require icon for removing card

const ShowCard = ({
    allShows, showTitle, epNumber, streamPlat, newDate, deleteCard, platID
}) => {

    //set up show details here, won't have a newDate if it doesnt exist
    let showDetailList;
    if (newDate && platID === 'other'){
        showDetailList = (
            <ul className="showdetails">
                <li className="showdetail">Streaming On: {streamPlat}</li>
                <li className="showdetail">Current Episode: {epNumber}</li>
                <li className="showdetail">New Episodes out: {newDate}</li>
            </ul>
        )
    } else if(!newDate && platID === 'other'){
        showDetailList=(
            <ul className="showdetails">
                <li className="showdetail">Streaming On: {streamPlat}</li>
                <li className="showdetail">Current Episode: {epNumber}</li>
            </ul>
        )      
    } else if(newDate && platID !=='other'){
        showDetailList=(
            <ul className="showdetails">
                <li className="showdetail">Current Episode: {epNumber}</li>
                <li className="showdetail">New Episodes out: {newDate}</li>
            </ul>
        )   
    } else if (!newDate && platID !== 'other'){
        showDetailList=(
            <ul className="showdetails">
                <li className="showdetail">Current Episode: {epNumber}</li>
            </ul>
        )   
    }

    return (
        <article className = "showcard">
            <div className = "showcardheadercontainer">
                <div>
                    <h3 className ="showtitle">{showTitle}</h3>
                    <button
                    type = "button"
                    className = "deletebutton"
                    onClick ={() => deleteCard(showTitle)}>
                        Remove
                    </button>
                </div>
            </div>
            {showDetailList}
        </article>
    )
}
export default ShowCard;