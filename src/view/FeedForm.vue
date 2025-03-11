<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()
const feedTitle = ref('')
const feedLink = ref('')

const saveFeed = () => {
  if (!feedTitle.value.trim() || !feedLink.value.trim()) return

  const rssFeeds = JSON.parse(localStorage.getItem('rssFeeds')) || []
  rssFeeds.push({ id: Date.now(), title: feedTitle.value, link: feedLink.value })
  localStorage.setItem('rssFeeds', JSON.stringify(rssFeeds))

  router.push('/')
}
</script>

<template>
  <section class="rss-form">
    <h1>Ajouter un Flux RSS</h1>
    <form @submit.prevent="saveFeed">
      <input type="text" v-model="feedTitle" placeholder="Nom du flux" required />
      <input type="url" v-model="feedLink" placeholder="URL du flux" required />
      <div class="button-wrapper">
        <button type="submit">Enregistrer</button>
      </div>
    </form>
  </section>
</template>

<style scoped>
.rss-form {
  max-width: 400px;
  margin: auto;
  padding: 20px;
  background: #f9f9f9;
  border-radius: 12px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  text-align: center;
  margin-bottom: 15px;
}

input {
  width: 100%;
  padding: 8px;
  margin-bottom: 12px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.button-wrapper {
  display: flex;
  justify-content: center;
}

button {
  background: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}

button:hover {
  background: #0056b3;
}
</style>
