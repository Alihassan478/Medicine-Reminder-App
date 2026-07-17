<template>
  <form class="form-card" @submit.prevent="handleSubmit">
    <h2>Add New Reminder</h2>

    <input v-model="name" type="text" placeholder="Medicine name (e.g. Panadol)" required />
    <input v-model="dosage" type="text" placeholder="Dosage (e.g. 500mg)" required />
    <input v-model="time" type="time" required />

    <select v-model="frequency">
      <option>Daily</option>
      <option>Twice a day</option>
      <option>Weekly</option>
    </select>

    <textarea v-model="notes" placeholder="Notes (optional)"></textarea>

    <button type="submit">+ Add Reminder</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import axios from 'axios'

// "emit" lets this child component tell the parent (App.vue) that something happened
const emit = defineEmits(['medicine-added'])

const API_URL = 'http://localhost:5000/api/medicines'

// Local form fields — each input above is bound to one of these using v-model
const name = ref('')
const dosage = ref('')
const time = ref('')
const frequency = ref('Daily')
const notes = ref('')

async function handleSubmit() {
  try {
    await axios.post(API_URL, {
      name: name.value,
      dosage: dosage.value,
      time: time.value,
      frequency: frequency.value,
      notes: notes.value,
    })

    // Reset the form after successful submit
    name.value = ''
    dosage.value = ''
    time.value = ''
    frequency.value = 'Daily'
    notes.value = ''

    // Tell App.vue to refresh the list so the new reminder shows up
    emit('medicine-added')
  } catch (error) {
    console.error('Error adding medicine:', error)
    alert('Failed to add reminder. Check if the backend server is running.')
  }
}
</script>

<style scoped>
.form-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  margin-bottom: 25px;
}

.form-card h2 {
  margin-top: 0;
  font-size: 18px;
  color: #34495e;
}

input,
select,
textarea {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border: 1px solid #dcdcdc;
  border-radius: 6px;
  font-size: 14px;
}

button {
  width: 100%;
  padding: 10px;
  background-color: #27ae60;
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 15px;
  cursor: pointer;
}

button:hover {
  background-color: #219150;
}
</style>
