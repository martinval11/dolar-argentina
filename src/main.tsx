import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

import App from './App';
import Conversor from './pages/Conversor/Conversor';
import Euro from './pages/Euro/Euro';

import Nav from './components/Nav/Nav';
import './global.css';
import OpenedMenu from './components/OpenedMenu/OpenedMenu';
import Footer from './components/Footer/Footer';

ReactDOM.createRoot(document.getElementById('root')!).render(
	<React.StrictMode>
		<BrowserRouter>
		<div className="wrapper">
		<Nav />
			<OpenedMenu />
			<Routes>
				<Route
					path='/'
					element={<App />}
				/>
				<Route
					path='/conversor'
					element={<Conversor />}
				/>
				<Route
					path='/euro'
					element={<Euro />}
				/>
			</Routes>
		</div>
			<Footer />
		</BrowserRouter>
	</React.StrictMode>
);
