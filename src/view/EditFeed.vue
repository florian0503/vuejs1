<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const feedTitle = ref('')
const feedLink = ref('')
const errorMessage = ref('')
const currentFeedId = ref(null)

onMounted(() => {
  const savedFeeds = JSON.parse(localStorage.getItem('savedFeeds')) || []
  const foundFeed = savedFeeds.find((f) => f.id == route.params.id)

  if (!foundFeed) {
    errorMessage.value = "Le flux sélectionné n'existe pas."
    return
  }

  currentFeedId.value = foundFeed.id
  feedTitle.value = foundFeed.title
  feedLink.value = foundFeed.link
})

const updateFeed = () => {
  let savedFeeds = JSON.parse(localStorage.getItem('savedFeeds')) || []
  savedFeeds = savedFeeds.map((f) =>
    f.id === currentFeedId.value ? { ...f, title: feedTitle.value, link: feedLink.value } : f
  )
  localStorage.setItem('savedFeeds', JSON.stringify(savedFeeds))

  router.push('/')
}
</script>

<template>
  <section class="edit-feed">
    <h1>Modifier un Flux RSS</h1>
    <p v-if="errorMessage" class="error-message">{{ errorMessage }}</p>
    <form v-if="!errorMessage" @submit.prevent="updateFeed">
      <input type="text" v-model="feedTitle" placeholder="Nom du flux" required />
      <input type="url" v-model="feedLink" placeholder="URL du flux" required />
      <div class="button-wrapper">
        <button type="submit">Mettre à jour</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.edit-feed {
  max-width: 450px;
  margin: auto;
  padding: 20px;
  background: #f2f2f2;
  border-radius: 10px;
  box-shadow: 0 3px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 15px;
}

.error-message {
  color: #d9534f;
  text-align: center;
  margin-bottom: 12px;
}

input {
  width: 100%;
  padding: 10px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #bbb;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

button {
  background: #28a745;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #218838;
}
</style>
