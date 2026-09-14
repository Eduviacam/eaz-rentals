<template>
  <div class="dashboard-page">

    <header class="dashboard-header">

      <div>
        <p class="welcome">
          {{ t('dashboard.welcome') }}
        </p>

        <h1>
          {{ t('dashboard.title') }}
        </h1>
      </div>

      <div class="header-actions">

        <div class="language-switcher">

          <button
            type="button"
            :class="{ active: locale === 'en' }"
            @click="changeLanguage('en')"
          >
            EN
          </button>

          <button
            type="button"
            :class="{ active: locale === 'fr' }"
            @click="changeLanguage('fr')"
          >
            FR
          </button>

        </div>

        <button
          type="button"
          class="logout-btn"
          @click="logout"
        >
          {{ t('common.logout') }}
        </button>

      </div>

    </header>


    <main class="dashboard-content">

      <!-- ACCOUNT -->

      <section class="profile-card">

        <h2>
          {{ t('dashboard.myAccount') }}
        </h2>

        <div class="profile-info">

          <div>
            <span>{{ t('dashboard.name') }}</span>
            <strong>{{ userName }}</strong>
          </div>

          <div>
            <span>{{ t('dashboard.email') }}</span>
            <strong>{{ userEmail }}</strong>
          </div>

          <div>
            <span>{{ t('dashboard.accountType') }}</span>
            <strong>{{ accountType }}</strong>
          </div>

        </div>

      </section>


      <!-- AGENT PROFESSIONAL PROFILE -->

      <section
        v-if="isAgent"
        class="agent-profile-card"
      >

        <div class="agent-profile-header">

          <div>
            <h2>
              {{ t('dashboard.professionalProfile') }}
            </h2>

            <p>
              {{ t('dashboard.professionalProfileDescription') }}
            </p>
          </div>

        </div>


        <!-- PROFILE PHOTO -->

        <div class="agent-photo-section">

          <div class="agent-photo-preview">

            <img
              v-if="avatarUrl"
              :src="avatarUrl"
              :alt="t('dashboard.agentProfilePhoto')"
            />

            <div
              v-else
              class="photo-placeholder"
            >
              {{ getInitials(userName) }}
            </div>

          </div>


          <div class="agent-photo-actions">

            <label
              for="agent-photo"
              class="upload-btn"
            >
              {{
                uploadingPhoto
                  ? t('dashboard.uploading')
                  : t('dashboard.changeProfilePhoto')
              }}
            </label>

            <input
              id="agent-photo"
              type="file"
              accept="image/jpeg,image/png,image/webp"
              @change="uploadProfilePhoto"
              :disabled="uploadingPhoto"
            />

            <p class="photo-help">
              {{ t('dashboard.photoHelp') }}
            </p>

            <p
              v-if="photoMessage"
              class="photo-message"
              :class="{ error: photoError }"
            >
              {{ photoMessage }}
            </p>

          </div>

        </div>


        <!-- PROFESSIONAL INFORMATION FORM -->

        <form
          class="professional-form"
          @submit.prevent="saveProfessionalProfile"
        >

          <div class="form-grid">

            <div class="form-group">

              <label for="agency">
                {{ t('dashboard.agencyCompany') }}
              </label>

              <input
                id="agency"
                v-model="agencyName"
                type="text"
                :placeholder="t('dashboard.agencyPlaceholder')"
              />

            </div>


            <div class="form-group">

              <label for="location">
                {{ t('dashboard.location') }}
              </label>

              <input
                id="location"
                v-model="location"
                type="text"
                :placeholder="t('dashboard.locationPlaceholder')"
              />

            </div>


            <div class="form-group">

              <label for="experience">
                {{ t('dashboard.yearsExperience') }}
              </label>

              <input
                id="experience"
                v-model.number="yearsExperience"
                type="number"
                min="0"
                max="100"
                :placeholder="t('dashboard.experiencePlaceholder')"
              />

            </div>

          </div>


          <div class="form-group">

            <label for="bio">
              {{ t('dashboard.professionalBio') }}
            </label>

            <textarea
              id="bio"
              v-model="bio"
              rows="6"
              maxlength="1000"
              :placeholder="t('dashboard.bioPlaceholder')"
            ></textarea>

            <p class="character-count">
              {{ bio.length }}/1000
            </p>

          </div>


          <div class="form-actions">

            <button
              type="submit"
              class="save-profile-btn"
              :disabled="savingProfile"
            >
              {{
                savingProfile
                  ? t('dashboard.saving')
                  : t('dashboard.saveProfessionalProfile')
              }}
            </button>

          </div>


          <p
            v-if="profileMessage"
            class="profile-message"
            :class="{ error: profileError }"
          >
            {{ profileMessage }}
          </p>

        </form>

      </section>


      <!-- PROPERTY SEEKER -->

      <section v-if="isSeeker">

        <h2 class="section-title">
          {{ t('dashboard.findProperty') }}
        </h2>

        <div class="dashboard-grid">

          <RouterLink
            to="/housing"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.findHousing') }}
            </h3>

            <p>
              {{ t('dashboard.findHousingDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/land"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.findLand') }}
            </h3>

            <p>
              {{ t('dashboard.findLandDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/saved-properties"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.savedProperties') }}
            </h3>

            <p>
              {{ t('dashboard.savedPropertiesDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/my-inquiries"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.myInquiries') }}
            </h3>

            <p>
              {{ t('dashboard.myInquiriesDescription') }}
            </p>
          </RouterLink>

        </div>

      </section>


      <!-- LANDLORD / AGENT -->

      <section
        v-if="isLandlord || isAgent"
      >

        <h2 class="section-title">
          {{ t('dashboard.manageProperties') }}
        </h2>

        <div class="dashboard-grid">

          <RouterLink
            to="/post-property"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.postProperty') }}
            </h3>

            <p>
              {{ t('dashboard.postPropertyDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/my-properties"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.myProperties') }}
            </h3>

            <p>
              {{ t('dashboard.myPropertiesDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/my-properties"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.pendingApproval') }}
            </h3>

            <p>
              {{ t('dashboard.pendingApprovalDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/my-properties"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.approvedProperties') }}
            </h3>

            <p>
              {{ t('dashboard.approvedPropertiesDescription') }}
            </p>
          </RouterLink>


          <RouterLink
            to="/my-inquiries"
            class="dashboard-card"
          >
            <h3>
              {{ t('dashboard.myInquiries') }}
            </h3>

            <p>
              {{ t('dashboard.receivedInquiriesDescription') }}
            </p>
          </RouterLink>

        </div>

      </section>

    </main>

  </div>
</template>


<script setup>
import {
  ref,
  onMounted,
  computed
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  useI18n
} from 'vue-i18n'

import { supabase } from '../supabase'


const router = useRouter()

const {
  t,
  locale
} = useI18n()


function changeLanguage(language) {
  locale.value = language

  localStorage.setItem(
    'eaz-language',
    language
  )
}


/* ACCOUNT */

const userName = ref('User')

const userEmail = ref('')

const accountType = ref('Property Seeker')

const accountTypeValue = ref('user')

const userId = ref('')


/* AGENT PHOTO */

const avatarUrl = ref('')

const uploadingPhoto = ref(false)

const photoMessage = ref('')

const photoError = ref(false)


/* AGENT PROFESSIONAL PROFILE */

const agencyName = ref('')

const bio = ref('')

const location = ref('')

const yearsExperience = ref(null)

const savingProfile = ref(false)

const profileMessage = ref('')

const profileError = ref(false)


const isSeeker = computed(() => {
  return accountTypeValue.value === 'user'
})


const isLandlord = computed(() => {
  return accountTypeValue.value === 'landlord'
})


const isAgent = computed(() => {
  return accountTypeValue.value === 'agent'
})


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


/* LOAD DASHBOARD */

onMounted(async () => {

  const savedLanguage =
    localStorage.getItem('eaz-language')

  if (
    savedLanguage === 'en' ||
    savedLanguage === 'fr'
  ) {
    locale.value = savedLanguage
  }


  const {
    data,
    error
  } = await supabase.auth.getUser()


  if (error || !data.user) {
    router.push('/login')
    return
  }


  const user = data.user

  userId.value = user.id

  userEmail.value =
    user.email || ''

  userName.value =
    user.user_metadata?.full_name ||
    'User'


  const type =
    user.user_metadata?.account_type ||
    'user'


  accountTypeValue.value = type


  if (type === 'landlord') {

    accountType.value =
      t('dashboard.landlordPropertyOwner')

  } else if (type === 'agent') {

    accountType.value =
      t('dashboard.realEstateAgent')

    await loadAgentProfile()

  } else {

    accountType.value =
      t('dashboard.propertySeeker')

  }

})


/* LOAD AGENT PROFILE */

async function loadAgentProfile() {

  if (!userId.value) {
    return
  }


  const {
    data,
    error
  } = await supabase
    .from('profiles')
    .select(`
      avatar_url,
      agency_name,
      bio,
      location,
      years_experience
    `)
    .eq(
      'id',
      userId.value
    )
    .maybeSingle()


  if (error) {

    console.error(
      'Error loading agent profile:',
      error
    )

    return

  }


  avatarUrl.value =
    data?.avatar_url || ''

  agencyName.value =
    data?.agency_name || ''

  bio.value =
    data?.bio || ''

  location.value =
    data?.location || ''

  yearsExperience.value =
    data?.years_experience ?? null

}


/* PROFILE PHOTO */

async function uploadProfilePhoto(event) {

  const file =
    event.target.files?.[0]


  if (!file) {
    return
  }


  photoMessage.value = ''

  photoError.value = false


  if (
    file.size >
    5 * 1024 * 1024
  ) {

    photoMessage.value =
      t('dashboard.photoTooLarge')

    photoError.value = true

    event.target.value = ''

    return

  }


  const allowedTypes = [
    'image/jpeg',
    'image/png',
    'image/webp'
  ]


  if (
    !allowedTypes.includes(file.type)
  ) {

    photoMessage.value =
      t('dashboard.invalidPhotoType')

    photoError.value = true

    event.target.value = ''

    return

  }


  uploadingPhoto.value = true


  try {

    const extension =
      file.name
        .split('.')
        .pop()
        ?.toLowerCase() ||
      'jpg'


    const filePath =
      `${userId.value}/profile.${extension}`


    const {
      error: uploadError
    } = await supabase.storage
      .from('agent-profiles')
      .upload(
        filePath,
        file,
        {
          upsert: true,
          contentType: file.type
        }
      )


    if (uploadError) {
      throw uploadError
    }


    const {
      data: publicData
    } = supabase.storage
      .from('agent-profiles')
      .getPublicUrl(
        filePath
      )


    const publicUrl =
      `${publicData.publicUrl}?v=${Date.now()}`


    const {
      error: updateError
    } = await supabase
      .from('profiles')
      .update({
        avatar_url: publicUrl
      })
      .eq(
        'id',
        userId.value
      )


    if (updateError) {
      throw updateError
    }


    avatarUrl.value =
      publicUrl


    photoMessage.value =
      t('dashboard.photoUploaded')

  } catch (err) {

    console.error(
      'Profile photo upload error:',
      err
    )


    photoMessage.value =
      t('dashboard.photoUploadError')

    photoError.value = true

  } finally {

    uploadingPhoto.value = false

    event.target.value = ''

  }

}


/* SAVE PROFESSIONAL PROFILE */

async function saveProfessionalProfile() {

  profileMessage.value = ''

  profileError.value = false


  if (
    yearsExperience.value !== null &&
    yearsExperience.value !== '' &&
    (
      Number(yearsExperience.value) < 0 ||
      Number(yearsExperience.value) > 100
    )
  ) {

    profileMessage.value =
      t('dashboard.experienceValidation')

    profileError.value = true

    return

  }


  savingProfile.value = true


  try {

    const {
      error
    } = await supabase
      .from('profiles')
      .update({
        agency_name:
          agencyName.value.trim() ||
          null,

        bio:
          bio.value.trim() ||
          null,

        location:
          location.value.trim() ||
          null,

        years_experience:
          yearsExperience.value === '' ||
          yearsExperience.value === null
            ? null
            : Number(yearsExperience.value)

      })
      .eq(
        'id',
        userId.value
      )


    if (error) {
      throw error
    }


    profileMessage.value =
      t('dashboard.profileSaved')

  } catch (err) {

    console.error(
      'Error saving professional profile:',
      err
    )


    profileMessage.value =
      t('dashboard.profileSaveError')

    profileError.value = true

  } finally {

    savingProfile.value = false

  }

}


/* LOGOUT */

async function logout() {

  await supabase.auth.signOut()

  router.push('/login')

}
</script>


<style scoped>
.dashboard-page {
  min-height: calc(100vh - 75px);
  background: #f7f9fc;
  padding-bottom: 60px;
}

.dashboard-header {
  background: white;
  border-bottom: 1px solid #e5e9ef;
  padding: 35px 7%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
}

.welcome {
  margin: 0 0 6px;
  color: #1769aa;
  font-weight: 600;
}

.dashboard-header h1 {
  margin: 0;
  font-size: 32px;
  color: #172033;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 12px;
}

.language-switcher {
  display: flex;
  align-items: center;
  border: 1px solid #d8dee8;
  border-radius: 7px;
  overflow: hidden;
  background: white;
}

.language-switcher button {
  border: none;
  background: white;
  color: #687386;
  padding: 9px 12px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.language-switcher button.active {
  background: #1769aa;
  color: white;
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

.dashboard-content {
  max-width: 1100px;
  margin: 35px auto;
  padding: 0 20px;
}

.profile-card,
.agent-profile-card {
  background: white;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid #e5e9ef;
  margin-bottom: 35px;
}

.profile-card h2,
.agent-profile-header h2 {
  margin-top: 0;
  color: #172033;
}

.profile-info {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
}

.profile-info div {
  background: #f7f9fc;
  padding: 18px;
  border-radius: 8px;
}

.profile-info span {
  display: block;
  color: #687386;
  font-size: 13px;
  margin-bottom: 7px;
}

.profile-info strong {
  color: #172033;
  font-size: 15px;
}

.agent-profile-header {
  margin-bottom: 25px;
}

.agent-profile-header h2 {
  margin-bottom: 7px;
}

.agent-profile-header p {
  margin: 0;
  color: #687386;
  line-height: 1.5;
}

.agent-photo-section {
  display: flex;
  align-items: center;
  gap: 30px;
  padding-bottom: 30px;
  margin-bottom: 30px;
  border-bottom: 1px solid #e5e9ef;
}

.agent-photo-preview {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: 50%;
  background: #e2e8f0;
}

.agent-photo-preview img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.photo-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #475569;
  font-size: 42px;
  font-weight: 700;
}

.agent-photo-actions {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.agent-photo-actions input {
  display: none;
}

.upload-btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 0 20px;
  border-radius: 8px;
  background: #1769aa;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.upload-btn:hover {
  background: #12558b;
}

.photo-help {
  margin: 10px 0 0;
  color: #687386;
  font-size: 13px;
}

.photo-message {
  margin: 10px 0 0;
  color: #15803d;
  font-size: 14px;
}

.photo-message.error {
  color: #b91c1c;
}

.professional-form {
  width: 100%;
}

.form-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  color: #172033;
  font-size: 14px;
  font-weight: 600;
}

.form-group input,
.form-group textarea {
  width: 100%;
  border: 1px solid #d8dee8;
  border-radius: 8px;
  background: white;
  color: #172033;
  padding: 12px 14px;
  font-size: 15px;
  outline: none;
  box-sizing: border-box;
}

.form-group input {
  min-height: 46px;
}

.form-group textarea {
  min-height: 140px;
  resize: vertical;
  line-height: 1.5;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #1769aa;
  box-shadow: 0 0 0 3px rgba(23, 105, 170, 0.08);
}

.character-count {
  margin: 6px 0 0;
  text-align: right;
  color: #94a3b8;
  font-size: 12px;
}

.form-actions {
  display: flex;
  justify-content: flex-start;
}

.save-profile-btn {
  min-height: 46px;
  padding: 0 22px;
  border: none;
  border-radius: 8px;
  background: #1769aa;
  color: white;
  font-weight: 600;
  cursor: pointer;
}

.save-profile-btn:hover {
  background: #12558b;
}

.save-profile-btn:disabled {
  opacity: 0.6;
  cursor: not-allowed;
}

.profile-message {
  margin: 15px 0 0;
  color: #15803d;
  font-size: 14px;
}

.profile-message.error {
  color: #b91c1c;
}

.section-title {
  color: #172033;
  margin-bottom: 20px;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 20px;
  margin-bottom: 35px;
}

.dashboard-card {
  background: white;
  padding: 28px;
  border-radius: 12px;
  border: 1px solid #e5e9ef;
  text-decoration: none;
  color: inherit;
  transition: 0.2s;
}

.dashboard-card:hover {
  border-color: #1769aa;
  transform: translateY(-2px);
}

.dashboard-card h3 {
  margin-top: 0;
  color: #1769aa;
}

.dashboard-card p {
  color: #687386;
  line-height: 1.5;
  margin-bottom: 0;
}

@media (max-width: 750px) {
  .profile-info {
    grid-template-columns: 1fr;
  }

  .dashboard-grid {
    grid-template-columns: 1fr;
  }

  .dashboard-header {
    padding: 25px 5%;
  }

  .dashboard-header h1 {
    font-size: 27px;
  }

  .header-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .language-switcher {
    justify-content: center;
  }

  .logout-btn {
    width: 100%;
  }

  .agent-profile-card {
    padding: 22px;
  }

  .agent-photo-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .form-grid {
    grid-template-columns: 1fr;
    gap: 0;
  }
}
</style>