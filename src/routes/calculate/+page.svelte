<script>
	// @ts-nocheck

	import { shipTypes } from '../../data/shipTypes.js';
	import { fuelTypes } from '../../data/fuelTypes.js';
	import Modal from '../../components/Modal.svelte';

	let showModal = false;
	let modalTitle = '';
	let modalMessage = '';

	let isIMOValid = true;
	let isYearValid = true;

	let fuel_consumptions = [
		{ id: Math.random().toString(36).substring(7), distance: '', fuel: '', quantity: '' }
	];
	let imo_number = '';
	let ship_name = '';
	let ship_type = '';
	let flag = '';
	let year_built = '';
	let home_port = '';
	let dead_weight = '';
	let gross_tonnage = '';
	let rating_year = '';

	function addFuelConsumption() {
		fuel_consumptions = [
			...fuel_consumptions,
			{ id: Math.random().toString(36).substring(7), distance: '', fuel: '', quantity: '' }
		];
	}

	// @ts-ignore
	function removeFuelConsumption(index) {
		fuel_consumptions = fuel_consumptions.filter((_, i) => i !== index);
	}

	// Function to make the POST request
	async function postData(url = '', data = {}) {
		const response = await fetch(url, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify(data)
		});

		return response.json();
	}

	function handleSubmit() {
		const formData = {
			imo_number,
			ship_name,
			ship_type,
			flag,
			year_built,
			home_port,
			dead_weight,
			gross_tonnage,
			rating_year,
			fuel_consumptions
		};

		// Perform form submission with formData
		console.log(formData);

		// Make the POST request
		postData('http://localhost:8181/calculate-cii', formData)
			.then((data) => {
				// Handle the response data
				console.log(data);
				// Show the response data
				showModal = true;
				modalTitle = 'Result';
				modalMessage = data;
			})
			.catch((error) => {
				// Handle any errors
				console.error(error);
				// Show any errors
				showModal = true;
				modalTitle = 'Error';
				modalMessage = 'An error occurred: ' + error.message;
			});
	}
	function validateImoNumber(event) {
		const input = event.target;
		const maxLength = 7;

		let value = input.value;
		value = value.replace(/\D/g, ''); // Remove non-numeric characters

		if (value.length > maxLength) {
			value = value.slice(0, maxLength);
		}

		if (value.length !== maxLength) {
			isIMOValid = false;
		} else {
			isIMOValid = true;
		}

		input.value = value;
	}

	function validateYear() {
		const regex = /^\d{4}$/;
		const isValidYear = regex.test(year_built);

		// If the year is not valid, show an error message via tippy.js
		if (!isValidYear) {
			isYearValid = false;
		} else {
			isYearValid = true;
		}
	}
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		IMO Number<span class="required-indicator">*</span>
		<input
			id="imo"
			type="text"
			bind:value={imo_number}
			pattern="[0-9]*"
			on:input={validateImoNumber}
			title="IMO Number should be numeric and 7 characters long."
			required
			class:invalid={!isIMOValid}
		/>
	</label>

	<label>
		Ship Name<span class="required-indicator">*</span>
		<input type="text" bind:value={ship_name} required />
	</label>

	<label>
		Ship Type<span class="required-indicator">*</span>
		<select bind:value={ship_type} required>
			<option value="">Select Ship Type</option>
			{#each shipTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</label>

	<label>
		Flag State
		<input type="text" bind:value={flag} />
	</label>

	<label>
		Year Built
		<input
			id="year-built"
			type="text"
			bind:value={year_built}
			pattern="[0-9]*"
			on:input={validateYear}
			title="Please enter a valid 4-digit year."
			class:invalid={!isYearValid}
		/>
	</label>

	<label>
		Home Port
		<input type="text" bind:value={home_port} />
	</label>

	<label>
		Dead Weight<span class="required-indicator">*</span>

		<input
			type="text"
			bind:value={dead_weight}
			pattern="[0-9]*"
			title="Please enter a numeric value"
			required
		/>
	</label>

	<label>
		Gross Tonnage<span class="required-indicator">*</span>
		<input
			type="text"
			bind:value={gross_tonnage}
			pattern="[0-9]*"
			title="Please enter a numeric value"
			required
		/>
	</label>

	<label>
		Rating Year<span class="required-indicator">*</span>
		<select bind:value={rating_year} required>
			<option value="">Select Year</option>
			<option value="2023">2023</option>
			<option value="2024">2024</option>
			<option value="2025">2025</option>
			<option value="2026">2026</option>
		</select>
	</label>

	{#each fuel_consumptions as fuelConsumption, index (fuelConsumption.id)}
		<div class="fuel-consumption">
			<h3>Fuel Consumption: {index + 1}</h3>
			<label>
				Distance<span class="required-indicator">*</span>
				<input
					type="text"
					bind:value={fuelConsumption.distance}
					pattern="[0-9]*"
					title="Please enter a numeric value"
					required
				/>
			</label>
			<label>
				Fuel Type<span class="required-indicator">*</span>
				<select bind:value={fuelConsumption.fuel} required>
					<option value="">Select Fuel Type</option>
					{#each fuelTypes as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
			</label>
			<label>
				Quantity<span class="required-indicator">*</span>
				<input
					type="text"
					bind:value={fuelConsumption.quantity}
					pattern="[0-9]*"
					title="Please enter a numeric value"
					required
				/>
			</label>
			<button type="button" on:click={() => removeFuelConsumption(index)}>Remove</button>
		</div>
	{/each}

	<button type="button" class="add-fuel" on:click={addFuelConsumption}>Add Fuel Consumption</button>

	<button type="submit">Submit</button>
</form>

<Modal isOpen={showModal} title={modalTitle} message={modalMessage} />

<style>
	form {
		max-width: 500px;
		margin: auto;
		padding: 20px;
	}

	label {
		display: block;
		margin-bottom: 10px;
	}

	input[type='text'] {
		width: 80%;
		padding: 10px;
		font-size: 16px;
		border-radius: 4px;
		border: 1px solid #ccc;
	}

	input.invalid {
		border: 1px solid red;
	}

	.fuel-consumption {
		width: 100%;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
		overflow: auto;
		margin-bottom: 10px;
	}

	h3 {
		margin-top: 0;
	}

	select {
		width: 85%;
		padding: 10px;
		font-size: 16px;
		border-radius: 4px;
		border: 1px solid #ccc;
	}

	button {
		display: inline-block;
		padding: 10px 20px;
		font-size: 16px;
		border-radius: 4px;
		background-color: #007bff;
		color: #fff;
		border: none;
		cursor: pointer;
	}

	button[type='submit'] {
		background-color: #28a745;
	}

	button[type='button'] {
		background-color: #dc3545;
	}

	button.add-fuel {
		background-color: #007bff;
	}

	.required-indicator {
		color: red;
		margin-left: 5px;
	}
</style>
