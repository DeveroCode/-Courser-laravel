import { createRouter, createWebHistory } from 'vue-router'
import Layout from '@/Layouts/IndexLayout.vue'
import Index from '@/views/IndexView.vue'
import Introduccion from '@/views/IntroduccionView.vue'
import Mvc from '@/views/MvcView.vue'
import RutasView from '@/views/RutasView.vue'
import Endpoints from "@/views/EndpointsView.vue"
import Livew from "@/views/livewire/IndexLive.vue"
import Estructura from "@/views/livewire/EstructuraView.vue"
import Interaccion from "@/views/livewire/InteraccionView.vue"
import CreateViewVue from '@/views/livewire/CreateView.vue'
import ReadViewVue from '@/views/livewire/ReadView.vue'
import UpdateViewVue from '@/views/livewire/UpdateView.vue'
import DeleteViewVue from '@/views/livewire/DeleteView.vue'
import EmitsViewVue from '@/views/listeners/EmitsView.vue'
import EmitOtraVue from '@/views/livewire/EmitOtra.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: { name: 'start' }
    },
    {
      path: '/',
      name: 'livewire-php',
      component: Layout,
      children: [
        {
          path: 'start',
          name: 'start',
          component: Index
        },
        {
          path: 'introduccion',
          name: 'introduccion',
          component: Introduccion
        },
        {
          path: 'MVC-laravel',
          name: 'MVC-laravel',
          component: Mvc
        },
        {
          path: 'rutas',
          name: 'rutas',
          component: RutasView
        },
        {
          path: 'endpoints',
          name: 'endpoints',
          component: Endpoints
        },
        {
          path: 'livewire',
          name: 'livewire',
          component: Livew
        },
        {
          path: 'livewire/estructura',
          name: 'estructura',
          component: Estructura
        },
        {
          path: 'livewire/interaccion',
          name: 'interaccion',
          component: Interaccion
        }, {
          path: 'livewire/CRUD/create',
          name: 'create',
          component: CreateViewVue
        },
        {
          path: 'livewire/CRUD/read',
          name: 'read',
          component: ReadViewVue
        },
        {
          path: 'livewire/CRUD/update',
          name: 'update',
          component: UpdateViewVue
        },
        {
          path: 'livewire/CRUD/delete',
          name: 'delete',
          component: DeleteViewVue
        },
        {
          path: 'livewire/listeners',
          name: 'emit',
          component: EmitsViewVue
        },
        {
          path: 'livewire/Emit/Segunda-forma',
          name: 'segunda',
          component: EmitOtraVue
        },
        {
          path: "excel",
          name: "excel",
          component: () => import("@/views/excel/excel.vue")
        },
        {
          path: "graficas",
          name: "graficas",
          component: () => import("@/views/excel/graficas.vue")
        },
        {
          path: "/validacion",
          name: "validacion",
          component: () => import("@/views/ValidacionView.vue")
        }
      ]
    },
    {

    }
  ]
})

export default router
