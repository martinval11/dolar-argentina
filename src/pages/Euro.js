/* eslint-disable */
import axios from 'axios';
import { useEffect } from 'react';
import React from 'react';
import Footer from '../components/Footer';
import '../css/euro.css';
const Euro = () => {
	const getData = async () => {
		const res = await axios.get(
			'https://www.dolarsi.com/api/api.php?type=euro'
		);
		for (let i = 0; i < 37; i++) {
			localStorage.setItem(`casaNombre${i}`, res.data[i]['casa']['nombre']);
			localStorage.setItem(`casaCompra${i}`, res.data[i]['casa']['compra']);
			localStorage.setItem(`casaVenta${i}`, res.data[i]['casa']['venta']);
		}
	};
	getData();
	const updateList = async () => {
		const updateList = document.querySelector('#updateList');
		if (updateList.getAttribute('data-tooltip')) {
			updateList.removeAttribute('data-tooltip');
		}
		updateList.setAttribute('aria-busy', 'true');
		updateList.innerText = 'Actualizando Precios...';
		await getData();
		updateList.setAttribute('aria-busy', 'false');
		updateList.innerText = 'Actualizar Precios';
		updateList.setAttribute(
			'data-tooltip',
			'Los Precios han sido actualizados'
		);
		setTimeout(() => {
			updateList.removeAttribute('data-tooltip');
		}, 3500);
	};
	const RecoverData = ({ id }) => {
		const dataName = localStorage.getItem(`casaNombre${id}`);
		const dataPurchase = localStorage.getItem(`casaCompra${id}`);
		const dataSale = localStorage.getItem(`casaVenta${id}`);
		if (localStorage.getItem('casaNombre0') !== null) {
			if (dataPurchase !== 'No Cotiza' && dataSale !== 'No Cotiza') {
				let convertDataToNumber = dataPurchase.replaceAll(',', '.');
				let dataPurchaseConverted = parseFloat(convertDataToNumber);
				let convertSaleDataToNumber = dataSale.replaceAll(',', '.');
				let dataSaleConverted = parseFloat(convertSaleDataToNumber);
				return (
					<>
						<tr>
							<th scope='row'>
								<i className='bi bi-bank2'></i> {dataName}
							</th>
							<th scope='row'>${dataPurchaseConverted}</th>
							<th scope='row'>${dataSaleConverted}</th>
						</tr>
					</>
				);
			} else if (dataPurchase !== 'No Cotiza' && dataSale === 'No Cotiza') {
				let convertDataToNumber = dataPurchase.replaceAll(',', '.');
				let dataPurchaseConverted = parseFloat(convertDataToNumber);
				return (
					<>
						<tr>
							<th scope='row'>
								<i className='bi bi-bank2'></i> {dataName}
							</th>
							<th scope='row'>${dataPurchaseConverted}</th>
							<th scope='row'>{dataSale}</th>
						</tr>
					</>
				);
			} else if (dataPurchase === 'No Cotiza' && dataSale !== 'No Cotiza') {
				let convertSaleDataToNumber = dataSale.replaceAll(',', '.');
				let dataSaleConverted = parseFloat(convertSaleDataToNumber);
				return (
					<>
						<tr>
							<th scope='row'>
								<i className='bi bi-bank2'></i> {dataName}
							</th>
							<th scope='row'>{dataPurchase}</th>
							<th scope='row'>${dataSaleConverted}</th>
						</tr>
					</>
				);
			} else {
				return (
					<>
						<tr>
							<th scope='row'>
								<i className='bi bi-bank2'></i> {dataName}
							</th>
							<th scope='row'>{dataPurchase}</th>
							<th scope='row'>{dataSale}</th>
						</tr>
					</>
				);
			}
		}
	};
	useEffect(() => {
		if (localStorage.getItem('casaNombre0') !== null) {
			document.querySelector('#loading').style.display = 'none';
		} else {
			setTimeout(() => {
				window.location.reload();
			}, 2000);
		}
	}, []);
	const numbers = [
		0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
		21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36
	];
	const listItems = numbers.map((numbers) => <RecoverData id={numbers} key={numbers} />);
	return (
		<>
			<main className='container'>
				<h2>Cotizaciones en Euro</h2>
				<div id='euro'>
					<i className='bi bi-currency-euro'></i>
				</div>
				<button id='updateList' onClick={() => updateList()}>
					Actualizar Precios
				</button>
				<br />
				<button id='loading' aria-busy='true' className='secondary'>
					Cargando, Espera por favor...
				</button>
			</main>
			<table role='grid' className='container'>
				<thead>
					<tr>
						<th scope='col'>Entidad</th>
						<th scope='col'>Compra</th>
						<th scope='col'>Venta</th>
					</tr>
				</thead>
				<tbody>{listItems}</tbody>
			</table>
			<Footer position='inherit' />
		</>
	);
};
export default Euro;