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
		console.log(res.data)

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
			} 
			else {
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

	const SendData = (props, item) => {
		let data = localStorage.getItem(props.item);
		return <span>{data}</span>;
	};

	const SendDataVariation = (props, item) => {
		let data = localStorage.getItem(props.item);
		const content = data;
		return <Markup content={content} />;
	};

	const updateList = async () => {
		const updateList = document.querySelector('#updateList');
		updateList.setAttribute('aria-busy', 'true');
		updateList.innerText = 'Actualizando...';
		
		await getData();
		
		updateList.setAttribute('aria-busy', 'false');
		updateList.innerText = 'Actualizar';
	}

	return (
		<>
			<br />
			<main className='container'>
				<button id='updateList' onClick={() => updateList()}>
					Actualizar
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
					<tr>
						<th scope='row'>Dolar Blue</th>
						<td>
							$<SendData item='dolarBlueCompra' />
						</td>
						<td>
							$<SendData item='dolarBlueVenta' />
						</td>
						<td>
							<SendDataVariation item='dolarBlueVariacion' />
						</td>
					</tr>
					<tr>
						<th scope='row'>Dolar Oficial</th>
						<td>
							$<SendData item='dolarOficialCompra' />
						</td>
						<td>
							$<SendData item='dolarOficialVenta' />
						</td>
						<td>
							<SendDataVariation item='dolarOficialVariacion' />
						</td>
					</tr>
					<tr>
						<th scope='row'>Dolar Liqui</th>
						<td>
							$<SendData item='dolarLiquiCompra' />
						</td>
						<td>
							$<SendData item='dolarLiquiVenta' />
						</td>
						<td>
							<SendDataVariation item='dolarLiquiVariacion' />
						</td>
					</tr>
					<tr>
						<th scope='row'>Dolar Bolsa</th>
						<td>
							$<SendData item='dolarBolsaCompra' />
						</td>
						<td>
							$<SendData item='dolarBolsaVenta' />
						</td>
						<td>
							<SendDataVariation item='dolarBolsaVariacion' />
						</td>
					</tr>
					<tr>
						<th scope='row'>Dolar Turista</th>
						<td>
							<SendData item='dolarTuristaCompra' />
						</td>
						<td>
							<SendData item='dolarTuristaVenta' />
						</td>
						<td>
							<SendDataVariation item='dolarTuristaVariacion' />
						</td>
					</tr>
				</tbody>
			</table>
			<Footer position='absolute' />
		</>
	);
};

export default App;
