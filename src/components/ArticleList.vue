<script setup>
import { ref } from 'vue';

defineProps({
  articles: Array
})

const storedFavorites = ref([]);

const emit = defineEmits(['update-favorites']);

if (localStorage.getItem('savedFavorites')) {
  try {
    storedFavorites.value = JSON.parse(localStorage.getItem('savedFavorites'));
  } catch (e) {
    console.error('Erreur de chargement des favoris:', e);
    storedFavorites.value = [];
  }
} else {
  storedFavorites.value = [];
}

const toggleFavorite = (article) => {
  let updatedFavorites = storedFavorites.value;
  
  if (!updatedFavorites.some(fav => fav.title === article.title)) {
    updatedFavorites.push(article);
  } else {
    updatedFavorites = updatedFavorites.filter(fav => fav.title !== article.title);
  }

  localStorage.setItem('savedFavorites', JSON.stringify(updatedFavorites));
  storedFavorites.value = updatedFavorites;
  emit('update-favorites', updatedFavorites);
}

const isFavorite = (article) => {
  return storedFavorites.value.some(fav => fav.title === article.title);
};
</script>

<template>
  <section class="article-list">
    <div v-for="article in articles" :key="article.link" class="article-card">
      <img :src="article.image" alt="Image de l'article" class="article-image">
      <div class="article-content">
        <div class="text-wrapper">
          <h2>{{ article.title }}</h2>
          <p>{{ article.description }}</p>
        </div>
        <div class="action-buttons">
          <a :href="article.link" target="_blank">Lire l'article</a>
          <button @click="toggleFavorite(article)">
            {{ isFavorite(article) ? 'Retirer des favoris' : 'Ajouter aux favoris' }}
          </button>
        </div>
      </div>
    </div>
  </section>
</template>

<style scoped>
.article-list {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  padding: 40px 0;
}

.article-card {
  width: 350px;
  border: 1px solid #ddd;
  border-radius: 10px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.article-image {
  width: 100%;
  height: 160px;
  object-fit: cover;
}

.article-content {
  padding: 12px;
}

.text-wrapper {
  overflow: hidden;
  height: 210px;
}

h2 {
  font-size: 1.2em;
  line-height: 1.4;
  margin-bottom: 8px;
}

p {
  font-size: 0.9em;
  color: #555;
}

.action-buttons {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 12px;
}

.action-buttons a, .action-buttons button {
  background: #4a90e2;
  color: white;
  padding: 6px 12px;
  border-radius: 6px;
  cursor: pointer;
  border: none;
  text-decoration: none;
}

button {
  background: #ff6b6b;
}

button:hover {
  background: #e04f5f;
}
</style>
