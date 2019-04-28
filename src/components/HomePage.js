import React, { Component } from 'react';

import Navigation from './Navigation';
import QuestionsList from './QuestionsList';

class HomePage extends Component {
    render() {
        return (
            <div>
                <Navigation />
                <QuestionsList />
            </div>
        );
    }
}

export default HomePage;
