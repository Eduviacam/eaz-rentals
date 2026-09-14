<template>
  <div class="page">

    <header class="page-header">
      <p class="eyebrow">Eaz rentals</p>

      <h1>
        {{ t('inquiries.title') }}
      </h1>

      <p>
        {{ t('inquiries.subtitle') }}
      </p>
    </header>


    <main class="content">

      <div v-if="loading" class="state">
        {{ t('inquiries.loading') }}
      </div>


      <div v-else-if="error" class="state error">
        {{ error }}
      </div>


      <template v-else>

        <!-- RECEIVED INQUIRIES -->

        <section
          v-if="receivedInquiries.length"
          class="section"
        >

          <div class="section-heading">

            <div>
              <h2>
                {{ t('inquiries.receivedTitle') }}
              </h2>

              <p>
                {{ t('inquiries.receivedDescription') }}
              </p>
            </div>

            <span class="count">
              {{ receivedInquiries.length }}
            </span>

          </div>


          <div class="inquiry-list">

            <article
              v-for="inquiry in receivedInquiries"
              :key="inquiry.id"
              class="inquiry-card"
            >

              <div class="inquiry-header">

                <div>

                  <span class="badge received">
                    {{ t('inquiries.received') }}
                  </span>

                  <span class="type">
                    {{ inquiry.property?.property_type }}
                  </span>

                  <h2>
                    {{ inquiry.property?.neighborhood }}
                  </h2>

                  <p>
                    {{ inquiry.property?.city }}, Cameroon
                  </p>

                </div>


                <span class="date">
                  {{ formatDate(inquiry.created_at) }}
                </span>

              </div>


              <!-- CLIENT INFORMATION -->

              <div class="client-box">

                <div class="client-title">
                  {{ t('inquiries.interestedClient') }}
                </div>


                <div class="client-info">

                  <div>
                    <span>
                      {{ t('inquiries.name') }}
                    </span>

                    <strong>
                      {{
                        inquiry.sender?.full_name ||
                        t('inquiries.eazUser')
                      }}
                    </strong>
                  </div>


                  <div v-if="inquiry.sender?.phone">

                    <span>
                      {{ t('inquiries.phone') }}
                    </span>

                    <strong>
                      {{ inquiry.sender.phone }}
                    </strong>

                  </div>

                </div>

              </div>


              <!-- MESSAGE -->

              <div class="message-box">

                <span>
                  {{ t('inquiries.clientMessage') }}
                </span>

                <p>
                  {{ inquiry.message }}
                </p>

              </div>


              <!-- ACTIONS -->

              <div class="actions">

                <RouterLink
                  v-if="inquiry.property?.id"
                  :to="`/property/${inquiry.property.id}`"
                  class="view-btn"
                >
                  {{ t('inquiries.viewProperty') }}
                </RouterLink>


                <a
                  v-if="inquiry.sender?.phone"
                  :href="whatsappLink(inquiry.sender.phone)"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="whatsapp-btn"
                >
                  {{ t('inquiries.whatsappClient') }}
                </a>

              </div>

            </article>

          </div>

        </section>


        <!-- SENT INQUIRIES -->

        <section
          v-if="sentInquiries.length"
          class="section"
        >

          <div class="section-heading">

            <div>

              <h2>
                {{ t('inquiries.sentTitle') }}
              </h2>

              <p>
                {{ t('inquiries.sentDescription') }}
              </p>

            </div>

            <span class="count">
              {{ sentInquiries.length }}
            </span>

          </div>


          <div class="inquiry-list">

            <article
              v-for="inquiry in sentInquiries"
              :key="inquiry.id"
              class="inquiry-card"
            >

              <div class="inquiry-header">

                <div>

                  <span class="badge sent">
                    {{ t('inquiries.sent') }}
                  </span>

                  <span class="type">
                    {{ inquiry.property?.property_type }}
                  </span>

                  <h2>
                    {{ inquiry.property?.neighborhood }}
                  </h2>

                  <p>
                    {{ inquiry.property?.city }}, Cameroon
                  </p>

                </div>


                <span class="date">
                  {{ formatDate(inquiry.created_at) }}
                </span>

              </div>


              <div class="message-box">

                <span>
                  {{ t('inquiries.yourMessage') }}
                </span>

                <p>
                  {{ inquiry.message }}
                </p>

              </div>


              <RouterLink
                v-if="inquiry.property?.id"
                :to="`/property/${inquiry.property.id}`"
                class="view-btn"
              >
                {{ t('inquiries.viewProperty') }}
              </RouterLink>

            </article>

          </div>

        </section>


        <!-- EMPTY STATE -->

        <div
          v-if="
            !receivedInquiries.length &&
            !sentInquiries.length
          "
          class="state"
        >

          <h2>
            {{ t('inquiries.noInquiries') }}
          </h2>

          <p>
            {{ t('inquiries.noInquiriesDescription') }}
          </p>

          <RouterLink
            to="/housing"
            class="primary-btn"
          >
            {{ t('inquiries.findHousing') }}
          </RouterLink>

        </div>

      </template>

    </main>

  </div>
</template>


<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import { useI18n } from 'vue-i18n'

import { supabase } from '../supabase'


const { t, locale } = useI18n()


const inquiries = ref([])

const loading = ref(true)

const error = ref('')

const currentUserId = ref('')


/*
|--------------------------------------------------------------------------
| RECEIVED INQUIRIES
|--------------------------------------------------------------------------
*/

const receivedInquiries = computed(() => {

  return inquiries.value.filter(inquiry => {

    return inquiry.property?.owner_id === currentUserId.value

  })

})


/*
|--------------------------------------------------------------------------
| SENT INQUIRIES
|--------------------------------------------------------------------------
*/

const sentInquiries = computed(() => {

  return inquiries.value.filter(inquiry => {

    return inquiry.sender_id === currentUserId.value

  })

})


/*
|--------------------------------------------------------------------------
| LOAD INQUIRIES
|--------------------------------------------------------------------------
*/

async function loadInquiries() {

  loading.value = true

  error.value = ''


  try {

    /*
     * Get current user
     */

    const {
      data: userData,
      error: userError
    } = await supabase.auth.getUser()


    if (userError) {
      throw userError
    }


    if (!userData.user) {

      throw new Error(
        t('inquiries.loginRequired')
      )

    }


    currentUserId.value =
      userData.user.id


    /*
     * Get inquiries and properties.
     *
     * We deliberately do NOT join profiles here.
     * This avoids the Supabase schema-cache problem.
     */

    const {
      data,
      error: fetchError
    } = await supabase

      .from('inquiries')

      .select(`
        id,
        property_id,
        sender_id,
        message,
        created_at,

        property:properties (
          id,
          owner_id,
          property_type,
          neighborhood,
          city
        )
      `)

      .order('created_at', {
        ascending: false
      })


    if (fetchError) {
      throw fetchError
    }


    const inquiryData = data || []


    /*
     * Get unique sender IDs
     */

    const senderIds = [
      ...new Set(
        inquiryData
          .map(inquiry => inquiry.sender_id)
          .filter(Boolean)
      )
    ]


    /*
     * Load profiles separately
     */

    let profiles = []


    if (senderIds.length) {

      const {
        data: profileData,
        error: profileError
      } = await supabase

        .from('profiles')

        .select(`
          id,
          full_name,
          phone
        `)

        .in('id', senderIds)


      if (profileError) {
        throw profileError
      }


      profiles = profileData || []

    }


    /*
     * Match each inquiry with its sender profile
     */

    inquiries.value =
      inquiryData.map(inquiry => {

        const sender =
          profiles.find(
            profile =>
              profile.id === inquiry.sender_id
          ) || null


        return {
          ...inquiry,
          sender
        }

      })


  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('inquiries.loadError')

  } finally {

    loading.value = false

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


  return new Date(date).toLocaleDateString(
    locale.value === 'fr'
      ? 'fr-FR'
      : 'en-GB',
    {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }
  )

}


/*
|--------------------------------------------------------------------------
| WHATSAPP
|--------------------------------------------------------------------------
*/

function whatsappLink(phone) {

  if (!phone) {
    return '#'
  }


  let cleaned =
    String(phone)
      .replace(/\D/g, '')


  /*
   * Cameroon numbers:
   *
   * 6XXXXXXXX
   * 2376XXXXXXXX
   * +2376XXXXXXXX
   */

  if (
    cleaned.startsWith('6') &&
    cleaned.length === 9
  ) {

    cleaned =
      '237' + cleaned

  }


  return `https://wa.me/${cleaned}`

}


/*
|--------------------------------------------------------------------------
| INITIAL LOAD
|--------------------------------------------------------------------------
*/

onMounted(() => {

  const savedLanguage =
    localStorage.getItem('eaz-language') || 'en'

  locale.value = savedLanguage

  loadInquiries()

})

</script>


<style scoped>

.page {
  min-height: 100vh;
  background: #f7f9fc;
  padding-bottom: 80px;
}


.page-header {
  background: white;
  border-bottom: 1px solid #e5e9ef;
  padding: 45px 8%;
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


.page-header p:last-child {
  margin: 0;
  color: #687386;
}


.content {
  max-width: 900px;
  margin: 35px auto;
  padding: 0 20px;
}


.section {
  margin-bottom: 45px;
}


.section-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}


.section-heading h2 {
  margin: 0 0 5px;
  color: #172033;
}


.section-heading p {
  margin: 0;
  color: #687386;
}


.count {
  min-width: 36px;
  height: 36px;
  padding: 0 10px;
  border-radius: 20px;
  background: #1769aa;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
}


.inquiry-list {
  display: grid;
  gap: 20px;
}


.inquiry-card {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  padding: 25px;
}


.inquiry-header {
  display: flex;
  justify-content: space-between;
  gap: 20px;
  align-items: flex-start;
  border-bottom: 1px solid #edf0f4;
  padding-bottom: 18px;
}


.type {
  display: block;
  margin-top: 10px;
  color: #1769aa;
  font-size: 13px;
  font-weight: 700;
}


.inquiry-header h2 {
  margin: 8px 0 4px;
  color: #172033;
}


.inquiry-header p {
  margin: 0;
  color: #687386;
}


.date {
  color: #7b8798;
  font-size: 13px;
  white-space: nowrap;
}


.badge {
  display: inline-block;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}


.badge.received {
  background: #e7f6ed;
  color: #217346;
}


.badge.sent {
  background: #eaf3fb;
  color: #1769aa;
}


/*
|--------------------------------------------------------------------------
| CLIENT INFORMATION
|--------------------------------------------------------------------------
*/

.client-box {
  margin-top: 20px;
  padding: 18px;
  background: #f7f9fc;
  border-radius: 8px;
}


.client-title {
  color: #1769aa;
  font-size: 14px;
  font-weight: 700;
  margin-bottom: 15px;
}


.client-info {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}


.client-info span {
  display: block;
  color: #687386;
  font-size: 12px;
  margin-bottom: 5px;
}


.client-info strong {
  color: #172033;
  font-size: 15px;
}


/*
|--------------------------------------------------------------------------
| MESSAGE
|--------------------------------------------------------------------------
*/

.message-box {
  margin: 20px 0;
  padding: 18px;
  background: #f7f9fc;
  border-radius: 8px;
}


.message-box span {
  display: block;
  color: #687386;
  font-size: 13px;
  margin-bottom: 8px;
}


.message-box p {
  margin: 0;
  color: #172033;
  line-height: 1.6;
  white-space: pre-line;
}


/*
|--------------------------------------------------------------------------
| ACTIONS
|--------------------------------------------------------------------------
*/

.actions {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}


.view-btn,
.primary-btn,
.whatsapp-btn {
  display: inline-block;
  text-decoration: none;
  padding: 11px 17px;
  border-radius: 7px;
  font-weight: 600;
}


.view-btn,
.primary-btn {
  background: #1769aa;
  color: white;
}


.view-btn:hover,
.primary-btn:hover {
  background: #125687;
}


.whatsapp-btn {
  background: #25d366;
  color: white;
}


.whatsapp-btn:hover {
  background: #1ebe5d;
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


.state.error {
  color: #d93025;
}


/*
|--------------------------------------------------------------------------
| MOBILE
|--------------------------------------------------------------------------
*/

@media (max-width: 600px) {

  .page-header {
    padding: 35px 6%;
  }


  .page-header h1 {
    font-size: 30px;
  }


  .section-heading {
    align-items: flex-start;
  }


  .inquiry-header {
    flex-direction: column;
  }


  .date {
    order: -1;
  }


  .client-info {
    grid-template-columns: 1fr;
  }


  .actions {
    flex-direction: column;
  }


  .view-btn,
  .whatsapp-btn {
    text-align: center;
  }

}

</style>