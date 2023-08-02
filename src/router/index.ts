// import { nextTick } from 'vue'
import { createRouter, createWebHistory, type RouteLocation } from 'vue-router'
import IndexView from '../views/IndexView.vue'

async function tryScrollToAnchor(hash: string, timeout = 1000, delay = 100) {
  const wait = (duration: number) => {
    return new Promise((resolve) => setTimeout(resolve, duration))
  }

  while (timeout > 0) {
    const el = document.querySelector(hash)
    if (el) {
      setTimeout(() => {
        el.scrollIntoView({ behavior: 'smooth' })
      }, 0)
      break
    }
    await wait(delay)
    timeout = timeout - delay
  }
}

const router = createRouter({
  history: createWebHistory(import.meta.env.VITE_BASE_URL),
  routes: [
    {
      path: '/',
      name: 'index',
      component: IndexView,
      meta: {
        layout: 'NoHeader',
        layoutProps: { isFluid: true }
      }
    },
    {
      path: '/happened',
      name: 'events_happened',
      component: () => import('../views/EventsHappenedView.vue'),
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/upcoming',
      name: 'events_upcoming',
      component: () => import('../views/EventsUpcomingView.vue'),
      meta: {
        layout: 'Default'
      }
    },
    {
      path: '/event/:id(\\d+)',
      name: 'event',
      component: () => import('../views/EventView.vue'),
      props: ({ params }) => ({ id: Number(params.id) }),
      meta: {
        layout: 'NoHeader'
      }
    },
    {
      path: '/:pathMatch(.*)*',
      name: '404',
      component: () => import('../views/ErrorView.vue'),
      meta: {
        layout: 'Default'
      }
    }
  ],
  scrollBehavior(to, from, savedPosition) {
    if (to.hash) {
      const el = document.querySelector(to.hash)
      if (el) {
        return {
          el,
          behavior: 'smooth'
        }
      } else {
        tryScrollToAnchor(to.hash, 1000, 100)
      }
    }
    return savedPosition || { top: 0 }
  }
})

const show404 = (currentRoute: RouteLocation) => {
  router.push({
    name: '404',
    params: { pathMatch: currentRoute.path.split('/').slice(1) },
    query: currentRoute.query,
    hash: currentRoute.hash
  })
}

export default router
export { show404 }
