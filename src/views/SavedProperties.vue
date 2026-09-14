<template>
  <div class="page">

    <header class="page-header">
      <p class="eyebrow">Eaz rentals</p>

      <h1>
        {{ t('saved.title') }}
      </h1>

      <p>
        {{ t('saved.subtitle') }}
      </p>
    </header>


    <main class="content">

      <div v-if="loading" class="state">
        {{ t('saved.loading') }}
      </div>


      <div v-else-if="error" class="state error">
        {{ error }}
      </div>


      <div v-else-if="properties.length === 0" class="state">

        <h2>
          {{ t('saved.noProperties') }}
        </h2>

        <p>
          {{ t('saved.noPropertiesDescription') }}
        </p>


        <div class="browse-actions">

          <RouterLink
            to="/housing"
            class="primary-btn"
          >
            {{ t('saved.browseHousing') }}
          </RouterLink>


          <RouterLink
            to="/land"
            class="secondary-btn"
          >
            {{ t('saved.browseLand') }}
          </RouterLink>

        </div>

      </div>


      <div v-else class="property-grid">

        <article
          v-for="property in properties"
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
              {{ t('saved.noPhoto') }}
            </div>

          </div>


          <div class="details">

            <span class="type">
              {{ property.property_type }}
            </span>


            <h2>
              {{ property.neighborhood }}
            </h2>


            <p class="location">
              {{ property.city }}, Cameroon
            </p>


            <p class="listing">
              {{ property.listing_type }}
            </p>


            <strong class="price">
              {{ formatPrice(property.price) }} FCFA
            </strong>


            <div class="actions">

              <RouterLink
                :to="`/property/${property.id}`"
                class="view-btn"
              >
                {{ t('saved.viewProperty') }}
              </RouterLink>


              <button
                type="button"
                class="remove-btn"
                :disabled="removingId === property.id"
                @click="removeSavedProperty(property.id)"
              >
                {{
                  removingId === property.id
                    ? t('saved.removing')
                    : t('saved.remove')
                }}
              </button>

            </div>

          </div>

        </article>

      </div>

    </main>

  </div>
</template>


<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { supabase } from '../supabase'

const { t, locale } = useI18n()

const properties = ref([])
const loading = ref(true)
const error = ref('')
const removingId = ref(null)


onMounted(() => {
  const savedLanguage =
    localStorage.getItem('eaz-language') || 'en'

  locale.value = savedLanguage

  loadSavedProperties()
})


async function loadSavedProperties() {

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
      throw new Error(t('saved.loginRequired'))
    }


    const {
      data: savedRows,
      error: savedError
    } = await supabase
      .from('saved_properties')
      .select('property_id')
      .eq('user_id', userData.user.id)


    if (savedError) {
      throw savedError
    }


    const ids =
      (savedRows || []).map(
        row => row.property_id
      )


    if (!ids.length) {
      properties.value = []
      return
    }


    const {
      data,
      error: propertyError
    } = await supabase
      .from('properties')
      .select('*')
      .in('id', ids)
      .eq('status', 'approved')
      .order('created_at', {
        ascending: false
      })


    if (propertyError) {
      throw propertyError
    }


    properties.value = data || []

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('saved.loadError')

  } finally {

    loading.value = false

  }
}


async function removeSavedProperty(propertyId) {

  const confirmed = window.confirm(
    t('saved.removeConfirm')
  )


  if (!confirmed) {
    return
  }


  removingId.value = propertyId
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
      throw new Error(t('saved.loginRequired'))
    }


    const {
      error: deleteError
    } = await supabase
      .from('saved_properties')
      .delete()
      .eq('user_id', userData.user.id)
      .eq('property_id', propertyId)


    if (deleteError) {
      throw deleteError
    }


    properties.value =
      properties.value.filter(
        property => property.id !== propertyId
      )

  } catch (err) {

    console.error(err)

    error.value =
      err.message ||
      t('saved.removeError')

  } finally {

    removingId.value = null

  }
}


function formatPrice(price) {

  return Number(price).toLocaleString(
    locale.value === 'fr'
      ? 'fr-FR'
      : 'en-US'
  )

}
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
  max-width: 1100px;
  margin: 35px auto;
  padding: 0 20px;
}


.property-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}


.property-card {
  background: white;
  border: 1px solid #e5e9ef;
  border-radius: 12px;
  overflow: hidden;
}


.image {
  height: 210px;
  background: #eef2f6;
}


.image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
}


.placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #7b8798;
}


.details {
  padding: 20px;
}


.type {
  color: #1769aa;
  font-size: 13px;
  font-weight: 700;
}


.details h2 {
  margin: 10px 0 5px;
  color: #172033;
  font-size: 21px;
}


.location,
.listing {
  color: #687386;
  margin: 5px 0;
  font-size: 14px;
}


.price {
  display: block;
  margin: 18px 0;
  color: #172033;
  font-size: 18px;
}


.actions {
  display: flex;
  gap: 10px;
  align-items: center;
}


.view-btn {
  display: inline-block;
  text-decoration: none;
  padding: 11px 16px;
  border-radius: 7px;
  font-weight: 600;
  background: #1769aa;
  color: white;
}


.view-btn:hover {
  background: #125687;
}


.remove-btn {
  padding: 10px 14px;
  border-radius: 7px;
  border: 1px solid #d93025;
  background: white;
  color: #d93025;
  font-size: 14px;
  font-weight: 600;
  cursor: pointer;
}


.remove-btn:hover {
  background: #fff3f2;
}


.remove-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}


.browse-actions {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 25px;
}


.primary-btn,
.secondary-btn {
  display: inline-block;
  text-decoration: none;
  padding: 11px 16px;
  border-radius: 7px;
  font-weight: 600;
}


.primary-btn {
  background: #1769aa;
  color: white;
}


.primary-btn:hover {
  background: #125687;
}


.secondary-btn {
  border: 1px solid #1769aa;
  color: #1769aa;
  background: white;
}


.secondary-btn:hover {
  background: #f3f8fc;
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


.state.error {
  color: #d93025;
}


@media (max-width: 900px) {

  .property-grid {
    grid-template-columns: repeat(2, 1fr);
  }

}


@media (max-width: 600px) {

  .property-grid {
    grid-template-columns: 1fr;
  }


  .page-header {
    padding: 35px 6%;
  }


  .page-header h1 {
    font-size: 30px;
  }


  .actions {
    flex-direction: column;
    align-items: stretch;
  }


  .view-btn,
  .remove-btn {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
  }


  .browse-actions {
    flex-direction: column;
  }


  .primary-btn,
  .secondary-btn {
    width: 100%;
    box-sizing: border-box;
  }

}

</style>