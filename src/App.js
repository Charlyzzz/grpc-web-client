import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const { LiveClient } = require('./pubsub_grpc_web_pb');
const { SubRequest } = require('./pubsub_pb.js');

const pubSubService = new LiveClient('http://localhost:9900');
const request = new SubRequest();
request.setName("topic");

const stream = pubSubService.subscribe(request);

stream.on('status', console.log);

stream.on('end', (end) => {
  console.log("Stream end")
});

const Toasts = () => {
  const { addToast } = useToasts()
  stream.on('data', (response) => {
    addToast(response.getMessage(), { appearance: 'success', autoDismiss: true })
  });
  return (null);
}

const App = () => {

  return (
    <ToastProvider autoDismissTimeout={2100}>
      <Toasts />
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
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

}

export default App;
