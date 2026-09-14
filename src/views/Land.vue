<template>
  <div class="land-page">

    <section class="page-hero">
      <div>
        <p class="eyebrow">Eaz rentals</p>

        <h1>
          {{
            currentLanguage === 'fr'
              ? 'Trouvez un terrain pour votre prochain projet'
              : 'Find land for your next project'
          }}
        </h1>

        <p class="page-subtitle">
          {{
            currentLanguage === 'fr'
              ? 'Recherchez des terrains résidentiels, commerciaux, agricoles et autres partout au Cameroun.'
              : 'Search residential, commercial, agricultural and other land across Cameroon.'
          }}
        </p>
      </div>
    </section>

    <main class="content">

      <section class="filters-card">

        <div class="filters-header">

          <div>
            <h2>
              {{
                currentLanguage === 'fr'
                  ? 'Rechercher un terrain'
                  : 'Search land'
              }}
            </h2>

            <p>
              {{
                currentLanguage === 'fr'
                  ? 'Utilisez les filtres ci-dessous pour trouver le terrain idéal.'
                  : 'Use the filters below to find the right land.'
              }}
            </p>
          </div>

          <button
            class="clear-button"
            type="button"
            @click="clearFilters"
          >
            {{ $t('land.resetFilters') }}
          </button>

        </div>

        <div class="filter-grid">

          <div class="filter-group">
            <label for="city">
              {{ $t('land.city') }}
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
              {{ $t('land.neighborhood') }}
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
            <label for="landType">
              {{ $t('land.landType') }}
            </label>

            <select
              id="landType"
              v-model="filters.landType"
            >
              <option value="">
                {{
                  currentLanguage === 'fr'
                    ? 'Tous les types de terrain'
                    : 'All Land Types'
                }}
              </option>

              <option value="Residential">
                {{ $t('land.residential') }}
              </option>

              <option value="Commercial">
                {{ $t('land.commercial') }}
              </option>

              <option value="Agricultural">
                {{ $t('land.agricultural') }}
              </option>

              <option value="Industrial">
                {{
                  currentLanguage === 'fr'
                    ? 'Industriel'
                    : 'Industrial'
                }}
              </option>

              <option value="Mixed Use">
                {{ $t('land.mixedUse') }}
              </option>

              <option value="Land">
                {{
                  currentLanguage === 'fr'
                    ? 'Terrain'
                    : 'Land'
                }}
              </option>

              <option value="Other">
                {{
                  currentLanguage === 'fr'
                    ? 'Autre'
                    : 'Other'
                }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label for="listingType">
              {{ $t('land.listingType') }}
            </label>

            <select
              id="listingType"
              v-model="filters.listingType"
            >
              <option value="">
                {{
                  currentLanguage === 'fr'
                    ? 'Location ou vente'
                    : 'Rent or Sale'
                }}
              </option>

              <option value="Rent">
                {{ $t('land.rent') }}
              </option>

              <option value="Sale">
                {{ $t('land.sale') }}
              </option>
            </select>
          </div>

          <div class="filter-group">
            <label for="minPrice">
              {{ $t('land.minPrice') }}
            </label>

            <input
              id="minPrice"
              v-model.number="filters.minPrice"
              type="number"
              min="0"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Minimum'
                  : 'Minimum'
              "
            />
          </div>

          <div class="filter-group">
            <label for="maxPrice">
              {{ $t('land.maxPrice') }}
            </label>

            <input
              id="maxPrice"
              v-model.number="filters.maxPrice"
              type="number"
              min="0"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Maximum'
                  : 'Maximum'
              "
            />
          </div>

          <div class="filter-group">
            <label for="query">
              {{ $t('land.search') }}
            </label>

            <input
              id="query"
              v-model="filters.query"
              type="text"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Rechercher dans les détails du terrain...'
                  : 'Search land details...'
              "
            />
          </div>

          <div class="filter-group">
            <label for="sort">
              {{ $t('land.sortBy') }}
            </label>

            <select
              id="sort"
              v-model="filters.sort"
            >
              <option value="newest">
                {{ $t('land.newest') }}
              </option>

              <option value="price-low">
                {{ $t('land.priceLow') }}
              </option>

              <option value="price-high">
                {{ $t('land.priceHigh') }}
              </option>
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

            <span>
              ×
            </span>
          </button>

        </div>

        <div class="filter-actions">

          <button
            class="search-button"
            type="button"
            @click="searchLand"
          >
            {{
              currentLanguage === 'fr'
                ? 'Rechercher un terrain'
                : 'Search Land'
            }}
          </button>

        </div>

      </section>

      <div
        v-if="loading"
        class="state-message"
      >
        {{
          currentLanguage === 'fr'
            ? 'Chargement des terrains disponibles...'
            : 'Loading available land...'
        }}
      </div>

      <div
        v-else-if="error"
        class="state-message error-message"
      >
        <p>
          {{ error }}
        </p>

        <button
          type="button"
          @click="loadLand"
        >
          {{ $t('common.retry') }}
        </button>
      </div>

      <div
        v-else-if="filteredProperties.length === 0"
        class="state-message"
      >
        <h2>
          {{ $t('land.noProperties') }}
        </h2>

        <p>
          {{
            currentLanguage === 'fr'
              ? 'Essayez de modifier vos filtres de recherche ou revenez plus tard.'
              : 'Try changing your search filters or check again later.'
          }}
        </p>

        <button
          type="button"
          @click="clearFilters"
        >
          {{ $t('land.resetFilters') }}
        </button>
      </div>

      <section
        v-else
        class="results-section"
      >

        <div class="results-header">

          <div>
            <h2>
              {{
                currentLanguage === 'fr'
                  ? 'Terrains disponibles'
                  : 'Available Land'
              }}
            </h2>

            <span>
              {{ filteredProperties.length }}

              {{
                currentLanguage === 'fr'
                  ? filteredProperties.length === 1
                    ? 'bien trouvé'
                    : 'biens trouvés'
                  : filteredProperties.length === 1
                    ? 'property found'
                    : 'properties found'
              }}
            </span>
          </div>

        </div>

        <div class="property-grid">

          <article
            v-for="property in filteredProperties"
            :key="property.id"
            class="property-card"
          >

            <div class="property-image">

              <img
                v-if="
                  property.photo_urls &&
                  property.photo_urls.length
                "
                :src="property.photo_urls[0]"
                :alt="`${formatPropertyType(property.property_type)} in ${property.city}`"
              />

              <div
                v-else
                class="no-image"
              >
                {{
                  currentLanguage === 'fr'
                    ? 'Aucune photo'
                    : 'No Photo'
                }}
              </div>

              <div class="image-badges">

                <span class="listing-badge">
                  {{ formatListingType(property.listing_type) }}
                </span>

                <span
                  v-if="property.owner_verified"
                  class="verified-badge"
                >
                  <span class="check-icon">
                    ✓
                  </span>

                  {{
                    currentLanguage === 'fr'
                      ? 'Propriétaire vérifié'
                      : 'Verified Owner'
                  }}
                </span>

              </div>

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

              <div class="property-top">

                <span class="property-type">
                  {{ formatPropertyType(property.property_type) }}
                </span>

              </div>

              <h3>
                {{ property.neighborhood }},
                {{ property.city }}
              </h3>

              <p class="price">
                {{ formatPrice(property.price) }}
              </p>

              <p class="description">
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
                    : 'View Property'
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
  locale
} = useI18n()

const currentLanguage = computed(() => locale.value)

const properties = ref([])
const loading = ref(false)
const error = ref('')

const savedPropertyIds = ref(new Set())

const filters = reactive({
  city: '',
  neighborhood: '',
  landType: '',
  listingType: '',
  minPrice: '',
  maxPrice: '',
  query: '',
  sort: 'newest',
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
  const type = normalizeText(value)

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

function normalizeLandType(value) {
  const type = normalizeText(value)

  if (
    type.includes('residential') ||
    type === 'residence' ||
    type === 'residential land' ||
    type === 'residentiel' ||
    type === 'résidentiel'
  ) {
    return 'residential'
  }

  if (
    type.includes('commercial') ||
    type.includes('commerciale')
  ) {
    return 'commercial'
  }

  if (
    type.includes('agricultural') ||
    type.includes('agriculture') ||
    type.includes('agricole')
  ) {
    return 'agricultural'
  }

  if (
    type.includes('industrial') ||
    type.includes('industriel')
  ) {
    return 'industrial'
  }

  if (
    type.includes('mixed') ||
    type.includes('mixte')
  ) {
    return 'mixed'
  }

  if (
    type === 'land' ||
    type === 'terrain' ||
    type === 'plot'
  ) {
    return 'land'
  }

  if (
    type === 'other' ||
    type === 'autre'
  ) {
    return 'other'
  }

  return type
}

function isLandProperty(property) {
  const type =
    normalizeLandType(property.property_type)

  return [
    'land',
    'residential',
    'commercial',
    'agricultural',
    'industrial',
    'mixed',
    'other'
  ].includes(type)
}

function formatPropertyType(value) {
  const type = normalizeLandType(value)

  const labels = {
    residential:
      currentLanguage.value === 'fr'
        ? 'Résidentiel'
        : 'Residential',

    commercial:
      currentLanguage.value === 'fr'
        ? 'Commercial'
        : 'Commercial',

    agricultural:
      currentLanguage.value === 'fr'
        ? 'Agricole'
        : 'Agricultural',

    industrial:
      currentLanguage.value === 'fr'
        ? 'Industriel'
        : 'Industrial',

    mixed:
      currentLanguage.value === 'fr'
        ? 'Usage mixte'
        : 'Mixed Use',

    land:
      currentLanguage.value === 'fr'
        ? 'Terrain'
        : 'Land',

    other:
      currentLanguage.value === 'fr'
        ? 'Autre'
        : 'Other'
  }

  return labels[type] || value || (
    currentLanguage.value === 'fr'
      ? 'Terrain'
      : 'Land'
  )
}

function formatListingType(value) {
  const type =
    normalizeListingType(value)

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

  return formatPropertyType(value)
}

function formatPrice(value) {
  const price = Number(value)

  if (Number.isNaN(price)) {
    return currentLanguage.value === 'fr'
      ? 'Prix sur demande'
      : 'Price on request'
  }

  return `${new Intl.NumberFormat(
    currentLanguage.value === 'fr'
      ? 'fr-FR'
      : 'en-US'
  ).format(price)} FCFA`
}

function shortenDescription(description) {
  if (!description) {
    return currentLanguage.value === 'fr'
      ? 'Aucune description disponible.'
      : 'No description available.'
  }

  const text = String(description)

  if (text.length <= 120) {
    return text
  }

  return `${text.substring(0, 120)}...`
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

  if (filters.landType) {
    result.push({
      key: 'landType',
      label: formatPropertyType(filters.landType)
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

  if (filters.query) {
    result.push({
      key: 'query',
      label:
        currentLanguage.value === 'fr'
          ? `Recherche : ${filters.query}`
          : `Search: ${filters.query}`
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
  let results = properties.value.filter(
    property =>
      isLandProperty(property)
  )

  const city =
    normalizeText(filters.city)

  const neighborhood =
    normalizeText(filters.neighborhood)

  const query =
    normalizeText(filters.query)

  if (city) {
    results = results.filter(property =>
      normalizeText(property.city)
        .includes(city)
    )
  }

  if (neighborhood) {
    results = results.filter(property =>
      normalizeText(property.neighborhood)
        .includes(neighborhood)
    )
  }

  if (filters.landType) {
    const selected =
      normalizeLandType(filters.landType)

    results = results.filter(property =>
      normalizeLandType(
        property.property_type
      ) === selected
    )
  }

  if (filters.listingType) {
    const selected =
      normalizeListingType(
        filters.listingType
      )

    results = results.filter(property =>
      normalizeListingType(
        property.listing_type
      ) === selected
    )
  }

  if (filters.minPrice !== '') {
    results = results.filter(property =>
      Number(property.price || 0) >=
      Number(filters.minPrice)
    )
  }

  if (filters.maxPrice !== '') {
    results = results.filter(property =>
      Number(property.price || 0) <=
      Number(filters.maxPrice)
    )
  }

  if (query) {
    results = results.filter(property => {

      const searchableText = [
        property.city,
        property.neighborhood,
        property.property_type,
        property.listing_type,
        property.description
      ]
        .filter(Boolean)
        .join(' ')

      return normalizeText(
        searchableText
      ).includes(query)

    })
  }

  if (filters.verifiedOnly) {
    results = results.filter(property =>
      property.owner_verified === true
    )
  }

  if (filters.sort === 'price-low') {
    results.sort(
      (a, b) =>
        Number(a.price || 0) -
        Number(b.price || 0)
    )
  }

  if (filters.sort === 'price-high') {
    results.sort(
      (a, b) =>
        Number(b.price || 0) -
        Number(a.price || 0)
    )
  }

  if (filters.sort === 'newest') {
    results.sort(
      (a, b) =>
        new Date(b.created_at).getTime() -
        new Date(a.created_at).getTime()
    )
  }

  return results
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
    error: fetchError
  } = await supabase
    .from('saved_properties')
    .select('property_id')
    .eq('user_id', userData.user.id)

  if (fetchError) {
    console.error(fetchError)
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
      error: deleteError
    } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', userId)
      .eq('property_id', propertyId)

    if (deleteError) {
      console.error(deleteError)
      return
    }

    const updated =
      new Set(savedPropertyIds.value)

    updated.delete(propertyId)

    savedPropertyIds.value = updated

    return
  }

  const {
    error: insertError
  } = await supabase
    .from('saved_properties')
    .insert({
      user_id: userId,
      property_id: propertyId
    })

  if (insertError) {

    if (insertError.code === '23505') {
      await loadSavedProperties()
      return
    }

    console.error(insertError)
    return
  }

  const updated =
    new Set(savedPropertyIds.value)

  updated.add(propertyId)

  savedPropertyIds.value = updated
}

function loadQueryFilters() {
  filters.city =
    String(route.query.city || '')

  filters.neighborhood =
    String(route.query.neighborhood || '')

  filters.landType =
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

  filters.query =
    String(route.query.search || '')

  filters.verifiedOnly =
    String(route.query.verified || '')
      .toLowerCase() === 'true'

  if (route.query.price) {

    const price =
      String(route.query.price)

    if (
      price === '0-50000' &&
      filters.minPrice === '' &&
      filters.maxPrice === ''
    ) {
      filters.maxPrice = 50000
    }

    if (
      price === '50000-100000' &&
      filters.minPrice === '' &&
      filters.maxPrice === ''
    ) {
      filters.minPrice = 50000
      filters.maxPrice = 100000
    }

    if (
      price === '100000-200000' &&
      filters.minPrice === '' &&
      filters.maxPrice === ''
    ) {
      filters.minPrice = 100000
      filters.maxPrice = 200000
    }

    if (
      price === '200000+' &&
      filters.minPrice === '' &&
      filters.maxPrice === ''
    ) {
      filters.minPrice = 200000
    }
  }
}

function searchLand() {
  const query = {}

  if (filters.city.trim()) {
    query.city = filters.city.trim()
  }

  if (filters.neighborhood.trim()) {
    query.neighborhood =
      filters.neighborhood.trim()
  }

  if (filters.landType) {
    query.type = filters.landType
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

  if (filters.query.trim()) {
    query.search =
      filters.query.trim()
  }

  if (filters.verifiedOnly) {
    query.verified = 'true'
  }

  router.replace({
    path: '/land',
    query
  })
}

function clearFilters() {
  filters.city = ''
  filters.neighborhood = ''
  filters.landType = ''
  filters.listingType = ''
  filters.minPrice = ''
  filters.maxPrice = ''
  filters.query = ''
  filters.sort = 'newest'
  filters.verifiedOnly = false

  router.replace({
    path: '/land'
  })
}

function removeFilter(key) {
  if (key === 'city') {
    filters.city = ''
  }

  if (key === 'neighborhood') {
    filters.neighborhood = ''
  }

  if (key === 'landType') {
    filters.landType = ''
  }

  if (key === 'listingType') {
    filters.listingType = ''
  }

  if (key === 'minPrice') {
    filters.minPrice = ''
  }

  if (key === 'maxPrice') {
    filters.maxPrice = ''
  }

  if (key === 'query') {
    filters.query = ''
  }

  if (key === 'verifiedOnly') {
    filters.verifiedOnly = false
  }

  searchLand()
}

function viewProperty(id) {
  router.push(`/property/${id}`)
}

async function loadLand() {
  loading.value = true
  error.value = ''

  try {

    const {
      data,
      error: fetchError
    } = await supabase
      .from('properties')
      .select('*')
      .eq('status', 'approved')
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
      (data || []).filter(
        property =>
          isLandProperty(property)
      )

  } catch (err) {

    console.error(err)

    error.value =
      currentLanguage.value === 'fr'
        ? 'Impossible de charger les terrains disponibles.'
        : (
            err.message ||
            'Unable to load available land.'
          )

  } finally {
    loading.value = false
  }
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
    loadLand(),
    loadSavedProperties()
  ])
})
</script>

<style scoped>

.land-page {
  min-height: 100vh;
  background: #f6f7f9;
  color: #18202a;
  padding-bottom: 60px;
}

.page-hero {
  padding: 64px 24px 48px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.page-hero > div {
  max-width: 1200px;
  margin: 0 auto;
}

.eyebrow {
  margin: 0 0 10px;
  color: #2563eb;
  font-size: 14px;
  font-weight: 700;
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

.content {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  padding: 35px 20px;
  box-sizing: border-box;
}

.filters-card {
  background: #ffffff;
  border: 1px solid #e4e7ec;
  border-radius: 18px;
  padding: 25px;
  box-shadow: 0 8px 25px rgba(16, 24, 40, 0.05);
}

.filters-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  gap: 20px;
  margin-bottom: 24px;
}

.filters-header h2 {
  margin: 0;
  font-size: 22px;
}

.filters-header p {
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

.filter-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
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
  min-height: 44px;
  padding: 10px 12px;
  box-sizing: border-box;
  border: 1px solid #d0d5dd;
  border-radius: 10px;
  background: #ffffff;
  color: #18202a;
  font-size: 14px;
  outline: none;
}

.filter-group input:focus,
.filter-group select:focus {
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
  display: flex;
  justify-content: flex-end;
  margin-top: 22px;
}

.search-button {
  padding: 12px 20px;
  border: 0;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
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

.results-header h2 {
  margin: 0;
  font-size: 24px;
}

.results-header span {
  display: block;
  margin-top: 6px;
  color: #667085;
  font-size: 14px;
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

.property-image {
  position: relative;
  height: 220px;
  overflow: hidden;
  background: #eef1f4;
}

.property-image img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #667085;
  font-size: 14px;
}

.image-badges {
  position: absolute;
  top: 12px;
  left: 12px;
  right: 12px;
  display: flex;
  flex-wrap: wrap;
  gap: 7px;
  padding-right: 85px;
}

.listing-badge,
.verified-badge {
  padding: 6px 9px;
  border-radius: 999px;
  background: #ffffff;
  font-size: 11px;
  font-weight: 800;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.10);
}

.listing-badge {
  color: #18202a;
}

.verified-badge {
  display: inline-flex;
  align-items: center;
  gap: 5px;
  color: #027a48;
}

.check-icon {
  font-size: 12px;
  font-weight: 900;
}

.save-button {
  position: absolute;
  top: 12px;
  right: 12px;
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

.property-top {
  margin-bottom: 10px;
}

.property-type {
  color: #2563eb;
  font-size: 13px;
  font-weight: 700;
}

.property-content h3 {
  margin: 0;
  color: #18202a;
  font-size: 19px;
}

.price {
  margin: 10px 0;
  color: #2563eb;
  font-size: 19px;
  font-weight: 800;
}

.description {
  min-height: 42px;
  margin: 0 0 18px;
  color: #667085;
  font-size: 13px;
  line-height: 1.5;
}

.view-button {
  width: 100%;
  padding: 11px;
  border: 0;
  border-radius: 10px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.state-message {
  padding: 50px 20px;
  text-align: center;
  color: #667085;
}

.state-message h2 {
  margin: 0 0 8px;
  color: #18202a;
}

.state-message p {
  margin: 0;
}

.state-message button {
  margin-top: 18px;
  padding: 10px 18px;
  border: 0;
  border-radius: 9px;
  background: #2563eb;
  color: #ffffff;
  font-weight: 700;
  cursor: pointer;
}

.error-message {
  color: #b42318;
}

@media (max-width: 950px) {
  .filter-grid {
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

  .content {
    padding: 25px 16px 50px;
  }

  .filters-card {
    padding: 18px;
  }

  .filters-header {
    flex-direction: column;
  }

  .filter-grid {
    grid-template-columns: 1fr;
  }

  .filter-actions {
    justify-content: stretch;
  }

  .search-button {
    width: 100%;
  }

  .results-header {
    align-items: flex-start;
  }

  .property-grid {
    grid-template-columns: 1fr;
  }

  .property-image {
    height: 230px;
  }
}

</style>