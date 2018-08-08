import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import App from './components/App';
import reducers from './reducers/index'
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import { BrowserRouter, Route } from 'react-router-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const socket = io.connect(process.env.SOCKET_URL)
//mapSocket to props
//allow redux in my components 
ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <SocketProvider socket={socket}>
      <App />
      </SocketProvider>
    </Provider>,
    document.getElementById('root')
  );
  