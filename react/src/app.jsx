import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import createSagaMiddleware from 'redux-saga'
import sagas from './sagas';
import App from './components/app';
import { AppReducer } from './reducers';

const sagaMiddleware = createSagaMiddleware()
const store = createStore(AppReducer, applyMiddleware(sagaMiddleware));
sagaMiddleware.run(sagas)

const renderApp = () => {
    render(
        <Provider store={store}>
            <App />
        </Provider>,
        document.getElementById('app')
    );
}

export default renderApp;
