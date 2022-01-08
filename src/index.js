import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Provider } from './context/context';

Amplify.configure(config);

ReactDOM.render(
        <Provider>
            <App />
        </Provider>,
document.getElementById('root'));

