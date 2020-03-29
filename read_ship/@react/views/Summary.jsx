import React from 'react';

import Backdrop from '@material-ui/core/Backdrop';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Chip from '@material-ui/core/Chip';
import CircularProgress from '@material-ui/core/CircularProgress';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';

import NavigationBar from './core/navigation/NavigationBar';

class Summary extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            audio_file: "",
            citation: "",
            current_url: "",
            extract: {},
            hashtags: [],
            loading: false,
            recommendations: [],
            show_citation_dialog: false,
            summary: "",
            url: ""
        };
        this.citeSource = this.citeSource.bind(this);
        this.handleClick = this.handleClick.bind(this);
        this.loadingOff = this.loadingOff.bind(this);
        this.loadingOn = this.loadingOn.bind(this);
        this.textToSpeech = this.textToSpeech.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('url')) {
            this.setState({ 'current_url': JSON.parse(localStorage.getItem('url')) });
        }
        if (localStorage.getItem('extract')) {
            this.setState({ 'extract': JSON.parse(localStorage.getItem('extract')) });
        }
        if (localStorage.getItem('hashtags')) {
            this.setState({ 'hashtags': JSON.parse(localStorage.getItem('hashtags')) });
        }
        if (localStorage.getItem('recommendations')) {
            this.setState({ 'recommendations': JSON.parse(localStorage.getItem('recommendations')) });
        }
        if (localStorage.getItem('summary')) {
            this.setState({ 'summary': JSON.parse(localStorage.getItem('summary')) });
        }
    }

    citeSource() {
        this.loadingOn();
        fetch('/api/v1/generate_citation/', {
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            method: 'POST',
            body: JSON.stringify({ "url": this.state.current_url })
        })
        .then((response) => {
            this.loadingOff();
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (data.response == "success") {
                localStorage.setItem('citation', JSON.stringify(data.citation));
                this.setState({
                    citation: data.citation,
                    show_citation_dialog: true
                });
            }
        })
        .catch((error) => console.log(error));
    }

    handleClick(e) {
        e.stopPropagation();

        if (e.currentTarget.className.includes('background')) {
            this.setState({ show_citation_dialog: false });
        }
        else if (e.currentTarget.className.includes('cite-source')) {
            this.citeSource();
        }
        else if (e.currentTarget.className.includes('close-citation-dialog')) {
            this.setState({ show_citation_dialog: false });
        }
        else if (e.currentTarget.className.includes('text-to-speech')) {
            this.textToSpeech();
        }
    }

    loadingOff() {
        this.setState({ loading: false });
    }

    loadingOn() {
        this.setState({ loading: true });
    }

    textToSpeech() {
        fetch('/api/v1/text_to_speech/', {
            credentials: 'include',
            headers: { 'Content-Type': 'application/json' },
            method: 'POST',
            body: JSON.stringify({ "text": this.state.summary })
        })
        .then((response) => {
            if (!response.ok) throw Error(response.statusText);
            return response.json();
        })
        .then((data) => {
            if (data.response == "success") {
                this.setState({ audio_file: data.mp3_file });
                let audioEl = document.getElementById('summary-audio');
            }
        })
    }

    render() {
        console.log(this.state);

        return (
            <div>
                <NavigationBar
                    show_citation={true}
                    citation={this.state.citation}
                    show_citation_dialog={this.state.show_citation_dialog}
                    handleClick={this.handleClick}
                    loadingOn={this.loadingOn}
                    loadingOff={this.loadingOff} />
                <Container style={{ zIndex: '10' }}>
                    <div id="extract-section">
                        <h1>{this.state.extract.title}</h1>
                        <p>By {this.state.extract.author}</p>
                        <p>{this.state.extract.publishDate}</p>
                    </div>
                    <div id="summary-section">
                        <p>{this.state.summary}</p>
                        <div id="audio-section">
                            <Button className="text-to-speech" onClick={this.handleClick}>Text to Speech</Button>
                            <audio ref="audio_tag" id="summary-audio" src={this.state.audio_file} controls autoPlay />
                        </div>
                    </div>
                    <div id="hashtag-section">
                        {
                            this.state.hashtags.map((hashtag, key) =>
                                <Chip className="hashtag-chip" label={hashtag} key={key} />
                            )
                        }
                    </div>
                    <div id="footnote-section">
                        <p>Generated from <a href="{this.state.current_url}">{this.state.current_url}</a></p>
                    </div>
                    <h2 id="similar-articles-subtitle">Similar Articles</h2>
                    <div id="recommendations-section">
                        {
                            this.state.recommendations.map((recommendation, key) =>
                            <Card className="recommendation-card" key={key}>
                                <CardContent className="recommendation-card-content">
                                    <Typography>
                                        {recommendation[0]}
                                    </Typography>
                                </CardContent>
                                <div className="grow lightblue" />
                                <CardActions>
                                    <Button href={recommendation[1]}>Read More</Button>
                                </CardActions>
                            </Card>)
                        }
                    </div>
                </Container>
                <Backdrop className="backdrop" style={{ zIndex: '15' }} open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
} export default Summary
