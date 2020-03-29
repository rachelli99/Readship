import React from 'react';

import Chip from '@material-ui/core/Chip';
import Container from '@material-ui/core/Container';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

import NavigationBar from './core/navigation/NavigationBar';

class Keyword extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            current_url: "",
            keywords: [],
            loading: false,
            url: ""
        };
        this.loadingOff = this.loadingOff.bind(this);
        this.loadingOn = this.loadingOn.bind(this);
    }

    componentDidMount() {
        if (localStorage.getItem('url')) {
            this.setState({ 'current_url': JSON.parse(localStorage.getItem('url')) });
        }
    }

    loadingOff() {
        this.setState({ 'loading': false });
    }

    loadingOn() {
        this.setState({ 'loading': true });
    }

    render() {

        return (
            <div>
                <NavigationBar
                    handleClick={this.handleClick}
                    loadingOn={this.loadingOn}
                    loadingOff={this.loadingOff} />
                <Container>
                    <h2 id="similar-articles-subtitle">News related to searched keyword</h2>
                    <div id="recommend-section">
                        {
                            this.state.keywords.map((keyword, key) =>
                                <Card className="recommend-card" key={key}>
                                    <CardContent className="recommend-card-content">
                                        <Typography>
                                            {/* title */}
                                            {keyword[0]}
                                            {/* description */}
                                            {keyword[1]}
                                        </Typography>
                                    </CardContent>
                                    <div className="grow lightblue" />
                                    <CardActions>
                                        <Button href={keyword[2]}>Read this article</Button>
                                    </CardActions>
                                </Card>
                            )
                        }
                    </div>
                </Container>
                <Backdrop className="backdrop" open={this.state.loading}>
                    <CircularProgress color="inherit" />
                </Backdrop>
            </div>
        );
    }
} export default Keyword
