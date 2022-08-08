/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import React from 'react';
import Footer from '../components/Footer';
import '../euro.css';

const Euro = () => {
	const [euro, setEuros] = useState([]);

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

	const RecoverData = (props) => {
		const dataName = localStorage.getItem(`casaNombre${props.id}`);
		const dataPurchase = localStorage.getItem(`casaCompra${props.id}`);
		const dataSale = localStorage.getItem(`casaVenta${props.id}`);

		if (localStorage.getItem('casaNombre0') !== null) {
			if (dataPurchase !== 'No Cotiza' && dataSale !== 'No Cotiza') {
				let convertDataToNumber = dataPurchase.replaceAll(',', '.');
				let dataPurchaseConverted = parseFloat(convertDataToNumber);

				let convertSaleDataToNumber = dataPurchase.replaceAll(',', '.');
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
				<tbody>
					<RecoverData id='0' />
					<RecoverData id='1' />
					<RecoverData id='2' />
					<RecoverData id='3' />
					<RecoverData id='4' />
					<RecoverData id='5' />
					<RecoverData id='6' />
					<RecoverData id='7' />
					<RecoverData id='8' />
					<RecoverData id='9' />
					<RecoverData id='10' />
					<RecoverData id='11' />
					<RecoverData id='12' />
					<RecoverData id='13' />
					<RecoverData id='14' />
					<RecoverData id='15' />
					<RecoverData id='16' />
					<RecoverData id='17' />
					<RecoverData id='18' />
					<RecoverData id='19' />
					<RecoverData id='20' />
					<RecoverData id='21' />
					<RecoverData id='22' />
					<RecoverData id='23' />
					<RecoverData id='24' />
					<RecoverData id='25' />
					<RecoverData id='26' />
					<RecoverData id='27' />
					<RecoverData id='28' />
					<RecoverData id='29' />
					<RecoverData id='30' />
					<RecoverData id='31' />
					<RecoverData id='32' />
					<RecoverData id='33' />
					<RecoverData id='34' />
					<RecoverData id='35' />
					<RecoverData id='36' />
				</tbody>
			</table>

			<Footer position='inherit' />
		</>
	);
};

export default Euro;
