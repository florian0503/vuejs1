import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '@/views/HomeView.vue'
import AddFeed from '@/views/AddFeed.vue'
import FeedArticles from '@/views/FeedArticles.vue'
import EditFeed from '@/views/EditFeed.vue'
import FavoriteArticles from '@/views/FavoriteArticles.vue'
import NotFound from '@/views/NotFound.vue'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: HomeView,
        },
        {
            path: '/add-feed',
            name: 'addFeed',
            component: AddFeed,
        },
        {
            path: '/feed/:id',
            name: 'feedArticles',
            component: FeedArticles,
        },
        {
            path: '/edit-feed/:id',
            name: 'editFeed',
            component: EditFeed,
        },
        {
            path: '/favorites',
            name: 'favorites',
            component: FavoriteArticles,
        },
        {
            path: '/:pathMatch(.*)*',
            name: 'notFound',
            component: NotFound,
        },
    ],
})

export default router
