<script setup>
import Articles from '@/components/Articles.vue'
import { ref, computed } from 'vue';

const savedFavorites = ref(JSON.parse(localStorage.getItem('savedFavorites')) || []);
const searchTerm = ref('');

const filteredArticles = computed(() => {
  if (!searchTerm.value.trim()) {
    return savedFavorites.value;
  }
  return savedFavorites.value.filter(article =>
    article.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
    article.description.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

const refreshFavorites = (updatedFavorites) => {
  savedFavorites.value = updatedFavorites;
};

</script>

<template>
  <section class="favorites-container">
    <input
      v-model="searchTerm"
      type="text"
      placeholder="Rechercher un article favori"
      class="search-input"
    />
    <div class="articles-wrapper">
      <p v-if="filteredArticles.length === 0">Aucun article favori trouvé.</p>
      <Articles v-else :articles="filteredArticles" @update-favorites="refreshFavorites"/>
    </div>
  </section>
</template>

<style scoped>
.favorites-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
}

.search-input {
  width: 700px;
  padding: 10px;
  border: 1px solid #aaa;
  border-radius: 6px;
  margin-bottom: 20px;
}

.articles-wrapper {
  width: 100%;
  display: flex;
  justify-content: center;
}

p {
  font-size: 1.1rem;
  color: #666;
}
</style>
