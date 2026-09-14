<template>
  <div class="page">

    <header class="page-header">

      <div>
        <p class="eyebrow">
          Eaz rentals
        </p>

        <h1>
          {{ t('myProperties.title') }}
        </h1>

        <p>
          {{ t('myProperties.subtitle') }}
        </p>
      </div>

      <RouterLink
        to="/post-property"
        class="post-btn"
      >
        {{ t('myProperties.postProperty') }}
      </RouterLink>

    </header>


    <main class="content">

      <div
        v-if="loading"
        class="state"
      >
        {{ t('myProperties.loading') }}
      </div>


      <div
        v-else-if="error"
        class="state error"
      >

        <p>
          {{ error }}
        </p>

        <button
          type="button"
          class="retry-btn"
          @click="loadProperties"
        >
          {{ t('myProperties.tryAgain') }}
        </button>

      </div>


      <template v-else>

        <section
          v-if="properties.length"
          class="summary-section"
        >

          <div class="summary-grid">

            <button
              type="button"
              class="summary-card"
              :class="{ active: activeFilter === 'all' }"
              @click="activeFilter = 'all'"
            >
              <span class="summary-label">
                {{ t('myProperties.allProperties') }}
              </span>

              <strong>
                {{ properties.length }}
              </strong>
            </button>


            <button
              type="button"
              class="summary-card pending-card"
              :class="{ active: activeFilter === 'pending' }"
              @click="activeFilter = 'pending'"
            >
              <span class="summary-label">
                {{ t('myProperties.pending') }}
              </span>

              <strong>
                {{ pendingCount }}
              </strong>
            </button>


            <button
              type="button"
              class="summary-card approved-card"
              :class="{ active: activeFilter === 'approved' }"
              @click="activeFilter = 'approved'"
            >
              <span class="summary-label">
                {{ t('myProperties.approved') }}
              </span>

              <strong>
                {{ approvedCount }}
              </strong>
            </button>


            <button
              type="button"
              class="summary-card rejected-card"
              :class="{ active: activeFilter === 'rejected' }"
              @click="activeFilter = 'rejected'"
            >
              <span class="summary-label">
                {{ t('myProperties.rejected') }}
              </span>

              <strong>
                {{ rejectedCount }}
              </strong>
            </button>

          </div>

        </section>


        <div
          v-if="properties.length"
          class="filter-header"
        >

          <div>

            <h2>
              {{ filterTitle }}
            </h2>

            <p>
              {{ filteredProperties.length }}

              {{
                filteredProperties.length === 1
                  ? t('myProperties.property')
                  : t('myProperties.properties')
              }}
            </p>

          </div>


          <button
            v-if="activeFilter !== 'all'"
            type="button"
            class="clear-filter"
            @click="activeFilter = 'all'"
          >
            {{ t('myProperties.showAll') }}
          </button>

        </div>


        <div
          v-if="properties.length === 0"
          class="state"
        >

          <h2>
            {{ t('myProperties.noProperties') }}
          </h2>

          <p>
            {{ t('myProperties.noPropertiesDescription') }}
          </p>

          <RouterLink
            to="/post-property"
            class="primary-btn"
          >
            {{ t('myProperties.postFirst') }}
          </RouterLink>

        </div>


        <div
          v-else-if="filteredProperties.length === 0"
          class="state"
        >

          <h2>
            {{ filterEmptyTitle }}
          </h2>

          <p>
            {{ t('myProperties.noPropertiesWithStatus') }}
          </p>

          <button
            type="button"
            class="primary-btn button-reset"
            @click="activeFilter = 'all'"
          >
            {{ t('myProperties.viewAllProperties') }}
          </button>

        </div>


        <div
          v-else
          class="property-list"
        >

          <article
            v-for="property in filteredProperties"
            :key="property.id"
            class="property-card"
          >

            <div class="image">

              <img
                v-if="property.photo_urls?.length"
                :src="property.photo_urls[0]"
                :alt="property.property_type"
              />

              <div
                v-else
                class="placeholder"
              >
                {{ t('myProperties.noPhoto') }}
              </div>


              <span
                v-if="property.photo_urls?.length"
                class="photo-count"
              >
                {{ property.photo_urls.length }}

                {{
                  property.photo_urls.length === 1
                    ? t('myProperties.photo')
                    : t('myProperties.photos')
                }}
              </span>


              <span
                class="image-status"
                :class="statusClass(property.status)"
              >
                {{ formatStatus(property.status) }}
              </span>

            </div>


            <div class="details">

              <div class="top-row">

                <div class="top-badges">

                  <span class="type">
                    {{ property.property_type }}
                  </span>


                  <span
                    class="status"
                    :class="statusClass(property.status)"
                  >
                    {{ formatStatus(property.status) }}
                  </span>


                  <span
                    v-if="property.owner_verified"
                    class="verified-badge"
                  >
                    ✓ {{ t('myProperties.verifiedOwner') }}
                  </span>

                </div>

              </div>


              <h2>
                {{ property.neighborhood }}
              </h2>


              <p class="location">
                {{ property.city }}, Cameroon
              </p>


              <p class="listing">
                {{ formatListingType(property.listing_type) }}
              </p>


              <strong class="price">
                {{ formatPrice(property.price) }} FCFA
              </strong>


              <p class="description">
                {{ property.description }}
              </p>


              <div
                v-if="property.owner_verified"
                class="verification-message verified"
              >

                <strong>
                  {{ t('myProperties.verifiedOwner') }}
                </strong>

                <p>
                  {{ t('myProperties.verifiedMessage') }}
                </p>

              </div>


              <div
                v-else
                class="verification-message unverified"
              >

                <strong>
                  {{ t('myProperties.ownerNotVerified') }}
                </strong>

                <p>
                  {{ t('myProperties.unverifiedMessage') }}
                </p>

              </div>


              <div
                class="status-message"
                :class="statusClass(property.status)"
              >

                <strong>
                  {{ statusTitle(property.status) }}
                </strong>

                <p>
                  {{ statusMessage(property.status) }}
                </p>

              </div>


              <div class="actions">

                <RouterLink
                  :to="`/property/${property.id}`"
                  class="view-btn"
                >
                  {{ t('myProperties.viewProperty') }}
                </RouterLink>


                <RouterLink
                  :to="{
                    path: '/post-property',
                    query: {
                      edit: property.id
                    }
                  }"
                  class="edit-btn"
                >
                  {{ t('myProperties.editProperty') }}
                </RouterLink>


                <button
                  type="button"
                  class="delete-btn"
                  :disabled="deletingId === property.id"
                  @click="deleteProperty(property)"
                >
                  {{
                    deletingId === property.id
                      ? t('myProperties.deleting')
                      : t('myProperties.deleteProperty')
                  }}
                </button>

              </div>

            </div>

          </article>

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

import {
  useI18n
} from 'vue-i18n'

import { supabase } from '../supabase'


const {
  t
} = useI18n()


const properties = ref([])

const loading = ref(true)

const error = ref('')

const deletingId = ref('')

const activeFilter = ref('all')


const pendingCount = computed(() => {

  return properties.value.filter(
    property =>
      property.status === 'pending'
  ).length

})


const approvedCount = computed(() => {

  return properties.value.filter(
    property =>
      property.status === 'approved'
  ).length

})


const rejectedCount = computed(() => {

  return properties.value.filter(
    property =>
      property.status === 'rejected'
  ).length

})


const filteredProperties = computed(() => {

  if (activeFilter.value === 'all') {
    return properties.value
  }

  return properties.value.filter(
    property =>
      property.status === activeFilter.value
  )

})


const filterTitle = computed(() => {

  if (activeFilter.value === 'pending') {
    return t('myProperties.pendingProperties')
  }

  if (activeFilter.value === 'approved') {
    return t('myProperties.approvedProperties')
  }

  if (activeFilter.value === 'rejected') {
    return t('myProperties.rejectedProperties')
  }

  return t('myProperties.allProperties')

})


const filterEmptyTitle = computed(() => {

  if (activeFilter.value === 'pending') {
    return t('myProperties.noPendingProperties')
  }

  if (activeFilter.value === 'approved') {
    return t('myProperties.noApprovedProperties')
  }

  if (activeFilter.value === 'rejected') {
    return t('myProperties.noRejectedProperties')
  }

  return t('myProperties.noProperties')

})


async function loadProperties() {

  loading.value = true
  error.value = ''

  try {

    const {
      data: userData,
      error: userError
    } =
      await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!userData.user) {
      throw new Error(
        t('myProperties.loginRequired')
      )
    }

    const {
      data,
      error: fetchError
    } =
      await supabase
        .from('properties')
        .select(`
          id,
          owner_id,
          property_type,
          listing_type,
          city,
          neighborhood,
          price,
          bedrooms,
          bathrooms,
          description,
          photo_urls,
          latitude,
          longitude,
          status,
          owner_verified,
          created_at
        `)
        .eq(
          'owner_id',
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

    properties.value =
      data || []

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('myProperties.loadError')

  } finally {

    loading.value = false

  }

}


async function deleteProperty(property) {

  const confirmed =
    window.confirm(
      t('myProperties.deleteConfirm')
    )

  if (!confirmed) {
    return
  }

  deletingId.value =
    property.id

  error.value = ''

  try {

    const {
      data: userData,
      error: userError
    } =
      await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    if (!userData.user) {
      throw new Error(
        t('myProperties.loginRequired')
      )
    }

    if (
      property.owner_id !==
      userData.user.id
    ) {
      throw new Error(
        t('myProperties.ownPropertiesOnly')
      )
    }


    const photoPaths = []

    if (
      Array.isArray(
        property.photo_urls
      )
    ) {

      property.photo_urls.forEach(
        url => {

          const marker =
            '/storage/v1/object/public/property-images/'

          const index =
            url.indexOf(marker)

          if (index !== -1) {

            const path =
              url.substring(
                index + marker.length
              )

            if (path) {
              photoPaths.push(path)
            }

          }

        }
      )

    }


    const {
      error: deleteError
    } =
      await supabase
        .from('properties')
        .delete()
        .eq(
          'id',
          property.id
        )
        .eq(
          'owner_id',
          userData.user.id
        )

    if (deleteError) {
      throw deleteError
    }


    if (photoPaths.length > 0) {

      const {
        error: storageError
      } =
        await supabase
          .storage
          .from('property-images')
          .remove(photoPaths)

      if (storageError) {

        console.error(
          'Property deleted, but some photos could not be removed:',
          storageError
        )

      }

    }


    properties.value =
      properties.value.filter(
        item =>
          item.id !== property.id
      )

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('myProperties.deleteError')

  } finally {

    deletingId.value = ''

  }

}


function formatPrice(price) {

  return Number(
    price
  ).toLocaleString(
    'en-US'
  )

}


function formatListingType(type) {

  const value =
    String(type || '').toLowerCase()

  if (
    value === 'rent' ||
    value === 'rental' ||
    value === 'for rent' ||
    value === 'location'
  ) {
    return t('housing.rent')
  }

  if (
    value === 'sale' ||
    value === 'sell' ||
    value === 'for sale' ||
    value === 'vente'
  ) {
    return t('housing.sale')
  }

  return type || ''
}


function formatStatus(status) {

  if (status === 'approved') {
    return t('myProperties.approved')
  }

  if (status === 'rejected') {
    return t('myProperties.rejected')
  }

  return t('myProperties.pending')

}


function statusClass(status) {

  if (status === 'approved') {
    return 'approved'
  }

  if (status === 'rejected') {
    return 'rejected'
  }

  return 'pending'

}


function statusTitle(status) {

  if (status === 'approved') {

    return t('myProperties.statusLive')

  }

  if (status === 'rejected') {

    return t('myProperties.statusActionRequired')

  }

  return t('myProperties.statusWaiting')

}


function statusMessage(status) {

  if (status === 'approved') {

    return t('myProperties.statusApprovedMessage')

  }

  if (status === 'rejected') {

    return t('myProperties.statusRejectedMessage')

  }

  return t('myProperties.statusPendingMessage')

}


onMounted(() => {

  loadProperties()

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

.post-btn,
.primary-btn,
.view-btn,
.edit-btn {
  display: inline-block;
  text-decoration: none;
  color: white;
  padding: 12px 18px;
  border-radius: 7px;
  font-weight: 600;
}

.post-btn,
.primary-btn,
.view-btn {
  background: #1769aa;
}

.edit-btn {
  background: #344054;
}

.post-btn:hover,
.primary-btn:hover,
.view-btn:hover {
  background: #125687;
}

.edit-btn:hover {
  background: #1d2939;
}

.content {
  max-width: 1100px;
  margin: 35px auto;
  padding: 0 20px;
}

.summary-section {
  margin-bottom: 30px;
}

.summary-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 15px;
}

.summary-card {
  border: 1px solid #e5e9ef;
  background: white;
  border-radius: 12px;
  padding: 20px;
  text-align: left;
  cursor: pointer;
  transition:
    border-color 0.2s,
    transform 0.2s;
}

.summary-card:hover {
  transform: translateY(-2px);
}

.summary-card.active {
  border-color: #1769aa;
}

.summary-label {
  display: block;
  color: #687386;
  font-size: 13px;
  margin-bottom: 8px;
}

.summary-card strong {
  color: #172033;
  font-size: 28px;
}

.summary-card.pending-card.active {
  border-color: #c99500;
}

.summary-card.approved-card.active {
  border-color: #217346;
}

.summary-card.rejected-card.active {
  border-color: #b42318;
}

.filter-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 20px;
}

.filter-header h2 {
  margin: 0 0 4px;
  color: #172033;
}

.filter-header p {
  margin: 0;
  color: #687386;
  font-size: 14px;
}

.clear-filter {
  border: 1px solid #d0d5dd;
  background: white;
  color: #344054;
  padding: 9px 14px;
  border-radius: 7px;
  cursor: pointer;
  font-weight: 600;
}

.clear-filter:hover {
  background: #f7f9fc;
}

.property-list {
  display: grid;
  gap: 20px;
}

.property-card {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 280px 1fr;
}

.image {
  min-height: 250px;
  background: #eef2f6;
  position: relative;
}

.image img {
  width: 100%;
  height: 100%;
  min-height: 250px;
  object-fit: cover;
  display: block;
}

.placeholder {
  height: 100%;
  min-height: 250px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7b8798;
}

.photo-count {
  position: absolute;
  left: 12px;
  bottom: 12px;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 6px 9px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
}

.image-status {
  position: absolute;
  right: 12px;
  top: 12px;
  padding: 7px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.image-status.pending {
  background: #fff4d6;
  color: #8a6500;
}

.image-status.approved {
  background: #e7f6ed;
  color: #217346;
}

.image-status.rejected {
  background: #fdeaea;
  color: #b42318;
}

.details {
  padding: 25px;
}

.top-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 15px;
}

.top-badges {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
}

.type {
  color: #1769aa;
  font-size: 13px;
  font-weight: 700;
}

.status {
  padding: 6px 10px;
  border-radius: 20px;
  font-size: 12px;
  font-weight: 700;
}

.status.pending {
  background: #fff4d6;
  color: #8a6500;
}

.status.approved {
  background: #e7f6ed;
  color: #217346;
}

.status.rejected {
  background: #fdeaea;
  color: #b42318;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 10px;
  border-radius: 20px;
  background: #e7f6ed;
  color: #217346;
  font-size: 12px;
  font-weight: 700;
}

.details h2 {
  margin: 12px 0 5px;
  color: #172033;
}

.location,
.listing {
  margin: 4px 0;
  color: #687386;
}

.price {
  display: block;
  margin-top: 18px;
  color: #172033;
  font-size: 20px;
}

.description {
  color: #687386;
  line-height: 1.5;
  margin: 15px 0;
}

.verification-message {
  margin-top: 18px;
  padding: 15px 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.verification-message.verified {
  background: #f0faf4;
  border-left-color: #217346;
}

.verification-message.unverified {
  background: #f7f9fc;
  border-left-color: #98a2b3;
}

.verification-message strong {
  display: block;
  color: #172033;
  margin-bottom: 5px;
}

.verification-message p {
  margin: 0;
  color: #687386;
  line-height: 1.5;
  font-size: 14px;
}

.status-message {
  margin-top: 18px;
  padding: 15px 16px;
  border-radius: 8px;
  border-left: 4px solid;
}

.status-message.pending {
  background: #fffaf0;
  border-left-color: #c99500;
}

.status-message.approved {
  background: #f0faf4;
  border-left-color: #217346;
}

.status-message.rejected {
  background: #fff5f5;
  border-left-color: #b42318;
}

.status-message strong {
  display: block;
  color: #172033;
  margin-bottom: 5px;
}

.status-message p {
  margin: 0;
  color: #687386;
  line-height: 1.5;
  font-size: 14px;
}

.actions {
  margin-top: 20px;
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.delete-btn,
.retry-btn {
  border: none;
  cursor: pointer;
  font-weight: 600;
}

.delete-btn {
  padding: 12px 18px;
  border-radius: 7px;
  background: #d92d20;
  color: white;
}

.delete-btn:hover {
  background: #b42318;
}

.delete-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.retry-btn {
  margin-top: 18px;
  padding: 10px 18px;
  border-radius: 7px;
  background: #1769aa;
  color: white;
}

.button-reset {
  border: none;
  cursor: pointer;
}

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

@media (max-width: 850px) {

  .summary-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .property-card {
    grid-template-columns: 1fr;
  }

  .image,
  .image img,
  .placeholder {
    min-height: 250px;
    height: 250px;
  }

}

@media (max-width: 600px) {

  .page-header {
    padding: 35px 6%;
    flex-direction: column;
    align-items: flex-start;
  }

  .page-header h1 {
    font-size: 30px;
  }

  .summary-grid {
    grid-template-columns: 1fr 1fr;
  }

  .summary-card {
    padding: 16px;
  }

  .summary-card strong {
    font-size: 24px;
  }

  .filter-header {
    align-items: flex-start;
  }

  .details {
    padding: 20px;
  }

  .actions {
    flex-direction: column;
  }

  .view-btn,
  .edit-btn,
  .delete-btn {
    width: 100%;
    box-sizing: border-box;
    text-align: center;
  }

}

@media (max-width: 400px) {

  .summary-grid {
    grid-template-columns: 1fr;
  }

}

</style>