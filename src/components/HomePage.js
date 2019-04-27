import React, { Component } from 'react';

import Nav from './Nav';
import QuestionsList from './QuestionsList';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Nav />
                <QuestionsList />
            </div>
        );
    }
}

export default HomePage;
