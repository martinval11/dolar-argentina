/* eslint-disable */

describe('Test Dolar Argentina`s Pages', () => {
	it('Should render the home page', () => {
		cy.visit('http://localhost:5173/');

		cy.contains('Dólar Argentina');
		cy.contains('Dolar');
		cy.contains('Compra');
		cy.contains('Venta');
		cy.contains('Variación');

		cy.get('[data-cy="darkModeButton"]').click();
		cy.get('[data-cy="darkModeButton"]').click();

		cy.get('[data-cy="openMenu"]').click();

		// Conversor
		cy.get('[data-cy="conversorLink"]').click();
    cy.url().should('include', '/conversor')
    cy.get('[data-cy="monto"]').type('1');
		cy.get('[data-cy="submitConversion"]').click();
    cy.contains('$');

    // Euro
		cy.get('[data-cy="openMenu"]').click();
		cy.get('[data-cy="euroLink"]').click();
    cy.get('[data-cy="updateEuroPrices"]').click();
		cy.contains('Actualizando Precios...');
		cy.contains('Actualizar Precios');
    cy.url().should('include', '/euro')
    cy.contains('Entidad');
		cy.contains('Compra');
		cy.contains('Venta');
		cy.contains('Transatlántica S.A.');

    // Go Back to homepage
    cy.get('[data-cy="openMenu"]').click();

		cy.get('[data-cy="homeLink"]').click();
    cy.url().should('include', '/')

    // Test Update Prices Button
    cy.get('[data-cy="updatePrices"]').click();
		cy.contains('Actualizando Precios...');
		cy.contains('Actualizar Precios');
	});
});
