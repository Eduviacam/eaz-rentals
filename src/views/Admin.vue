<template>
  <div class="admin-page">

    <header class="admin-header">

      <div>
        <p class="admin-label">Eaz rentals</p>

        <h1>{{ t('admin.title') }}</h1>

        <p>
          {{ t('admin.subtitle') }}
        </p>
      </div>

      <button
        class="logout-btn"
        type="button"
        @click="logout"
      >
        {{ t('common.logout') }}
      </button>

    </header>

    <main class="admin-content">

      <div
        v-if="checkingAdmin"
        class="loading-screen"
      >
        {{ t('admin.checkingAccess') }}
      </div>

      <template v-else-if="isAdmin">

        <section class="stats-grid">

          <div class="stat-card">
            <span>{{ t('admin.totalProperties') }}</span>
            <strong>{{ properties.length }}</strong>
          </div>

          <div class="stat-card pending-stat">
            <span>{{ t('admin.pendingProperties') }}</span>
            <strong>{{ pendingCount }}</strong>
          </div>

          <div class="stat-card approved-stat">
            <span>{{ t('admin.approvedProperties') }}</span>
            <strong>{{ approvedCount }}</strong>
          </div>

          <div class="stat-card users-stat">
            <span>{{ t('admin.totalUsers') }}</span>
            <strong>{{ profiles.length }}</strong>
          </div>

        </section>

        <section class="user-stats-grid">

          <div class="mini-stat">
            <span>{{ t('admin.propertySeekers') }}</span>
            <strong>{{ seekerCount }}</strong>
          </div>

          <div class="mini-stat">
            <span>{{ t('admin.landlords') }}</span>
            <strong>{{ landlordCount }}</strong>
          </div>

          <div class="mini-stat">
            <span>{{ t('admin.agents') }}</span>
            <strong>{{ agentCount }}</strong>
          </div>

          <div class="mini-stat">
            <span>{{ t('admin.verifiedAccounts') }}</span>
            <strong>{{ verifiedCount }}</strong>
          </div>

        </section>

        <section class="management-section">

          <div class="section-header">

            <div>
              <h2>{{ t('admin.userManagement') }}</h2>

              <p>
                {{ t('admin.userManagementDescription') }}
              </p>
            </div>

            <button
              class="refresh-btn"
              type="button"
              @click="loadProfiles"
              :disabled="profilesLoading"
            >
              {{
                profilesLoading
                  ? t('common.loading')
                  : t('admin.refreshUsers')
              }}
            </button>

          </div>

          <div class="filters user-filters">

            <div class="filter-group search-group">

              <label for="userSearch">
                {{ t('admin.searchUsers') }}
              </label>

              <input
                id="userSearch"
                v-model="userSearch"
                type="text"
                :placeholder="t('admin.searchUsersPlaceholder')"
              />

            </div>

            <div class="filter-group">

              <label for="accountType">
                {{ t('admin.accountType') }}
              </label>

              <select
                id="accountType"
                v-model="accountTypeFilter"
              >

                <option value="">
                  {{ t('admin.allAccountTypes') }}
                </option>

                <option value="user">
                  {{ t('admin.propertySeekers') }}
                </option>

                <option value="landlord">
                  {{ t('admin.landlords') }}
                </option>

                <option value="agent">
                  {{ t('admin.realEstateAgents') }}
                </option>

              </select>

            </div>

            <div class="filter-group">

              <label for="verificationFilter">
                {{ t('admin.verification') }}
              </label>

              <select
                id="verificationFilter"
                v-model="verificationFilter"
              >

                <option value="">
                  {{ t('admin.allVerificationStatuses') }}
                </option>

                <option value="verified">
                  {{ t('admin.verified') }}
                </option>

                <option value="unverified">
                  {{ t('admin.unverified') }}
                </option>

              </select>

            </div>

          </div>

          <p
            v-if="profilesError"
            class="error"
          >
            {{ profilesError }}
          </p>

          <div
            v-if="profilesLoading"
            class="empty-state"
          >
            {{ t('admin.loadingUsers') }}
          </div>

          <div
            v-else-if="filteredProfiles.length === 0"
            class="empty-state"
          >

            <h3>{{ t('admin.noUsers') }}</h3>

            <p>
              {{ t('admin.noUsersDescription') }}
            </p>

            <button
              type="button"
              class="clear-filters-btn"
              @click="clearUserFilters"
            >
              {{ t('admin.clearFilters') }}
            </button>

          </div>

          <div
            v-else
            class="user-table-wrapper"
          >

            <table class="user-table">

              <thead>

                <tr>
                  <th>{{ t('admin.name') }}</th>
                  <th>{{ t('admin.phone') }}</th>
                  <th>{{ t('admin.accountType') }}</th>
                  <th>{{ t('admin.verification') }}</th>
                  <th>{{ t('admin.registered') }}</th>
                  <th>{{ t('admin.action') }}</th>
                </tr>

              </thead>

              <tbody>

                <tr
                  v-for="profile in filteredProfiles"
                  :key="profile.id"
                >

                  <td>

                    <div class="user-name">
                      {{ profile.full_name || t('admin.notProvided') }}
                    </div>

                    <div class="user-id">
                      {{ profile.id }}
                    </div>

                  </td>

                  <td>
                    {{ profile.phone || t('admin.notProvided') }}
                  </td>

                  <td>

                    <span
                      class="account-badge"
                      :class="profile.account_type"
                    >
                      {{ formatAccountType(profile.account_type) }}
                    </span>

                  </td>

                  <td>

                    <span
                      v-if="isVerifiableAccount(profile)"
                      class="verification-badge"
                      :class="
                        profile.is_verified
                          ? 'verified'
                          : 'unverified'
                      "
                    >

                      <span
                        v-if="profile.is_verified"
                        class="verification-icon"
                      >
                        ✓
                      </span>

                      {{
                        profile.is_verified
                          ? t('admin.verified')
                          : t('admin.unverified')
                      }}

                    </span>

                    <span
                      v-else
                      class="not-applicable"
                    >
                      {{ t('admin.notApplicable') }}
                    </span>

                  </td>

                  <td>
                    {{ formatDate(profile.created_at) }}
                  </td>

                  <td>

                    <div
                      v-if="isVerifiableAccount(profile)"
                      class="verification-actions"
                    >

                      <button
                        v-if="!profile.is_verified"
                        type="button"
                        class="verify-btn"
                        :disabled="verifyingId === profile.id"
                        @click="
                          updateVerification(
                            profile,
                            true
                          )
                        "
                      >
                        {{
                          verifyingId === profile.id
                            ? t('admin.updating')
                            : t('admin.verify')
                        }}
                      </button>

                      <button
                        v-else
                        type="button"
                        class="unverify-btn"
                        :disabled="verifyingId === profile.id"
                        @click="
                          updateVerification(
                            profile,
                            false
                          )
                        "
                      >
                        {{
                          verifyingId === profile.id
                            ? t('admin.updating')
                            : t('admin.remove')
                        }}
                      </button>

                    </div>

                    <span
                      v-else
                      class="no-action"
                    >
                      -
                    </span>

                  </td>

                </tr>

              </tbody>

            </table>

          </div>

        </section>

        <section class="management-section properties-section">

          <div class="section-header">

            <div>
              <h2>{{ t('admin.propertySubmissions') }}</h2>

              <p>
                {{ t('admin.propertySubmissionsDescription') }}
              </p>
            </div>

            <button
              class="refresh-btn"
              type="button"
              @click="loadProperties"
              :disabled="loading"
            >
              {{
                loading
                  ? t('common.loading')
                  : t('admin.refreshProperties')
              }}
            </button>

          </div>

          <div class="filters property-filters">

            <div class="filter-group search-group">

              <label for="propertySearch">
                {{ t('admin.searchProperties') }}
              </label>

              <input
                id="propertySearch"
                v-model="propertySearch"
                type="text"
                :placeholder="t('admin.searchPropertiesPlaceholder')"
              />

            </div>

            <div class="filter-group">

              <label for="propertyStatus">
                {{ t('admin.status') }}
              </label>

              <select
                id="propertyStatus"
                v-model="statusFilter"
              >

                <option value="">
                  {{ t('admin.allStatuses') }}
                </option>

                <option value="pending">
                  {{ t('admin.pending') }}
                </option>

                <option value="approved">
                  {{ t('admin.approved') }}
                </option>

                <option value="rejected">
                  {{ t('admin.rejected') }}
                </option>

              </select>

            </div>

            <div class="filter-group">

              <label for="propertyCategory">
                {{ t('admin.category') }}
              </label>

              <select
                id="propertyCategory"
                v-model="categoryFilter"
              >

                <option value="">
                  {{ t('admin.allProperties') }}
                </option>

                <option value="housing">
                  {{ t('admin.housing') }}
                </option>

                <option value="land">
                  {{ t('admin.land') }}
                </option>

              </select>

            </div>

          </div>

          <p
            v-if="error"
            class="error"
          >
            {{ error }}
          </p>

          <div
            v-if="loading"
            class="empty-state"
          >
            {{ t('admin.loadingProperties') }}
          </div>

          <div
            v-else-if="filteredProperties.length === 0"
            class="empty-state"
          >

            <h3>
              {{ t('admin.noProperties') }}
            </h3>

            <p>
              {{ t('admin.noPropertiesDescription') }}
            </p>

            <button
              type="button"
              class="clear-filters-btn"
              @click="clearPropertyFilters"
            >
              {{ t('admin.clearFilters') }}
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

              <div class="property-image">

                <img
                  v-if="property.photo_urls?.length"
                  :src="property.photo_urls[0]"
                  :alt="property.property_type"
                />

                <div
                  v-else
                  class="image-placeholder"
                >
                  {{ t('property.noPhoto') }}
                </div>

                <span
                  v-if="property.owner_verified"
                  class="property-verified"
                >
                  ✓ {{ t('admin.verifiedOwner') }}
                </span>

              </div>

              <div class="property-info">

                <div class="property-top">

                  <span class="property-type">
                    {{ property.property_type }}
                  </span>

                  <span
                    class="status"
                    :class="property.status"
                  >
                    {{ formatStatus(property.status) }}
                  </span>

                </div>

                <h3>
                  {{ property.city }},
                  {{ property.neighborhood }}
                </h3>

                <p class="price">
                  {{ formatPrice(property.price) }} FCFA
                </p>

                <div class="details">

                  <span>
                    {{ t('admin.listing') }}:
                    {{ formatListingType(property.listing_type) }}
                  </span>

                  <span v-if="isHousing(property)">
                    {{ t('housing.bedrooms') }}:
                    {{ property.bedrooms }}
                  </span>

                  <span v-if="isHousing(property)">
                    {{ t('housing.bathrooms') }}:
                    {{ property.bathrooms }}
                  </span>

                </div>

                <p class="description">
                  {{ shortenDescription(property.description) }}
                </p>

                <p class="owner-summary">
                  {{ t('admin.owner') }}:
                  {{
                    getOwnerProfile(property)?.full_name ||
                    t('admin.unknown')
                  }}

                  <span
                    v-if="property.owner_verified"
                    class="small-verified"
                  >
                    {{ t('admin.verified') }}
                  </span>
                </p>

                <p class="date">
                  {{ t('admin.submitted') }}:
                  {{ formatDate(property.created_at) }}
                </p>

              </div>

              <div class="actions">

                <button
                  type="button"
                  class="view-btn"
                  @click="openReview(property)"
                >
                  {{ t('admin.review') }}
                </button>

                <button
                  v-if="property.status !== 'approved'"
                  type="button"
                  class="approve-btn"
                  :disabled="updatingId === property.id"
                  @click="
                    updateStatus(
                      property.id,
                      'approved'
                    )
                  "
                >
                  {{
                    updatingId === property.id
                      ? t('admin.updating')
                      : t('admin.approve')
                  }}
                </button>

                <button
                  v-if="property.status !== 'rejected'"
                  type="button"
                  class="reject-btn"
                  :disabled="updatingId === property.id"
                  @click="
                    updateStatus(
                      property.id,
                      'rejected'
                    )
                  "
                >
                  {{
                    updatingId === property.id
                      ? t('admin.updating')
                      : t('admin.reject')
                  }}
                </button>

              </div>

            </article>

          </div>

        </section>

      </template>

    </main>

    <div
      v-if="selectedProperty"
      class="review-overlay"
      @click.self="closeReview"
    >

      <div class="review-modal">

        <div class="review-header">

          <div>
            <p class="review-label">
              {{ t('admin.propertyReview') }}
            </p>

            <h2>
              {{ selectedProperty.city }},
              {{ selectedProperty.neighborhood }}
            </h2>
          </div>

          <button
            type="button"
            class="close-review"
            @click="closeReview"
          >
            ×
          </button>

        </div>

        <div class="review-gallery">

          <div
            v-if="reviewPhotos.length"
            class="review-main-image"
          >

            <img
              :src="selectedReviewImage"
              :alt="selectedProperty.property_type"
            />

          </div>

          <div
            v-else
            class="review-no-image"
          >
            {{ t('admin.noPhotosUploaded') }}
          </div>

          <div
            v-if="reviewPhotos.length > 1"
            class="review-thumbnails"
          >

            <button
              v-for="(photo, index) in reviewPhotos"
              :key="`${photo}-${index}`"
              type="button"
              class="review-thumbnail"
              :class="{
                active:
                  selectedReviewImage === photo
              }"
              @click="
                selectedReviewImage = photo
              "
            >
              <img
                :src="photo"
                :alt="`${t('admin.photo')} ${index + 1}`"
              />
            </button>

          </div>

        </div>

        <div class="review-details">

          <div class="review-title-row">

            <div>

              <div class="review-badges">

                <span class="property-type">
                  {{
                    selectedProperty.property_type
                  }}
                </span>

                <span
                  class="status"
                  :class="selectedProperty.status"
                >
                  {{
                    formatStatus(
                      selectedProperty.status
                    )
                  }}
                </span>

                <span
                  v-if="selectedProperty.owner_verified"
                  class="verified-review-badge"
                >
                  ✓ {{ t('admin.verifiedOwner') }}
                </span>

              </div>

              <h3>
                {{
                  selectedProperty.city
                }},
                {{
                  selectedProperty.neighborhood
                }}
              </h3>

            </div>

            <div class="review-price">
              {{
                formatPrice(
                  selectedProperty.price
                )
              }}
              FCFA
            </div>

          </div>

          <div class="review-info-grid">

            <div class="review-info-item">
              <span>{{ t('admin.listingType') }}</span>
              <strong>
                {{ formatListingType(selectedProperty.listing_type) }}
              </strong>
            </div>

            <div class="review-info-item">
              <span>{{ t('admin.category') }}</span>
              <strong>
                {{
                  isHousing(selectedProperty)
                    ? t('admin.housing')
                    : t('admin.land')
                }}
              </strong>
            </div>

            <div
              v-if="isHousing(selectedProperty)"
              class="review-info-item"
            >
              <span>{{ t('housing.bedrooms') }}</span>
              <strong>
                {{ selectedProperty.bedrooms }}
              </strong>
            </div>

            <div
              v-if="isHousing(selectedProperty)"
              class="review-info-item"
            >
              <span>{{ t('housing.bathrooms') }}</span>
              <strong>
                {{ selectedProperty.bathrooms }}
              </strong>
            </div>

          </div>

          <div class="review-owner">

            <h4>{{ t('admin.ownerInformation') }}</h4>

            <div class="owner-grid">

              <div>
                <span>{{ t('admin.name') }}</span>
                <strong>
                  {{
                    selectedOwner?.full_name ||
                    t('admin.notProvided')
                  }}
                </strong>
              </div>

              <div>
                <span>{{ t('admin.phone') }}</span>
                <strong>
                  {{
                    selectedOwner?.phone ||
                    t('admin.notProvided')
                  }}
                </strong>
              </div>

              <div>
                <span>{{ t('admin.accountType') }}</span>
                <strong>
                  {{
                    formatAccountType(
                      selectedOwner?.account_type
                    )
                  }}
                </strong>
              </div>

              <div>
                <span>{{ t('admin.verification') }}</span>
                <strong>
                  {{
                    selectedProperty.owner_verified
                      ? t('admin.verifiedOwner')
                      : t('admin.notVerified')
                  }}
                </strong>
              </div>

            </div>

          </div>

          <div class="review-description">

            <h4>{{ t('property.description') }}</h4>

            <p>
              {{
                selectedProperty.description ||
                t('admin.noDescription')
              }}
            </p>

          </div>

          <div class="review-meta">

            <span>
              {{ t('admin.submitted') }}:
              {{
                formatDate(
                  selectedProperty.created_at
                )
              }}
            </span>

            <span>
              {{ t('admin.propertyId') }}:
              {{ selectedProperty.id }}
            </span>

          </div>

        </div>

        <section class="admin-message-panel">

          <div class="admin-message-heading">
            <h4>
              {{
                locale === 'fr'
                  ? 'Message au propriétaire'
                  : 'Message to Property Owner'
              }}
            </h4>

            <p>
              {{
                locale === 'fr'
                  ? 'Envoyez un message direct concernant cette propriété. Le propriétaire recevra également une notification.'
                  : 'Send a direct message about this property. The owner will also receive a notification.'
              }}
            </p>
          </div>

          <div class="admin-message-form">

            <div class="admin-message-field">

              <label for="adminMessageSubject">
                {{
                  locale === 'fr'
                    ? 'Objet'
                    : 'Subject'
                }}
              </label>

              <input
                id="adminMessageSubject"
                v-model="adminMessageSubject"
                type="text"
                maxlength="150"
                :placeholder="
                  locale === 'fr'
                    ? 'Ex. Photos de la propriété'
                    : 'e.g. Property photos'
                "
              />

            </div>

            <div class="admin-message-field">

              <label for="adminMessageBody">
                {{
                  locale === 'fr'
                    ? 'Message'
                    : 'Message'
                }}
              </label>

              <textarea
                id="adminMessageBody"
                v-model="adminMessageBody"
                rows="5"
                maxlength="2000"
                :placeholder="
                  locale === 'fr'
                    ? 'Expliquez clairement ce qui doit être corrigé ou amélioré.'
                    : 'Clearly explain what needs to be corrected or improved.'
                "
              ></textarea>

              <small>
                {{ adminMessageBody.length }}/2000
              </small>

            </div>

            <div
              v-if="adminMessageSuccess"
              class="admin-message-success"
            >
              {{ adminMessageSuccess }}
            </div>

            <div
              v-if="adminMessageError"
              class="admin-message-error"
            >
              {{ adminMessageError }}
            </div>

            <button
              type="button"
              class="send-admin-message-btn"
              :disabled="
                sendingAdminMessage ||
                !adminMessageBody.trim()
              "
              @click="sendAdminMessage"
            >
              {{
                sendingAdminMessage
                  ? (
                      locale === 'fr'
                        ? 'Envoi...'
                        : 'Sending...'
                    )
                  : (
                      locale === 'fr'
                        ? 'Envoyer le message'
                        : 'Send Message'
                    )
              }}
            </button>

          </div>

        </section>

        <div class="review-actions">

          <button
            type="button"
            class="review-close-btn"
            @click="closeReview"
          >
            {{ t('common.close') }}
          </button>

          <button
            v-if="
              selectedProperty.status !== 'rejected'
            "
            type="button"
            class="review-reject-btn"
            :disabled="
              updatingId === selectedProperty.id
            "
            @click="
              updateStatus(
                selectedProperty.id,
                'rejected'
              )
            "
          >
            {{
              updatingId === selectedProperty.id
                ? t('admin.updating')
                : t('admin.rejectProperty')
            }}
          </button>

          <button
            v-if="
              selectedProperty.status !== 'approved'
            "
            type="button"
            class="review-approve-btn"
            :disabled="
              updatingId === selectedProperty.id
            "
            @click="
              updateStatus(
                selectedProperty.id,
                'approved'
              )
            "
          >
            {{
              updatingId === selectedProperty.id
                ? t('admin.updating')
                : t('admin.approveProperty')
            }}
          </button>

        </div>

      </div>

    </div>

  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted
} from 'vue'

import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { supabase } from '../supabase'

const router = useRouter()
const { t, locale } = useI18n()

const properties = ref([])
const profiles = ref([])

const loading = ref(false)
const profilesLoading = ref(false)
const checkingAdmin = ref(true)

const isAdmin = ref(false)

const error = ref('')
const profilesError = ref('')

const updatingId = ref(null)
const verifyingId = ref(null)

const propertySearch = ref('')
const statusFilter = ref('')
const categoryFilter = ref('')

const userSearch = ref('')
const accountTypeFilter = ref('')
const verificationFilter = ref('')

const selectedProperty = ref(null)
const selectedReviewImage = ref('')

const adminMessageSubject = ref('')
const adminMessageBody = ref('')
const adminMessageSuccess = ref('')
const adminMessageError = ref('')
const sendingAdminMessage = ref(false)

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

const seekerCount = computed(() => {
  return profiles.value.filter(
    profile =>
      profile.account_type === 'user'
  ).length
})

const landlordCount = computed(() => {
  return profiles.value.filter(
    profile =>
      profile.account_type === 'landlord'
  ).length
})

const agentCount = computed(() => {
  return profiles.value.filter(
    profile =>
      profile.account_type === 'agent'
  ).length
})

const verifiedCount = computed(() => {
  return profiles.value.filter(
    profile =>
      isVerifiableAccount(profile) &&
      profile.is_verified === true
  ).length
})

const filteredProfiles = computed(() => {

  let result = [
    ...profiles.value
  ]

  const search =
    userSearch.value
      .trim()
      .toLowerCase()

  if (search) {

    result = result.filter(profile => {

      const name =
        String(
          profile.full_name || ''
        ).toLowerCase()

      const phone =
        String(
          profile.phone || ''
        ).toLowerCase()

      return (
        name.includes(search) ||
        phone.includes(search)
      )
    })
  }

  if (accountTypeFilter.value) {

    result = result.filter(
      profile =>
        profile.account_type ===
        accountTypeFilter.value
    )
  }

  if (verificationFilter.value) {

    result = result.filter(profile => {

      if (!isVerifiableAccount(profile)) {
        return false
      }

      if (
        verificationFilter.value ===
        'verified'
      ) {
        return profile.is_verified === true
      }

      if (
        verificationFilter.value ===
        'unverified'
      ) {
        return profile.is_verified !== true
      }

      return true
    })
  }

  return result
})

const filteredProperties = computed(() => {

  let result = [
    ...properties.value
  ]

  const search =
    propertySearch.value
      .trim()
      .toLowerCase()

  if (search) {

    result = result.filter(property => {

      const city =
        String(
          property.city || ''
        ).toLowerCase()

      const neighborhood =
        String(
          property.neighborhood || ''
        ).toLowerCase()

      const type =
        String(
          property.property_type || ''
        ).toLowerCase()

      return (
        city.includes(search) ||
        neighborhood.includes(search) ||
        type.includes(search)
      )
    })
  }

  if (statusFilter.value) {

    result = result.filter(
      property =>
        property.status ===
        statusFilter.value
    )
  }

  if (categoryFilter.value) {

    result = result.filter(property => {

      const isLand =
        isLandProperty(property)

      if (
        categoryFilter.value === 'land'
      ) {
        return isLand
      }

      if (
        categoryFilter.value === 'housing'
      ) {
        return !isLand
      }

      return true
    })
  }

  return result
})

const reviewPhotos = computed(() => {

  if (
    !selectedProperty.value ||
    !Array.isArray(
      selectedProperty.value.photo_urls
    )
  ) {
    return []
  }

  return selectedProperty.value.photo_urls
    .filter(Boolean)
})

const selectedOwner = computed(() => {

  if (!selectedProperty.value) {
    return null
  }

  return getOwnerProfile(
    selectedProperty.value
  )
})

function getOwnerProfile(property) {

  if (!property) {
    return null
  }

  return (
    profiles.value.find(
      profile =>
        profile.id === property.owner_id
    ) || null
  )
}

function openReview(property) {

  selectedProperty.value =
    property

  selectedReviewImage.value =
    reviewPhotos.value[0] || ''

  adminMessageSubject.value =
    locale === 'fr'
      ? 'Concernant votre propriété'
      : 'Regarding your property'

  adminMessageBody.value = ''
  adminMessageSuccess.value = ''
  adminMessageError.value = ''

}

function closeReview() {

  selectedProperty.value = null
  selectedReviewImage.value = ''

  adminMessageSubject.value = ''
  adminMessageBody.value = ''
  adminMessageSuccess.value = ''
  adminMessageError.value = ''

}

async function sendAdminMessage() {

  adminMessageSuccess.value = ''
  adminMessageError.value = ''

  if (!selectedProperty.value) {
    return
  }

  const message =
    adminMessageBody.value.trim()

  const subject =
    adminMessageSubject.value.trim() ||
    (
      locale === 'fr'
        ? 'Concernant votre propriété'
        : 'Regarding your property'
    )

  if (!message) {

    adminMessageError.value =
      locale === 'fr'
        ? 'Veuillez écrire un message avant de l’envoyer.'
        : 'Please write a message before sending it.'

    return
  }

  if (!selectedProperty.value.owner_id) {

    adminMessageError.value =
      locale === 'fr'
        ? 'Impossible de déterminer le propriétaire de cette propriété.'
        : 'Unable to determine the owner of this property.'

    return
  }

  sendingAdminMessage.value = true

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
        locale === 'fr'
          ? 'Votre session administrateur a expiré.'
          : 'Your administrator session has expired.'
      )

    }

    const {
      error: insertError
    } =
      await supabase
        .from('admin_messages')
        .insert({
          sender_id:
            userData.user.id,

          recipient_id:
            selectedProperty.value.owner_id,

          property_id:
            selectedProperty.value.id,

          subject,

          message
        })

    if (insertError) {
      throw insertError
    }

    adminMessageSubject.value = subject
    adminMessageBody.value = ''

    adminMessageSuccess.value =
      locale === 'fr'
        ? 'Message envoyé avec succès. Le propriétaire a reçu une notification.'
        : 'Message sent successfully. The property owner has received a notification.'

  } catch (err) {

    console.error(err)

    adminMessageError.value =
      err.message ||
      (
        locale === 'fr'
          ? 'Impossible d’envoyer le message.'
          : 'Unable to send the message.'
      )

  } finally {

    sendingAdminMessage.value = false

  }

}

async function checkAdmin() {

  try {

    const {
      data,
      error: userError
    } =
      await supabase.auth.getUser()

    if (userError) {
      throw userError
    }

    const user = data.user

    if (!user) {

      router.push('/admin-login')

      return
    }

    const role =
      user.user_metadata?.role

    if (role !== 'admin') {

      alert(
        t('admin.accessDenied')
      )

      await supabase.auth.signOut()

      router.push('/admin-login')

      return
    }

    isAdmin.value = true

    await Promise.all([
      loadProfiles(),
      loadProperties()
    ])

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('admin.unableToVerifyAccess')

  } finally {

    checkingAdmin.value = false

  }
}

async function loadProperties() {

  loading.value = true
  error.value = ''

  try {

    const {
      data,
      error: propertyError
    } =
      await supabase
        .from('properties')
        .select('*')
        .order(
          'created_at',
          {
            ascending: false
          }
        )

    if (propertyError) {
      throw propertyError
    }

    properties.value =
      data || []

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('admin.failedToLoadProperties')

  } finally {

    loading.value = false

  }
}

async function loadProfiles() {

  profilesLoading.value = true
  profilesError.value = ''

  try {

    const {
      data,
      error: profileError
    } =
      await supabase
        .from('profiles')
        .select('*')
        .order(
          'created_at',
          {
            ascending: false
          }
        )

    if (profileError) {
      throw profileError
    }

    profiles.value =
      data || []

  } catch (err) {

    console.error(err)

    profilesError.value =
      err.message ||
      t('admin.failedToLoadUsers')

  } finally {

    profilesLoading.value = false

  }
}

function isVerifiableAccount(profile) {

  return (
    profile.account_type === 'landlord' ||
    profile.account_type === 'agent'
  )
}

async function updateVerification(
  profile,
  shouldVerify
) {

  if (!isVerifiableAccount(profile)) {
    return
  }

  const confirmed =
    window.confirm(
      shouldVerify
        ? t('admin.verifyConfirm', {
            name:
              profile.full_name ||
              t('admin.thisAccount')
          })
        : t('admin.removeVerificationConfirm', {
            name:
              profile.full_name ||
              t('admin.thisAccount')
          })
    )

  if (!confirmed) {
    return
  }

  verifyingId.value =
    profile.id

  profilesError.value = ''

  try {

    const {
      error: updateError
    } =
      await supabase
        .from('profiles')
        .update({
          is_verified:
            shouldVerify,

          verification_status:
            shouldVerify
              ? 'verified'
              : 'unverified'
        })
        .eq(
          'id',
          profile.id
        )

    if (updateError) {
      throw updateError
    }

    profile.is_verified =
      shouldVerify

    profile.verification_status =
      shouldVerify
        ? 'verified'
        : 'unverified'

    await loadProperties()

  } catch (err) {

    console.error(err)

    profilesError.value =
      err.message ||
      t('admin.failedToUpdateVerification')

  } finally {

    verifyingId.value =
      null
  }
}

async function updateStatus(
  propertyId,
  newStatus
) {

  const confirmed =
    window.confirm(
      newStatus === 'approved'
        ? t('admin.approveConfirm')
        : t('admin.rejectConfirm')
    )

  if (!confirmed) {
    return
  }

  updatingId.value =
    propertyId

  error.value = ''

  try {

    const {
      error: updateError
    } =
      await supabase
        .from('properties')
        .update({
          status: newStatus
        })
        .eq(
          'id',
          propertyId
        )

    if (updateError) {
      throw updateError
    }

    const property =
      properties.value.find(
        item =>
          item.id === propertyId
      )

    if (property) {
      property.status =
        newStatus
    }

    if (
      selectedProperty.value?.id ===
      propertyId
    ) {
      selectedProperty.value.status =
        newStatus
    }

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('admin.failedToUpdateProperty')

  } finally {

    updatingId.value =
      null
  }
}

function clearUserFilters() {

  userSearch.value = ''
  accountTypeFilter.value = ''
  verificationFilter.value = ''

}

function clearPropertyFilters() {

  propertySearch.value = ''
  statusFilter.value = ''
  categoryFilter.value = ''

}

function isLandProperty(property) {

  const type =
    String(
      property?.property_type || ''
    ).toLowerCase()

  return (
    type.includes('land') ||
    type.includes('terrain') ||
    type.includes('agricultural') ||
    type.includes('agriculture') ||
    type.includes('commercial land') ||
    type.includes('industrial land') ||
    type.includes('mixed use land')
  )
}

function isHousing(property) {

  return !isLandProperty(property)

}

function formatAccountType(type) {

  if (type === 'user') {
    return t('admin.propertySeeker')
  }

  if (type === 'landlord') {
    return t('admin.landlord')
  }

  if (type === 'agent') {
    return t('admin.realEstateAgent')
  }

  return t('admin.unknown')

}

function formatStatus(status) {

  if (status === 'approved') {
    return t('admin.approved')
  }

  if (status === 'rejected') {
    return t('admin.rejected')
  }

  return t('admin.pending')

}

function formatListingType(type) {

  if (type === 'rent' || type === 'rental') {
    return t('housing.rent')
  }

  if (type === 'sale') {
    return t('housing.sale')
  }

  return type || t('admin.unknown')

}

function formatPrice(price) {

  return new Intl.NumberFormat(
    'fr-FR'
  ).format(
    Number(price || 0)
  )

}

function formatDate(date) {

  if (!date) {
    return t('admin.unknown')
  }

  return new Date(
    date
  ).toLocaleDateString(
    locale === 'fr'
      ? 'fr-FR'
      : 'en-GB',
    {
      day: '2-digit',
      month: 'short',
      year: 'numeric'
    }
  )

}

function shortenDescription(
  description
) {

  if (!description) {
    return t('admin.noDescription')
  }

  if (
    description.length <= 150
  ) {
    return description
  }

  return (
    description.substring(
      0,
      150
    ) + '...'
  )

}

async function logout() {

  await supabase.auth.signOut()

  router.push(
    '/admin-login'
  )

}

onMounted(() => {

  const savedLanguage =
    localStorage.getItem(
      'eaz-language'
    )

  if (
    savedLanguage === 'en' ||
    savedLanguage === 'fr'
  ) {
    locale.value =
      savedLanguage
  }

  checkAdmin()

})
</script>

<style scoped>

.admin-page {
  min-height: calc(100vh - 75px);
  background: #f7f9fc;
  padding-bottom: 60px;
}

.admin-header {
  background: white;
  border-bottom: 1px solid #e5e9ef;
  padding: 35px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.admin-label {
  margin: 0 0 5px;
  color: #1769aa;
  font-weight: 700;
}

.admin-header h1 {
  margin: 0 0 8px;
  color: #172033;
  font-size: 32px;
}

.admin-header p:last-child {
  margin: 0;
  color: #687386;
}

.logout-btn {
  padding: 11px 20px;
  border: 1px solid #d93025;
  border-radius: 7px;
  background: white;
  color: #d93025;
  font-weight: 600;
  cursor: pointer;
}

.logout-btn:hover {
  background: #fff5f5;
}

.admin-content {
  max-width: 1200px;
  margin: 35px auto;
  padding: 0 20px;
}

.loading-screen {
  background: white;
  padding: 50px;
  text-align: center;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  color: #687386;
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 20px;
}

.stat-card,
.mini-stat {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  padding: 24px;
}

.stat-card span,
.mini-stat span {
  display: block;
  color: #687386;
  font-size: 14px;
  margin-bottom: 10px;
}

.stat-card strong,
.mini-stat strong {
  font-size: 30px;
  color: #172033;
}

.pending-stat {
  border-top: 4px solid #d69e00;
}

.approved-stat {
  border-top: 4px solid #1b7f43;
}

.users-stat {
  border-top: 4px solid #1769aa;
}

.user-stats-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 20px;
  margin-bottom: 30px;
}

.mini-stat {
  padding: 20px;
}

.management-section {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  padding: 30px;
  margin-bottom: 30px;
}

.section-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 25px;
}

.section-header h2 {
  margin: 0 0 7px;
  color: #172033;
}

.section-header p {
  margin: 0;
  color: #687386;
}

.refresh-btn {
  padding: 10px 18px;
  border: 1px solid #1769aa;
  border-radius: 7px;
  background: white;
  color: #1769aa;
  font-weight: 600;
  cursor: pointer;
}

.refresh-btn:hover {
  background: #f0f7fc;
}

.refresh-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.filters {
  display: grid;
  grid-template-columns: 2fr 1fr 1fr;
  gap: 15px;
  padding: 18px;
  margin-bottom: 25px;
  background: #f7f9fc;
  border: 1px solid #e5e9ef;
  border-radius: 10px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.filter-group label {
  color: #344054;
  font-size: 13px;
  font-weight: 700;
}

.filter-group input,
.filter-group select {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 1px solid #d5dbe3;
  border-radius: 7px;
  background: white;
  color: #172033;
  font-size: 14px;
  outline: none;
}

.filter-group input:focus,
.filter-group select:focus {
  border-color: #1769aa;
}

.user-table-wrapper {
  width: 100%;
  overflow-x: auto;
}

.user-table {
  width: 100%;
  border-collapse: collapse;
  min-width: 950px;
}

.user-table th {
  padding: 13px 12px;
  background: #f7f9fc;
  border-bottom: 1px solid #e5e9ef;
  text-align: left;
  color: #344054;
  font-size: 13px;
}

.user-table td {
  padding: 15px 12px;
  border-bottom: 1px solid #edf0f3;
  color: #4f596b;
  font-size: 14px;
}

.user-table tbody tr:hover {
  background: #fafbfc;
}

.user-name {
  color: #172033;
  font-weight: 700;
}

.user-id {
  margin-top: 4px;
  max-width: 220px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  color: #9aa3b1;
  font-size: 11px;
}

.account-badge {
  display: inline-block;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.account-badge.user {
  background: #eef5fb;
  color: #1769aa;
}

.account-badge.landlord {
  background: #fff7e6;
  color: #9a6700;
}

.account-badge.agent {
  background: #edf8f1;
  color: #1b7f43;
}

.verification-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 6px 9px;
  border-radius: 999px;
  font-size: 11px;
  font-weight: 700;
}

.verification-badge.verified {
  background: #edf8f1;
  color: #1b7f43;
}

.verification-badge.unverified {
  background: #f1f3f5;
  color: #687386;
}

.verification-icon {
  font-weight: 800;
}

.not-applicable {
  color: #9aa3b1;
  font-size: 12px;
}

.verification-actions {
  display: flex;
  gap: 7px;
}

.verify-btn,
.unverify-btn {
  padding: 7px 10px;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.verify-btn {
  border: 1px solid #1b7f43;
  background: #1b7f43;
  color: white;
}

.verify-btn:hover {
  background: #166b38;
}

.unverify-btn {
  border: 1px solid #d93025;
  background: white;
  color: #d93025;
}

.unverify-btn:hover {
  background: #fff5f5;
}

.verify-btn:disabled,
.unverify-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.no-action {
  color: #b0b7c3;
}

.property-list {
  display: grid;
  gap: 18px;
}

.property-card {
  border: 1px solid #e5e9ef;
  border-radius: 10px;
  padding: 18px;
  display: grid;
  grid-template-columns: 180px 1fr auto;
  gap: 22px;
  align-items: start;
}

.property-image {
  position: relative;
  width: 180px;
  height: 150px;
  overflow: hidden;
  border-radius: 8px;
  background: #eef2f6;
}

.property-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7b8798;
  font-size: 13px;
}

.property-verified {
  position: absolute;
  left: 8px;
  bottom: 8px;
  padding: 5px 8px;
  border-radius: 5px;
  background: white;
  color: #1769aa;
  font-size: 10px;
  font-weight: 700;
  box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
}

.property-info {
  min-width: 0;
}

.property-top {
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 12px;
}

.property-type,
.status {
  display: inline-block;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  font-weight: 700;
}

.property-type {
  background: #eef5fb;
  color: #1769aa;
}

.status {
  text-transform: capitalize;
}

.status.pending {
  background: #fff7e6;
  color: #9a6700;
}

.status.approved {
  background: #edf8f1;
  color: #1b7f43;
}

.status.rejected {
  background: #fff0ef;
  color: #c62828;
}

.property-card h3 {
  margin: 0 0 8px;
  color: #172033;
  font-size: 20px;
}

.price {
  margin: 0 0 14px;
  color: #1769aa;
  font-size: 18px;
  font-weight: 700;
}

.details {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  color: #687386;
  font-size: 13px;
}

.description {
  margin: 15px 0 8px;
  color: #4f596b;
  line-height: 1.5;
  font-size: 14px;
}

.owner-summary {
  margin: 8px 0;
  color: #4f596b;
  font-size: 13px;
}

.small-verified {
  margin-left: 6px;
  color: #1769aa;
  font-weight: 700;
}

.date {
  margin: 5px 0;
  color: #8a93a3;
  font-size: 12px;
}

.actions {
  display: flex;
  flex-direction: column;
  gap: 8px;
  min-width: 105px;
}

.actions button {
  padding: 10px 12px;
  border-radius: 6px;
  font-weight: 600;
  cursor: pointer;
}

.view-btn {
  border: 1px solid #1769aa;
  background: white;
  color: #1769aa;
}

.view-btn:hover {
  background: #f0f7fc;
}

.approve-btn {
  border: 1px solid #1b7f43;
  background: #1b7f43;
  color: white;
}

.approve-btn:hover {
  background: #166b38;
}

.reject-btn {
  border: 1px solid #d93025;
  background: white;
  color: #d93025;
}

.reject-btn:hover {
  background: #fff5f5;
}

.actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.empty-state {
  padding: 45px 20px;
  text-align: center;
  color: #687386;
  background: #f7f9fc;
  border-radius: 8px;
}

.empty-state h3 {
  margin: 0 0 8px;
  color: #172033;
}

.empty-state p {
  margin: 0;
}

.clear-filters-btn {
  margin-top: 18px;
  padding: 10px 18px;
  border: 1px solid #1769aa;
  border-radius: 7px;
  background: white;
  color: #1769aa;
  font-weight: 600;
  cursor: pointer;
}

.error {
  padding: 14px;
  margin-bottom: 20px;
  background: #fff0ef;
  color: #c62828;
  border-radius: 7px;
  font-weight: 600;
}


/* REVIEW MODAL */

.review-overlay {
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 25px;
  background: rgba(15, 23, 42, 0.65);
  overflow-y: auto;
}

.review-modal {
  width: 100%;
  max-width: 1000px;
  max-height: 92vh;
  overflow-y: auto;
  background: white;
  border-radius: 14px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.25);
}

.review-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  padding: 25px 30px;
  border-bottom: 1px solid #e5e9ef;
}

.review-label {
  margin: 0 0 5px;
  color: #1769aa;
  font-size: 12px;
  font-weight: 700;
  text-transform: uppercase;
}

.review-header h2 {
  margin: 0;
  color: #172033;
  font-size: 25px;
}

.close-review {
  width: 38px;
  height: 38px;
  flex-shrink: 0;
  border: 1px solid #d9dde5;
  border-radius: 50%;
  background: white;
  color: #555;
  font-size: 24px;
  line-height: 1;
  cursor: pointer;
}

.close-review:hover {
  background: #f5f7fa;
}

.review-gallery {
  padding: 25px 30px 0;
}

.review-main-image,
.review-no-image {
  width: 100%;
  height: 430px;
  overflow: hidden;
  border-radius: 10px;
  background: #eef2f6;
}

.review-main-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.review-no-image {
  display: flex;
  align-items: center;
  justify-content: center;
  color: #687386;
}

.review-thumbnails {
  display: flex;
  gap: 10px;
  margin-top: 12px;
  overflow-x: auto;
}

.review-thumbnail {
  width: 80px;
  height: 60px;
  flex: 0 0 80px;
  padding: 0;
  border: 2px solid transparent;
  border-radius: 6px;
  overflow: hidden;
  background: #eef2f6;
  cursor: pointer;
}

.review-thumbnail.active {
  border-color: #1769aa;
}

.review-thumbnail img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.review-details {
  padding: 30px;
}

.review-title-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 25px;
}

.review-badges {
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  margin-bottom: 12px;
}

.verified-review-badge {
  display: inline-flex;
  align-items: center;
  padding: 5px 9px;
  border-radius: 5px;
  background: #edf8f1;
  color: #1b7f43;
  font-size: 12px;
  font-weight: 700;
}

.review-title-row h3 {
  margin: 0;
  color: #172033;
  font-size: 24px;
}

.review-price {
  flex-shrink: 0;
  color: #1769aa;
  font-size: 22px;
  font-weight: 700;
}

.review-info-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
  margin-top: 25px;
}

.review-info-item {
  padding: 15px;
  background: #f7f9fc;
  border: 1px solid #e5e9ef;
  border-radius: 8px;
}

.review-info-item span,
.owner-grid span {
  display: block;
  margin-bottom: 6px;
  color: #687386;
  font-size: 12px;
}

.review-info-item strong,
.owner-grid strong {
  color: #172033;
  font-size: 14px;
}

.review-owner,
.review-description {
  margin-top: 28px;
}

.review-owner h4,
.review-description h4 {
  margin: 0 0 15px;
  color: #172033;
  font-size: 17px;
}

.owner-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 12px;
}

.owner-grid > div {
  padding: 15px;
  border: 1px solid #e5e9ef;
  border-radius: 8px;
}

.review-description p {
  margin: 0;
  color: #4f596b;
  line-height: 1.7;
  white-space: pre-line;
}

.review-meta {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  margin-top: 25px;
  color: #8a93a3;
  font-size: 12px;
}

.admin-message-panel {
  margin: 28px 30px 0;
  padding: 20px;
  border: 1px solid #dbe4ef;
  border-radius: 10px;
  background: #f8fafc;
}

.admin-message-heading h4 {
  margin: 0 0 6px;
  color: #172033;
  font-size: 17px;
}

.admin-message-heading p {
  margin: 0;
  color: #687386;
  line-height: 1.5;
  font-size: 13px;
}

.admin-message-form {
  margin-top: 18px;
}

.admin-message-field {
  margin-bottom: 16px;
}

.admin-message-field label {
  display: block;
  margin-bottom: 7px;
  color: #172033;
  font-size: 13px;
  font-weight: 700;
}

.admin-message-field input,
.admin-message-field textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 11px 12px;
  border: 1px solid #d1d9e3;
  border-radius: 7px;
  background: #ffffff;
  color: #172033;
  font: inherit;
  outline: none;
}

.admin-message-field input:focus,
.admin-message-field textarea:focus {
  border-color: #1769aa;
  box-shadow: 0 0 0 3px rgba(23, 105, 170, 0.08);
}

.admin-message-field textarea {
  min-height: 120px;
  resize: vertical;
}

.admin-message-field small {
  display: block;
  margin-top: 5px;
  color: #8a93a3;
  text-align: right;
  font-size: 11px;
}

.admin-message-success,
.admin-message-error {
  margin: 12px 0;
  padding: 10px 12px;
  border-radius: 7px;
  font-size: 13px;
  line-height: 1.5;
}

.admin-message-success {
  border: 1px solid #b7e1c5;
  background: #f0faf3;
  color: #237a3b;
}

.admin-message-error {
  border: 1px solid #f1c0bc;
  background: #fff5f4;
  color: #b42318;
}

.send-admin-message-btn {
  width: 100%;
  padding: 11px 16px;
  border: 0;
  border-radius: 7px;
  background: #1769aa;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.send-admin-message-btn:hover {
  background: #125687;
}

.send-admin-message-btn:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

.review-actions {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  padding: 20px 30px;
  border-top: 1px solid #e5e9ef;
}

.review-actions button {
  padding: 12px 18px;
  border-radius: 7px;
  font-weight: 600;
  cursor: pointer;
}

.review-close-btn {
  border: 1px solid #d9dde5;
  background: white;
  color: #555;
}

.review-reject-btn {
  border: 1px solid #d93025;
  background: white;
  color: #d93025;
}

.review-approve-btn {
  border: 1px solid #1b7f43;
  background: #1b7f43;
  color: white;
}

.review-actions button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


@media (max-width: 1000px) {

  .stats-grid,
  .user-stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .filters {
    grid-template-columns: 1fr 1fr;
  }

  .filters .search-group {
    grid-column: 1 / -1;
  }

  .property-card {
    grid-template-columns: 150px 1fr;
  }

  .property-image {
    width: 150px;
    height: 140px;
  }

  .actions {
    grid-column: 1 / -1;
    flex-direction: row;
  }

  .review-info-grid,
  .owner-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


@media (max-width: 600px) {

  .admin-header {
    padding: 25px 5%;
    align-items: flex-start;
  }

  .admin-header h1 {
    font-size: 27px;
  }

  .admin-content {
    padding: 0 15px;
  }

  .stats-grid,
  .user-stats-grid {
    grid-template-columns: 1fr;
  }

  .management-section {
    padding: 20px;
  }

  .section-header {
    align-items: flex-start;
    flex-direction: column;
  }

  .refresh-btn {
    width: 100%;
  }

  .filters {
    grid-template-columns: 1fr;
  }

  .filters .search-group {
    grid-column: auto;
  }

  .property-card {
    grid-template-columns: 1fr;
  }

  .property-image {
    width: 100%;
    height: 200px;
  }

  .actions {
    grid-column: auto;
    flex-direction: column;
  }

  .actions button {
    width: 100%;
  }

  .verification-actions {
    flex-direction: column;
  }

  .verify-btn,
  .unverify-btn {
    width: 100%;
  }

  .review-overlay {
    padding: 10px;
  }

  .review-header,
  .review-gallery,
  .review-details {
    padding-left: 18px;
    padding-right: 18px;
  }

  .review-main-image,
  .review-no-image {
    height: 260px;
  }

  .review-title-row {
    flex-direction: column;
  }

  .review-price {
    font-size: 20px;
  }

  .review-info-grid,
  .owner-grid {
    grid-template-columns: 1fr;
  }

  .admin-message-panel {
    margin: 20px 18px 0;
    padding: 16px;
  }

  .review-actions {
    flex-direction: column;
    padding: 18px;
  }

  .review-actions button {
    width: 100%;
  }

}

</style>