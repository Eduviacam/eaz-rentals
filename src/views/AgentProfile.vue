<template>
  <div class="agent-profile-page">

    <div
      v-if="loading"
      class="state-message"
    >
      {{ t('common.loading') }}
    </div>

    <div
      v-else-if="error"
      class="state-message error"
    >
      {{ error }}
    </div>

    <main
      v-else-if="agent"
      class="profile-container"
    >

      <!-- AGENT HEADER -->

      <section class="agent-header">

        <div class="agent-avatar">

          <img
            v-if="agent.avatar_url"
            :src="agent.avatar_url"
            :alt="`${agent.full_name || t('agents.verifiedAgent')} ${t('agentProfile.profilePhoto')}`"
          />

          <div
            v-else
            class="avatar-placeholder"
          >
            {{ getInitials(agent.full_name) }}
          </div>

        </div>


        <div class="agent-main-info">

          <div class="name-row">

            <h1>
              {{
                agent.full_name ||
                t('agents.verifiedAgent')
              }}
            </h1>

            <span class="verified-badge">
              ✓ {{ t('agents.verified') }}
            </span>

          </div>


          <p class="agent-type">
            {{ t('agents.agentType') }}
          </p>


          <p
            v-if="agent.agency_name"
            class="agency"
          >
            {{ agent.agency_name }}
          </p>


          <p
            v-if="agent.location"
            class="location"
          >
            {{ agent.location }}
          </p>


          <p
            v-if="
              agent.years_experience !== null &&
              agent.years_experience !== undefined
            "
            class="experience"
          >
            {{ agent.years_experience }}
            {{ t('agentProfile.years') }}
            {{ t('agentProfile.experience').toLowerCase() }}
          </p>


          <p
            v-if="agent.phone"
            class="phone"
          >
            {{ t('agentProfile.phone') }}:
            {{ agent.phone }}
          </p>


          <a
            v-if="agent.phone"
            :href="whatsappLink(agent.phone)"
            target="_blank"
            rel="noopener noreferrer"
            class="whatsapp-button"
          >
            {{ t('agents.whatsapp') }}
          </a>

        </div>

      </section>


      <!-- ABOUT THE AGENT -->

      <section
        v-if="agent.bio"
        class="about-section"
      >

        <h2>
          {{ t('agentProfile.about') }}
          {{ agent.full_name || t('agentProfile.title') }}
        </h2>

        <p>
          {{ agent.bio }}
        </p>

      </section>


      <!-- PROFESSIONAL INFORMATION -->

      <section class="professional-section">

        <h2>
          {{ t('agentProfile.professionalInformation') }}
        </h2>


        <div class="professional-grid">

          <div
            v-if="agent.agency_name"
            class="professional-item"
          >

            <span class="professional-label">
              {{ t('agentProfile.agency') }}
            </span>

            <strong>
              {{ agent.agency_name }}
            </strong>

          </div>


          <div
            v-if="agent.location"
            class="professional-item"
          >

            <span class="professional-label">
              {{ t('agentProfile.location') }}
            </span>

            <strong>
              {{ agent.location }}
            </strong>

          </div>


          <div
            v-if="
              agent.years_experience !== null &&
              agent.years_experience !== undefined
            "
            class="professional-item"
          >

            <span class="professional-label">
              {{ t('agentProfile.experience') }}
            </span>

            <strong>
              {{ agent.years_experience }}
              {{ t('agentProfile.years') }}
            </strong>

          </div>


          <div class="professional-item">

            <span class="professional-label">
              {{ t('agentProfile.accountStatus') }}
            </span>

            <strong class="verified-text">
              ✓ {{ t('agents.verified') }}
            </strong>

          </div>

        </div>

      </section>


      <!-- PROPERTIES -->

      <section class="properties-section">

        <div class="section-header">

          <div>

            <h2>
              {{ t('agentProfile.propertiesBy') }}
              {{ agent.full_name || t('agents.verifiedAgent') }}
            </h2>

            <p>
              {{ properties.length }}

              {{
                properties.length === 1
                  ? t('agentProfile.property')
                  : t('agentProfile.properties')
              }}

              {{ t('agentProfile.available') }}
            </p>

          </div>

        </div>


        <div
          v-if="properties.length === 0"
          class="empty-message"
        >

          <h3>
            {{ t('agentProfile.noProperties') }}
          </h3>

          <p>
            {{ t('agentProfile.noPropertiesDescription') }}
          </p>

        </div>


        <div
          v-else
          class="properties-grid"
        >

          <article
            v-for="property in properties"
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
                :alt="t('property.photo')"
              />


              <div
                v-else
                class="no-image"
              >
                {{ t('property.noPhoto') }}
              </div>


              <span class="verified-property">
                ✓ {{ t('agents.verified') }}
              </span>

            </div>


            <div class="property-content">

              <h3>
                {{ property.property_type }}
              </h3>


              <p class="property-location">
                {{ property.neighborhood }},
                {{ property.city }}
              </p>


              <p class="listing-type">
                {{ formatListingType(property.listing_type) }}
              </p>


              <p class="price">
                {{ formatPrice(property.price) }}
              </p>


              <div class="property-features">

                <span v-if="property.bedrooms">
                  {{ property.bedrooms }}
                  {{ t('housing.bedrooms') }}
                </span>

                <span v-if="property.bathrooms">
                  {{ property.bathrooms }}
                  {{ t('housing.bathrooms') }}
                </span>

              </div>


              <button
                type="button"
                class="view-button"
                @click="viewProperty(property.id)"
              >
                {{ t('housing.viewProperty') }}
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
  ref,
  onMounted
} from 'vue'

import {
  useRoute,
  useRouter
} from 'vue-router'

import {
  useI18n
} from 'vue-i18n'

import {
  supabase
} from '../supabase'


const route = useRoute()

const router = useRouter()

const {
  t
} = useI18n()


const agent = ref(null)

const properties = ref([])

const loading = ref(true)

const error = ref('')


function getInitials(name) {

  if (!name) {
    return 'EA'
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word =>
      word.charAt(0).toUpperCase()
    )
    .join('')

}


function whatsappLink(phone) {

  const cleaned =
    String(phone).replace(/\D/g, '')


  if (cleaned.startsWith('237')) {
    return `https://wa.me/${cleaned}`
  }


  if (
    cleaned.length === 9 &&
    cleaned.startsWith('6')
  ) {
    return `https://wa.me/237${cleaned}`
  }


  return `https://wa.me/${cleaned}`

}


function formatPrice(price) {

  if (
    price === null ||
    price === undefined
  ) {
    return t('property.priceOnRequest')
  }


  return `${Number(price).toLocaleString()} FCFA`

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


  return type || t('agentProfile.available')

}


function viewProperty(id) {

  router.push(
    `/property/${id}`
  )

}


async function loadAgentProfile() {

  loading.value = true

  error.value = ''


  try {

    const agentId =
      route.params.id


    if (!agentId) {
      throw new Error(
        'Agent ID is missing'
      )
    }


    const {
      data: agentData,
      error: agentError
    } = await supabase
      .from('profiles')
      .select(`
        id,
        full_name,
        phone,
        account_type,
        is_verified,
        avatar_url,
        agency_name,
        bio,
        location,
        years_experience
      `)
      .eq('id', agentId)
      .eq(
        'account_type',
        'agent'
      )
      .eq(
        'is_verified',
        true
      )
      .single()


    if (agentError) {
      throw agentError
    }


    agent.value =
      agentData


    const {
      data: propertyData,
      error: propertyError
    } = await supabase
      .from('properties')
      .select(`
        id,
        property_type,
        listing_type,
        city,
        neighborhood,
        price,
        bedrooms,
        bathrooms,
        description,
        photo_urls,
        owner_id,
        status,
        created_at
      `)
      .eq(
        'owner_id',
        agentId
      )
      .eq(
        'status',
        'approved'
      )
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
      propertyData || []


  } catch (err) {

    console.error(
      'Error loading agent profile:',
      err
    )


    error.value =
      t('agentProfile.loadError')


  } finally {

    loading.value = false

  }

}


onMounted(() => {

  const savedLanguage =
    localStorage.getItem('eaz-language')

  if (
    savedLanguage === 'en' ||
    savedLanguage === 'fr'
  ) {
    // The global i18n instance already
    // uses the saved language.
  }

  loadAgentProfile()

})

</script>


<style scoped>
.agent-profile-page {
  min-height: 100vh;
  background: #f8fafc;
}

.profile-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}


/* AGENT HEADER */

.agent-header {
  display: flex;
  align-items: center;
  gap: 28px;
  padding: 30px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.agent-avatar {
  width: 140px;
  height: 140px;
  flex-shrink: 0;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e2e8f0;
}

.agent-avatar img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.avatar-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 40px;
  font-weight: 700;
}

.agent-main-info {
  flex: 1;
}

.name-row {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-wrap: wrap;
}

.name-row h1 {
  margin: 0;
  color: #111827;
  font-size: 32px;
}

.verified-badge {
  padding: 7px 12px;
  border-radius: 20px;
  background: #dcfce7;
  color: #15803d;
  font-size: 13px;
  font-weight: 700;
}

.agent-type {
  margin: 8px 0;
  color: #64748b;
}

.agency {
  margin: 8px 0;
  color: #111827;
  font-size: 18px;
  font-weight: 700;
}

.location {
  margin: 6px 0;
  color: #475569;
}

.experience {
  margin: 6px 0;
  color: #475569;
}

.phone {
  margin: 12px 0 18px;
  color: #334155;
}

.whatsapp-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 18px;
  border-radius: 9px;
  background: #16a34a;
  color: #ffffff;
  text-decoration: none;
  font-weight: 600;
}

.whatsapp-button:hover {
  background: #15803d;
}


/* ABOUT */

.about-section {
  padding: 28px;
  margin-bottom: 24px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.about-section h2 {
  margin: 0 0 12px;
  color: #111827;
}

.about-section p {
  margin: 0;
  color: #475569;
  line-height: 1.7;
  white-space: pre-line;
}


/* PROFESSIONAL INFORMATION */

.professional-section {
  padding: 28px;
  margin-bottom: 40px;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
}

.professional-section h2 {
  margin: 0 0 22px;
  color: #111827;
}

.professional-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 16px;
}

.professional-item {
  min-height: 100px;
  padding: 18px;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  background: #f8fafc;
}

.professional-label {
  display: block;
  margin-bottom: 8px;
  color: #64748b;
  font-size: 13px;
}

.professional-item strong {
  color: #111827;
  line-height: 1.4;
}

.verified-text {
  color: #15803d !important;
}


/* PROPERTIES */

.properties-section {
  margin-top: 20px;
}

.section-header {
  margin-bottom: 24px;
}

.section-header h2 {
  margin: 0 0 6px;
  color: #111827;
}

.section-header p {
  margin: 0;
  color: #64748b;
}

.properties-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.property-card {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow:
    0 8px 24px
    rgba(15, 23, 42, 0.06);
}

.property-image {
  position: relative;
  height: 210px;
  background: #e2e8f0;
}

.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.no-image {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #64748b;
}

.verified-property {
  position: absolute;
  top: 12px;
  left: 12px;
  padding: 6px 10px;
  border-radius: 20px;
  background: #ffffff;
  color: #15803d;
  font-size: 12px;
  font-weight: 700;
}

.property-content {
  padding: 20px;
}

.property-content h3 {
  margin: 0 0 8px;
  color: #111827;
  font-size: 20px;
}

.property-location {
  margin: 0 0 8px;
  color: #64748b;
}

.listing-type {
  margin: 0 0 10px;
  color: #475569;
  font-size: 14px;
}

.price {
  margin: 0 0 14px;
  color: #111827;
  font-size: 20px;
  font-weight: 700;
}

.property-features {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 18px;
  color: #64748b;
  font-size: 13px;
}

.view-button {
  width: 100%;
  min-height: 44px;
  border: none;
  border-radius: 9px;
  background: #111827;
  color: #ffffff;
  font-weight: 600;
  cursor: pointer;
}

.view-button:hover {
  opacity: 0.9;
}


/* STATES */

.state-message,
.empty-message {
  max-width: 700px;
  margin: 80px auto;
  padding: 40px 20px;
  text-align: center;
  color: #64748b;
}

.state-message.error {
  color: #b91c1c;
}

.empty-message h3 {
  margin-bottom: 8px;
  color: #111827;
}


/* RESPONSIVE */

@media (max-width: 1000px) {

  .professional-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 900px) {

  .properties-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}

@media (max-width: 600px) {

  .profile-container {
    padding: 24px 16px;
  }

  .agent-header {
    flex-direction: column;
    align-items: flex-start;
    padding: 24px;
  }

  .agent-avatar {
    width: 110px;
    height: 110px;
  }

  .name-row h1 {
    font-size: 26px;
  }

  .professional-section,
  .about-section {
    padding: 22px;
  }

  .professional-grid {
    grid-template-columns: 1fr;
  }

  .properties-grid {
    grid-template-columns: 1fr;
  }

}
</style>