import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/App';
import reportWebVitals from './reportWebVitals';
import {Provider} from "react-redux";


import store from "./redux/configStore";

import {analytics} from "./shared/firebase";
import { getFCP, getTTFB } from 'web-vitals';

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals

function sendToAnalytics(metric) {
  const _report = JSON.stringify(metric);

  analytics.logEvent("web_vital_report", _report);
  analytics.logEvent('ttfb',getTTFB);
  analytics.logEvent('fcp',getFCP);
}
reportWebVitals(sendToAnalytics);
