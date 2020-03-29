import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import About from './views/About';
import Keyword from './views/Keyword';
import Summary from './views/Summary';

class ReadShip extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <Router>
                <Switch>
                    <Route path="/about" component={About} />
                    <Route path="/keyword" component={Keyword} />
                    <Route path="/summary" component={Summary} />
                </Switch>
            </Router>
        );
    }
}

ReactDOM.render(
    <ReadShip />,
    document.getElementById('read_ship')
)
