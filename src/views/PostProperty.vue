<template>
  <div class="post-page">

    <header class="page-header">

      <div class="language-switcher">
        <button
          type="button"
          :class="{ active: currentLanguage === 'en' }"
          @click="changeLanguage('en')"
        >
          EN
        </button>

        <button
          type="button"
          :class="{ active: currentLanguage === 'fr' }"
          @click="changeLanguage('fr')"
        >
          FR
        </button>
      </div>

      <h1>
        {{ isEditMode
          ? (currentLanguage === 'fr'
              ? 'Modifier la propriété'
              : 'Edit Property')
          : (currentLanguage === 'fr'
              ? 'Publier une propriété'
              : 'Post a Property')
        }}
      </h1>

      <p>
        {{ isEditMode
          ? (currentLanguage === 'fr'
              ? 'Mettez à jour les informations et la localisation de votre propriété.'
              : 'Update your property information and location.')
          : (currentLanguage === 'fr'
              ? 'Publiez votre propriété et connectez-vous avec des clients potentiels.'
              : 'List your property and connect with potential clients.')
        }}
      </p>

    </header>

    <main class="form-container">

      <p
        v-if="checkingAccount"
        class="message"
      >
        {{ currentLanguage === 'fr'
          ? 'Vérification de votre compte...'
          : 'Checking your account...'
        }}
      </p>

      <div
        v-else-if="accountError"
        class="message error"
      >
        {{ accountError }}
      </div>

      <form
        v-else-if="canPost"
        class="property-form"
        @submit.prevent="submitProperty"
      >

        <h2>
          {{ currentLanguage === 'fr'
            ? 'Informations sur la propriété'
            : 'Property Information'
          }}
        </h2>

        <div class="form-group">

          <label for="category">
            {{ currentLanguage === 'fr'
              ? 'Catégorie'
              : 'Category'
            }}
          </label>

          <select
            id="category"
            v-model="form.category"
            required
          >

            <option value="housing">
              {{ currentLanguage === 'fr'
                ? 'Logement'
                : 'Housing'
              }}
            </option>

            <option value="land">
              {{ currentLanguage === 'fr'
                ? 'Terrain'
                : 'Land'
              }}
            </option>

          </select>

        </div>

        <div class="form-group">

          <label for="propertyType">
            {{ currentLanguage === 'fr'
              ? 'Type de propriété'
              : 'Property Type'
            }}
          </label>

          <select
            id="propertyType"
            v-model="form.propertyType"
            required
          >

            <option
              v-for="type in propertyTypes"
              :key="type.value"
              :value="type.value"
            >
              {{ type.label }}
            </option>

          </select>

        </div>

        <div class="form-group">

          <label for="listingType">
            {{ currentLanguage === 'fr'
              ? 'Type d’annonce'
              : 'Listing Type'
            }}
          </label>

          <select
            id="listingType"
            v-model="form.listingType"
            required
          >

            <option value="rent">
              {{ currentLanguage === 'fr'
                ? 'À louer'
                : 'For Rent'
              }}
            </option>

            <option value="sale">
              {{ currentLanguage === 'fr'
                ? 'À vendre'
                : 'For Sale'
              }}
            </option>

          </select>

        </div>

        <div
          v-if="form.category === 'housing'"
          class="units-section"
        >

          <div class="section-heading">

            <h2>
              {{ currentLanguage === 'fr'
                ? 'Disponibilité des unités'
                : 'Unit Availability'
              }}
            </h2>

            <p>
              {{ currentLanguage === 'fr'
                ? 'Indiquez le nombre total de chambres, appartements ou studios et combien sont actuellement disponibles.'
                : 'Specify the total number of rooms, apartments or studios and how many are currently available.'
              }}
            </p>

          </div>

          <div class="form-row">

            <div class="form-group">

              <label for="totalUnits">
                {{ currentLanguage === 'fr'
                  ? 'Nombre total d’unités'
                  : 'Total Units'
                }}
              </label>

              <input
                id="totalUnits"
                v-model.number="form.totalUnits"
                type="number"
                min="1"
                step="1"
                required
              />

              <small>
                {{ currentLanguage === 'fr'
                  ? 'Exemple : 20 appartements ou 20 studios.'
                  : 'Example: 20 apartments or 20 studios.'
                }}
              </small>

            </div>

            <div class="form-group">

              <label for="availableUnits">
                {{ currentLanguage === 'fr'
                  ? 'Unités disponibles'
                  : 'Available Units'
                }}
              </label>

              <input
                id="availableUnits"
                v-model.number="form.availableUnits"
                type="number"
                min="0"
                :max="form.totalUnits"
                step="1"
                required
              />

              <small>
                {{ currentLanguage === 'fr'
                  ? 'Le nombre disponible ne peut pas dépasser le nombre total.'
                  : 'Available units cannot be greater than total units.'
                }}
              </small>

            </div>

          </div>

          <div class="availability-summary">
            <strong>
              {{ currentLanguage === 'fr'
                ? `${Number(form.availableUnits || 0)} unité(s) disponible(s) sur ${Number(form.totalUnits || 0)}`
                : `${Number(form.availableUnits || 0)} of ${Number(form.totalUnits || 0)} units available`
              }}
            </strong>

            <span>
              {{ currentLanguage === 'fr'
                ? `${Math.max(0, Number(form.totalUnits || 0) - Number(form.availableUnits || 0))} unité(s) occupée(s)`
                : `${Math.max(0, Number(form.totalUnits || 0) - Number(form.availableUnits || 0))} occupied unit(s)`
              }}
            </span>
          </div>

        </div>

        <div class="form-row">

          <div class="form-group">

            <label for="city">
              {{ currentLanguage === 'fr'
                ? 'Ville'
                : 'City'
              }}
            </label>

            <input
              id="city"
              v-model="form.city"
              type="text"
              :placeholder="currentLanguage === 'fr'
                ? 'ex. Yaoundé'
                : 'e.g. Yaoundé'"
              required
            />

          </div>

          <div class="form-group">

            <label for="neighborhood">
              {{ currentLanguage === 'fr'
                ? 'Quartier'
                : 'Neighborhood'
              }}
            </label>

            <input
              id="neighborhood"
              v-model="form.neighborhood"
              type="text"
              :placeholder="currentLanguage === 'fr'
                ? 'ex. Odza'
                : 'e.g. Odza'"
              required
            />

          </div>

        </div>

        <div class="form-group">

          <label for="price">
            {{ currentLanguage === 'fr'
              ? 'Prix'
              : 'Price'
            }}
          </label>

          <input
            id="price"
            v-model="form.price"
            type="number"
            min="0"
            :placeholder="currentLanguage === 'fr'
              ? 'Entrez le prix en FCFA'
              : 'Enter price in XAF'"
            required
          />

          <small>
            {{ currentLanguage === 'fr'
              ? 'Entrez le montant en FCFA.'
              : 'Enter the amount in XAF.'
            }}
          </small>

        </div>

        <div
          v-if="form.category === 'housing'"
          class="form-row"
        >

          <div class="form-group">

            <label for="bedrooms">
              {{ currentLanguage === 'fr'
                ? 'Chambres'
                : 'Bedrooms'
              }}
            </label>

            <input
              id="bedrooms"
              v-model="form.bedrooms"
              type="number"
              min="0"
              placeholder="0"
            />

          </div>

          <div class="form-group">

            <label for="bathrooms">
              {{ currentLanguage === 'fr'
                ? 'Salles de bain'
                : 'Bathrooms'
              }}
            </label>

            <input
              id="bathrooms"
              v-model="form.bathrooms"
              type="number"
              min="0"
              placeholder="0"
            />

          </div>

        </div>

        <div class="form-group">

          <label for="description">
            {{ currentLanguage === 'fr'
              ? 'Description'
              : 'Description'
            }}
          </label>

          <textarea
            id="description"
            v-model="form.description"
            rows="7"
            :placeholder="currentLanguage === 'fr'
              ? 'Décrivez la propriété, les équipements, l’accessibilité, les lieux à proximité et toute autre information importante.'
              : 'Describe the property, facilities, accessibility, nearby places and other important information.'"
            required
          ></textarea>

        </div>

        <section class="location-section">

          <div class="section-heading">

            <h2>
              {{ currentLanguage === 'fr'
                ? 'Localisation de la propriété'
                : 'Property Location'
              }}
            </h2>

            <p>
              {{ currentLanguage === 'fr'
                ? 'Cliquez sur la carte pour placer la propriété. Vous pouvez également déplacer le marqueur.'
                : 'Click on the map to place the property location. You can also drag the marker.'
              }}
            </p>

          </div>

          <div
            ref="mapElement"
            class="property-map"
          ></div>

          <div class="location-info">

            <div class="coordinate-box">

              <span>
                {{ currentLanguage === 'fr'
                  ? 'Latitude'
                  : 'Latitude'
                }}
              </span>

              <strong>
                {{ latitude !== null
                  ? Number(latitude).toFixed(6)
                  : (currentLanguage === 'fr'
                      ? 'Non sélectionnée'
                      : 'Not selected')
                }}
              </strong>

            </div>

            <div class="coordinate-box">

              <span>
                {{ currentLanguage === 'fr'
                  ? 'Longitude'
                  : 'Longitude'
                }}
              </span>

              <strong>
                {{ longitude !== null
                  ? Number(longitude).toFixed(6)
                  : (currentLanguage === 'fr'
                      ? 'Non sélectionnée'
                      : 'Not selected')
                }}
              </strong>

            </div>

          </div>

          <p class="map-help">
            {{ currentLanguage === 'fr'
              ? 'Sélectionnez l’emplacement exact de la propriété sur la carte.'
              : 'Select the exact location of the property on the map.'
            }}
          </p>

        </section>

        <section class="photos-section">

          <div class="section-heading">

            <h2>
              {{ currentLanguage === 'fr'
                ? 'Photos de la propriété'
                : 'Property Photos'
              }}
            </h2>

            <p>
              {{ currentLanguage === 'fr'
                ? 'Téléchargez jusqu’à 8 photos. Au moins 1 photo est obligatoire.'
                : 'Upload up to 8 photos. At least 1 photo is required.'
              }}
            </p>

          </div>

          <div
            v-if="existingPhotos.length > 0"
            class="existing-photos"
          >

            <h3>
              {{ currentLanguage === 'fr'
                ? 'Photos actuelles'
                : 'Current Photos'
              }}
            </h3>

            <div class="photo-grid">

              <div
                v-for="(photo, index) in existingPhotos"
                :key="photo"
                class="photo-item"
              >

                <img
                  :src="photo"
                  :alt="currentLanguage === 'fr'
                    ? 'Photo de la propriété'
                    : 'Property photo'"
                />

                <button
                  type="button"
                  class="remove-photo"
                  @click="removeExistingPhoto(index)"
                >
                  {{ currentLanguage === 'fr'
                    ? 'Supprimer'
                    : 'Remove'
                  }}
                </button>

              </div>

            </div>

          </div>

          <div class="form-group">

            <label for="photos">
              {{ currentLanguage === 'fr'
                ? 'Ajouter des photos'
                : 'Add Photos'
              }}
            </label>

            <input
              id="photos"
              ref="photoInput"
              type="file"
              accept="image/*"
              multiple
              :disabled="remainingPhotoSlots === 0"
              @change="handlePhotoSelection"
            />

            <small>
              {{ currentLanguage === 'fr'
                ? `Vous pouvez ajouter encore ${remainingPhotoSlots} photo${remainingPhotoSlots === 1 ? '' : 's'}.`
                : `You can select up to ${remainingPhotoSlots} more photo${remainingPhotoSlots === 1 ? '' : 's'}.`
              }}
            </small>

          </div>

          <div
            v-if="newPhotoPreviews.length > 0"
            class="new-photos"
          >

            <h3>
              {{ currentLanguage === 'fr'
                ? 'Nouvelles photos'
                : 'New Photos'
              }}
            </h3>

            <div class="photo-grid">

              <div
                v-for="(photo, index) in newPhotoPreviews"
                :key="photo.url"
                class="photo-item"
              >

                <img
                  :src="photo.url"
                  :alt="currentLanguage === 'fr'
                    ? 'Nouvelle photo de la propriété'
                    : 'New property photo'"
                />

                <button
                  type="button"
                  class="remove-photo"
                  @click="removeNewPhoto(index)"
                >
                  {{ currentLanguage === 'fr'
                    ? 'Supprimer'
                    : 'Remove'
                  }}
                </button>

              </div>

            </div>

          </div>

        </section>

        <div
          v-if="formError"
          class="form-error"
        >
          {{ formError }}
        </div>

        <div
          v-if="successMessage"
          class="form-success"
        >
          {{ successMessage }}
        </div>

        <button
          type="submit"
          class="submit-button"
          :disabled="saving"
        >
          {{ saving
            ? (currentLanguage === 'fr'
                ? 'Enregistrement...'
                : 'Saving...')
            : isEditMode
              ? (currentLanguage === 'fr'
                  ? 'Mettre à jour la propriété'
                  : 'Update Property')
              : (currentLanguage === 'fr'
                  ? 'Soumettre la propriété'
                  : 'Submit Property')
          }}
        </button>

      </form>

    </main>

  </div>
</template>

<script setup>
import {
  ref,
  computed,
  onMounted,
  onBeforeUnmount,
  nextTick
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  useI18n
} from 'vue-i18n'

import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

import { supabase } from '../supabase'

const route = useRoute()
const router = useRouter()

const {
  locale
} = useI18n()

const currentLanguage = computed(() => {
  return locale.value
})

function changeLanguage(language) {
  locale.value = language

  localStorage.setItem(
    'eaz-language',
    language
  )
}

const checkingAccount = ref(true)
const accountError = ref('')

const userId = ref('')
const accountType = ref('')

const saving = ref(false)
const formError = ref('')
const successMessage = ref('')

const photoInput = ref(null)

const mapElement = ref(null)
const map = ref(null)
const marker = ref(null)

const latitude = ref(null)
const longitude = ref(null)

const existingPhotos = ref([])
const newPhotos = ref([])
const newPhotoPreviews = ref([])

const form = ref({
  category: 'housing',
  propertyType: 'Apartment',
  listingType: 'rent',
  city: '',
  neighborhood: '',
  price: '',
  bedrooms: 0,
  bathrooms: 0,
  totalUnits: 1,
  availableUnits: 1,
  description: ''
})

const editPropertyId = computed(() => {

  const value =
    route.query.edit

  if (Array.isArray(value)) {
    return value[0] || ''
  }

  return value || ''

})

const isEditMode = computed(() => {
  return Boolean(
    editPropertyId.value
  )
})

const canPost = computed(() => {

  return (
    accountType.value === 'landlord' ||
    accountType.value === 'agent'
  )

})

const propertyTypes = computed(() => {

  if (
    form.value.category === 'land'
  ) {

    return [

      {
        value: 'Residential Land',
        label: currentLanguage.value === 'fr'
          ? 'Terrain résidentiel'
          : 'Residential Land'
      },

      {
        value: 'Commercial Land',
        label: currentLanguage.value === 'fr'
          ? 'Terrain commercial'
          : 'Commercial Land'
      },

      {
        value: 'Agricultural Land',
        label: currentLanguage.value === 'fr'
          ? 'Terrain agricole'
          : 'Agricultural Land'
      },

      {
        value: 'Mixed-Use Land',
        label: currentLanguage.value === 'fr'
          ? 'Terrain à usage mixte'
          : 'Mixed-Use Land'
      }

    ]

  }

  return [

    {
      value: 'Apartment',
      label: currentLanguage.value === 'fr'
        ? 'Appartement'
        : 'Apartment'
    },

    {
      value: 'House',
      label: currentLanguage.value === 'fr'
        ? 'Maison'
        : 'House'
    },

    {
      value: 'Room',
      label: currentLanguage.value === 'fr'
        ? 'Chambre'
        : 'Room'
    },

    {
      value: 'Studio',
      label: currentLanguage.value === 'fr'
        ? 'Studio'
        : 'Studio'
    },

    {
      value: 'Duplex',
      label: currentLanguage.value === 'fr'
        ? 'Duplex'
        : 'Duplex'
    }

  ]

})

const remainingPhotoSlots = computed(() => {

  return Math.max(
    0,
    8 -
      existingPhotos.value.length -
      newPhotos.value.length
  )

})

function getMarkerIcon() {

  return L.divIcon({

    className:
      'eaz-map-marker-wrapper',

    html: `
      <div class="eaz-map-marker">
        <div class="eaz-map-marker-dot"></div>
      </div>
    `,

    iconSize: [
      30,
      40
    ],

    iconAnchor: [
      15,
      40
    ]

  })

}

function createMarker(
  lat,
  lng
) {

  if (!map.value) {
    return
  }

  if (marker.value) {
    marker.value.remove()
  }

  marker.value =
    L.marker(
      [
        lat,
        lng
      ],
      {
        draggable: true,
        icon: getMarkerIcon()
      }
    ).addTo(
      map.value
    )

  marker.value.on(
    'dragend',
    () => {

      const position =
        marker.value.getLatLng()

      latitude.value =
        Number(
          position.lat
        )

      longitude.value =
        Number(
          position.lng
        )

    }
  )

}

function setLocation(
  lat,
  lng
) {

  latitude.value =
    Number(lat)

  longitude.value =
    Number(lng)

  createMarker(
    latitude.value,
    longitude.value
  )

}

function createMap() {

  if (!mapElement.value) {
    return
  }

  if (map.value) {
    return
  }

  const defaultLatitude =
    latitude.value !== null
      ? Number(latitude.value)
      : 3.8480

  const defaultLongitude =
    longitude.value !== null
      ? Number(longitude.value)
      : 11.5021

  map.value =
    L.map(
      mapElement.value,
      {
        center: [
          defaultLatitude,
          defaultLongitude
        ],
        zoom:
          latitude.value !== null
            ? 15
            : 12
      }
    )

  L.tileLayer(
    'https://tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution:
        '&copy; OpenStreetMap contributors',

      maxZoom: 19
    }
  ).addTo(
    map.value
  )

  map.value.on(
    'click',
    event => {

      setLocation(
        event.latlng.lat,
        event.latlng.lng
      )

    }
  )

  if (
    latitude.value !== null &&
    longitude.value !== null
  ) {

    createMarker(
      latitude.value,
      longitude.value
    )

  }

  setTimeout(
    () => {

      if (map.value) {
        map.value.invalidateSize()
      }

    },
    100
  )

}

function handlePhotoSelection(
  event
) {

  const files =
    Array.from(
      event.target.files || []
    )

  const availableSlots =
    remainingPhotoSlots.value

  if (availableSlots <= 0) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Vous avez déjà atteint la limite de 8 photos.'
        : 'You have already reached the maximum of 8 photos.'

    event.target.value = ''

    return
  }

  if (
    files.length >
    availableSlots
  ) {

    formError.value =
      currentLanguage.value === 'fr'
        ? `Vous pouvez télécharger un maximum de 8 photos. Vous pouvez encore ajouter ${availableSlots} photo${availableSlots === 1 ? '' : 's'}.`
        : `You can upload a maximum of 8 photos. You can add ${availableSlots} more photo${availableSlots === 1 ? '' : 's'}.`

    event.target.value = ''

    return
  }

  formError.value = ''

  for (
    const file
    of files
  ) {

    if (
      !file.type.startsWith(
        'image/'
      )
    ) {

      formError.value =
        currentLanguage.value === 'fr'
          ? 'Seuls les fichiers image sont autorisés.'
          : 'Only image files are allowed.'

      continue
    }

    if (
      existingPhotos.value.length +
      newPhotos.value.length >=
      8
    ) {

      formError.value =
        currentLanguage.value === 'fr'
          ? 'Vous avez atteint la limite de 8 photos.'
          : 'You have reached the maximum of 8 photos.'

      break
    }

    newPhotos.value.push(
      file
    )

    const previewUrl =
      URL.createObjectURL(
        file
      )

    newPhotoPreviews.value.push({
      file,
      url: previewUrl
    })

  }

  if (photoInput.value) {
    photoInput.value.value = ''
  }

}

function removeNewPhoto(
  index
) {

  const preview =
    newPhotoPreviews.value[
      index
    ]

  if (preview?.url) {

    URL.revokeObjectURL(
      preview.url
    )

  }

  newPhotoPreviews.value.splice(
    index,
    1
  )

  newPhotos.value.splice(
    index,
    1
  )

}

function removeExistingPhoto(
  index
) {

  existingPhotos.value.splice(
    index,
    1
  )

}

function getFileExtension(
  file
) {

  const name =
    file?.name || ''

  const parts =
    name.split('.')

  if (
    parts.length >
    1
  ) {

    return parts
      .pop()
      .toLowerCase()

  }

  if (
    file?.type ===
    'image/png'
  ) {

    return 'png'

  }

  if (
    file?.type ===
    'image/webp'
  ) {

    return 'webp'

  }

  return 'jpg'

}

function getStoragePathFromUrl(
  url
) {

  if (!url) {
    return null
  }

  const marker =
    '/storage/v1/object/public/property-images/'

  const index =
    url.indexOf(
      marker
    )

  if (index === -1) {
    return null
  }

  return decodeURIComponent(
    url.substring(
      index +
      marker.length
    )
  )

}

async function deleteStoragePhotos(
  urls
) {

  const paths =
    urls
      .map(
        url =>
          getStoragePathFromUrl(
            url
          )
      )
      .filter(Boolean)

  if (
    paths.length === 0
  ) {

    return

  }

  const {
    error
  } =
    await supabase.storage
      .from(
        'property-images'
      )
      .remove(
        paths
      )

  if (error) {

    console.error(
      'Unable to delete old photos:',
      error
    )

  }

}

async function uploadPhotos() {

  const uploadedUrls = []

  for (
    const file
    of newPhotos.value
  ) {

    const extension =
      getFileExtension(
        file
      )

    const filePath =
      `${userId.value}/${crypto.randomUUID()}.${extension}`

    const {
      error: uploadError
    } =
      await supabase.storage
        .from(
          'property-images'
        )
        .upload(
          filePath,
          file,
          {
            upsert: false,
            contentType:
              file.type
          }
        )

    if (uploadError) {
      throw uploadError
    }

    const {
      data
    } =
      supabase.storage
        .from(
          'property-images'
        )
        .getPublicUrl(
          filePath
        )

    if (
      !data ||
      !data.publicUrl
    ) {

      throw new Error(
        currentLanguage.value === 'fr'
          ? 'Impossible de créer l’URL de la photo.'
          : 'Unable to create the photo URL.'
      )

    }

    uploadedUrls.push(
      data.publicUrl
    )

  }

  return uploadedUrls

}

async function loadCurrentProperty() {

  if (
    !isEditMode.value
  ) {

    return

  }

  const propertyId =
    editPropertyId.value

  if (!propertyId) {
    return
  }

  const {
    data,
    error
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
        total_units,
        available_units,
        description,
        photo_urls,
        latitude,
        longitude,
        status,
        contact_phone
      `)
      .eq(
        'id',
        propertyId
      )
      .eq(
        'owner_id',
        userId.value
      )
      .single()

  if (error) {
    throw error
  }

  if (!data) {

    throw new Error(
      currentLanguage.value === 'fr'
        ? 'Propriété introuvable.'
        : 'Property not found.'
    )

  }

  let category =
    'housing'

  const landTypes = [
    'Residential Land',
    'Commercial Land',
    'Agricultural Land',
    'Mixed-Use Land',
    'Land'
  ]

  if (
    landTypes.includes(
      data.property_type
    )
  ) {

    category =
      'land'

  }

  form.value = {

    category,

    propertyType:
      data.property_type ||
      (
        category === 'land'
          ? 'Residential Land'
          : 'Apartment'
      ),

    listingType:
      data.listing_type ||
      'rent',

    city:
      data.city ||
      '',

    neighborhood:
      data.neighborhood ||
      '',

    price:
      data.price ??
      '',

    bedrooms:
      data.bedrooms ??
      0,

    bathrooms:
      data.bathrooms ??
      0,

    totalUnits:
      data.total_units ??
      1,

    availableUnits:
      data.available_units ??
      1,

    description:
      data.description ||
      ''

  }

  existingPhotos.value =
    Array.isArray(
      data.photo_urls
    )
      ? [
          ...data.photo_urls
        ]
      : []

  latitude.value =
    data.latitude !== null &&
    data.latitude !== undefined
      ? Number(
          data.latitude
        )
      : null

  longitude.value =
    data.longitude !== null &&
    data.longitude !== undefined
      ? Number(
          data.longitude
        )
      : null

}

async function checkAccount() {

  checkingAccount.value =
    true

  accountError.value =
    ''

  try {

    const {
      data,
      error
    } =
      await supabase.auth
        .getUser()

    if (error) {
      throw error
    }

    if (!data.user) {

      router.push({
        path: '/login',

        query: {
          redirect:
            route.fullPath
        }

      })

      return
    }

    userId.value =
      data.user.id

    accountType.value =
      data.user.user_metadata
        ?.account_type ||
      ''

    if (!canPost.value) {

      accountError.value =
        currentLanguage.value === 'fr'
          ? 'Seuls les propriétaires et les agents immobiliers peuvent publier des propriétés.'
          : 'Only landlords and real estate agents can post properties.'

      return
    }

    await loadCurrentProperty()

  } catch (error) {

    console.error(
      error
    )

    accountError.value =
      currentLanguage.value === 'fr'
        ? 'Impossible de charger votre compte ou votre propriété. Veuillez réessayer.'
        : 'Unable to load your account or property. Please try again.'

  } finally {

    checkingAccount.value =
      false

    await nextTick()

    if (canPost.value) {
      createMap()
    }

  }

}

async function submitProperty() {

  formError.value =
    ''

  successMessage.value =
    ''

  if (!userId.value) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Vous devez être connecté pour publier une propriété.'
        : 'You must be logged in to post a property.'

    return
  }

  if (!canPost.value) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Seuls les propriétaires et les agents peuvent publier des propriétés.'
        : 'Only landlords and agents can post properties.'

    return
  }

  const totalPhotoCount =
    existingPhotos.value.length +
    newPhotos.value.length

  if (
    totalPhotoCount < 1
  ) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Veuillez télécharger au moins une photo de la propriété.'
        : 'Please upload at least one property photo.'

    return
  }

  if (
    totalPhotoCount > 8
  ) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Une propriété peut contenir un maximum de 8 photos.'
        : 'A property can contain a maximum of 8 photos.'

    return
  }

  if (
    !form.value.city.trim() ||
    !form.value.neighborhood.trim()
  ) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Veuillez entrer la ville et le quartier.'
        : 'Please enter the city and neighborhood.'

    return
  }

  if (
    !form.value.description.trim()
  ) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Veuillez fournir une description de la propriété.'
        : 'Please provide a property description.'

    return
  }

  if (form.value.category === 'housing') {

    const totalUnits =
      Number(
        form.value.totalUnits
      )

    const availableUnits =
      Number(
        form.value.availableUnits
      )

    if (
      !Number.isInteger(
        totalUnits
      ) ||
      totalUnits < 1
    ) {

      formError.value =
        currentLanguage.value === 'fr'
          ? 'Veuillez entrer un nombre total d’unités valide.'
          : 'Please enter a valid total number of units.'

      return

    }

    if (
      !Number.isInteger(
        availableUnits
      ) ||
      availableUnits < 0 ||
      availableUnits > totalUnits
    ) {

      formError.value =
        currentLanguage.value === 'fr'
          ? 'Le nombre d’unités disponibles doit être compris entre 0 et le nombre total d’unités.'
          : 'Available units must be between 0 and the total number of units.'

      return

    }

  }

  if (
    form.value.price === '' ||
    Number(form.value.price) < 0
  ) {

    formError.value =
      currentLanguage.value === 'fr'
        ? 'Veuillez entrer un prix valide.'
        : 'Please enter a valid price.'

    return
  }

  saving.value =
    true

  let uploadedUrls = []

  try {

    uploadedUrls =
      await uploadPhotos()

    const allPhotoUrls = [
      ...existingPhotos.value,
      ...uploadedUrls
    ]

    const propertyData = {

      property_type:
        form.value.propertyType,

      listing_type:
        form.value.listingType,

      city:
        form.value.city.trim(),

      neighborhood:
        form.value.neighborhood.trim(),

      price:
        Number(
          form.value.price
        ),

      bedrooms:
        form.value.category === 'housing'
          ? Number(
              form.value.bedrooms ||
              0
            )
          : 0,

      bathrooms:
        form.value.category === 'housing'
          ? Number(
              form.value.bathrooms ||
              0
            )
          : 0,

      total_units:
        form.value.category === 'housing'
          ? Number(
              form.value.totalUnits ||
              1
            )
          : 1,

      available_units:
        form.value.category === 'housing'
          ? Number(
              form.value.availableUnits ||
              0
            )
          : 1,

      description:
        form.value.description.trim(),

      photo_urls:
        allPhotoUrls,

      latitude:
        latitude.value !== null
          ? Number(
              latitude.value
            )
          : null,

      longitude:
        longitude.value !== null
          ? Number(
              longitude.value
            )
          : null,

      status:
        'pending'

    }

    /*
      EDIT MODE

      If an edit ID exists, we ONLY update the existing
      property. We do not insert a new property.
    */

    if (isEditMode.value) {

      const propertyId =
        editPropertyId.value

      if (!propertyId) {

        throw new Error(
          currentLanguage.value === 'fr'
            ? 'L’identifiant de la propriété est manquant. Aucune nouvelle propriété n’a été créée.'
            : 'The property ID is missing. The property was not created.'
        )

      }

      const {
        data: currentProperty,
        error: currentPropertyError
      } =
        await supabase
          .from('properties')
          .select(`
            id,
            owner_id,
            photo_urls
          `)
          .eq(
            'id',
            propertyId
          )
          .eq(
            'owner_id',
            userId.value
          )
          .single()

      if (currentPropertyError) {
        throw currentPropertyError
      }

      if (!currentProperty) {

        throw new Error(
          currentLanguage.value === 'fr'
            ? 'La propriété que vous essayez de modifier est introuvable. Aucune nouvelle propriété n’a été créée.'
            : 'The property you are trying to edit could not be found. No new property was created.'
        )

      }

      const oldPhotos =
        Array.isArray(
          currentProperty.photo_urls
        )
          ? currentProperty.photo_urls
          : []

      const removedPhotos =
        oldPhotos.filter(
          photo =>
            !existingPhotos.value.includes(
              photo
            )
        )

      const {
        data: updatedProperty,
        error: updateError
      } =
        await supabase
          .from('properties')
          .update(
            propertyData
          )
          .eq(
            'id',
            propertyId
          )
          .eq(
            'owner_id',
            userId.value
          )
          .select('id')
          .single()

      if (updateError) {
        throw updateError
      }

      if (!updatedProperty) {

        throw new Error(
          currentLanguage.value === 'fr'
            ? 'La propriété n’a pas été mise à jour. Aucune nouvelle propriété n’a été créée.'
            : 'The property was not updated. No new property was created.'
        )

      }

      if (
        removedPhotos.length >
        0
      ) {

        await deleteStoragePhotos(
          removedPhotos
        )

      }

      successMessage.value =
        currentLanguage.value === 'fr'
          ? 'Propriété mise à jour avec succès. Votre propriété existante a été mise à jour et envoyée pour révision par l’administrateur.'
          : 'Property updated successfully. Your existing property has been updated and sent for admin review.'

      setTimeout(
        () => {
          router.push(
            '/my-properties'
          )
        },
        1200
      )

      return
    }

    /*
      NEW PROPERTY MODE

      An INSERT can only happen when there is NO edit ID.
    */

    const {
      data: insertedProperty,
      error: insertError
    } =
      await supabase
        .from('properties')
        .insert({
          owner_id:
            userId.value,

          ...propertyData
        })
        .select()
        .single()

    if (insertError) {
      throw insertError
    }

    if (!insertedProperty) {

      throw new Error(
        currentLanguage.value === 'fr'
          ? 'La propriété n’a pas pu être créée.'
          : 'The property could not be created.'
      )

    }

    successMessage.value =
      currentLanguage.value === 'fr'
        ? 'Propriété soumise avec succès. Elle est maintenant en attente de validation par l’administrateur.'
        : 'Property submitted successfully. It is now pending admin approval.'

    setTimeout(
      () => {
        router.push(
          '/my-properties'
        )
      },
      1200
    )

  } catch (error) {

    console.error(
      error
    )

    if (
      uploadedUrls.length >
      0
    ) {

      await deleteStoragePhotos(
        uploadedUrls
      )

    }

    formError.value =
      error?.message ||
      (
        currentLanguage.value === 'fr'
          ? 'Impossible d’enregistrer la propriété. Veuillez réessayer.'
          : 'Unable to save the property. Please try again.'
      )

  } finally {

    saving.value =
      false

  }

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

  checkAccount()

})

onBeforeUnmount(() => {

  for (
    const preview
    of newPhotoPreviews.value
  ) {

    if (preview?.url) {

      URL.revokeObjectURL(
        preview.url
      )

    }

  }

  if (map.value) {

    map.value.remove()

    map.value =
      null

  }

})

</script>

<style scoped>

.post-page {
  min-height: 100vh;
  background: #f8fafc;
}

.page-header {
  position: relative;
  padding: 48px 24px;
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
}

.page-header h1 {
  max-width: 900px;
  margin: 0 auto 8px;
  color: #111827;
  font-size: 36px;
}

.page-header p {
  max-width: 900px;
  margin: 0 auto;
  color: #64748b;
}

.language-switcher {
  position: absolute;
  top: 22px;
  right: 24px;
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid #e5e7eb;
  border-radius: 9px;
  background: #f8fafc;
}

.language-switcher button {
  min-width: 40px;
  padding: 7px 9px;
  border: 0;
  border-radius: 6px;
  background: transparent;
  color: #64748b;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.language-switcher button:hover {
  background: #e2e8f0;
  color: #111827;
}

.language-switcher button.active {
  background: #2563eb;
  color: #ffffff;
}

.form-container {
  max-width: 900px;
  margin: 0 auto;
  padding: 40px 24px 70px;
}

.property-form {
  padding: 32px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow:
    0 10px 30px rgba(
      15,
      23,
      42,
      0.06
    );
}

.property-form > h2 {
  margin: 0 0 30px;
  color: #111827;
  font-size: 25px;
}

.form-group {
  margin-bottom: 22px;
}

.form-row {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 18px;
}

label {
  display: block;
  margin-bottom: 8px;
  color: #1f2937;
  font-size: 14px;
  font-weight: 700;
}

input,
select,
textarea {
  width: 100%;
  box-sizing: border-box;
  padding: 13px 14px;
  border: 1px solid #cbd5e1;
  border-radius: 9px;
  background: #ffffff;
  color: #111827;
  font-size: 15px;
  font-family: inherit;
  outline: none;
}

input:focus,
select:focus,
textarea:focus {
  border-color: #2563eb;
  box-shadow:
    0 0 0 3px rgba(
      37,
      99,
      235,
      0.1
    );
}

input:disabled {
  background: #f1f5f9;
  cursor: not-allowed;
}

textarea {
  resize: vertical;
  min-height: 150px;
}

small {
  display: block;
  margin-top: 7px;
  color: #64748b;
  font-size: 13px;
}

.units-section {
  margin-top: 30px;
  padding: 24px;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  background: #f8fafc;
}

.units-section .section-heading {
  margin-bottom: 18px;
}

.availability-summary {
  display: flex;
  flex-wrap: wrap;
  gap: 10px 20px;
  margin-top: 4px;
  padding: 14px 16px;
  border-radius: 9px;
  background: #ffffff;
  border: 1px solid #e2e8f0;
}

.availability-summary strong {
  color: #111827;
}

.availability-summary span {
  color: #64748b;
}

.location-section,
.photos-section {
  margin-top: 35px;
  padding-top: 30px;
  border-top: 1px solid #e5e7eb;
}

.section-heading {
  margin-bottom: 18px;
}

.section-heading h2 {
  margin: 0 0 6px;
  color: #111827;
  font-size: 22px;
}

.section-heading p {
  margin: 0;
  color: #64748b;
  line-height: 1.6;
}

.property-map {
  width: 100%;
  height: 420px;
  overflow: hidden;
  border: 1px solid #cbd5e1;
  border-radius: 12px;
  background: #e2e8f0;
  z-index: 1;
}

.location-info {
  display: grid;
  grid-template-columns:
    repeat(2, minmax(0, 1fr));
  gap: 14px;
  margin-top: 14px;
}

.coordinate-box {
  padding: 14px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f8fafc;
}

.coordinate-box span {
  display: block;
  margin-bottom: 5px;
  color: #64748b;
  font-size: 12px;
}

.coordinate-box strong {
  color: #111827;
  font-size: 14px;
  word-break: break-all;
}

.map-help {
  margin: 10px 0 0;
  color: #64748b;
  font-size: 13px;
}

.existing-photos,
.new-photos {
  margin-bottom: 24px;
}

.existing-photos h3,
.new-photos h3 {
  margin: 0 0 14px;
  color: #111827;
  font-size: 17px;
}

.photo-grid {
  display: grid;
  grid-template-columns:
    repeat(4, minmax(0, 1fr));
  gap: 14px;
}

.photo-item {
  position: relative;
  overflow: hidden;
  min-height: 170px;
  border: 1px solid #e2e8f0;
  border-radius: 10px;
  background: #f1f5f9;
}

.photo-item img {
  width: 100%;
  height: 170px;
  display: block;
  object-fit: cover;
}

.remove-photo {
  position: absolute;
  right: 8px;
  bottom: 8px;
  padding: 7px 10px;
  border: 0;
  border-radius: 7px;
  background: #dc2626;
  color: #ffffff;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
}

.remove-photo:hover {
  background: #b91c1c;
}

.submit-button {
  width: 100%;
  min-height: 50px;
  margin-top: 28px;
  padding: 13px 20px;
  border: 0;
  border-radius: 9px;
  background: #2563eb;
  color: #ffffff;
  font-size: 16px;
  font-weight: 700;
  cursor: pointer;
}

.submit-button:hover {
  background: #1d4ed8;
}

.submit-button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.message {
  padding: 50px 20px;
  text-align: center;
  color: #64748b;
}

.error,
.form-error {
  color: #b91c1c;
}

.form-error {
  margin-top: 20px;
  padding: 13px 15px;
  border: 1px solid #fecaca;
  border-radius: 9px;
  background: #fef2f2;
  line-height: 1.5;
}

.form-success {
  margin-top: 20px;
  padding: 13px 15px;
  border: 1px solid #bbf7d0;
  border-radius: 9px;
  background: #f0fdf4;
  color: #15803d;
  line-height: 1.5;
}

/* Custom Eaz rentals map marker */

:global(.eaz-map-marker-wrapper) {
  background: transparent;
  border: 0;
}

:global(.eaz-map-marker) {
  position: relative;
  width: 30px;
  height: 38px;
  border-radius: 50% 50% 50% 0;
  background: #2563eb;
  transform:
    rotate(-45deg);
  border: 3px solid #ffffff;
  box-shadow:
    0 3px 10px rgba(
      0,
      0,
      0,
      0.25
    );
}

:global(.eaz-map-marker-dot) {
  position: absolute;
  top: 50%;
  left: 50%;
  width: 9px;
  height: 9px;
  border-radius: 50%;
  background: #ffffff;
  transform:
    translate(-50%, -50%);
}

:global(.leaflet-container) {
  font-family: inherit;
}

@media (max-width: 700px) {

  .page-header {
    padding: 75px 18px 35px;
  }

  .page-header h1 {
    font-size: 29px;
  }

  .language-switcher {
    top: 18px;
    right: 18px;
  }

  .form-container {
    padding: 25px 14px 50px;
  }

  .property-form {
    padding: 22px 18px;
  }

  .units-section {
    padding: 18px;
  }

  .form-row {
    grid-template-columns: 1fr;
    gap: 0;
  }

  .property-map {
    height: 350px;
  }

  .location-info {
    grid-template-columns: 1fr;
  }

  .photo-grid {
    grid-template-columns:
      repeat(2, minmax(0, 1fr));
  }

  .photo-item,
  .photo-item img {
    height: 150px;
  }

}

@media (max-width: 420px) {

  .property-form {
    padding: 18px 14px;
  }

  .photo-grid {
    grid-template-columns: 1fr;
  }

  .photo-item,
  .photo-item img {
    height: 200px;
  }

}

</style>