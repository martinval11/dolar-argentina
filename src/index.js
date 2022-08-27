import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Conversor from './pages/Conversor';
import Euro from './pages/Euro';
import './css/style.css';
import OpenedMenu from './components/OpenedMenu';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
		<OpenedMenu />
		<Routes>
			<Route path='/' element={<App />} />
			<Route path='/conversor' element={<Conversor />} />
			<Route path='/euro' element={<Euro />} />
		</Routes>
	</BrowserRouter>
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
