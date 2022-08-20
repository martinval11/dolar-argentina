/* eslint-disable */
import axios from 'axios';
import Footer from '../components/Footer';
import '../css/conversor.css';

const Conversor = () => {
	const commify = (n) => {
		let parts = n.toString().split('.');
		const numberPart = parts[0];
		const decimalPart = parts[1];
		const thousands = /\B(?=(\d{3})+(?!\d))/g;

		return (
			numberPart.replace(thousands, '.') +
			(decimalPart ? `,${decimalPart}` : '')
		);
	};

	const convert = async () => {
		const importValue = document.querySelector('#import');
		const dollarOptions = document.querySelector('#dollarOptions');

		if (importValue.value === '') {
			alert('Completá el formulario por favor');
		} else {
			const money1 = document.querySelector('#money1').selectedIndex;
			const money2 = document.querySelector('#money2').selectedIndex;

			const parseDataToNumber = async (
				data,
				operator,
				moneyType,
				placeType,
				isEuro
			) => {
				const error = () => {
					const convertBtn = document.querySelector('#convertBtn');
					convertBtn.innerText = 'Convertir';
					convertBtn.removeAttribute('aria-busy');
					document.querySelector('#error').style.display = 'inherit';
					setTimeout(() => {
						document.querySelector('#error').style.display = 'none';
					}, 4300);
				};

				const res = await axios
					.get('https://www.dolarsi.com/api/api.php?type=valoresprincipales')
					.catch(() => error());

				const resEuro = await axios
					.get('https://www.dolarsi.com/api/api.php?type=euro')
					.catch(() => error());

				if (isEuro) {
					let converDataToNumber = resEuro.data[data]['casa'][
						placeType
					].replaceAll(',', '.');

					let dataConverted = parseFloat(converDataToNumber);

					const importValue = document.querySelector('#import');
					const convertBtn = document.querySelector('#convertBtn');

					if (operator === 'dividedBy') {
						convertBtn.innerText = 'Convirtiendo...';
						const rta = importValue.value / dataConverted;

						document.querySelector(
							'#rtas'
						).innerHTML = `<div id="rta">${commify(
							rta
						)} <b>${moneyType}</b></div>`;

						convertBtn.setAttribute('aria-busy', 'false');
						convertBtn.innerText = 'Convertir';
					}

					if (operator === 'times') {
						convertBtn.innerText = 'Convirtiendo...';
						const rta = importValue.value * dataConverted;

						document.querySelector(
							'#rtas'
						).innerHTML = `<div id="rta">${commify(
							rta
						)} <b>${moneyType}</b></div>`;

						convertBtn.setAttribute('aria-busy', 'false');
						convertBtn.innerText = 'Convertir';
					}
				} else {
					let converDataToNumber = res.data[data]['casa'][placeType].replaceAll(
						',',
						'.'
					);

					let dataConverted = parseFloat(converDataToNumber);

					const importValue = document.querySelector('#import');
					const convertBtn = document.querySelector('#convertBtn');

					if (operator === 'dividedBy') {
						convertBtn.innerText = 'Convirtiendo...';
						const rta = importValue.value / dataConverted;

						document.querySelector(
							'#rtas'
						).innerHTML = `<div id="rta">${commify(
							rta
						)} <b>${moneyType}</b></div>`;

						convertBtn.setAttribute('aria-busy', 'false');
						convertBtn.innerText = 'Convertir';
					}

					if (operator === 'times') {
						convertBtn.innerText = 'Convirtiendo...';
						const rta = importValue.value * dataConverted;

						document.querySelector(
							'#rtas'
						).innerHTML = `<div id="rta">${commify(
							rta
						)} <b>${moneyType}</b></div>`;

						convertBtn.setAttribute('aria-busy', 'false');
						convertBtn.innerText = 'Convertir';
					}
				}
			};

			if (money1 === 0 && money2 === 0) {
				document.querySelector('#convertBtn').setAttribute('aria-busy', 'true');
				document.querySelector('#convertBtn').innerText = 'Convirtiendo...';

				if (dollarOptions.value === 'dolarOficial') {
					parseDataToNumber(0, 'times', 'ARS', 'compra', false);
				}

				if (dollarOptions.value === 'dolarBlue') {
					parseDataToNumber(1, 'times', 'ARS', 'compra', false);
				}

				if (dollarOptions.value === 'dolarBolsa') {
					parseDataToNumber(4, 'times', 'ARS', 'compra', false);
				}

				if (dollarOptions.value === 'dolarLiqui') {
					parseDataToNumber(3, 'times', 'ARS', 'compra', false);
				}

				if (dollarOptions.value === 'dolarTurista') {
					parseDataToNumber(6, 'times', 'ARS', 'venta', false);
				}
			}

			if ((money1 === 0 && money2 === 1) || (money1 === 1 && money2 === 1)) {
				document.querySelector('#convertBtn').setAttribute('aria-busy', 'true');
				document.querySelector('#convertBtn').innerText = 'Convirtiendo...';

				if (dollarOptions.value === 'dolarOficial') {
					parseDataToNumber(0, 'dividedBy', 'USD', 'compra', false);
				}

				if (dollarOptions.value === 'dolarBlue') {
					parseDataToNumber(1, 'dividedBy', 'USD', 'compra', false);
				}

				if (dollarOptions.value === 'dolarBolsa') {
					parseDataToNumber(4, 'dividedBy', 'USD', 'compra', false);
				}

				if (dollarOptions.value === 'dolarLiqui') {
					parseDataToNumber(3, 'dividedBy', 'USD', 'compra', false);
				}

				if (dollarOptions.value === 'dolarTurista') {
					parseDataToNumber(6, 'dividedBy', 'USD', 'venta', false);
				}
			}

			// Manejo de Errores

			if (money1 === 0 && money2 === 1) {
				alert('No puedes convertir de Dólar a Dólar');
			}

			if (money1 === 1 && money2 === 0) {
				alert('No puedes convertir de Peso a Peso');
			}

			if (money1 === 2 && money2 === 2) {
				alert('No puedes convertir de Euro a Euro');
			}

			// Euro

			if (money1 === 2 && money2 === 1) {
				alert('No puedes convertir de Euro a Dolar');
			}

			if (money1 === 0 && money2 === 2) {
				alert('No puedes convertir de Dólar a Euro');
			}

			if (money1 === 2 && money2 === 0) {
				document.querySelector('#convertBtn').setAttribute('aria-busy', 'true');
				document.querySelector('#convertBtn').innerText = 'Convirtiendo...';
				parseDataToNumber(11, 'times', 'ARS', 'compra', true);
			}

			if (money1 === 1 && money2 === 2) {
				document.querySelector('#convertBtn').setAttribute('aria-busy', 'true');
				document.querySelector('#convertBtn').innerText = 'Convirtiendo...';
				parseDataToNumber(11, 'dividedBy', 'EUR', 'compra', true);
			}

			/*if (money1 === 2 && money2 === 1) {
				document.querySelector('#convertBtn').setAttribute('aria-busy', 'true');
				document.querySelector('#convertBtn').innerText = 'Convirtiendo...';
				parseDataToNumber(11, 'times', 'EUR', 'compra', true);
			}*/
		}
	};

	return (
		<>
			<main className='container'>
				<h2>Conversor de Divisas</h2>
				<form>
					<label>
						<span>Ingrese Importe</span>
						<input type='number' id='import' />
					</label>

					<label>
						<span>Seleccione Divisa</span>
						<select id='money1'>
							<option value='usd'>USD (Dólar Estadounidense)</option>
							<option value='ars'>ARS (Peso Argentino)</option>
							<option value='eur'>EUR (Euro del Banco Nación)</option>
						</select>
					</label>

					<button
						onClick={(event) => {
							const money1 = document.querySelector('#money1').selectedIndex;
							const money2 = document.querySelector('#money2').selectedIndex;

							const $select = document.querySelector('#money1');
							const $select2 = document.querySelector('#money2');

							if (money1 === 0 && money2 === 0) {
								$select.value = 'ars';
								$select2.value = 'usd';
								event.preventDefault();
							}

							if (
								(money1 === 0 && money2 === 1) ||
								(money1 === 1 && money2 === 1)
							) {
								$select.value = 'usd';
								$select2.value = 'ars';
								event.preventDefault();
							}

							// Euro

							if (money1 === 2 && money2 === 0) {
								$select.value = 'ars';
								$select2.value = 'eur';
								event.preventDefault();
							}

							if (money1 === 1 && money2 === 2) {
								$select.value = 'eur';
								$select2.value = 'ars';
								event.preventDefault();
							}

							if (money1 === 0 && money2 === 2) {
								$select.value = 'eur';
								$select2.value = 'usd';
								event.preventDefault();
							}

							if (money1 === 2 && money2 === 1) {
								$select.value = 'usd';
								$select2.value = 'eur';
								event.preventDefault();
							}
							event.preventDefault();
						}}>
						<i className='bi bi-arrow-left-right'></i>
					</button>

					<label>
						<span>Seleccione Divisa</span>
						<select id='money2'>
							<option value='ars'>ARS (Peso Argentino)</option>
							<option value='usd'>USD (Dólar Estadounidense)</option>
							<option value='eur'>EUR (Euro del Banco Nación)</option>
						</select>
					</label>
				</form>
				Moneda a usar
				<label id='moneyOptions'>
					<select id='dollarOptions'>
						<option value='dolarOficial'>Dólar Oficial</option>
						<option value='dolarBlue'>Dólar Blue</option>
						<option value='dolarBolsa'>Dólar Bolsa</option>
						<option value='dolarLiqui'>Dólar Liqui</option>
						<option value='dolarTurista'>Dólar Turista</option>
					</select>
				</label>
				<div id='center'>
					<button id='convertBtn' onClick={() => convert()}>
						Convertir
					</button>
				</div>
				<button id='error' className='primary'>
					<i className='bi bi-x-lg'></i> No se pudo actualizar los precios
				</button>
				<div id='rtas'></div>
				<br />
			</main>

			<Footer position='initial' />
		</>
	);
};

export default Conversor;
