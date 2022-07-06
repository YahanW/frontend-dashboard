import React from 'react';
import ReactDOM from 'react-dom/client';
import {createStore,applyMiddleware} from 'redux'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import Request from './requests';
import './global.css'
import routes from './routes';
import rootReducer from './reducer'

//import ru_RU from 'antd/lib/locale/ru_RU' change language example russian
//import { ConfigProvider } from 'antd';
const store=createStore(rootReducer,composeWithDevTools(applyMiddleware(thunk)))
global.request=Request
//hello
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
 //<ConfigProvider locale={ru_RU}>
   <Provider store={store}>
   {routes}
  </Provider>
 //</ConfigProvider>
 
);
