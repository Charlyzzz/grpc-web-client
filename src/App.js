import React from 'react';
import logo from './logo.svg';
import './App.css';
import { ToastProvider, useToasts } from 'react-toast-notifications'

const { LiveClient } = require('./pubsub_grpc_web_pb');
const { SubRequest } = require('./pubsub_pb.js');


const pubSubService = new LiveClient('http://192.168.1.97:9900');
const request = new SubRequest();
request.setName("topic");

const EventEmitter = require('eventemitter3');
const s = new EventEmitter();

const log = (msg) => () => { console.log(msg) }


const s2 = {
  cancel() {
    console.log(this)
    this.stream.cancel();
    this.stream = pubSubService.subscribe(request);
    this.setupStream();
  },
  setupStream() {
    s.removeAllListeners('msg')
    this.stream.on('data', this.emit.bind(this));
    this.stream.on('error', log('error'));
    this.stream.on('error', this.cancel.bind(this));
    this.stream.on('end', log('end'));
  },
  emit(event) {
    this.callback(event)
  },
  onMsg(callback) {
    this.callback = callback
  }
}

s2.callbacks = [];
s2.stream = pubSubService.subscribe(request);
s2.setupStream()

const Toasts = () => {
  const { addToast } = useToasts()
  s2.onMsg(response => {
    addToast(response.getMessage(), { appearance: 'success', autoDismiss: true })
  })
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
