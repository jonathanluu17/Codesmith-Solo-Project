import React, { Component } from 'react';
import { Link } from 'react-router-dom';

// import ShowContainer from './ShowContainer.jsx'


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
                <header classname="pageheader">
                    <h1>All Shows</h1>
                </header>
                <div className="containerssectionMain">
                    <ShowContainer {...sharedProps} platform = "today" platID = "today"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Netflix" platID = "netflix"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Hulu" platID = "hulu"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "HBO" platID = "hbo"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Disney+" platID = "disney"></ShowContainer>
                    <ShowContainer {...sharedProps} platform = "Other" platID = "other"></ShowContainer>
                    <div>show1</div>
                    <div>show2</div>
                </div>
            </section>
        )
    }
}

export default Shows;