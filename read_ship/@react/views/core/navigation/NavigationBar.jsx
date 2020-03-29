import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputBase from '@material-ui/core/InputBase';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

import SearchIcon from '@material-ui/icons/Search';

class NavigationBar extends React.Component {

    constructor(props) {
        super(props);
        this.state = { url: "" };
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
        this.summarize = this.summarize.bind(this);
    }

    handleChange(e) {
        let value = e.target.value;
        if (value.slice(-1) != '\n') {
            this.setState({ url: value});
        }
    }

    handleKeyPress(e) {
        console.log("press");
        if (e.key === "Enter") {
            this.summarize();
        }
    }

    summarize() {
        this.props.loadingOn();
        fetch('/api/v1/generate_combined/', {
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
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
            this.props.loadingOff();
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
                <AppBar postition="sticky">
                    <Toolbar>
                        <img id="navigation-icon" src="/static/img/icon.svg" />
                        <a href="/about" id="navigation-link">
                            <Typography id="navigation-title" variant="h6">
                                ReadShip
                            </Typography>
                        </a>
                        <div id="navigation-search">
                            <div id="navigation-search-icon">
                                <SearchIcon />
                            </div>
                            <InputBase id="navigation-search-input" placeholder="Article URL or Keyword" value={this.state.url} onChange={this.handleChange} onKeyPress={this.handleKeyPress} />
                        </div>
                        <div className="grow" />
                            {
                                this.props.show_citation &&
                                <div>
                                    <Button id="citation-button" className="cite-source" variant="outlined" onClick={this.props.handleClick}>
                                        Cite That Ship
                                    </Button>
                                    <Dialog id="citation-dialog" open={this.props.show_citation_dialog}>
                                        <DialogTitle>
                                            MLA Citation
                                        </DialogTitle>
                                        <DialogContent>
                                            {this.props.citation}
                                        </DialogContent>
                                        <DialogActions>
                                            <Button className="close-citation-dialog" onClick={this.props.handleClick}>Close</Button>
                                        </DialogActions>
                                    </Dialog>
                                </div>
                            }
                        </Toolbar>
                    </AppBar>
                <Toolbar />
            </div>
        );
    }
} export default NavigationBar
