import { useEffect, useState } from 'react';
import { CurrencyExchange } from 'react-bootstrap-icons';

const App = () => {
	const [data, setData] = useState([]);
	const [error, setError] = useState(false);
	const [loading, setLoading] = useState(true);
	const [updatePricesText, setUpdatePricesText] =
		useState('Actualizar Precios');

	const getData = async () => {
		// Offline Data
		const offlineData = localStorage.getItem('offlineData');
		offlineData ? setData(JSON.parse(offlineData)) : null;

		try {
			const request: Response = await fetch(
				'https://www.dolarsi.com/api/api.php?type=valoresprincipales'
			);
			if (!request.ok) {
				throw new Error(`Error HTTP: ${request.status}`);
			}
			const res = await request.json();
			setData(res);
			localStorage.setItem('offlineData', JSON.stringify(res));
			setLoading(false);
		} catch (err) {
			console.error(err);

			setError(true);
			setUpdatePricesText('Actualizar Precios');
			setTimeout(() => {
				setError(false);
			}, 4300);
		}
	};

	const updateList = async () => {
		setUpdatePricesText('Actualizando Precios...');
		await getData();
		setUpdatePricesText('Actualizar Precios');
	};

	useEffect(() => {
		getData();
		console.log(data);
	}, []);

	return (
		<main className='container'>
			<button
				id='updateList'
				onClick={updateList}
				data-cy='updatePrices'>
				<CurrencyExchange /> {updatePricesText}
			</button>
			{error ? (
				<div
					id='error'
					className='primary'>
					No se pudo actualizar los precios
				</div>
			) : null}
			{loading ? (
				<div
					id='loading'
					aria-busy='true'
					className='secondary'>
					Cargando, Espera por favor...
				</div>
			) : null}

			<table
				role='grid'
				className='container'>
				<thead>
					<tr>
						<th scope='col'>Nombre</th>
						<th scope='col'>Compra</th>
						<th scope='col'>Venta</th>
						<th scope='col'>Variación</th>
					</tr>
				</thead>
				<tbody>
					{data.map((data: any, index: number) => (
						<tr key={index}>
							<th scope='row'>{data.casa.nombre}</th>
							{data.casa.compra === 'No Cotiza' ? (
								<td>{data.casa.compra}</td>
							) : (
								<td>${data.casa.compra}</td>
							)}
							{data.casa.venta === 'No Cotiza' ? (
								<td>{data.casa.venta.toString()}</td>
							) : <td>${data.casa.venta.toString()}</td> &&
							  typeof data.casa.venta === 'object' ? (
								<td>-</td>
							) : (
								<td>${data.casa.venta.toString()}</td>
							)}
							<td>
								{data.casa.variacion > '0' ? (
									<span id='green'>+{data.casa.variacion}</span>
								) : null}

								{data.casa.variacion < '0' ? (
									<span id='red'>{data.casa.variacion}</span>
								) : null}

								{!data.casa.variacion ? (
									<span id='neutral'>-</span>
								) : null || data.casa.variacion === '0' ? (
									<span id='neutral'>{data.casa.variacion}</span>
								) : null}
							</td>
						</tr>
					))}
				</tbody>
			</table>
		</main>
	);
};

export default App;
