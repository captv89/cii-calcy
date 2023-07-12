<!-- Modal component -->
<script>
  // @ts-nocheck
  export let isOpen;
  export let message;
  export let title;

  function closeModal() {
    isOpen = false;
  }
</script>

<style>
  .modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .modal {
    background-color: #fff;
    width: 400px;
    max-width: 90%;
    padding: 20px;
    border-radius: 4px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.3);
    overflow: auto;
  }

  .modal-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 10px;
  }

  .close-button {
    background: none;
    border: none;
    cursor: pointer;
  }

  .grid {
    display: grid;
    row-gap: 10px;
  }

  .grid-item {
    display: flex;
    align-items: center;
  }

  .label {
    font-weight: bold;
    margin-right: 10px;
  }

  .value {
    margin: 0;
  }
</style>

<div class="modal-overlay" style="{isOpen ? 'display: flex' : 'display: none'}">
  <div class="modal">
    <div class="modal-header">
      <h2>{title}</h2>
      <button class="close-button" on:click={closeModal}>X</button>
    </div>
    <div class="modal-content">
      <div class="grid">
        <div class="grid-item">
          <span class="label">CII Rating:</span>
          <span class="value">{message.cii_rating}</span>
        </div>
        <div class="grid-item">
          <span class="label">CII Score:</span>
          <span class="value">{message.cii_score}</span>
        </div>
        <div class="grid-item">
          <span class="label">Rating Year:</span>
          <span class="value">{message.rating_year}</span>
        </div>
        <div class="grid-item">
          <span class="label">Required Score:</span>
          <span class="value">{message.required_cii}</span>
        </div>
        <div class="grid-item">
          <span class="label">Total Distance:</span>
          <span class="value">{message.total_distance}</span>
        </div>
        <div class="grid-item">
          <span class="label">Total CO2 Emission:</span>
          <span class="value">{message.total_co2_emission}</span>
        </div>
      </div>
    </div>
  </div>
</div>
