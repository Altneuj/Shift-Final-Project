import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promise from "redux-promise";
import App from './components/App';
import reducers from './reducers/index'
import { SocketProvider } from 'socket.io-react';
import io from 'socket.io-client';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css'

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);
const socket = io.connect(process.env.SOCKET_URL)

ReactDOM.render(
    <Provider store={createStoreWithMiddleware(reducers)}>
    <SocketProvider socket={socket}>
      <App />
      </SocketProvider>
    </Provider>,
    document.getElementById('root')
  );
  