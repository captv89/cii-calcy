import { expect, test } from '@playwright/test';

test('calculate', async ({ page }) => {
await page.goto('http://localhost:5173/');
await page.getByRole('link', { name: 'Calculate CII' }).click();
await page.getByLabel('IMO Number*').click();
await page.getByLabel('IMO Number*').fill('9876543');
await page.getByLabel('Ship Name*').click();
await page.getByLabel('Ship Name*').fill('Star King');
await page.getByRole('combobox', { name: 'Ship Type*' }).selectOption('Container ship');
await page.getByLabel('Flag').click();
await page.getByLabel('Flag').fill('Panama');
await page.getByLabel('Year Built').click();
await page.getByLabel('Year Built').fill('2015');
await page.getByLabel('Home Port').click();
await page.getByLabel('Home Port').fill('Panama');
await page.getByLabel('Dead Weight*').click();
await page.getByLabel('Dead Weight*').fill('345678');
await page.getByLabel('Gross Tonnage*').click();
await page.getByLabel('Gross Tonnage*').fill('305678');
await page.getByRole('combobox', { name: 'Rating Year*' }).selectOption('2023');
await page.getByLabel('Distance*').click();
await page.getByLabel('Distance*').fill('25000');
await page.getByRole('combobox', { name: 'Fuel Type*' }).selectOption('LFO');
await page.getByLabel('Quantity*').click();
await page.getByLabel('Quantity*').fill('3000');
await page.getByRole('button', { name: 'Add Fuel Consumption' }).click();
await page
	.locator('form div')
	.filter({
		hasText: 'Fuel Consumption: 2'
	})
	.getByLabel('Distance*')
	.click();
await page
	.locator('form div')
	.filter({
		hasText: 'Fuel Consumption: 2'
	})
	.getByLabel('Distance*')
	.fill('10000');
await page
	.locator('form div')
	.filter({
		hasText: 'Fuel Consumption: 2'
	})
	.getByRole('combobox', { name: 'Fuel Type*' })
	.selectOption('Diesel/Gas Oil');
await page
	.locator('form div')
	.filter({
		hasText:
			'Fuel Consumption: 2'
	})
	.getByLabel('Quantity*')
	.click();
await page
	.locator('form div')
	.filter({
		hasText: 'Fuel Consumption: 2'
	})
	.getByLabel('Quantity*')
	.fill('1200');
await page.getByRole('button', { name: 'Submit' }).click();

// Check the result
await page.getByText('A', { exact: true }).click();
await page.getByText('0.30').click();
await page.getByText('3.69').click();
await page.getByText('35000.00').click();
await page.getByText('13300.20').click();

// Close the page
await page.close();
});
