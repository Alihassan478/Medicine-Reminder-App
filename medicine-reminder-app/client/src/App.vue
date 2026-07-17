<template>
  <div class="container">
    <h1>💊 Medicine Reminder</h1>

    <!-- Form component: emits an event "medicine-added" when a new reminder is saved -->
    <MedicineForm @medicine-added="fetchMedicines" />

    <!-- List component: shows all reminders, needs the list + refresh function passed down -->
    <MedicineList :medicines="medicines" @refresh="fetchMedicines" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import MedicineForm from './components/MedicineForm.vue'
import MedicineList from './components/MedicineList.vue'

// Base URL of our backend API
const API_URL = 'http://localhost:5000/api/medicines'

// This holds the list of medicines. "ref" makes it reactive,
const medicines = ref([])

// Function to fetch all medicines from the backend
async function fetchMedicines() {
  try {
    const response = await axios.get(API_URL)
    medicines.value = response.data
  } catch (error) {
    console.error('Error fetching medicines:', error)
  }
}

// onMounted runs automatically once the component loads on screen.
// This is how we load existing reminders as soon as the app opens.
onMounted(() => {
  fetchMedicines()
})
</script>

<style>
* {
  box-sizing: border-box;
}

body {
  background-color: #f4f6f8;
  font-family: 'Segoe UI', Arial, sans-serif;
  margin: 0;
  padding: 0;
}

.container {
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
}

h1 {
  text-align: center;
  color: #2c3e50;
  margin-bottom: 30px;
}
</style>
