<script setup>
import Articles from '@/components/Articles.vue'
import router from '@/router'
import { ref, onMounted, computed } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const currentFeed = ref(null)
const articleList = ref([])
const articleLimit = ref(10)

onMounted(async () => {
  const storedFeeds = JSON.parse(localStorage.getItem('rssFeeds')) || []
  currentFeed.value = storedFeeds.find((f) => f.id == route.params.id)

  if (!currentFeed.value) {
    router.push('/notfound')
    return
  }

  try {
    const response = await fetch(
      `https://api.allorigins.win/get?url=${encodeURIComponent(currentFeed.value.link)}`
    )
    const data = await response.json()
    const text = data.contents
    const parser = new DOMParser()
    const xml = parser.parseFromString(text, 'application/xml')

    articleList.value = Array.from(xml.querySelectorAll('item')).map((item) => ({
      title: item.querySelector('title')?.textContent || 'Sans titre',
      link: item.querySelector('link')?.textContent || '#',
      description: item.querySelector('description')?.textContent || 'Aucune description',
      image:
        item.querySelector('media\\:thumbnail, thumbnail')?.getAttribute('url') ||
        item.querySelector('media\\:content, content')?.getAttribute('url')
    }))
  } catch (error) {
    console.error('Erreur de récupération du flux RSS:', error)
  }
})

const displayedArticles = computed(() => {
  return articleLimit.value === 'all' ? articleList.value : articleList.value.slice(0, parseInt(articleLimit.value))
})
</script>

<template>
  <div v-if="currentFeed">
    <h1 class="header">Articles de {{ currentFeed.title }}</h1>

    <div class="selector">
      <label for="limit"></label>
      <select v-model="articleLimit">
        <option value="10">10</option>
        <option value="50">50</option>
        <option value="100">100</option>
        <option value="all">Tout</option>
      </select>
    </div>
    <Articles :articles="displayedArticles" />
  </div>

  <div v-else>
    <p>Flux introuvable.</p>
  </div>
</template>

<style scoped>
.selector {
  display: flex;
  justify-content: center;
  margin-top: 12px;
  margin-bottom: 25px;
}

.header {
  text-align: center;
}
</style>
