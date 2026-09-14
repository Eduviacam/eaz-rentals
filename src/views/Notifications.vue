<template>
  <div class="page">

    <header class="page-header">

      <div>
        <p class="eyebrow">
          Eaz rentals
        </p>

        <h1>
          {{ t('notifications.title') }}
        </h1>

        <p>
          {{ t('notifications.subtitle') }}
        </p>
      </div>


      <button
        v-if="unreadCount > 0"
        type="button"
        class="mark-all-btn"
        @click="markAllAsRead"
      >
        {{ t('notifications.markAllRead') }}
      </button>

    </header>


    <main class="content">

      <div
        v-if="loading"
        class="state"
      >
        {{ t('notifications.loading') }}
      </div>


      <div
        v-else-if="error"
        class="state error"
      >
        {{ error }}

        <button
          type="button"
          class="retry-btn"
          @click="loadNotifications"
        >
          {{ t('notifications.tryAgain') }}
        </button>
      </div>


      <div
        v-else-if="notifications.length === 0"
        class="state"
      >

        <div class="empty-icon">
          N
        </div>

        <h2>
          {{ t('notifications.noNotifications') }}
        </h2>

        <p>
          {{ t('notifications.noNotificationsDescription') }}
        </p>

      </div>


      <div
        v-else
        class="notification-list"
      >

        <article
          v-for="notification in notifications"
          :key="notification.id"
          class="notification-card"
          :class="{ unread: !notification.is_read }"
          @click="markAsRead(notification)"
        >

          <div class="notification-icon">
            !
          </div>


          <div class="notification-content">

            <div class="notification-top">

              <h2>
                {{ notification.title }}
              </h2>

              <span class="date">
                {{ formatDate(notification.created_at) }}
              </span>

            </div>


            <p>
              {{ notification.message }}
            </p>


            <div class="notification-actions">

              <span
                v-if="!notification.is_read"
                class="unread-label"
              >
                {{ t('notifications.unread') }}
              </span>


              <RouterLink
                v-if="notification.property_id"
                :to="
                  notification.type === 'admin_message'
                    ? `/post-property?edit=${notification.property_id}`
                    : `/property/${notification.property_id}`
                "
                class="view-btn"
                @click.stop
              >
                {{
                  notification.type === 'admin_message'
                    ? (
                        locale === 'fr'
                          ? 'Voir et modifier le bien'
                          : 'View and Edit Property'
                      )
                    : t('notifications.viewProperty')
                }}
              </RouterLink>

            </div>

          </div>

        </article>

      </div>

    </main>

  </div>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useI18n
} from 'vue-i18n'

import {
  supabase
} from '../supabase'


const {
  t,
  locale
} = useI18n()


const notifications = ref([])

const loading = ref(true)

const error = ref('')


/*
|--------------------------------------------------------------------------
| LANGUAGE
|--------------------------------------------------------------------------
*/

onMounted(() => {

  const savedLanguage =
    localStorage.getItem('eaz-language')

  if (
    savedLanguage === 'en' ||
    savedLanguage === 'fr'
  ) {

    locale.value =
      savedLanguage

  }

})


/*
|--------------------------------------------------------------------------
| UNREAD COUNT
|--------------------------------------------------------------------------
*/

const unreadCount = computed(() => {

  return notifications.value.filter(
    notification =>
      !notification.is_read
  ).length

})


/*
|--------------------------------------------------------------------------
| LOAD NOTIFICATIONS
|--------------------------------------------------------------------------
*/

async function loadNotifications() {

  loading.value = true

  error.value = ''


  try {

    const {
      data: userData,
      error: userError
    } = await supabase.auth.getUser()


    if (userError) {
      throw userError
    }


    if (!userData.user) {

      throw new Error(
        t('notifications.loginRequired')
      )

    }


    const {
      data,
      error: fetchError
    } = await supabase

      .from('notifications')

      .select(`
        id,
        user_id,
        type,
        title,
        message,
        property_id,
        is_read,
        created_at
      `)

      .eq(
        'user_id',
        userData.user.id
      )

      .order(
        'created_at',
        {
          ascending: false
        }
      )


    if (fetchError) {
      throw fetchError
    }


    notifications.value =
      data || []


  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('notifications.loadError')

  } finally {

    loading.value = false

  }

}


/*
|--------------------------------------------------------------------------
| MARK ONE AS READ
|--------------------------------------------------------------------------
*/

async function markAsRead(notification) {

  if (notification.is_read) {
    return
  }


  const {
    error: updateError
  } = await supabase

    .from('notifications')

    .update({
      is_read: true
    })

    .eq(
      'id',
      notification.id
    )


  if (updateError) {

    console.error(
      'Unable to mark notification as read:',
      updateError
    )

    return

  }


  notification.is_read = true

}


/*
|--------------------------------------------------------------------------
| MARK ALL AS READ
|--------------------------------------------------------------------------
*/

async function markAllAsRead() {

  try {

    const {
      data: userData
    } = await supabase.auth.getUser()


    if (!userData.user) {
      return
    }


    const {
      error: updateError
    } = await supabase

      .from('notifications')

      .update({
        is_read: true
      })

      .eq(
        'user_id',
        userData.user.id
      )

      .eq(
        'is_read',
        false
      )


    if (updateError) {
      throw updateError
    }


    notifications.value =
      notifications.value.map(
        notification => ({
          ...notification,
          is_read: true
        })
      )


  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('notifications.updateError')

  }

}


/*
|--------------------------------------------------------------------------
| FORMAT DATE
|--------------------------------------------------------------------------
*/

function formatDate(date) {

  if (!date) {
    return ''
  }


  const language =
    locale.value === 'fr'
      ? 'fr-FR'
      : 'en-GB'


  return new Date(date).toLocaleDateString(
    language,
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  )

}


/*
|--------------------------------------------------------------------------
| INITIAL LOAD
|--------------------------------------------------------------------------
*/

onMounted(() => {

  loadNotifications()

})

</script>


<style scoped>

.page {
  min-height: 100vh;
  background: #f7f9fc;
  padding-bottom: 80px;
}


/*
|--------------------------------------------------------------------------
| HEADER
|--------------------------------------------------------------------------
*/

.page-header {
  background: white;
  border-bottom: 1px solid #e5e9ef;
  padding: 45px 8%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 25px;
}


.eyebrow {
  margin: 0 0 7px;
  color: #1769aa;
  font-weight: 700;
}


.page-header h1 {
  margin: 0 0 8px;
  color: #172033;
  font-size: 36px;
}


.page-header p {
  margin: 0;
  color: #687386;
}


/*
|--------------------------------------------------------------------------
| BUTTONS
|--------------------------------------------------------------------------
*/

.mark-all-btn,
.retry-btn {
  border: none;
  cursor: pointer;
  font-weight: 600;
}


.mark-all-btn {
  background: #1769aa;
  color: white;
  padding: 11px 17px;
  border-radius: 7px;
}


.mark-all-btn:hover {
  background: #125687;
}


.retry-btn {
  margin-top: 18px;
  background: #1769aa;
  color: white;
  padding: 10px 18px;
  border-radius: 7px;
}


/*
|--------------------------------------------------------------------------
| CONTENT
|--------------------------------------------------------------------------
*/

.content {
  max-width: 900px;
  margin: 35px auto;
  padding: 0 20px;
}


/*
|--------------------------------------------------------------------------
| NOTIFICATION LIST
|--------------------------------------------------------------------------
*/

.notification-list {
  display: grid;
  gap: 15px;
}


.notification-card {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  padding: 20px;
  display: flex;
  gap: 16px;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s;
}


.notification-card:hover {
  border-color: #cbd5e1;
  transform: translateY(-1px);
}


.notification-card.unread {
  border-left: 4px solid #1769aa;
  background: #fbfdff;
}


.notification-icon {
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  border-radius: 50%;
  background: #eaf3fb;
  color: #1769aa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
}


.notification-content {
  flex: 1;
  min-width: 0;
}


.notification-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
}


.notification-top h2 {
  margin: 0;
  color: #172033;
  font-size: 17px;
}


.notification-content > p {
  margin: 8px 0 15px;
  color: #687386;
  line-height: 1.6;
}


.date {
  color: #7b8798;
  font-size: 12px;
  white-space: nowrap;
}


.notification-actions {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}


.unread-label {
  color: #1769aa;
  font-size: 12px;
  font-weight: 700;
}


.view-btn {
  display: inline-block;
  text-decoration: none;
  background: #1769aa;
  color: white;
  padding: 8px 13px;
  border-radius: 6px;
  font-size: 13px;
  font-weight: 600;
}


.view-btn:hover {
  background: #125687;
}


/*
|--------------------------------------------------------------------------
| STATES
|--------------------------------------------------------------------------
*/

.state {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  padding: 60px 25px;
  text-align: center;
  color: #687386;
}


.state h2 {
  color: #172033;
}


.state p {
  line-height: 1.6;
}


.state.error {
  color: #d93025;
}


.empty-icon {
  width: 55px;
  height: 55px;
  margin: 0 auto 15px;
  border-radius: 50%;
  background: #eaf3fb;
  color: #1769aa;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 800;
  font-size: 20px;
}


/*
|--------------------------------------------------------------------------
| MOBILE
|--------------------------------------------------------------------------
*/

@media (max-width: 600px) {

  .page-header {
    padding: 35px 6%;
    flex-direction: column;
    align-items: flex-start;
  }


  .page-header h1 {
    font-size: 30px;
  }


  .notification-card {
    padding: 17px;
  }


  .notification-top {
    flex-direction: column;
    gap: 6px;
  }


  .date {
    white-space: normal;
  }


  .notification-icon {
    width: 35px;
    height: 35px;
  }

}

</style>