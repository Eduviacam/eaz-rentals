<template>
  <div class="admin-page">

    <div class="admin-card">

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

      <div class="brand">

        <h1>
          Eaz rentals
        </h1>

        <p>
          {{ currentLanguage === 'fr'
            ? 'Portail administrateur'
            : 'Administrator Portal'
          }}
        </p>

      </div>

      <h2>
        {{ currentLanguage === 'fr'
          ? 'Connexion administrateur'
          : 'Admin Login'
        }}
      </h2>

      <form @submit.prevent="login">

        <label for="admin-email">
          {{ currentLanguage === 'fr'
            ? 'E-mail'
            : 'Email'
          }}
        </label>

        <input
          id="admin-email"
          v-model="email"
          type="email"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez l’e-mail administrateur'
            : 'Enter admin email'"
          autocomplete="email"
          required
        />

        <label for="admin-password">
          {{ currentLanguage === 'fr'
            ? 'Mot de passe'
            : 'Password'
          }}
        </label>

        <input
          id="admin-password"
          v-model="password"
          type="password"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez le mot de passe administrateur'
            : 'Enter admin password'"
          autocomplete="current-password"
          required
        />

        <button
          type="submit"
          :disabled="loading"
        >
          {{ loading
            ? (currentLanguage === 'fr'
                ? 'Connexion...'
                : 'Logging in...')
            : (currentLanguage === 'fr'
                ? 'Connexion administrateur'
                : 'Admin Login')
          }}
        </button>

      </form>

      <p
        v-if="error"
        class="error"
      >
        {{ error }}
      </p>

    </div>

  </div>
</template>

<script setup>

import {
  computed,
  onMounted,
  ref
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  supabase
} from '../supabase'

const router = useRouter()

const email = ref('')
const password = ref('')

const loading = ref(false)
const error = ref('')

const currentLanguage = ref('en')

function changeLanguage(language) {

  currentLanguage.value =
    language

  localStorage.setItem(
    'eaz-language',
    language
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

    currentLanguage.value =
      savedLanguage

  }

})

async function login() {

  loading.value = true
  error.value = ''

  try {

    const {
      data,
      error: loginError
    } =
      await supabase.auth
        .signInWithPassword({

          email:
            email.value.trim(),

          password:
            password.value

        })

    if (loginError) {
      throw loginError
    }

    if (!data.user) {

      throw new Error(
        currentLanguage.value === 'fr'
          ? 'Échec de la connexion administrateur.'
          : 'Admin login failed.'
      )

    }

    router.push('/admin')

  } catch (err) {

    console.error(
      'Admin login error:',
      err
    )

    error.value =
      currentLanguage.value === 'fr'
        ? 'Échec de la connexion administrateur. Vérifiez votre e-mail et votre mot de passe.'
        : 'Admin login failed. Please check your email and password.'

  } finally {

    loading.value = false

  }

}

</script>

<style scoped>

.admin-page {
  min-height: calc(100vh - 75px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: #f7f9fc;
}

.admin-card {
  width: 100%;
  max-width: 430px;
  background: #ffffff;
  padding: 40px;
  border-radius: 14px;
  border: 1px solid #e5e9ef;
  box-sizing: border-box;
}

.language-switcher {
  display: flex;
  justify-content: flex-end;
  gap: 6px;
  margin-bottom: 20px;
}

.language-switcher button {
  border: 1px solid #d9dde5;
  background: #ffffff;
  color: #172033;
  padding: 6px 10px;
  border-radius: 6px;
  cursor: pointer;
  font-weight: 600;
}

.language-switcher button:hover {
  background: #f1f5f9;
}

.language-switcher button.active {
  background: #1769aa;
  color: #ffffff;
  border-color: #1769aa;
}

.brand {
  text-align: center;
  margin-bottom: 30px;
}

.brand h1 {
  margin: 0;
  color: #1769aa;
  font-size: 28px;
}

.brand p {
  margin-top: 6px;
  color: #687386;
}

.admin-card h2 {
  margin-bottom: 25px;
  font-size: 27px;
  color: #172033;
}

form label {
  display: block;
  margin: 18px 0 8px;
  font-weight: 600;
  color: #172033;
}

form input {
  width: 100%;
  padding: 14px;
  border: 1px solid #d9dde5;
  border-radius: 7px;
  font-size: 15px;
  box-sizing: border-box;
  background: #ffffff;
  color: #172033;
}

form input:focus {
  border-color: #1769aa;
  outline: none;
  box-shadow: 0 0 0 3px rgba(
    23,
    105,
    170,
    0.1
  );
}

form button {
  width: 100%;
  margin-top: 25px;
  padding: 14px;
  border: none;
  border-radius: 7px;
  background: #1769aa;
  color: #ffffff;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

form button:hover {
  background: #125687;
}

form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.error {
  margin-top: 18px;
  text-align: center;
  color: #d93025;
  font-weight: 600;
  line-height: 1.5;
}

@media (max-width: 520px) {

  .admin-card {
    padding: 28px 22px;
  }

}

</style>