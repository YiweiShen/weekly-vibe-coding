
import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import About from '../views/About.vue'
import Contact from '../views/Contact.vue'
import Privacy from '../views/Privacy.vue'
import Terms from '../views/Terms.vue'
import Support from '../views/Support.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path: '/', name: 'Home', component: Home },
    { path: '/about', name: 'About', component: About },
    { path: '/contact', name: 'Contact', component: Contact },
    { path: '/privacy', name: 'Privacy', component: Privacy },
    { path: '/terms', name: 'Terms', component: Terms },
    { path: '/support', name: 'Support', component: Support }
  ]
})

export default router
