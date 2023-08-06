import { FormEvent, useRef, useState } from 'react';
import { ArrowLeftRight } from 'react-bootstrap-icons';
import { commify } from '../../lib/commify';
import styles from './conversor.module.css';

const Conversor = () => {
	const [firstValue, setFirstValue] = useState('usd');
	const [secondValue, setSecondValue] = useState('ars');
	const [convertBtnText, setConvertBtnText] = useState('Convertir');
	const [dollarOptions, setDollarOptions] = useState('dolarOficial');
	const [conversionOutput, setConversionOutput] = useState('');
	const [error, setError] = useState(false);
	const [output, setOutput] = useState(false);
	const importValue: any = useRef(null);

	const convert = async (event: FormEvent) => {
		event.preventDefault();

		const money1 =
			document.querySelector<HTMLSelectElement>('#money1')!.selectedIndex;
		const money2 =
			document.querySelector<HTMLSelectElement>('#money2')!.selectedIndex;

		const parseDataToNumber = async (
			data: number,
			operator: string,
			moneyType: string,
			placeType: string
		) => {
			setConvertBtnText('Convirtiendo...');

			const request: any = await fetch(
				'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
			).catch((error) => {
				console.error(error);
				setError(true);
				setTimeout(() => {
					setError(false);
				}, 4300);
			});
			if (!request.ok) {
				throw new Error(`Error HTTP: ${request.status}`);
			}
			const res = await request.json();

			const parsedData = parseFloat(res[data]['casa'][placeType]);

			if (operator === 'dividedBy') {
				const rta = importValue.current.value / parsedData;
				setConversionOutput(`${commify(rta)} ${moneyType}`);
				setOutput(true);
			}

			if (operator === 'times') {
				const rta = importValue.current.value * parsedData;
				setConversionOutput(`${commify(rta)} ${moneyType}`);
				setOutput(true);
			}

			setConvertBtnText('Convertir');
		};

		if (money1 === 0 && money2 === 0) {
			setConvertBtnText('Convirtiendo...');

			switch (dollarOptions) {
				case 'dolarOficial':
					parseDataToNumber(0, 'times', 'ARS', 'compra');
					break;
				case 'dolarBlue':
					parseDataToNumber(1, 'times', 'ARS', 'compra');
					break;
				case 'dolarBolsa':
					parseDataToNumber(4, 'times', 'ARS', 'compra');
					break;
				case 'dolarLiqui':
					parseDataToNumber(3, 'times', 'ARS', 'compra');
					break;
				case 'dolarTurista':
					parseDataToNumber(6, 'times', 'ARS', 'venta');
					break;
				default:
					break;
			}
		}

		if ((money1 === 0 && money2 === 1) || (money1 === 1 && money2 === 1)) {
			setConvertBtnText('Convirtiendo...');
			switch (dollarOptions) {
				case 'dolarOficial':
					parseDataToNumber(0, 'dividedBy', 'USD', 'compra');
					break;
				case 'dolarBlue':
					parseDataToNumber(1, 'dividedBy', 'USD', 'compra');
					break;
				case 'dolarBolsa':
					parseDataToNumber(4, 'dividedBy', 'USD', 'compra');
					break;
				case 'dolarLiqui':
					parseDataToNumber(3, 'dividedBy', 'USD', 'compra');
					break;
				case 'dolarTurista':
					parseDataToNumber(6, 'dividedBy', 'USD', 'venta');
					break;
				default:
					break;
			}
		}

		if (money1 === 2 && money2 === 0) {
			setConvertBtnText('Convirtiendo...');
			parseDataToNumber(11, 'times', 'ARS', 'compra');
			setConvertBtnText('Convertir');
		}
	};

	const invertValues = () => {
		setFirstValue(secondValue);
		setSecondValue(firstValue);
	};

	return (
		<form
			className='container'
			onSubmit={convert}>
			<h2>Conversor de Divisas</h2>
			<section className={styles.conversor}>
				<label>
					<span>Ingrese Importe</span>
					<input
						type='number'
						ref={importValue}
						min='1'
						placeholder='Ej: 1'
						data-cy="monto"
						required
					/>
				</label>

				<label>
					<span>Seleccione Divisa 1</span>
					<select
						id='money1'
						onChange={(e) => setFirstValue(e.target.value)}
						value={firstValue}>
						<option value='usd'>USD (Dólar Estadounidense)</option>
						<option value='ars'>ARS (Peso Argentino)</option>
					</select>
				</label>

				<button
					onClick={invertValues}
					className={styles.invertValuesButton}
					form=''>
					<ArrowLeftRight />
				</button>

				<label>
					<span>Seleccione Divisa 2</span>
					<select
						id='money2'
						onChange={(e) => setSecondValue(e.target.value)}
						value={secondValue}>
						<option value='ars'>ARS (Peso Argentino)</option>
						<option value='usd'>USD (Dólar Estadounidense)</option>
					</select>
				</label>
			</section>
			Moneda a usar
			<label className={styles.moneyOptions}>
				<select
					onChange={(e) => setDollarOptions(e.target.value)}
					value={dollarOptions}>
					<option value='dolarOficial'>Dólar Oficial</option>
					<option value='dolarBlue'>Dólar Blue</option>
					<option value='dolarBolsa'>Dólar Bolsa</option>
					<option value='dolarLiqui'>Dólar Liqui</option>
					<option value='dolarTurista'>Dólar Turista</option>
				</select>
			</label>
			<div className={styles.center}>
				<input
					type='submit'
					value={convertBtnText}
					className={styles.convertButton}
					data-cy="submitConversion"
				/>
			</div>
			{output ? (
				<div className={styles.rta}>
					<b>${conversionOutput}</b>
				</div>
			) : null}
			{error ? (
				<div
					id='error'
					className='primary'>
					<i className='bi bi-x-lg'></i> No se pudo actualizar los precios
				</div>
			) : null}
		</form>
	);
};

export default Conversor;
