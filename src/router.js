import { createRouter, createWebHistory } from 'vue-router'

import { supabase } from './supabase'

import Home from './views/Home.vue'
import Housing from './views/Housing.vue'
import Land from './views/Land.vue'
import PostProperty from './views/PostProperty.vue'
import Login from './views/Login.vue'
import Register from './views/Register.vue'
import ForgotPassword from './views/ForgotPassword.vue'
import ResetPassword from './views/ResetPassword.vue'
import Dashboard from './views/Dashboard.vue'
import AdminLogin from './views/AdminLogin.vue'
import Admin from './views/Admin.vue'
import PropertyDetails from './views/PropertyDetails.vue'
import MyProperties from './views/MyProperties.vue'
import SavedProperties from './views/SavedProperties.vue'
import MyInquiries from './views/MyInquiries.vue'
import Notifications from './views/Notifications.vue'
import Agents from './views/Agents.vue'
import AgentProfile from './views/AgentProfile.vue'

const routes = [
  { path: '/', component: Home },
  { path: '/housing', component: Housing },
  { path: '/land', component: Land },
  { path: '/agents', component: Agents },

  { path: '/property/:id', component: PropertyDetails },

  {
    path: '/agent/:id',
    component: AgentProfile
  },

  {
    path: '/post-property',
    component: PostProperty,
    meta: { requiresAuth: true }
  },

  { path: '/login', component: Login },
  { path: '/register', component: Register },
  { path: '/forgot-password', component: ForgotPassword },
  { path: '/reset-password', component: ResetPassword },

  {
    path: '/dashboard',
    component: Dashboard,
    meta: { requiresAuth: true }
  },

  {
    path: '/my-properties',
    component: MyProperties,
    meta: { requiresAuth: true }
  },

  {
    path: '/saved-properties',
    component: SavedProperties,
    meta: { requiresAuth: true }
  },

  {
    path: '/my-inquiries',
    component: MyInquiries,
    meta: { requiresAuth: true }
  },

  {
    path: '/notifications',
    component: Notifications,
    meta: { requiresAuth: true }
  },

  { path: '/admin-login', component: AdminLogin },
  { path: '/admin', component: Admin }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach(async (to) => {

  if (!to.meta.requiresAuth) {
    return true
  }

  const { data } =
    await supabase.auth.getUser()

  if (!data.user) {

    return {
      path: '/login',
      query: {
        redirect: to.fullPath
      }
    }

  }

  return true

})

export default router