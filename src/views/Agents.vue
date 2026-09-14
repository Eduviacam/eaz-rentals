<template>
  <div class="agents-page">

    <header class="page-header">

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

      <h1>{{ t('agents.title') }}</h1>

      <p>
        {{ t('agents.subtitle') }}
      </p>

    </header>

    <main class="agents-container">

      <p v-if="loading" class="message">
        {{ t('agents.loading') }}
      </p>

      <p v-else-if="error" class="message error">
        {{ error }}
      </p>

      <div v-else-if="agents.length === 0" class="message">
        <h2>
          {{ t('agents.noAgents') }}
        </h2>

        <p>
          {{ t('agents.noAgentsDescription') }}
        </p>
      </div>

      <div v-else class="agents-grid">

        <div
          v-for="agent in agents"
          :key="agent.id"
          class="agent-card"
        >

          <div class="agent-image">

            <img
              v-if="agent.avatar_url"
              :src="agent.avatar_url"
              :alt="`${agent.full_name || t('agents.verifiedAgent')} ${t('agents.profilePhoto')}`"
              class="agent-photo"
            />

            <div
              v-else
              class="agent-placeholder"
            >
              {{ getInitials(agent.full_name) }}
            </div>

            <div class="verified-badge">
              ✓ {{ t('agents.verified') }}
            </div>

          </div>

          <div class="agent-content">

            <h2>
              {{ agent.full_name || t('agents.verifiedAgent') }}
            </h2>

            <p class="agent-type">
              {{ t('agents.agentType') }}
            </p>

            <p v-if="agent.phone">
              {{ t('agents.phone') }}: {{ agent.phone }}
            </p>

            <p>
              {{ t('agents.properties') }}: {{ agent.property_count }}
            </p>

            <div class="agent-actions">

              <a
                v-if="agent.phone"
                :href="whatsappLink(agent.phone)"
                target="_blank"
                rel="noopener noreferrer"
                class="whatsapp-button"
              >
                {{ t('agents.whatsapp') }}
              </a>

              <button
                type="button"
                class="profile-button"
                @click="viewAgent(agent.id)"
              >
                {{ t('agents.viewProfile') }}
              </button>

            </div>

          </div>

        </div>

      </div>

    </main>

  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { supabase } from '../supabase'

const router = useRouter()
const { t, locale } = useI18n()

const agents = ref([])
const loading = ref(true)
const error = ref('')

function changeLanguage(language) {
  locale.value = language
  localStorage.setItem('eaz-language', language)
}

function getInitials(name) {
  if (!name) {
    return 'EA'
  }

  return name
    .split(' ')
    .filter(Boolean)
    .slice(0, 2)
    .map(word => word.charAt(0).toUpperCase())
    .join('')
}

function whatsappLink(phone) {
  const cleaned = String(phone).replace(/\D/g, '')

  if (cleaned.startsWith('237')) {
    return `https://wa.me/${cleaned}`
  }

  if (cleaned.length === 9 && cleaned.startsWith('6')) {
    return `https://wa.me/237${cleaned}`
  }

  return `https://wa.me/${cleaned}`
}

function viewAgent(id) {
  router.push(`/agent/${id}`)
}

async function loadAgents() {
  loading.value = true
  error.value = ''

  try {
    const { data, error: profileError } = await supabase
      .from('profiles')
      .select(
        'id, full_name, phone, account_type, is_verified, avatar_url'
      )
      .eq('account_type', 'agent')
      .eq('is_verified', true)
      .order('full_name', { ascending: true })

    if (profileError) {
      throw profileError
    }

    const verifiedAgents = data || []

    if (verifiedAgents.length === 0) {
      agents.value = []
      return
    }

    const agentIds = verifiedAgents.map(agent => agent.id)

    const { data: properties, error: propertyError } = await supabase
      .from('properties')
      .select('owner_id')
      .in('owner_id', agentIds)
      .eq('status', 'approved')

    if (propertyError) {
      throw propertyError
    }

    const counts = {}

    for (const property of properties || []) {
      counts[property.owner_id] =
        (counts[property.owner_id] || 0) + 1
    }

    agents.value = verifiedAgents.map(agent => ({
      ...agent,
      property_count: counts[agent.id] || 0
    }))

  } catch (err) {
    console.error(err)

    error.value =
      t('agents.loadError')
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  const savedLanguage = localStorage.getItem('eaz-language')

  if (savedLanguage === 'en' || savedLanguage === 'fr') {
    locale.value = savedLanguage
  }

  loadAgents()
})
</script>

<style scoped>
.agents-page {
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
  max-width: 1200px;
  margin: 0 auto 8px;
  font-size: 36px;
  color: #111827;
}

.page-header p {
  max-width: 1200px;
  margin: 0 auto;
  color: #64748b;
}

.language-switcher {
  position: absolute;
  top: 20px;
  right: 24px;
  display: flex;
  gap: 6px;
}

.language-switcher button {
  padding: 7px 11px;
  border: 1px solid #d1d5db;
  border-radius: 7px;
  background: #ffffff;
  color: #475569;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.language-switcher button.active {
  background: #111827;
  color: #ffffff;
  border-color: #111827;
}

.agents-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 24px;
}

.agents-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.agent-card {
  overflow: hidden;
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(15, 23, 42, 0.06);
}

.agent-image {
  position: relative;
  height: 260px;
  background: #f1f5f9;
}

.agent-photo {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  object-position: center;
}

.agent-placeholder {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 48px;
  font-weight: 700;
  color: #475569;
}

.verified-badge {
  position: absolute;
  top: 14px;
  right: 14px;
  padding: 7px 12px;
  border-radius: 20px;
  background: #ffffff;
  color: #15803d;
  font-size: 13px;
  font-weight: 700;
}

.agent-content {
  padding: 22px;
}

.agent-content h2 {
  margin: 0 0 6px;
  color: #111827;
}

.agent-type {
  margin-bottom: 18px;
  color: #64748b;
}

.agent-actions {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: 20px;
}

.whatsapp-button,
.profile-button {
  min-height: 44px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 9px;
  text-decoration: none;
  font-weight: 600;
  cursor: pointer;
}

.whatsapp-button {
  background: #16a34a;
  color: #ffffff;
}

.profile-button {
  border: 1px solid #d1d5db;
  background: #ffffff;
  color: #111827;
}

.message {
  padding: 60px 20px;
  text-align: center;
  color: #64748b;
}

.message h2 {
  color: #111827;
}

.error {
  color: #b91c1c;
}

@media (max-width: 900px) {
  .agents-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 600px) {
  .page-header {
    padding: 72px 20px 36px;
  }

  .language-switcher {
    top: 18px;
    right: 20px;
  }

  .agents-container {
    padding: 28px 16px;
  }

  .agents-grid {
    grid-template-columns: 1fr;
  }

  .agent-actions {
    grid-template-columns: 1fr;
  }
}
</style>