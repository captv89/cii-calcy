<script>
	import { shipTypes } from '../../data/shipTypes.js';
	import { fuelTypes } from '../../data/fuelTypes.js';
	import Modal from '../../components/Modal.svelte';

	let showModal = false;
	let modalTitle = '';
	let modalMessage = '';

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
		postData('http://localhost:8080/calculate-cii', formData)
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
</script>

<form on:submit|preventDefault={handleSubmit}>
	<label>
		IMO Number:
		<input type="text" bind:value={imo_number} />
	</label>

	<label>
		Ship Name:
		<input type="text" bind:value={ship_name} />
	</label>

	<label>
		Ship Type:
		<select bind:value={ship_type}>
			<option value="">Select Ship Type</option>
			{#each shipTypes as type}
				<option value={type}>{type}</option>
			{/each}
		</select>
	</label>

	<label>
		Flag:
		<input type="text" bind:value={flag} />
	</label>

	<label>
		Year Built:
		<input type="text" bind:value={year_built} />
	</label>

	<label>
		Home Port:
		<input type="text" bind:value={home_port} />
	</label>

	<label>
		Dead Weight:
		<input type="text" bind:value={dead_weight} />
	</label>

	<label>
		Gross Tonnage:
		<input type="text" bind:value={gross_tonnage} />
	</label>

	<label>
		Rating Year:
		<input type="text" bind:value={rating_year} />
	</label>

	{#each fuel_consumptions as fuelConsumption, index (fuelConsumption.id)}
		<div class="fuel-consumption">
			<h3>Fuel Consumption {index + 1}</h3>
			<label>
				Distance:
				<input type="text" bind:value={fuelConsumption.distance} />
			</label>
			<label>
				Fuel:
				<select bind:value={fuelConsumption.fuel}>
					<option value="">Select Fuel Type</option>
					{#each fuelTypes as type}
						<option value={type}>{type}</option>
					{/each}
				</select>
			</label>
			<label>
				Quantity:
				<input type="text" bind:value={fuelConsumption.quantity} />
			</label>
			<button type="button" on:click={() => removeFuelConsumption(index)}>Remove</button>
		</div>
	{/each}

	<button type="button" on:click={addFuelConsumption}>Add Fuel Consumption</button>

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
		width: 100%;
		padding: 10px;
		font-size: 16px;
		border-radius: 4px;
		border: 1px solid #ccc;
	}

	.fuel-consumption {
		margin-bottom: 20px;
		padding: 10px;
		border: 1px solid #ccc;
		border-radius: 4px;
	}

	h3 {
		margin-top: 0;
	}

	select {
		width: 100%;
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
</style>
