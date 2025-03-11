<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();
const rssFeeds = ref([]);

onMounted(() => {
  const storedFeeds = JSON.parse(localStorage.getItem('rssFeeds')) || [];
  rssFeeds.value = storedFeeds;
});

const deleteFeed = (id) => {
  rssFeeds.value = rssFeeds.value.filter(feed => feed.id !== id);
  localStorage.setItem('rssFeeds', JSON.stringify(rssFeeds.value));
};
</script>

<template>
  <section class="feed-list">
    <h1>Flux RSS Disponibles</h1>
    <div v-for="feed in rssFeeds" :key="feed.id" class="feed-item">
      <router-link :to="{ name: 'showFeed', params: { id: feed.id } }">
        {{ feed.title }}
      </router-link>
      <div class="actions">
        <button @click="deleteFeed(feed.id); $event.stopPropagation()">❌</button>
        <router-link :to="{ name: 'editFeed', params: { id: feed.id } }">
          <button @click="$event.stopPropagation()">✏️</button>
        </router-link>
      </div>
    </div>
  </section>
</template>

<style scoped>
.feed-list {
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  text-align: center;
  margin: 20px 0;
}

.feed-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 12px;
  margin-top: 8px;
  border-radius: 12px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
}

.actions {
  display: flex;
  gap: 8px;
}

button {
  background: none;
  border: none;
  cursor: pointer;
}
</style>
