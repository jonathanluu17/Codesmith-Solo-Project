import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewShow extends Component {
    constructor(props) {
        super(props);
    };

    
    render() {

        return (
            <section className="mainsection">
                <Link to="/" className="backlink">
                    <button type="button" className="backbutton">
                        Home
                    </button>
                </Link>
                <div>HELLOWORLD</div>
            </section>
        )
    }
}

export default NewShow