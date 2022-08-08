/* eslint-disable no-unused-vars */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import React from 'react';
import Footer from './components/Footer';

const App = () => {
	const [dollars, setDollars] = useState([]);

	const getData = async () => {
		const res = await axios.get(
			'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
		);

		const addItem = (item, type, name) => {
			let converDataToNumber = res.data[item]['casa'][type];
			let dataConverted = converDataToNumber;
			localStorage.setItem(name, dataConverted);
		};

		const addItemVariation = (item, name) => {
			let converDataToNumber = res.data[item]['casa']['variacion'].replaceAll(
				',',
				'.'
			);
			let dataConverted = parseFloat(converDataToNumber);
			if (dataConverted > 0) {
				localStorage.setItem(
					name,
					`<span id='green'>+${dataConverted}%</span>`
				);
			} else if (dataConverted === 0) {
				localStorage.setItem(
					name,
					`<span id='neutral'>= ${dataConverted}%</span>`
				);
			} else {
				localStorage.setItem(name, `<span id='red'>${dataConverted}%</span>`);
			}
		};

		addItem(0, 'compra', 'dolarOficialCompra');
		addItem(0, 'venta', 'dolarOficialVenta');
		addItemVariation(0, 'dolarOficialVariacion');

		addItem(1, 'compra', 'dolarBlueCompra');
		addItem(1, 'venta', 'dolarBlueVenta');
		addItemVariation(1, 'dolarBlueVariacion');

		addItem(3, 'compra', 'dolarLiquiCompra');
		addItem(3, 'venta', 'dolarLiquiVenta');
		addItemVariation(3, 'dolarLiquiVariacion');

		addItem(4, 'compra', 'dolarBolsaCompra');
		addItem(4, 'venta', 'dolarBolsaVenta');
		addItemVariation(4, 'dolarBolsaVariacion');

		localStorage.setItem('dolarTuristaCompra', res.data[6]['casa']['compra']);
		addItem(6, 'venta', 'dolarTuristaVenta');
		addItemVariation(6, 'dolarTuristaVariacion');

		setDollars(res.data);
	};

	useEffect(() => {
		getData();
	}, []);

	const SendData = (props) => {
		let data = localStorage.getItem(props.item);
		return <span>{data}</span>;
	};

	const SendDataVariation = (props) => {
		let data = localStorage.getItem(props.item);
		const content = data;
		return <Markup content={content} />;
	};

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

	const DollarRow = (props) => {
		return (
			<>
				<tr>
					<th scope='row'>{props.name}</th>
					<td>
						$<SendData item={props.purchase} />
					</td>
					<td>
						$<SendData item={props.sale} />
					</td>
					<td>
						<SendDataVariation item={props.variation} />
					</td>
				</tr>
			</>
		);
	};

	const DollarRowNoPurchase = (props) => {
		return (
			<>
				<tr>
					<th scope='row'>{props.name}</th>
					<td>
						<SendData item={props.purchase} />
					</td>
					<td>
						$<SendData item={props.sale} />
					</td>
					<td>
						<SendDataVariation item={props.variation} />
					</td>
				</tr>
			</>
		);
	};

	useEffect(() => {
		if (localStorage.getItem('dolarBlueCompra') !== null) {
			document.querySelector('#loading').style.display = 'none';
		} else {
			async function tryGetData() {
				await getData()
				document.querySelector('#loading').style.display = 'none'				
			}
			tryGetData()
		}
	}, []);

	return (
		<>
			<main className='container'>
				<button id='updateList' onClick={() => updateList()}>
					Actualizar Precios
				</button>
				<button id='loading' aria-busy='true' className='secondary'>
					Cargando, Espera por favor...
				</button>
			</main>

			<table role='grid' className='container'>
				<thead>
					<tr>
						<th scope='col'>Nombre</th>
						<th scope='col'>Compra</th>
						<th scope='col'>Venta</th>
						<th scope='col'>Variación</th>
					</tr>
				</thead>
				<tbody>
					<DollarRow
						name='Dólar Blue'
						purchase='dolarBlueCompra'
						sale='dolarBlueVenta'
						variation='dolarBlueVariacion'
					/>
					<DollarRow
						name='Dólar Oficial'
						purchase='dolarOficialCompra'
						sale='dolarOficialVenta'
						variation='dolarOficialVariacion'
					/>
					<DollarRow
						name='Dólar Liqui'
						purchase='dolarLiquiCompra'
						sale='dolarLiquiVenta'
						variation='dolarLiquiVariacion'
					/>
					<DollarRow
						name='Dólar Bolsa'
						purchase='dolarBolsaCompra'
						sale='dolarBolsaVenta'
						variation='dolarBolsaVariacion'
					/>
					<DollarRowNoPurchase
						name='Dólar Turista'
						purchase='dolarTuristaCompra'
						sale='dolarTuristaVenta'
						variation='dolarTuristaVariacion'
					/>
				</tbody>
			</table>

			<Footer position='absolute' />
		</>
	);
};

export default App;
