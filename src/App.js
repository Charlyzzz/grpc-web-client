import React from 'react';
import logo from './logo.svg';
import './App.css';
import {ToastProvider, useToasts} from 'react-toast-notifications';

const { LiveClient } = require('./pubsub_grpc_web_pb');
const { SubRequest } = require('./pubsub_pb.js');
const pubSubService = new LiveClient('http://localhost:9900');

const subscribe = (topic) => {

  const request = new SubRequest();
  request.setName(topic);

  const maxRetries = 3;
  const backoff = 2000;

  const newSubscription = {
    callbacks: {},
    stream: pubSubService.subscribe(request),
    retryCount: 0,
    streamErrored(error) {
      console.error('stream failed');
      console.error(error);
      this.retryCount += 1;
      if (this.retryCount <= maxRetries) {
        setTimeout(() => this.setupStream(), backoff);
      } else {
        this.cleanupStream();
        throw new Error('Failed too many times!');
      }
    },
    setupStream() {
      if (this.stream) {
        this.cleanupStream();
      }
      this.stream = pubSubService.subscribe(request);
      console.log('stream connected!');
      this.stream.on('data', (data) => this.emit(data));
      this.stream.on('status', console.log);
      this.stream.on('error', (err) => this.streamErrored(err));
      this.stream.on('end', () => this.cleanupStream());
    },
    cleanupStream() {
      this.stream.cancel();
      this.stream = null;
    },
    emit(event) {
      console.log(event)
      this.streamSucceeded();
      this.getCallbacks().forEach(callback => callback(event));
    },
    streamSucceeded() {
      this.retryCount = 0;
    },
    subscribeOnMessage(id, callback) {
      this.addCallback(id, callback);
    },
    getCallbacks() {
      return Object.values(this.callbacks);
    },
    findCallback(id) {
      return this.callbacks[id];
    },
    addCallback(id, callback) {
      this.callbacks[id] = callback;
    }
  };
  newSubscription.setupStream();
  return newSubscription;
};

/*
const wsSubscribe = (topic) => {

  const newSocket = () => new WebSocket('ws://10.0.1.5:9900/ws/' + topic);

  const maxRetries = 3;
  const backoff = 2000;

  const newSubscription = {
    callbacks: {},
    retryCount: 0,
    streamErrored(error) {
      console.error('stream failed');
      console.error(error);
      this.retryCount += 1;
      if (this.retryCount <= maxRetries) {
        setTimeout(() => this.setupStream(), backoff);
      } else {
        this.cleanupStream();
        throw new Error('Failed too many times!');
      }
    },
    setupStream() {
      if (this.stream && this.stream.readyState == 0) {
        this.cleanupStream();
      }
      this.stream = newSocket();
      console.log('stream connected!');
      this.stream.addEventListener('open', () => console.log('open'));
      this.stream.addEventListener('close', () => this.cleanupStream());
      this.stream.addEventListener('error', (err) => this.streamErrored(err));
      this.stream.addEventListener('message', (data) => this.emit(data));
    },
    cleanupStream() {
      this.stream.close();
      this.stream = null;
    },
    emit(event) {
      this.streamSucceeded();
      this.getCallbacks().forEach(callback => callback(event));
    },
    streamSucceeded() {
      this.retryCount = 0;
    },
    subscribeOnMessage(id, callback) {
      this.addCallback(id, callback);
    },
    getCallbacks() {
      return Object.values(this.callbacks);
    },
    findCallback(id) {
      return this.callbacks[id];
    },
    addCallback(id, callback) {
      this.callbacks[id] = callback;
    }
  };
  newSubscription.setupStream();
  return newSubscription;
};
 */
const s2 = subscribe('example');

const Toasts = () => {
  const {addToast} = useToasts();
  s2.subscribeOnMessage('id', response => {
    const message = response.data || response.getMessage();
    addToast(message, {appearance: 'success', autoDismiss: true});
  });
  return null;
};

const App = () => {

  return (
    <ToastProvider autoDismissTimeout={2100}>
      <Toasts/>
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
