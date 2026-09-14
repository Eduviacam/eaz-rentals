<template>
  <div class="housing-page">

    <section class="page-hero">
      <div>
        <p class="eyebrow">Eaz rentals</p>

        <h1>
          {{ $t('housing.title') }}
        </h1>

        <p class="page-subtitle">
          {{ $t('housing.subtitle') }}
        </p>
      </div>
    </section>

    <main class="housing-container">

      <section class="filters-card">

        <div class="filters-header">
          <div>
            <h2>
              {{ $t('housing.search') }}
            </h2>

            <p>
              {{
                currentLanguage === 'fr'
                  ? 'Utilisez les filtres ci-dessous pour trouver le bien idéal.'
                  : 'Use the filters below to find the right property.'
              }}
            </p>
          </div>

          <button
            class="clear-button"
            type="button"
            @click="clearFilters"
          >
            {{ $t('housing.resetFilters') }}
          </button>
        </div>

        <div class="filters-grid">

          <div class="filter-group">
            <label for="city">
              {{ $t('housing.city') }}
            </label>

            <input
              id="city"
              v-model="filters.city"
              type="text"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Exemple : Yaoundé'
                  : 'Example: Yaoundé'
              "
            />
          </div>

          <div class="filter-group">
            <label for="neighborhood">
              {{ $t('housing.neighborhood') }}
            </label>

            <input
              id="neighborhood"
              v-model="filters.neighborhood"
              type="text"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Exemple : Bastos'
                  : 'Example: Bastos'
              "
            />
          </div>

          <div class="filter-group">
            <label for="propertyType">
              {{ $t('housing.propertyType') }}
            </label>

            <select
              id="propertyType"
              v-model="filters.propertyType"
            >
              <option value="">
                {{ $t('housing.all') }}
              </option>

              <option value="House">
                {{ currentLanguage === 'fr' ? 'Maison' : 'House' }}
              </option>

              <option value="Apartment">
                {{ currentLanguage === 'fr' ? 'Appartement' : 'Apartment' }}
              </option>

              <option value="Studio">
                {{ currentLanguage === 'fr' ? 'Studio' : 'Studio' }}
              </option>

              <option value="Room">
                {{ currentLanguage === 'fr' ? 'Chambre' : 'Room' }}
              </option>

              <option value="Duplex">
                {{ currentLanguage === 'fr' ? 'Duplex' : 'Duplex' }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label for="listingType">
              {{ $t('housing.listingType') }}
            </label>

            <select
              id="listingType"
              v-model="filters.listingType"
            >
              <option value="">
                {{
                  currentLanguage === 'fr'
                    ? 'Location ou vente'
                    : 'Rent or sale'
                }}
              </option>

              <option value="Rent">
                {{ $t('housing.rent') }}
              </option>

              <option value="Sale">
                {{ $t('housing.sale') }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label for="minPrice">
              {{ $t('housing.minPrice') }}
            </label>

            <input
              id="minPrice"
              v-model.number="filters.minPrice"
              type="number"
              min="0"
              placeholder="0"
            />
          </div>

          <div class="filter-group">
            <label for="maxPrice">
              {{ $t('housing.maxPrice') }}
            </label>

            <input
              id="maxPrice"
              v-model.number="filters.maxPrice"
              type="number"
              min="0"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Sans limite'
                  : 'No limit'
              "
            />
          </div>

          <div class="filter-group">
            <label for="bedrooms">
              {{ $t('housing.bedrooms') }}
            </label>

            <select
              id="bedrooms"
              v-model="filters.bedrooms"
            >
              <option value="">
                {{ currentLanguage === 'fr' ? 'Tous' : 'Any' }}
              </option>

              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
              <option value="5">5+</option>
            </select>
          </div>

          <div class="filter-group">
            <label for="bathrooms">
              {{ $t('housing.bathrooms') }}
            </label>

            <select
              id="bathrooms"
              v-model="filters.bathrooms"
            >
              <option value="">
                {{ currentLanguage === 'fr' ? 'Tous' : 'Any' }}
              </option>

              <option value="1">1+</option>
              <option value="2">2+</option>
              <option value="3">3+</option>
              <option value="4">4+</option>
            </select>
          </div>

        </div>

        <div class="advanced-row">

          <label class="checkbox-label">
            <input
              v-model="filters.verifiedOnly"
              type="checkbox"
            />

            <span>
              {{
                currentLanguage === 'fr'
                  ? 'Afficher uniquement les propriétaires vérifiés'
                  : 'Show only verified owners'
              }}
            </span>
          </label>

        </div>

        <div
          v-if="activeFilters.length"
          class="active-filters"
        >
          <span class="active-title">
            {{
              currentLanguage === 'fr'
                ? 'Filtres actifs :'
                : 'Active filters:'
            }}
          </span>

          <button
            v-for="filter in activeFilters"
            :key="filter.key"
            type="button"
            class="filter-pill"
            @click="removeFilter(filter.key)"
          >
            {{ filter.label }}

            <span>×</span>
          </button>
        </div>

        <div class="filter-actions">
          <button
            class="search-button"
            type="button"
            @click="applyFilters"
          >
            {{ $t('housing.search') }}
          </button>
        </div>

      </section>

      <section class="results-section">

        <div class="results-header">

          <div>
            <h2>
              {{
                currentLanguage === 'fr'
                  ? 'Biens disponibles'
                  : 'Available properties'
              }}
            </h2>

            <p v-if="!loading">
              {{ filteredProperties.length }}

              {{
                currentLanguage === 'fr'
                  ? filteredProperties.length === 1
                    ? 'bien'
                    : 'biens'
                  : filteredProperties.length === 1
                    ? 'property'
                    : 'properties'
              }}

              {{
                currentLanguage === 'fr'
                  ? 'trouvé'
                  : 'found'
              }}
            </p>
          </div>

          <div class="sort-group">

            <label for="sort">
              {{ $t('housing.sortBy') }}
            </label>

            <select
              id="sort"
              v-model="sortBy"
            >
              <option value="newest">
                {{ $t('housing.newest') }}
              </option>

              <option value="price-low">
                {{ $t('housing.priceLow') }}
              </option>

              <option value="price-high">
                {{ $t('housing.priceHigh') }}
              </option>
            </select>

          </div>

        </div>

        <div
          v-if="loading"
          class="state-box"
        >
          <p>
            {{ $t('common.loading') }}
          </p>
        </div>

        <div
          v-else-if="errorMessage"
          class="state-box error-box"
        >
          <p>{{ errorMessage }}</p>

          <button
            type="button"
            @click="loadProperties"
          >
            {{ $t('common.retry') }}
          </button>
        </div>

        <div
          v-else-if="filteredProperties.length === 0"
          class="state-box empty-box"
        >
          <h3>
            {{ $t('housing.noProperties') }}
          </h3>

          <p>
            {{
              currentLanguage === 'fr'
                ? 'Aucun bien ne correspond à votre recherche.'
                : 'We could not find a property matching your search.'
            }}
          </p>

          <button
            type="button"
            @click="clearFilters"
          >
            {{ $t('housing.resetFilters') }}
          </button>
        </div>

        <div
          v-else
          class="property-grid"
        >

          <article
            v-for="property in filteredProperties"
            :key="property.id"
            class="property-card"
          >

            <div class="property-image-wrapper">

              <img
                v-if="property.photo_urls?.length"
                :src="property.photo_urls[0]"
                :alt="`${formatPropertyType(property.property_type)} in ${property.neighborhood}`"
                class="property-image"
              />

              <div
                v-else
                class="image-placeholder"
              >
                <span>
                  {{
                    currentLanguage === 'fr'
                      ? 'Aucune photo disponible'
                      : 'No photo available'
                  }}
                </span>
              </div>

              <span class="listing-badge">
                {{ formatListingType(property.listing_type) }}
              </span>

              <button
                type="button"
                class="save-button"
                :class="{ saved: isSaved(property.id) }"
                :aria-label="
                  isSaved(property.id)
                    ? (
                        currentLanguage === 'fr'
                          ? 'Retirer des biens enregistrés'
                          : 'Remove from saved properties'
                      )
                    : (
                        currentLanguage === 'fr'
                          ? 'Enregistrer le bien'
                          : 'Save property'
                      )
                "
                @click.stop="toggleSave(property.id)"
              >
                <span>
                  {{ isSaved(property.id) ? '♥️' : '♡' }}
                </span>

                {{
                  isSaved(property.id)
                    ? $t('common.saved')
                    : $t('common.save')
                }}
              </button>

            </div>

            <div class="property-content">

              <div class="property-type-row">

                <span class="property-type">
                  {{ formatPropertyType(property.property_type) }}
                </span>

                <span
                  v-if="property.owner_verified"
                  class="verified-badge"
                  :title="
                    currentLanguage === 'fr'
                      ? 'Propriétaire vérifié'
                      : 'Verified property owner'
                  "
                >
                  <span class="check-icon">✓</span>

                  {{
                    currentLanguage === 'fr'
                      ? 'Propriétaire vérifié'
                      : 'Verified Owner'
                  }}
                </span>

              </div>

              <h3>
                {{ formatPrice(property.price) }}
              </h3>

              <p class="property-location">
                {{ property.neighborhood }},
                {{ property.city }}
              </p>

              <div class="property-features">

                <span>
                  {{ property.bedrooms || 0 }}

                  {{
                    currentLanguage === 'fr'
                      ? 'chambres'
                      : 'bedrooms'
                  }}
                </span>

                <span>
                  {{ property.bathrooms || 0 }}

                  {{
                    currentLanguage === 'fr'
                      ? 'salles de bain'
                      : 'bathrooms'
                  }}
                </span>

              </div>

              <div
                v-if="Number(property.total_units || 1) > 1 || Number(property.available_units || 0) > 0"
                class="availability-box"
              >
                <div class="availability-row">
                  <span class="availability-label">
                    {{
                      currentLanguage === 'fr'
                        ? 'Disponibilité des unités'
                        : 'Unit availability'
                    }}
                  </span>

                  <span
                    class="availability-status"
                    :class="{ 'fully-occupied': Number(property.available_units || 0) === 0 }"
                  >
                    {{
                      Number(property.available_units || 0) > 0
                        ? (currentLanguage === 'fr' ? 'Disponible' : 'Available')
                        : (currentLanguage === 'fr' ? 'Complet' : 'Fully occupied')
                    }}
                  </span>
                </div>

                <div class="availability-numbers">
                  <span>
                    <strong>{{ Number(property.available_units || 0) }}</strong>
                    {{
                      currentLanguage === 'fr'
                        ? 'disponibles'
                        : 'available'
                    }}
                  </span>

                  <span>
                    <strong>{{ Math.max(0, Number(property.total_units || 1) - Number(property.available_units || 0)) }}</strong>
                    {{
                      currentLanguage === 'fr'
                        ? 'occupées'
                        : 'occupied'
                    }}
                  </span>

                  <span>
                    <strong>{{ Number(property.total_units || 1) }}</strong>
                    {{
                      currentLanguage === 'fr'
                        ? 'unités'
                        : 'units'
                    }}
                  </span>
                </div>
              </div>

              <p class="property-description">
                {{ shortenDescription(property.description) }}
              </p>

              <button
                type="button"
                class="view-button"
                @click="viewProperty(property.id)"
              >
                {{
                  currentLanguage === 'fr'
                    ? 'Voir le bien'
                    : 'View property'
                }}
              </button>

            </div>

          </article>

        </div>

      </section>

    </main>

  </div>
</template>

<script setup>
import {
  computed,
  onMounted,
  reactive,
  ref,
  watch
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import { useI18n } from 'vue-i18n'

import { supabase } from '../supabase'

const route = useRoute()
const router = useRouter()

const {
  locale,
  t
} = useI18n()

const currentLanguage = computed(() => locale.value)

const properties = ref([])
const loading = ref(true)
const errorMessage = ref('')
const sortBy = ref('newest')

const savedPropertyIds = ref(new Set())

const filters = reactive({
  city: '',
  neighborhood: '',
  propertyType: '',
  listingType: '',
  minPrice: '',
  maxPrice: '',
  bedrooms: '',
  bathrooms: '',
  verifiedOnly: false
})

function normalizeText(value) {
  return String(value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
    .replace(/\s+/g, ' ')
}

function normalizeListingType(value) {
  const normalized = normalizeText(value)

  if (
    normalized.includes('rent') ||
    normalized.includes('location')
  ) {
    return 'rent'
  }

  if (
    normalized.includes('sale') ||
    normalized.includes('sell') ||
    normalized.includes('vente')
  ) {
    return 'sale'
  }

  return normalized
}

function formatListingType(value) {
  const type = normalizeListingType(value)

  if (type === 'rent') {
    return currentLanguage.value === 'fr'
      ? 'À louer'
      : 'For Rent'
  }

  if (type === 'sale') {
    return currentLanguage.value === 'fr'
      ? 'À vendre'
      : 'For Sale'
  }

  return value || (
    currentLanguage.value === 'fr'
      ? 'Annonce'
      : 'Listing'
  )
}

function formatPropertyType(value) {
  const type = normalizeText(value)

  const translations = {
    house: currentLanguage.value === 'fr'
      ? 'Maison'
      : 'House',

    apartment: currentLanguage.value === 'fr'
      ? 'Appartement'
      : 'Apartment',

    studio: 'Studio',

    room: currentLanguage.value === 'fr'
      ? 'Chambre'
      : 'Room',

    duplex: 'Duplex'
  }

  return translations[type] || value
}

const activeFilters = computed(() => {
  const result = []

  if (filters.city) {
    result.push({
      key: 'city',
      label:
        currentLanguage.value === 'fr'
          ? `Ville : ${filters.city}`
          : `City: ${filters.city}`
    })
  }

  if (filters.neighborhood) {
    result.push({
      key: 'neighborhood',
      label:
        currentLanguage.value === 'fr'
          ? `Quartier : ${filters.neighborhood}`
          : `Area: ${filters.neighborhood}`
    })
  }

  if (filters.propertyType) {
    result.push({
      key: 'propertyType',
      label: formatPropertyType(filters.propertyType)
    })
  }

  if (filters.listingType) {
    result.push({
      key: 'listingType',
      label: formatListingType(filters.listingType)
    })
  }

  if (filters.minPrice !== '') {
    result.push({
      key: 'minPrice',
      label:
        currentLanguage.value === 'fr'
          ? `Minimum : ${formatPrice(filters.minPrice)}`
          : `Min: ${formatPrice(filters.minPrice)}`
    })
  }

  if (filters.maxPrice !== '') {
    result.push({
      key: 'maxPrice',
      label:
        currentLanguage.value === 'fr'
          ? `Maximum : ${formatPrice(filters.maxPrice)}`
          : `Max: ${formatPrice(filters.maxPrice)}`
    })
  }

  if (filters.bedrooms) {
    result.push({
      key: 'bedrooms',
      label:
        currentLanguage.value === 'fr'
          ? `${filters.bedrooms}+ chambres`
          : `${filters.bedrooms}+ bedrooms`
    })
  }

  if (filters.bathrooms) {
    result.push({
      key: 'bathrooms',
      label:
        currentLanguage.value === 'fr'
          ? `${filters.bathrooms}+ salles de bain`
          : `${filters.bathrooms}+ bathrooms`
    })
  }

  if (filters.verifiedOnly) {
    result.push({
      key: 'verifiedOnly',
      label:
        currentLanguage.value === 'fr'
          ? 'Propriétaires vérifiés'
          : 'Verified owners'
    })
  }

  return result
})

const filteredProperties = computed(() => {
  let result = [...properties.value]

  const city = normalizeText(filters.city)
  const neighborhood = normalizeText(filters.neighborhood)

  if (city) {
    result = result.filter(property =>
      normalizeText(property.city).includes(city)
    )
  }

  if (neighborhood) {
    result = result.filter(property =>
      normalizeText(property.neighborhood)
        .includes(neighborhood)
    )
  }

  if (filters.propertyType) {
    const selectedType =
      normalizeText(filters.propertyType)

    result = result.filter(property =>
      normalizeText(property.property_type) ===
      selectedType
    )
  }

  if (filters.listingType) {
    const selectedListingType =
      normalizeListingType(filters.listingType)

    result = result.filter(property =>
      normalizeListingType(property.listing_type) ===
      selectedListingType
    )
  }

  if (filters.minPrice !== '') {
    result = result.filter(property =>
      Number(property.price || 0) >=
      Number(filters.minPrice)
    )
  }

  if (filters.maxPrice !== '') {
    result = result.filter(property =>
      Number(property.price || 0) <=
      Number(filters.maxPrice)
    )
  }

  if (filters.bedrooms) {
    result = result.filter(property =>
      Number(property.bedrooms || 0) >=
      Number(filters.bedrooms)
    )
  }

  if (filters.bathrooms) {
    result = result.filter(property =>
      Number(property.bathrooms || 0) >=
      Number(filters.bathrooms)
    )
  }

  if (filters.verifiedOnly) {
    result = result.filter(property =>
      property.owner_verified === true
    )
  }

  if (sortBy.value === 'price-low') {
    result.sort(
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    )
  }

  if (sortBy.value === 'price-high') {
    result.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    )
  }

  if (sortBy.value === 'newest') {
    result.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
  }

  return result
})

function isSaved(propertyId) {
  return savedPropertyIds.value.has(propertyId)
}

async function loadSavedProperties() {
  const {
    data: userData
  } = await supabase.auth.getUser()

  if (!userData.user) {
    savedPropertyIds.value = new Set()
    return
  }

  const {
    data,
    error
  } = await supabase
    .from('saved_properties')
    .select('property_id')
    .eq('user_id', userData.user.id)

  if (error) {
    console.error(error)
    return
  }

  savedPropertyIds.value =
    new Set(
      (data || []).map(
        item => item.property_id
      )
    )
}

async function toggleSave(propertyId) {
  const {
    data: userData
  } = await supabase.auth.getUser()

  if (!userData.user) {
    router.push({
      path: '/login',
      query: {
        redirect: route.fullPath
      }
    })

    return
  }

  const userId = userData.user.id

  if (isSaved(propertyId)) {

    const {
      error
    } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)

    if (error) {
      console.error(error)
      return
    }

    const updated =
      new Set(savedPropertyIds.value)

    updated.delete(propertyId)

    savedPropertyIds.value = updated

    return
  }

  const {
    error
  } = await supabase
    .from('saved_properties')
    .insert({
      user_id: userId,
      property_id: propertyId
    })

  if (error) {
    if (error.code === '23505') {
      await loadSavedProperties()
      return
    }

    console.error(error)
    return
  }

  const updated =
    new Set(savedPropertyIds.value)

  updated.add(propertyId)

  savedPropertyIds.value = updated
}

function applyFilters() {
  const query = {}

  if (filters.city.trim()) {
    query.city = filters.city.trim()
  }

  if (filters.neighborhood.trim()) {
    query.neighborhood =
      filters.neighborhood.trim()
  }

  if (filters.propertyType) {
    query.type = filters.propertyType
  }

  if (filters.listingType) {
    query.listing = filters.listingType
  }

  if (filters.minPrice !== '') {
    query.minPrice =
      String(filters.minPrice)
  }

  if (filters.maxPrice !== '') {
    query.maxPrice =
      String(filters.maxPrice)
  }

  if (filters.bedrooms !== '') {
    query.bedrooms =
      String(filters.bedrooms)
  }

  if (filters.bathrooms !== '') {
    query.bathrooms =
      String(filters.bathrooms)
  }

  if (filters.verifiedOnly) {
    query.verified = 'true'
  }

  router.replace({
    path: '/housing',
    query
  })
}

function clearFilters() {
  filters.city = ''
  filters.neighborhood = ''
  filters.propertyType = ''
  filters.listingType = ''
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.bedrooms = ''
  filters.bathrooms = ''
  filters.verifiedOnly = false

  sortBy.value = 'newest'

  router.replace({
    path: '/housing'
  })
}

function removeFilter(key) {
  if (key === 'city') filters.city = ''
  if (key === 'neighborhood') filters.neighborhood = ''
  if (key === 'propertyType') filters.propertyType = ''
  if (key === 'listingType') filters.listingType = ''
  if (key === 'minPrice') filters.minPrice = ''
  if (key === 'maxPrice') filters.maxPrice = ''
  if (key === 'bedrooms') filters.bedrooms = ''
  if (key === 'bathrooms') filters.bathrooms = ''

  if (key === 'verifiedOnly') {
    filters.verifiedOnly = false
  }

  applyFilters()
}

function loadQueryFilters() {
  filters.city =
    String(route.query.city || '')

  filters.neighborhood =
    String(route.query.neighborhood || '')

  filters.propertyType =
    String(route.query.type || '')

  filters.listingType =
    String(route.query.listing || '')

  filters.minPrice =
    route.query.minPrice
      ? Number(route.query.minPrice)
      : ''

  filters.maxPrice =
    route.query.maxPrice
      ? Number(route.query.maxPrice)
      : ''

  filters.bedrooms =
    String(route.query.bedrooms || '')

  filters.bathrooms =
    String(route.query.bathrooms || '')

  filters.verifiedOnly =
    String(route.query.verified || '')
      .toLowerCase() === 'true'

  if (
    !filters.city &&
    route.query.search
  ) {
    filters.city =
      String(route.query.search)
  }

  if (
    route.query.price &&
    !filters.minPrice &&
    !filters.maxPrice
  ) {
    const price =
      String(route.query.price)

    if (price === '0-50000') {
      filters.maxPrice = 50000
    }

    if (price === '50000-100000') {
      filters.minPrice = 50000
      filters.maxPrice = 100000
    }

    if (price === '100000-200000') {
      filters.minPrice = 100000
      filters.maxPrice = 200000
    }

    if (price === '200000+') {
      filters.minPrice = 200000
    }
  }
}

function formatPrice(price) {
  const number = Number(price || 0)

  return new Intl.NumberFormat(
    currentLanguage.value === 'fr'
      ? 'fr-FR'
      : 'en-US'
  ).format(number) + ' FCFA'
}

function shortenDescription(description) {
  if (!description) {
    return currentLanguage.value === 'fr'
      ? 'Aucune description disponible.'
      : 'No description available.'
  }

  const text = String(description)

  if (text.length <= 110) {
    return text
  }

  return text.substring(0, 110) + '...'
}

function viewProperty(id) {
  router.push(`/property/${id}`)
}

async function loadProperties() {
  loading.value = true
  errorMessage.value = ''

  const {
    data,
    error
  } = await supabase
    .from('properties')
    .select('*')
    .eq('status', 'approved')
    .in('property_type', [
      'House',
      'Apartment',
      'Studio',
      'Room',
      'Duplex'
    ])
    .order(
      'created_at',
      {
        ascending: false
      }
    )

  if (error) {
    console.error(error)

    errorMessage.value =
      currentLanguage.value === 'fr'
        ? 'Impossible de charger les biens pour le moment.'
        : 'Unable to load properties right now.'

    properties.value = []
  } else {
    properties.value = data || []
  }

  loading.value = false
}

watch(
  () => route.query,
  () => {
    loadQueryFilters()
  }
)

onMounted(async () => {
  loadQueryFilters()

  await Promise.all([
    loadProperties(),
    loadSavedProperties()
  ])
})
</script>

<style scoped>

.housing-page {
  min-height: 100vh;
  background: #f6f7f9;
  color: #18202a;
}

.page-hero {
  padding: 64px 24px 48px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.page-hero > div {
  max-width: 1180px;
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 10px;
  font-size: 14px;
  font-weight: 700;
  color: #2563eb;
  text-transform: uppercase;
  letter-spacing: 0.08em;
}

.page-hero h1 {
  margin: 0;
  font-size: 42px;
  line-height: 1.1;
}

.page-subtitle {
  margin: 14px 0 0;
  color: #667085;
  font-size: 17px;
}

.housing-container {
  max-width: 1180px;
  margin: 0 auto;
  padding: 32px 24px 70px;
}

.filters-card {
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 18px;
  padding: 24px;
  box-shadow: 0 8px 25px rgba(16, 24, 40, 0.05);
}

.filters-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  gap: 20px;
  margin-bottom: 24px;
}

.filters-header h2,
.results-header h2 {
  margin: 0;
  font-size: 22px;
}

.filters-header p,
.results-header p {
  margin: 6px 0 0;
  color: #667085;
  font-size: 14px;
}

.clear-button {
  border: 0;
  background: transparent;
  color: #2563eb;
  font-weight: 700;
  cursor: pointer;
}

.filters-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.filter-group {
  display: flex;
  flex-direction: column;
  gap: 7px;
}

.filter-group label,
.sort-group label {
  font-size: 13px;
  font-weight: 700;
  color: #344054;
}

.filter-group input,
.filter-group select,
.sort-group select {
  width: 100%;
  box-sizing: border-box;
  min-height: 44px;
  padding: 10px 12px;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  background: #ffffff;
  color: #18202a;
  font-size: 14px;
  outline: none;
}

.filter-group input:focus,
.filter-group select:focus,
.sort-group select:focus {
  border-color: #2563eb;
}

.advanced-row {
  margin-top: 20px;
}

.checkbox-label {
  display: inline-flex;
  align-items: center;
  gap: 9px;
  color: #344054;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}

.checkbox-label input {
  width: 17px;
  height: 17px;
  accent-color: #2563eb;
}

.active-filters {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 8px;
  margin-top: 18px;
}

.active-title {
  color: #667085;
  font-size: 13px;
  font-weight: 600;
}

.filter-pill {
  display: inline-flex;
  align-items: center;
  gap: 7px;
  padding: 7px 10px;
  border: 1px solid #dbe4ff;
  border-radius: 999px;
  background: #eff4ff;
  color: #2563eb;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.filter-pill span {
  font-size: 16px;
  line-height: 1;
}

.filter-actions {
  margin-top: 22px;
  display: flex;
  justify-content: flex-end;
}

.search-button,
.view-button {
  border: 0;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.search-button {
  padding: 12px 20px;
}

.search-button:hover,
.view-button:hover {
  background: #1d4ed8;
}

.results-section {
  margin-top: 38px;
}

.results-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  gap: 20px;
  margin-bottom: 20px;
}

.sort-group {
  display: flex;
  align-items: center;
  gap: 10px;
}

.sort-group select {
  width: 170px;
}

.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 22px;
}

.property-card {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 16px;
  box-shadow: 0 6px 20px rgba(16, 24, 40, 0.05);
}

.property-image-wrapper {
  position: relative;
  height: 220px;
  background: #eef1f4;
}

.property-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.image-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667085;
  font-size: 14px;
}

.listing-badge {
  position: absolute;
  top: 14px;
  left: 14px;
  padding: 6px 10px;
  border-radius: 999px;
  background: #ffffff;
  color: #18202a;
  font-size: 12px;
  font-weight: 800;
}

.save-button {
  position: absolute;
  top: 14px;
  right: 14px;
  display: inline-flex;
  align-items: center;
  gap: 5px;
  padding: 7px 10px;
  border: 0;
  border-radius: 999px;
  background: #ffffff;
  color: #344054;
  font-size: 12px;
  font-weight: 800;
  cursor: pointer;
  box-shadow: 0 3px 12px rgba(0, 0, 0, 0.12);
}

.save-button span {
  font-size: 17px;
  line-height: 1;
}

.save-button.saved {
  color: #2563eb;
}

.property-content {
  padding: 18px;
}

.property-type-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
}

.property-type {
  font-size: 13px;
  color: #667085;
  font-weight: 700;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 5px 8px;
  border-radius: 999px;
  background: #ecfdf3;
  color: #027a48;
  font-size: 11px;
  font-weight: 800;
  white-space: nowrap;
}

.check-icon {
  font-size: 12px;
  font-weight: 900;
}

.property-content h3 {
  margin: 10px 0 6px;
  font-size: 21px;
}

.property-location {
  margin: 0;
  color: #475467;
  font-size: 14px;
}

.property-features {
  display: flex;
  gap: 16px;
  margin: 15px 0;
  color: #344054;
  font-size: 13px;
}

.property-description {
  min-height: 42px;
  margin: 0 0 18px;
  color: #667085;
  font-size: 13px;
  line-height: 1.5;
}

.availability-box {
  margin: 0 0 18px;
  padding: 12px 13px;
  border: 1px solid #e4e7ec;
  border-radius: 12px;
  background: #f8fafc;
}

.availability-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 10px;
}

.availability-label {
  color: #344054;
  font-size: 12px;
  font-weight: 800;
}

.availability-status {
  color: #027a48;
  font-size: 11px;
  font-weight: 800;
}

.availability-status.fully-occupied {
  color: #b42318;
}

.availability-numbers {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 8px;
  margin-top: 10px;
}

.availability-numbers span {
  display: flex;
  flex-direction: column;
  gap: 2px;
  color: #667085;
  font-size: 10px;
  line-height: 1.2;
}

.availability-numbers strong {
  color: #18202a;
  font-size: 16px;
}

.view-button {
  width: 100%;
  padding: 11px;
}

.state-box {
  padding: 50px 20px;
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 16px;
  text-align: center;
}

.state-box p {
  margin: 0;
  color: #667085;
}

.state-box h3 {
  margin: 0 0 8px;
}

.state-box button {
  margin-top: 18px;
  padding: 10px 18px;
  border: 0;
  border-radius: 9px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.error-box {
  color: #b42318;
}

@media (max-width: 950px) {
  .filters-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .property-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 650px) {
  .page-hero {
    padding: 45px 18px 35px;
  }

  .page-hero h1 {
    font-size: 32px;
  }

  .housing-container {
    padding: 22px 16px 50px;
  }

  .filters-card {
    padding: 18px;
  }

  .filters-header,
  .results-header {
    flex-direction: column;
    align-items: stretch;
  }

  .filters-grid {
    grid-template-columns: 1fr;
  }

  .filter-actions {
    justify-content: stretch;
  }

  .search-button {
    width: 100%;
  }

  .sort-group {
    flex-direction: column;
    align-items: stretch;
  }

  .sort-group select {
    width: 100%;
  }

  .property-grid {
    grid-template-columns: 1fr;
  }

  .property-image-wrapper {
    height: 230px;
  }

  .property-type-row {
    align-items: flex-start;
  }

  .verified-badge {
    font-size: 10px;
  }
}

</style>