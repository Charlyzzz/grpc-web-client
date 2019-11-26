import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastProvider, useToasts } from 'react-toast-notifications';
import { radio } from 'live-client/src/live';

const radioGaga = radio('localhost', 9900);
const examples = radioGaga.tuneIn('example');

const Toasts = ({ examples }) => {
  const { addToast } = useToasts();
  examples.onMessage(message => {
    addToast(message, { appearance: 'success', autoDismiss: true });
  });
  return null;
};

const App = () => {

  return (
    <ToastProvider autoDismissTimeout={2100}>
      <Toasts examples={examples}/>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo"/>
          <p>
            Edit <code>src/App.js</code> and save to reload.
          </p>
          <a
            className="App-link"
            href="https://reactjs.org"
            target="_blank"
            rel="noopener noreferrer"
          >
            Learn React
          </a>
        </header>
      </div>
    </ToastProvider>
  );

};

export default App;
