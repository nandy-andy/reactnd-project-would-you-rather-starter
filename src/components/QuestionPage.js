import React, { Component } from 'react';

import Nav from './Nav';
import Question from './Question';

class QuestionPage extends Component {
    render() {
        return (
            <div>
                <Nav />
                <Question />
            </div>
        );
    }
}

export default QuestionPage;
