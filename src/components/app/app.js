import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Header from '../header/header';
import Loading from '../loading/loading';

import Home from '../../pages/home/home';
import { Provider } from 'react-redux'

import store from "../../store";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <Router>
                    <div>
                        <Header />
                        <Route exact path="/" component={Home} />
                        <Loading />
                    </div>
                </Router >
            </Provider>
        )
    }
}