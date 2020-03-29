import React from 'react';

import InputBase from '@material-ui/core/InputBase';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';

import NavigationBar from './core/navigation/NavigationBar';
import SearchIcon from '@material-ui/icons/Search';

class About extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            url: "",
            loading: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.keyword = this.keyword.bind(this);
        this.loadingOff = this.loadingOff.bind(this);
        this.loadingOn = this.loadingOn.bind(this);
        this.summarize = this.summarize.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        if (value.slice(-1) != '\n') {
            this.setState({ url: value});
        }
    }

    handleKeyPress(e) {
        if (e.key === "Enter") {
            let input = this.state.url;
            if(input.slice(0, 4) == "http"){
                this.summarize();
            }
            else{
                this.keyword();
            }
        }
    }

    keyword(){
        this.loadingOn();
        fetch('/api/v1/generate_keyword/', {
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({
                "url": this.state.url,
                "functions": [
                    'keyword'
                ]
            })
        })
        .then((response) => {
            this.loadingOff();
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (data.response == "success") {
                localStorage.setItem('url', JSON.stringify(this.state.url));
                if (data.keyword === []) {
                    data.keyword = "We couldn't generate a keyword search for that keyword.";
                }
                localStorage.setItem('keyword', JSON.stringify(data.keyword));
                window.location.href = '/keyword';
            }
        })
        .catch((error) => console.log(error));
    }

    loadingOff() {
        this.setState({ 'loading': false });
    }

    loadingOn() {
        this.setState({ 'loading': true });
    }

    summarize() {
        this.loadingOn();
        fetch('/api/v1/generate_combined/', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({
                "url": this.state.url,
                "functions": [
                    'extract',
                    'hashtags',
                    'recommendations',
                    'summary'
                ]
            })
        })
        .then((response) => {
            this.loadingOff();
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (data.response == "success") {
                localStorage.setItem('url', JSON.stringify(this.state.url));
                if (data.extract === {}) {
                    data.extract = "We couldn't generate an extract for that URL.";
                }
                localStorage.setItem('extract', JSON.stringify(data.extract));
                if (data.hashtags === []) {
                    data.hashtags = "We couldn't generate hashtags for that URL.";
                }
                localStorage.setItem('hashtags', JSON.stringify(data.hashtags));
                if (data.recommendations === "") {
                    data.recommendations = "We couldn't generate any recommendations for that URL.";
                }
                localStorage.setItem('recommendations', JSON.stringify(data.recommendations));
                if (data.summary === "") {
                    data.summary = "We couldn't generate a summary for that URL.";
                }
                localStorage.setItem('summary', JSON.stringify(data.summary));
                window.location.href = '/summary';
            }
        })
        .catch((error) => console.log(error));
    }

    render() {
        return (
            <div>
                <NavigationBar id="navigation-bar" loadingOn={this.loadingOn} loadingOff={this.loadingOff} />
                <Container style={{ zIndex: '14' }}>
                    <div id="welcome-section">
                        <h1 id="welcome-title">Welcome to ReadShip</h1>
                        <h3 id="welcome-blurb" style={{ marginTop: '0', marginBottom: '0' }}>Who wants to read s$#% when you can read ship?</h3>
                        <h3 id="welcome-blurb" style={{ marginTop: '0', marginBottom: '40px' }}>Summarize articles in just one click!</h3>
                        <div id="welcome-search">
                            <div id="welcome-search-icon">
                                <SearchIcon />
                            </div>
                            <InputBase id="welcome-search-input" placeholder="Article URL or Keyword" value={this.state.url} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                        </div>
                        <img id="welcome-image" src="/static/img/undraw_annotation_7das.svg" />
                    </div>
                    <div id="tutorial-section">
                        <h1 id="tutorial-title">Getting Started</h1>
                        <img className="tutorial-image" style={{marginLeft: '15%'}} src="/static/img/undraw_personal_file_222m.svg" />
                        <h3 style={{margin: '0 64px' }}>Everyone wants to know whats going on in the world, however, keeping up with the news can become a chore. ReadShip is a free web-application and chrome extension that strips down large news articles into delicious bite size snippets.</h3>
                        <img className="tutorial-image" style={{marginRight: '15%'}} src="/static/img/undraw_updated_rr85.svg" />
                        <h3 style={{margin: '0 64px' }}>Just find an article that you would love to know more about... that is, if you had the time... and post the url in ReadShip. ReadShip will give you a summarization of the article and suggest similar articles you may also enjoy. Or, if you have the chrome extension just click the "summarize" button in the dropdown extension window!</h3>
                        <img className="tutorial-image" src="/static/img/undraw_instruction_manual_cyae.svg" />
                        <h3 style={{margin: '0 64px 128px 64px' }}>ReadShip can save you time and that leaves more time for you to... well just be you.</h3>
                    </div>
                    <Backdrop className="backdrop" style={{ zIndex: '15' }} open={this.state.loading}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                </Container>
            </div>
        );

    }
} export default About
