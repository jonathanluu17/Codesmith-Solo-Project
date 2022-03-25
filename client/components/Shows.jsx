import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ShowContainer from './ShowContainer.jsx'


class Shows extends Component {
    constructor(props) {
        super(props);



        // bind methods here

    }


    // add methods here



    // render
    render() {
        const sharedProps = {...this.props};

        return (
            <section className = "mainsection">
                <Link to="/newshow">
                    <button
                    type="button"
                    className="addshowbtn"
                    >
                        Add Show
                    </button>
                </Link>
                <div className="containerssectionMain">
                    <ShowContainer {...sharedProps} platform = "today" platID = "today"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Netflix" platID = "netflix"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Hulu" platID = "hulu"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "HBO" platID = "hbo"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Disney+" platID = "disney"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Other" platID = "other"></ShowContainer>
                </div>
            </section>
        )
    }
}

export default Shows;