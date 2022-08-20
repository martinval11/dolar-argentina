/* eslint-disable */
import axios from 'axios';
import { useEffect, useState } from 'react';
import { Markup } from 'interweave';
import React from 'react';
import Footer from './components/Footer';

const App = () => {
	const [, setDollars] = useState([]);

	const getData = async () => {
		const res = await axios
			.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
			.catch(() => {
				document.querySelector('#error').style.display = 'inherit';
				setTimeout(() => {
					document.querySelector('#error').style.display = 'none';
				}, 4300);
			});

		const addItem = (item, type, name) => {
			const converDataToNumber = res.data[item]['casa'][type];
			const dataConverted = converDataToNumber;
			localStorage.setItem(name, dataConverted);
		};

		const addItemVariation = (item, name) => {
			const converDataToNumber = res.data[item]['casa']['variacion'].replaceAll(
				',',
				'.'
			);
			const dataConverted = parseFloat(converDataToNumber);
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

	const SendData = ({ item }) => {
		const data = localStorage.getItem(item);
		return <span>{data}</span>;
	};

	const SendDataVariation = ({ item }) => {
		const data = localStorage.getItem(item);
		const content = data;
		return <Markup content={content} />;
	};

	const updateList = async () => {
		const updateList = document.querySelector('#updateList');

		if (updateList.getAttribute('data-tooltip')) {
			updateList.removeAttribute('data-tooltip');
		}

		updateList.setAttribute('aria-busy', 'true');
		updateList.innerHTML =
			'<i class="bi bi-currency-exchange"></i> Actualizando Precios...';

		await getData()
			.then(() => {
				updateList.setAttribute('aria-busy', 'false');
				updateList.innerHTML =
					'<i class="bi bi-currency-exchange"></i> Actualizar Precios';
				updateList.setAttribute(
					'data-tooltip',
					'Los Precios han sido actualizados'
				);

				setTimeout(() => {
					updateList.removeAttribute('data-tooltip');
				}, 3500);
			})
			.catch(() => {
				updateList.innerHTML =
					'<i class="bi bi-currency-exchange"></i> Actualizar Precios';
					updateList.removeAttribute('data-tooltip');
					updateList.setAttribute('aria-busy', 'false');
			});
	};

	const DollarRow = ({ name, purchase, sale, variation, isNumber }) => {
		if (isNumber) {
			return (
				<>
					<tr>
						<th scope='row'>{name}</th>
						<td>
							$<SendData item={purchase} />
						</td>
						<td>
							$<SendData item={sale} />
						</td>
						<td>
							<SendDataVariation item={variation} />
						</td>
					</tr>
				</>
			);
		}

		if (!isNumber) {
			return (
				<>
					<tr>
						<th scope='row'>{name}</th>
						<td>
							<SendData item={purchase} />
						</td>
						<td>
							$<SendData item={sale} />
						</td>
						<td>
							<SendDataVariation item={variation} />
						</td>
					</tr>
				</>
			);
		}
	};

	useEffect(() => {
		if (localStorage.getItem('dolarBlueCompra') !== null) {
			document.querySelector('#loading').style.display = 'none';
		} else {
			async function tryGetData() {
				await getData();
				document.querySelector('#loading').style.display = 'none';
			}
			tryGetData();
		}
	}, []);

	return (
		<>
			<main className='container'>
				<button id='updateList' onClick={() => updateList()}>
					<i className='bi bi-currency-exchange'></i> Actualizar Precios
				</button>
				<button id='loading' aria-busy='true' className='secondary'>
					Cargando, Espera por favor...
				</button>
				<button id='error' className='primary'>
					<i className='bi bi-x-lg'></i> No se pudo actualizar los precios
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
						isNumber
					/>
					<DollarRow
						name='Dólar Oficial'
						purchase='dolarOficialCompra'
						sale='dolarOficialVenta'
						variation='dolarOficialVariacion'
						isNumber
					/>
					<DollarRow
						name='Dólar Liqui'
						purchase='dolarLiquiCompra'
						sale='dolarLiquiVenta'
						variation='dolarLiquiVariacion'
						isNumber
					/>
					<DollarRow
						name='Dólar Bolsa'
						purchase='dolarBolsaCompra'
						sale='dolarBolsaVenta'
						variation='dolarBolsaVariacion'
						isNumber
					/>
					<DollarRow
						name='Dólar Turista'
						purchase='dolarTuristaCompra'
						sale='dolarTuristaVenta'
						variation='dolarTuristaVariacion'
						isNumber={false}
					/>
				</tbody>
			</table>

			<Footer position='absolute' />
		</>
	);
};

export default App;
