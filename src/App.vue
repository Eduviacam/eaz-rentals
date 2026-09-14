<template>
  <div class="app">

    <!-- Global navigation is hidden on the homepage.
         Home.vue has its own professional Eaz rentals header. -->

    <header
      v-if="!isHome"
      class="navbar"
    >

      <RouterLink
        to="/"
        class="logo"
      >
        Eaz rentals
      </RouterLink>


      <nav class="desktop-nav">

        <RouterLink to="/">
          {{ t('nav.home') }}
        </RouterLink>

        <RouterLink to="/housing">
          {{ t('nav.housing') }}
        </RouterLink>

        <RouterLink to="/land">
          {{ t('nav.land') }}
        </RouterLink>

        <RouterLink to="/post-property">
          {{ t('nav.postProperty') }}
        </RouterLink>

      </nav>


      <div class="right-side">

        <div class="language-switcher">

          <button
            type="button"
            :class="{ active: locale === 'en' }"
            @click="changeLanguage('en')"
          >
            EN
          </button>

          <span>/</span>

          <button
            type="button"
            :class="{ active: locale === 'fr' }"
            @click="changeLanguage('fr')"
          >
            FR
          </button>

        </div>


        <div class="auth-buttons">

          <template v-if="!user">

            <RouterLink
              to="/login"
              class="login-btn"
            >
              {{ t('nav.login') }}
            </RouterLink>

            <RouterLink
              to="/register"
              class="register-btn"
            >
              {{ t('nav.register') }}
            </RouterLink>

          </template>


          <template v-else>

            <!-- NOTIFICATION BELL -->

            <RouterLink
              to="/notifications"
              class="notification-btn"
              aria-label="Notifications"
              title="Notifications"
            >

              <span class="bell">
                ♢
              </span>

              <span
                v-if="unreadCount > 0"
                class="notification-count"
              >
                {{ unreadCount > 99 ? '99+' : unreadCount }}
              </span>

            </RouterLink>


            <RouterLink
              to="/dashboard"
              class="dashboard-btn"
            >
              {{ t('nav.dashboard') }}
            </RouterLink>


            <button
              class="logout-btn"
              @click="logout"
            >
              {{ t('nav.logout') }}
            </button>

          </template>

        </div>

      </div>


      <button
        class="mobile-menu-button"
        @click="mobileMenuOpen = !mobileMenuOpen"
        :aria-label="t('nav.menu')"
      >
        {{ t('nav.menu') }}
      </button>

    </header>


    <!-- MOBILE MENU -->

    <div
      v-if="!isHome && mobileMenuOpen"
      class="mobile-menu"
    >

      <RouterLink
        to="/"
        @click="closeMobileMenu"
      >
        {{ t('nav.home') }}
      </RouterLink>


      <RouterLink
        to="/housing"
        @click="closeMobileMenu"
      >
        {{ t('nav.housing') }}
      </RouterLink>


      <RouterLink
        to="/land"
        @click="closeMobileMenu"
      >
        {{ t('nav.land') }}
      </RouterLink>


      <RouterLink
        to="/post-property"
        @click="closeMobileMenu"
      >
        {{ t('nav.postProperty') }}
      </RouterLink>


      <RouterLink
        v-if="user"
        to="/dashboard"
        @click="closeMobileMenu"
        class="mobile-dashboard"
      >
        {{ t('nav.dashboard') }}
      </RouterLink>


      <!-- MOBILE NOTIFICATIONS -->

      <RouterLink
        v-if="user"
        to="/notifications"
        @click="closeMobileMenu"
        class="mobile-notification"
      >

        <span>
          Notifications
        </span>

        <span
          v-if="unreadCount > 0"
          class="mobile-notification-count"
        >
          {{ unreadCount > 99 ? '99+' : unreadCount }}
        </span>

      </RouterLink>


      <RouterLink
        v-else
        to="/login"
        @click="closeMobileMenu"
      >
        {{ t('nav.login') }}
      </RouterLink>


      <div class="mobile-language">

        <span>
          {{ t('nav.language') }}:
        </span>


        <button
          type="button"
          :class="{ active: locale === 'en' }"
          @click="changeLanguage('en')"
        >
          English
        </button>


        <button
          type="button"
          :class="{ active: locale === 'fr' }"
          @click="changeLanguage('fr')"
        >
          Français
        </button>

      </div>

    </div>


    <main>
      <RouterView />
    </main>

  </div>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted,
  onUnmounted
} from 'vue'

import {
  useRoute
} from 'vue-router'

import {
  useI18n
} from 'vue-i18n'

import {
  supabase
} from './supabase'


const route = useRoute()


const {
  t,
  locale
} = useI18n()


const user = ref(null)


const unreadCount = ref(0)


const mobileMenuOpen = ref(false)


let notificationChannel = null


/*
|--------------------------------------------------------------------------
| HOME
|--------------------------------------------------------------------------
*/

const isHome = computed(() => {

  return route.path === '/'

})


/*
|--------------------------------------------------------------------------
| LANGUAGE
|--------------------------------------------------------------------------
*/

function changeLanguage(language) {

  locale.value = language

  localStorage.setItem(
    'eaz-rentals-language',
    language
  )

}


/*
|--------------------------------------------------------------------------
| GET USER
|--------------------------------------------------------------------------
*/

async function getUser() {

  const {
    data
  } = await supabase.auth.getUser()


  user.value =
    data.user || null


  if (user.value) {

    await loadUnreadNotifications()

    subscribeToNotifications()

  } else {

    unreadCount.value = 0

  }

}


/*
|--------------------------------------------------------------------------
| LOAD UNREAD NOTIFICATIONS
|--------------------------------------------------------------------------
*/

async function loadUnreadNotifications() {

  if (!user.value) {

    unreadCount.value = 0

    return

  }


  const {
    count,
    error
  } = await supabase

    .from('notifications')

    .select(
      'id',
      {
        count: 'exact',
        head: true
      }
    )

    .eq(
      'user_id',
      user.value.id
    )

    .eq(
      'is_read',
      false
    )


  if (error) {

    console.error(
      'Unable to load notification count:',
      error
    )

    return

  }


  unreadCount.value =
    count || 0

}


/*
|--------------------------------------------------------------------------
| REAL-TIME NOTIFICATIONS
|--------------------------------------------------------------------------
*/

function subscribeToNotifications() {

  removeNotificationSubscription()


  if (!user.value) {
    return
  }


  notificationChannel =
    supabase

      .channel(
        `notifications-${user.value.id}`
      )

      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'notifications',
          filter:
            `user_id=eq.${user.value.id}`
        },
        () => {

          loadUnreadNotifications()

        }
      )

      .subscribe()

}


/*
|--------------------------------------------------------------------------
| REMOVE REAL-TIME SUBSCRIPTION
|--------------------------------------------------------------------------
*/

function removeNotificationSubscription() {

  if (!notificationChannel) {
    return
  }


  supabase.removeChannel(
    notificationChannel
  )


  notificationChannel = null

}


/*
|--------------------------------------------------------------------------
| LOGOUT
|--------------------------------------------------------------------------
*/

async function logout() {

  removeNotificationSubscription()


  await supabase.auth.signOut()


  user.value = null

  unreadCount.value = 0

}


/*
|--------------------------------------------------------------------------
| MOBILE MENU
|--------------------------------------------------------------------------
*/

function closeMobileMenu() {

  mobileMenuOpen.value = false

}


/*
|--------------------------------------------------------------------------
| AUTH STATE
|--------------------------------------------------------------------------
*/

let authSubscription = null


onMounted(async () => {

  await getUser()


  const {
    data
  } = supabase.auth.onAuthStateChange(
    (_event, session) => {

      user.value =
        session?.user || null


      if (user.value) {

        /*
         * Wait for the auth state to settle
         * before querying notifications.
         */

        setTimeout(() => {

          loadUnreadNotifications()

          subscribeToNotifications()

        }, 0)

      } else {

        unreadCount.value = 0

        removeNotificationSubscription()

      }

    }
  )


  authSubscription =
    data.subscription

})


/*
|--------------------------------------------------------------------------
| CLEANUP
|--------------------------------------------------------------------------
*/

onUnmounted(() => {

  removeNotificationSubscription()


  if (authSubscription) {

    authSubscription.unsubscribe()

  }

})

</script>


<style>

* {
  box-sizing: border-box;
}


html {
  scroll-behavior: smooth;
}


body {
  margin: 0;

  font-family:
    Arial,
    Helvetica,
    sans-serif;

  background: #f7faff;

  color: #172033;
}


button,
input,
select,
textarea {
  font-family: inherit;
}


/*
|--------------------------------------------------------------------------
| GLOBAL NAVIGATION
|--------------------------------------------------------------------------
*/

.navbar {
  min-height: 75px;

  background: white;

  border-bottom:
    1px solid #e8ebf0;

  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 0 6%;

  position: sticky;

  top: 0;

  z-index: 1000;
}


.logo {
  font-size: 25px;

  font-weight: 800;

  color: #0879d1;

  text-decoration: none;

  white-space: nowrap;
}


.desktop-nav {
  display: flex;

  gap: 28px;

  align-items: center;
}


.desktop-nav a {
  text-decoration: none;

  color: #333;

  font-size: 15px;

  font-weight: 600;
}


.desktop-nav a:hover,
.desktop-nav a.router-link-active {
  color: #0879d1;
}


.right-side {
  display: flex;

  align-items: center;

  gap: 18px;
}


/*
|--------------------------------------------------------------------------
| LANGUAGE
|--------------------------------------------------------------------------
*/

.language-switcher {
  display: flex;

  align-items: center;

  gap: 5px;

  font-size: 14px;

  font-weight: 700;
}


.language-switcher button {
  border: none;

  background: transparent;

  color: #64748b;

  padding: 4px;

  cursor: pointer;

  font-weight: 700;
}


.language-switcher button.active {
  color: #0879d1;
}


.language-switcher button:hover {
  color: #0879d1;
}


.language-switcher span {
  color: #cbd5e1;
}


/*
|--------------------------------------------------------------------------
| AUTH
|--------------------------------------------------------------------------
*/

.auth-buttons {
  display: flex;

  gap: 9px;

  align-items: center;
}


.auth-buttons a,
.logout-btn {
  text-decoration: none;

  padding: 10px 16px;

  border-radius: 7px;

  font-weight: 600;

  font-size: 14px;
}


.login-btn {
  background: white;

  color: #0879d1;

  border:
    1px solid #0879d1;
}


.register-btn,
.dashboard-btn {
  background: #0879d1;

  color: white;

  border:
    1px solid #0879d1;
}


.dashboard-btn:hover,
.register-btn:hover {
  background: #0563ad;
}


.login-btn:hover {
  background: #f0f7fc;
}


.logout-btn {
  border:
    1px solid #d93025;

  background: white;

  color: #d93025;

  cursor: pointer;
}


.logout-btn:hover {
  background: #fff5f5;
}


/*
|--------------------------------------------------------------------------
| NOTIFICATION BUTTON
|--------------------------------------------------------------------------
*/

.notification-btn {
  width: 40px;

  height: 40px;

  padding: 0 !important;

  border:
    1px solid #dce1e8;

  background: white;

  color: #172033;

  display: flex;

  align-items: center;

  justify-content: center;

  position: relative;

  border-radius: 50% !important;
}


.notification-btn:hover {
  background: #f7f9fc;

  border-color: #0879d1;
}


.bell {
  font-size: 19px;

  line-height: 1;

  transform: rotate(180deg);

  display: inline-block;
}


.notification-count {
  position: absolute;

  top: -6px;

  right: -6px;

  min-width: 19px;

  height: 19px;

  padding: 0 5px;

  border-radius: 20px;

  background: #d93025;

  color: white;

  font-size: 10px;

  font-weight: 800;

  display: flex;

  align-items: center;

  justify-content: center;

  border: 2px solid white;
}


/*
|--------------------------------------------------------------------------
| MOBILE BUTTON
|--------------------------------------------------------------------------
*/

.mobile-menu-button {
  display: none;

  border:
    1px solid #dce1e8;

  background: white;

  color: #172033;

  padding: 9px 13px;

  border-radius: 7px;

  cursor: pointer;

  font-weight: 600;
}


/*
|--------------------------------------------------------------------------
| MOBILE MENU
|--------------------------------------------------------------------------
*/

.mobile-menu {
  display: none;
}


.mobile-language {
  display: flex;

  align-items: center;

  gap: 12px;

  padding: 16px 5px;

  color: #64748b;

  font-size: 14px;
}


.mobile-language button {
  border:
    1px solid #dce1e8;

  background: white;

  color: #172033;

  padding: 7px 10px;

  border-radius: 6px;

  cursor: pointer;
}


.mobile-language button.active {
  border-color: #0879d1;

  color: #0879d1;

  font-weight: 700;
}


/*
|--------------------------------------------------------------------------
| MOBILE NOTIFICATIONS
|--------------------------------------------------------------------------
*/

.mobile-notification {
  display: flex;

  align-items: center;

  justify-content: space-between;

  padding: 14px 5px;

  text-decoration: none;

  color: #172033;

  font-weight: 600;

  border-bottom:
    1px solid #f0f2f5;
}


.mobile-notification-count {
  min-width: 22px;

  height: 22px;

  padding: 0 6px;

  border-radius: 20px;

  background: #d93025;

  color: white;

  display: flex;

  align-items: center;

  justify-content: center;

  font-size: 11px;

  font-weight: 800;
}


/*
|--------------------------------------------------------------------------
| RESPONSIVE
|--------------------------------------------------------------------------
*/

@media (max-width: 1050px) {

  .desktop-nav {
    gap: 18px;
  }


  .right-side {
    gap: 10px;
  }

}


@media (max-width: 850px) {

  .navbar {
    padding: 12px 5%;
  }


  .desktop-nav,
  .right-side {
    display: none;
  }


  .mobile-menu-button {
    display: block;
  }


  .mobile-menu {
    display: flex;

    flex-direction: column;

    background: white;

    border-bottom:
      1px solid #e8ebf0;

    padding: 10px 5%;

    position: sticky;

    top: 75px;

    z-index: 999;
  }


  .mobile-menu a {
    padding: 14px 5px;

    text-decoration: none;

    color: #172033;

    font-weight: 600;

    border-bottom:
      1px solid #f0f2f5;
  }


  .mobile-menu a:last-of-type {
    border-bottom: none;
  }

}


@media (max-width: 500px) {

  .logo {
    font-size: 21px;
  }


  .mobile-language {
    flex-wrap: wrap;
  }

}

</style>