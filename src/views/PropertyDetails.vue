<template>
  <div class="details-page">

    <div v-if="loading" class="state-message">
      {{ t('common.loading') }}
    </div>

    <div v-else-if="error" class="state-message error-message">
      {{ error }}
    </div>

    <div v-else-if="!property" class="state-message">
      <h2>{{ t('property.notFound') }}</h2>
      <p>{{ t('property.notAvailable') }}</p>
    </div>

    <main v-else class="details-container">

      <button
        type="button"
        class="back-button"
        @click="goBack"
      >
        ← {{ t('property.back') }}
      </button>

      <section class="gallery-section">

        <div class="main-image">
          <img
            v-if="currentImage"
            :src="currentImage"
            :alt="propertyTitle"
          />

          <div v-else class="no-image">
            {{ t('property.noPhoto') }}
          </div>
        </div>

        <div
          v-if="photos.length > 1"
          class="thumbnail-list"
        >
          <button
            v-for="(photo, index) in photos"
            :key="`${photo}-${index}`"
            type="button"
            class="thumbnail"
            :class="{ active: currentImage === photo }"
            @click="currentImage = photo"
          >
            <img
              :src="photo"
              :alt="`${t('property.photo')} ${index + 1}`"
            />
          </button>
        </div>

      </section>

      <section class="property-info">

        <div class="title-row">

          <div>
            <div class="badges">

              <span class="listing-badge">
                {{ formatListingType(property.listing_type) }}
              </span>

              <span class="type-badge">
                {{ formatPropertyType(property.property_type) }}
              </span>

              <span
                v-if="property.owner_verified"
                class="verified-badge"
              >
                <span class="check-icon">✓</span>
                {{ t('property.verifiedOwner') }}
              </span>

            </div>

            <h1>{{ propertyTitle }}</h1>

            <p class="location">
              {{ property.neighborhood }}, {{ property.city }}
            </p>
          </div>

          <button
            v-if="isLoggedIn && !isOwner"
            type="button"
            class="save-button"
            :class="{ saved: isSaved }"
            :disabled="saving"
            @click="toggleSave"
          >
            {{
              saving
                ? t('property.saving')
                : isSaved
                  ? t('common.saved')
                  : t('property.saveProperty')
            }}
          </button>

        </div>

        <div class="price">
          {{ formatPrice(property.price) }}
        </div>

        <div class="property-stats">

          <div
            v-if="property.bedrooms !== null &&
                   property.bedrooms !== undefined"
            class="stat"
          >
            <strong>{{ property.bedrooms }}</strong>
            <span>{{ t('property.bedrooms') }}</span>
          </div>

          <div
            v-if="property.bathrooms !== null &&
                   property.bathrooms !== undefined"
            class="stat"
          >
            <strong>{{ property.bathrooms }}</strong>
            <span>{{ t('property.bathrooms') }}</span>
          </div>

        </div>

        <div
          v-if="property.total_units !== null && property.total_units !== undefined"
          class="availability-section"
        >
          <h2>{{ t('property.unitAvailability') }}</h2>

          <div class="availability-grid">
            <div class="availability-item">
              <strong>{{ Number(property.total_units) }}</strong>
              <span>{{ t('property.totalUnits') }}</span>
            </div>

            <div class="availability-item available">
              <strong>{{ Number(property.available_units ?? 0) }}</strong>
              <span>{{ t('property.availableUnits') }}</span>
            </div>

            <div class="availability-item occupied">
              <strong>{{ Math.max(0, Number(property.total_units) - Number(property.available_units ?? 0)) }}</strong>
              <span>{{ t('property.occupiedUnits') }}</span>
            </div>
          </div>
        </div>

        <div class="description-section">
          <h2>{{ t('property.description') }}</h2>

          <p>
            {{
              property.description ||
              t('property.noDescription')
            }}
          </p>
        </div>

        <div
          v-if="property.contact_phone && !isOwner"
          class="contact-section"
        >
          <h2>{{ t('property.contactOwner') }}</h2>

          <a
            :href="whatsappUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-button"
          >
            {{ t('property.contactWhatsApp') }}
          </a>
        </div>

        <div
          v-if="!isLoggedIn && !isOwner"
          class="login-prompt"
        >
          <h2>{{ t('property.interested') }}</h2>

          <p>
            {{ t('property.loginPrompt') }}
          </p>

          <button
            type="button"
            class="primary-button"
            @click="goToLogin"
          >
            {{ t('property.loginToContinue') }}
          </button>
        </div>

        <div
          v-if="isLoggedIn && !isOwner"
          class="inquiry-section"
        >
          <h2>{{ t('property.sendInquiry') }}</h2>

          <form @submit.prevent="sendInquiry">

            <label for="message">
              {{ t('property.message') }}
            </label>

            <textarea
              id="message"
              v-model="inquiryMessage"
              rows="5"
              :placeholder="t('property.inquiryPlaceholder')"
              required
            ></textarea>

            <button
              type="submit"
              class="primary-button"
              :disabled="sendingInquiry"
            >
              {{
                sendingInquiry
                  ? t('property.sending')
                  : t('property.send')
              }}
            </button>

          </form>

          <p
            v-if="inquirySuccess"
            class="success-message"
          >
            {{ inquirySuccess }}
          </p>

          <p
            v-if="inquiryError"
            class="error-message"
          >
            {{ inquiryError }}
          </p>
        </div>

        <div
          v-if="isOwner"
          class="owner-notice"
        >
          <h2>{{ t('property.yourProperty') }}</h2>

          <p>
            {{ t('property.yourPropertyText') }}
          </p>

          <button
            type="button"
            class="primary-button"
            @click="editProperty"
          >
            {{ t('property.editProperty') }}
          </button>
        </div>

      </section>

    </main>

  </div>
</template>

<script setup>

import {
  computed,
  onMounted,
  ref
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  useI18n
} from 'vue-i18n'

import { supabase } from '../supabase'


const route = useRoute()

const router = useRouter()

const {
  t,
  locale
} = useI18n()


/* LANGUAGE */

onMounted(() => {

  const savedLanguage =
    localStorage.getItem('eaz-language')

  if (
    savedLanguage === 'en' ||
    savedLanguage === 'fr'
  ) {

    locale.value = savedLanguage

  }

})


const property = ref(null)

const loading = ref(true)

const error = ref('')

const currentImage = ref('')

const isLoggedIn = ref(false)

const currentUserId = ref(null)

const isSaved = ref(false)

const saving = ref(false)

const inquiryMessage = ref('')

const sendingInquiry = ref(false)

const inquirySuccess = ref('')

const inquiryError = ref('')


const photos = computed(() => {

  if (
    !property.value ||
    !Array.isArray(property.value.photo_urls)
  ) {

    return []

  }

  return property.value.photo_urls.filter(Boolean)

})


const propertyTitle = computed(() => {

  if (!property.value) {

    return t('property.property')

  }

  const type =
    formatPropertyType(
      property.value.property_type
    )

  const location = [
    property.value.neighborhood,
    property.value.city
  ]
    .filter(Boolean)
    .join(', ')

  return location
    ? `${type} in ${location}`
    : type

})


const isOwner = computed(() => {

  return (
    !!currentUserId.value &&
    !!property.value &&
    currentUserId.value === property.value.owner_id
  )

})


const whatsappUrl = computed(() => {

  if (!property.value?.contact_phone) {

    return '#'

  }

  const phone =
    normalizeCameroonPhone(
      property.value.contact_phone
    )

  const message =
    encodeURIComponent(
      `Hello, I am interested in your property listed on Eaz rentals: ${propertyTitle.value}`
    )

  return `https://wa.me/${phone}?text=${message}`

})


function formatPrice(value) {

  const price = Number(value)

  if (Number.isNaN(price)) {

    return t('property.priceOnRequest')

  }

  return `${new Intl.NumberFormat(
    'en-US'
  ).format(price)} FCFA`

}


function formatPropertyType(value) {

  const type =
    String(value || '').trim()

  if (!type) {

    return t('property.property')

  }

  return type
    .replace(/[_-]/g, ' ')
    .replace(/\b\w/g, letter =>
      letter.toUpperCase()
    )

}


function normalizeListingType(value) {

  const type =
    String(value || '')
      .trim()
      .toLowerCase()

  if (
    type === 'rent' ||
    type === 'rental' ||
    type === 'for rent' ||
    type === 'location'
  ) {

    return 'rent'

  }

  if (
    type === 'sale' ||
    type === 'sell' ||
    type === 'for sale' ||
    type === 'vente'
  ) {

    return 'sale'

  }

  return type

}


function formatListingType(value) {

  const type =
    normalizeListingType(value)

  if (type === 'rent') {

    return t('housing.rent')

  }

  if (type === 'sale') {

    return t('housing.sale')

  }

  return formatPropertyType(value)

}


function normalizeCameroonPhone(value) {

  let phone =
    String(value || '')
      .trim()
      .replace(/\s+/g, '')
      .replace(/-/g, '')

  if (phone.startsWith('+')) {

    phone =
      phone.substring(1)

  }

  if (phone.startsWith('237')) {

    return phone

  }

  if (
    phone.startsWith('6') &&
    phone.length === 9
  ) {

    return `237${phone}`

  }

  if (
    phone.startsWith('0') &&
    phone.length === 10
  ) {

    return `237${phone.substring(1)}`

  }

  return phone

}


async function loadCurrentUser() {

  const {
    data
  } = await supabase.auth.getUser()

  if (data?.user) {

    isLoggedIn.value = true

    currentUserId.value =
      data.user.id

  } else {

    isLoggedIn.value = false

    currentUserId.value = null

  }

}


async function loadProperty() {

  loading.value = true

  error.value = ''

  try {

    const propertyId =
      route.params.id

    if (!propertyId) {

      throw new Error(
        t('property.propertyIdMissing')
      )

    }

    const {
      data,
      error: fetchError
    } = await supabase

      .from('properties')

      .select('*')

      .eq('id', propertyId)

      .eq('status', 'approved')

      .maybeSingle()

    if (fetchError) {

      throw fetchError

    }

    property.value = data

    if (!data) {

      return

    }

    if (photos.value.length > 0) {

      currentImage.value =
        photos.value[0]

    }

    if (
      currentUserId.value &&
      currentUserId.value !== data.owner_id
    ) {

      await checkIfSaved()

    }

  } catch (err) {

    error.value =
      err.message ||
      t('property.loadError')

  } finally {

    loading.value = false

  }

}


async function checkIfSaved() {

  if (
    !currentUserId.value ||
    !property.value
  ) {

    return

  }

  const {
    data,
    error: savedError
  } = await supabase

    .from('saved_properties')

    .select('id')

    .eq(
      'user_id',
      currentUserId.value
    )

    .eq(
      'property_id',
      property.value.id
    )

    .maybeSingle()

  if (savedError) {

    return

  }

  isSaved.value = !!data

}


async function toggleSave() {

  if (
    !currentUserId.value ||
    !property.value
  ) {

    goToLogin()

    return

  }

  saving.value = true

  try {

    if (isSaved.value) {

      const {
        error: deleteError
      } = await supabase

        .from('saved_properties')

        .delete()

        .eq(
          'user_id',
          currentUserId.value
        )

        .eq(
          'property_id',
          property.value.id
        )

      if (deleteError) {

        throw deleteError

      }

      isSaved.value = false

    } else {

      const {
        error: insertError
      } = await supabase

        .from('saved_properties')

        .insert({

          user_id:
            currentUserId.value,

          property_id:
            property.value.id

        })

      if (insertError) {

        throw insertError

      }

      isSaved.value = true

    }

  } catch (err) {

    alert(
      err.message ||
      t('property.saveError')
    )

  } finally {

    saving.value = false

  }

}


async function sendInquiry() {

  inquirySuccess.value = ''

  inquiryError.value = ''

  if (!currentUserId.value) {

    goToLogin()

    return

  }

  if (!property.value) {

    return

  }

  if (
    currentUserId.value ===
    property.value.owner_id
  ) {

    inquiryError.value =
      t('property.selfInquiry')

    return

  }

  sendingInquiry.value = true

  try {

    const message =
      inquiryMessage.value.trim()

    if (!message) {

      throw new Error(
        t('property.messageRequired')
      )

    }

    const {
      error: insertError
    } = await supabase

      .from('inquiries')

      .insert({

        property_id:
          property.value.id,

        sender_id:
          currentUserId.value,

        message

      })

    if (insertError) {

      throw insertError

    }

    inquiryMessage.value = ''

    inquirySuccess.value =
      t('property.inquirySent')

  } catch (err) {

    inquiryError.value =
      err.message ||
      t('property.inquiryError')

  } finally {

    sendingInquiry.value = false

  }

}


function goToLogin() {

  router.push({

    path: '/login',

    query: {

      redirect:
        route.fullPath

    }

  })

}


function editProperty() {

  if (!property.value) {

    return

  }

  router.push({

    path: '/post-property',

    query: {

      edit:
        property.value.id

    }

  })

}


function goBack() {

  router.back()

}


onMounted(async () => {

  await loadCurrentUser()

  await loadProperty()

})

</script>


<style scoped>

.details-page {
  min-height: calc(100vh - 75px);
  background: #f7f9fc;
  padding: 35px 20px 60px;
}


.details-container {
  width: 100%;
  max-width: 1150px;
  margin: 0 auto;
}


.back-button {
  border: none;
  background: transparent;
  color: #1769aa;
  font-size: 15px;
  font-weight: 600;
  cursor: pointer;
  padding: 0;
  margin-bottom: 20px;
}


.back-button:hover {
  text-decoration: underline;
}


.gallery-section {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  overflow: hidden;
  margin-bottom: 25px;
}


.main-image {
  width: 100%;
  height: 500px;
  background: #eef1f5;
}


.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #687386;
}


.thumbnail-list {
  display: flex;
  gap: 10px;
  padding: 15px;
  overflow-x: auto;
}


.thumbnail {
  flex: 0 0 85px;
  width: 85px;
  height: 65px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  background: #eef1f5;
  cursor: pointer;
}


.thumbnail.active {
  border-color: #1769aa;
}


.thumbnail img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.property-info {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  padding: 30px;
}


.title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 25px;
}


.badges {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 14px;
}


.listing-badge,
.type-badge,
.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}


.listing-badge {
  background: #eaf4fb;
  color: #1769aa;
}


.type-badge {
  background: #f0f2f5;
  color: #555;
}


.verified-badge {
  background: #eaf4fb;
  color: #1769aa;
}


.check-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 17px;
  height: 17px;
  border-radius: 50%;
  background: #1769aa;
  color: white;
  font-size: 11px;
}


.title-row h1 {
  margin: 0;
  color: #1f2937;
  font-size: 32px;
  line-height: 1.25;
}


.location {
  margin: 8px 0 0;
  color: #687386;
  font-size: 16px;
}


.save-button {
  flex-shrink: 0;
  padding: 11px 18px;
  border: 1px solid #1769aa;
  border-radius: 7px;
  background: white;
  color: #1769aa;
  font-weight: 600;
  cursor: pointer;
}


.save-button:hover {
  background: #f0f7fc;
}


.save-button.saved {
  background: #1769aa;
  color: white;
}


.save-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


.price {
  margin-top: 25px;
  color: #1769aa;
  font-size: 28px;
  font-weight: 700;
}


.property-stats {
  display: flex;
  gap: 35px;
  margin-top: 25px;
  padding: 20px 0;
  border-top: 1px solid #e5e9ef;
  border-bottom: 1px solid #e5e9ef;
}


.stat {
  display: flex;
  flex-direction: column;
  gap: 4px;
}


.stat strong {
  color: #1f2937;
  font-size: 20px;
}


.stat span {
  color: #687386;
  font-size: 13px;
}


.availability-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 15px;
  margin-top: 15px;
}

.availability-item {
  padding: 18px;
  border: 1px solid #e5e9ef;
  border-radius: 9px;
  background: #f7f9fc;
  text-align: center;
}

.availability-item strong {
  display: block;
  color: #1f2937;
  font-size: 24px;
}

.availability-item span {
  display: block;
  margin-top: 5px;
  color: #687386;
  font-size: 13px;
}

.availability-item.available strong {
  color: #1769aa;
}

.availability-item.occupied strong {
  color: #687386;
}


.availability-section,
.description-section,
.contact-section,
.inquiry-section,
.login-prompt,
.owner-notice {
  margin-top: 30px;
}


.availability-section h2,
.description-section h2,
.contact-section h2,
.inquiry-section h2,
.login-prompt h2,
.owner-notice h2 {
  margin: 0 0 12px;
  color: #1f2937;
  font-size: 21px;
}


.availability-section p,
.description-section p,
.login-prompt p,
.owner-notice p {
  margin: 0;
  color: #555;
  line-height: 1.7;
  white-space: pre-line;
}


.whatsapp-button,
.primary-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 45px;
  padding: 0 20px;
  border-radius: 7px;
  font-size: 14px;
  font-weight: 600;
  text-decoration: none;
  cursor: pointer;
  box-sizing: border-box;
}


.whatsapp-button {
  background: #1769aa;
  color: white;
}


.whatsapp-button:hover {
  background: #125687;
}


.primary-button {
  margin-top: 10px;
  border: none;
  background: #1769aa;
  color: white;
}


.primary-button:hover {
  background: #125687;
}


.primary-button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}


.login-prompt,
.owner-notice {
  padding: 22px;
  border-radius: 9px;
  background: #f7f9fc;
  border: 1px solid #e5e9ef;
}


.inquiry-section form {
  display: flex;
  flex-direction: column;
}


.inquiry-section label {
  margin-bottom: 8px;
  color: #333;
  font-size: 14px;
  font-weight: 600;
}


.inquiry-section textarea {
  width: 100%;
  padding: 13px;
  border: 1px solid #d9dde5;
  border-radius: 7px;
  resize: vertical;
  font-family: inherit;
  font-size: 14px;
  outline: none;
  box-sizing: border-box;
}


.inquiry-section textarea:focus {
  border-color: #1769aa;
}


.success-message {
  margin: 15px 0 0;
  color: #1769aa;
  font-weight: 600;
}


.state-message {
  max-width: 700px;
  margin: 80px auto;
  padding: 30px;
  text-align: center;
  color: #687386;
}


.state-message h2 {
  margin: 0 0 8px;
  color: #1f2937;
}


.error-message {
  color: #d93025;
}


@media (max-width: 750px) {

  .details-page {
    padding: 25px 15px 45px;
  }


  .main-image {
    height: 330px;
  }


  .property-info {
    padding: 22px;
  }


  .title-row {
    flex-direction: column;
  }


  .title-row h1 {
    font-size: 27px;
  }


  .save-button {
    width: 100%;
  }


  .price {
    font-size: 24px;
  }


  .property-stats {
    gap: 25px;
  }
  .availability-grid {
    grid-template-columns: 1fr;
  }


}


@media (max-width: 480px) {

  .main-image {
    height: 250px;
  }


  .property-info {
    padding: 18px;
  }


  .title-row h1 {
    font-size: 23px;
  }


  .location {
    font-size: 14px;
  }


  .price {
    font-size: 22px;
  }


  .property-stats {
    gap: 20px;
  }

}

</style>