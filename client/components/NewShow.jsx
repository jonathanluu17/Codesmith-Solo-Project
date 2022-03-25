import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class NewShow extends Component {
    constructor(props) {
        super(props);


        // have a state set up with the values
        this.state = {
            newTitle: '',
            newPlat: 'netflix',
            newEpNum: '',
            newDate: null,
            otherstatus: 'false'
        };
        // bind sendshow method
        this.sendShow = this.sendShow.bind(this);
        this.handleTitleInput=this.handleTitleInput.bind(this);
        this.handlePlatInput=this.handlePlatInput.bind(this);
        this.handleEpInput=this.handleEpInput.bind(this);
        this.handleDateInput=this.handleDateInput.bind(this);
    };
    
    // handle inputs for each state component
    handleTitleInput(e) {
        const { value } = e.target;
        this.setState({ newTitle: value });
    }

    handlePlatInput(e) {
        const { value } = e.target;
        this.setState({ newPlat: value });
    }

    handleEpInput(e) {
        const { value } = e.target;
        this.setState({ newEpNum: value });
    }

    handleDateInput(e) {
        const { value } = e.target;
        this.setState({ newDate: value });
    }

    sendShow() {
        // build form based on state and send it in the request
        const details = {
            showTitle: this.state.newTitle,
            epNumber: this.state.newEpNum,
            streamPlat: this.state.newPlat,
            newDate: this.state.newDate
        };
        let formbody = [];
        for (let property in details){
            let encodedkey = encodeURIComponent(property)
            let encodedvalue = encodeURIComponent(details[property])
            formbody.push(encodedkey + "=" + encodedvalue)
        };
        formbody = formbody.join("&") 

        fetch('/showdata/newshow',{
            method: 'POST',
            body: formbody,
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        })
        .then(res => res.json())
        .then(parsedData => {
            const newshowArr = this.props.allShows
            newshowArr.push(parsedData)
            this.props.addShow(newshowArr)
            alert("Show Added!")
            return this.setState({
                    newTitle: '',
                    newPlat: 'netflix',
                    newEpNum: '',
                    newDate: null,
                    otherstatus: 'false'
            })
        })
    }
    
    // have a add show button that will take the values and send the request on click


    render() {


        // if we have "Other" selected, we can render a manual entry field?
        // have input tag for others
        // select tag for choices
        return (
            <section className="mainsection">
                <Link to="/" className="backlink">
                    <button type="button" className="backbutton">
                        Home
                    </button>
                </Link>
                <div className="newshowcontainer">
                    <label htmlFor="nameinput">Title: </label>
                    <input type="text" id="nameinput" name="nameinput" value={this.state.newTitle} onChange={this.handleTitleInput} /><br></br><br></br>
                    <label htmlFor="platinput">Platform: </label>
                    <select id="platinput" name="platinput" onChange={this.handlePlatInput}>
                        <option value='netflix'>Netflix</option>
                        <option value='hulu'>Hulu</option>
                        <option value='hbo'>HBO</option>
                        <option value='disney'>Disney+</option>
                        <option value='other'>Other</option>
                    </select><br></br><br></br>
                    <label htmlFor="epinput">Episode Number: </label>
                    <input type="number" id="epinput" name="epinput" value={this.state.newEpNum} onChange={this.handleEpInput} /><br></br><br></br>
                    <label htmlFor="dateinput">Updates On: </label>
                    <select id="dateinput" name="dateinput" onChange={this.handleDateInput}>
                        <option value={null}>COMPLETED</option>
                        <option value={0}>Sunday</option>
                        <option value={1}>Monday</option>
                        <option value={2}>Tuesday</option>
                        <option value={3}>Wednesday</option>
                        <option value={4}>Thursday</option>
                        <option value={5}>Friday</option>
                        <option value={6}>Saturday</option>
                    </select>
                </div>
                <div className="sendbuttoncontainer">
                    <button
                    type="button"
                    className="sendbutton"
                    onClick ={() => this.sendShow()}>
                        Add Show
                    </button>
                </div>
            </section>
        )
    }
}

export default NewShow