import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import Amplify from 'aws-amplify';
import config from './aws-exports';
import { Provider } from './context/context';
import { SpeechProvider } from '@speechly/react-client';

Amplify.configure(config);

ReactDOM.render(
        <SpeechProvider appId="a722e60d-18c9-4ca7-8144-3ba4625df8cd" language="en-US">
            <Provider>
                <App />
            </Provider>
        </SpeechProvider>,

document.getElementById('root'));

