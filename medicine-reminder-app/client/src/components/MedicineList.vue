<template>
  <div class="list-card">
    <h2>Your Reminders</h2>

    <p v-if="medicines.length === 0" class="empty">No reminders yet. Add one above!</p>

    <div
      v-for="med in medicines"
      :key="med._id"
      class="medicine-item"
      :class="{ taken: med.taken }"
    >
      <div class="info">
        <strong>{{ med.name }}</strong> — {{ med.dosage }}
        <div class="meta">⏰ {{ med.time }} • {{ med.frequency }}</div>
        <div v-if="med.notes" class="notes">📝 {{ med.notes }}</div>
      </div>

      <div class="actions">
        <button class="taken-btn" @click="toggleTaken(med)">
          {{ med.taken ? '✅ Taken' : 'Mark Taken' }}
        </button>
        <button class="delete-btn" @click="deleteMedicine(med._id)">🗑️</button>
      </div>
    </div>
  </div>
</template>

<script setup>
import axios from 'axios'

// "props" are data passed down from the parent component (App.vue)
const props = defineProps({
  medicines: {
    type: Array,
    required: true,
  },
})

// "emit" lets us ask the parent to refresh the list after we change something
const emit = defineEmits(['refresh'])

const API_URL = 'http://localhost:5000/api/medicines'

// Flip the "taken" true/false status for a reminder
async function toggleTaken(med) {
  try {
    await axios.put(`${API_URL}/${med._id}`, { taken: !med.taken })
    emit('refresh')
  } catch (error) {
    console.error('Error updating medicine:', error)
  }
}

// Delete a reminder permanently
async function deleteMedicine(id) {
  try {
    await axios.delete(`${API_URL}/${id}`)
    emit('refresh')
  } catch (error) {
    console.error('Error deleting medicine:', error)
  }
}
</script>

<style scoped>
.list-card {
  background: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.list-card h2 {
  margin-top: 0;
  font-size: 18px;
  color: #34495e;
}

.empty {
  color: #999;
  font-style: italic;
}

.medicine-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  border: 1px solid #eee;
  border-radius: 8px;
  margin-bottom: 10px;
}

.medicine-item.taken {
  background-color: #eafaf1;
  opacity: 0.75;
}

.meta {
  font-size: 13px;
  color: #777;
  margin-top: 4px;
}

.notes {
  font-size: 13px;
  color: #555;
  margin-top: 4px;
}

.actions {
  display: flex;
  gap: 8px;
}

.taken-btn {
  background-color: #2980b9;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}

.delete-btn {
  background-color: #e74c3c;
  color: white;
  border: none;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-size: 13px;
}
</style>
