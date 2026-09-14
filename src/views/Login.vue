<template>
  <div class="auth-page">

    <div class="auth-card">

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
        <h1>Eaz rentals</h1>

        <p>
          {{ currentLanguage === 'fr'
            ? 'Trouvez votre prochain logement.'
            : 'Find your next place.'
          }}
        </p>
      </div>

      <h2>
        {{ currentLanguage === 'fr'
          ? 'Bon retour'
          : 'Welcome back'
        }}
      </h2>

      <p class="subtitle">
        {{ currentLanguage === 'fr'
          ? 'Connectez-vous à votre compte Eaz rentals.'
          : 'Login to your Eaz rentals account.'
        }}
      </p>

      <form @submit.prevent="login">

        <label>
          {{ currentLanguage === 'fr'
            ? 'E-mail'
            : 'Email'
          }}
        </label>

        <input
          v-model="email"
          type="email"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez votre e-mail'
            : 'Enter your email'"
          required
        />

        <div class="password-row">

          <label>
            {{ currentLanguage === 'fr'
              ? 'Mot de passe'
              : 'Password'
            }}
          </label>

          <RouterLink to="/forgot-password">
            {{ currentLanguage === 'fr'
              ? 'Mot de passe oublié ?'
              : 'Forgot password?'
            }}
          </RouterLink>

        </div>

        <input
          v-model="password"
          type="password"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez votre mot de passe'
            : 'Enter your password'"
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
                ? 'Se connecter'
                : 'Login')
          }}
        </button>

      </form>

      <p
        v-if="message"
        class="success"
      >
        {{ message }}
      </p>

      <p
        v-if="error"
        class="error"
      >
        {{ error }}
      </p>

      <p class="register">

        {{ currentLanguage === 'fr'
          ? 'Vous n’avez pas de compte ?'
          : "Don't have an account?"
        }}

        <RouterLink to="/register">
          {{ currentLanguage === 'fr'
            ? 'Créer un compte'
            : 'Create one'
          }}
        </RouterLink>

      </p>

    </div>

  </div>
</template>

<script setup>

import {
  ref,
  computed,
  onMounted
} from 'vue'

import {
  useRouter
} from 'vue-router'

import {
  useI18n
} from 'vue-i18n'

import {
  supabase
} from '../supabase'

const router =
  useRouter()

const {
  locale
} =
  useI18n()

const currentLanguage =
  computed(() => {
    return locale.value
  })

function changeLanguage(
  language
) {

  locale.value =
    language

  localStorage.setItem(
    'eaz-language',
    language
  )

}

const email =
  ref('')

const password =
  ref('')

const loading =
  ref(false)

const message =
  ref('')

const error =
  ref('')

async function login() {

  loading.value =
    true

  message.value =
    ''

  error.value =
    ''

  try {

    const {
      data,
      error: loginError
    } =
      await supabase.auth
        .signInWithPassword({
          email:
            email.value,

          password:
            password.value
        })

    if (loginError) {
      throw loginError
    }

    if (data.user) {

      message.value =
        currentLanguage.value === 'fr'
          ? 'Connexion réussie.'
          : 'Login successful.'

      setTimeout(() => {

        router.push(
          '/dashboard'
        )

      }, 500)

    }

  } catch (err) {

    console.error(
      err
    )

    error.value =
      err.message ||
      (
        currentLanguage.value === 'fr'
          ? 'Échec de la connexion.'
          : 'Login failed.'
      )

  } finally {

    loading.value =
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

})

</script>

<style scoped>

.auth-page {
  position: relative;
  min-height: calc(100vh - 75px);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 40px 20px;
  background: #f7f9fc;
}

.auth-card {
  position: relative;
  width: 100%;
  max-width: 430px;
  background: white;
  padding: 40px;
  border-radius: 14px;
  border: 1px solid #e5e9ef;
}

.language-switcher {
  position: absolute;
  top: 18px;
  right: 18px;
  display: flex;
  gap: 4px;
  padding: 4px;
  border: 1px solid #e5e9ef;
  border-radius: 8px;
  background: #f7f9fc;
}

.language-switcher button {
  width: auto;
  margin: 0;
  padding: 6px 9px;
  border: none;
  border-radius: 5px;
  background: transparent;
  color: #687386;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
}

.language-switcher button:hover {
  background: #e5e9ef;
}

.language-switcher button.active {
  background: #1769aa;
  color: white;
}

.brand {
  text-align: center;
  margin-bottom: 30px;
  padding-top: 15px;
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

.auth-card h2 {
  margin-bottom: 8px;
  font-size: 27px;
}

.subtitle {
  color: #687386;
  margin-bottom: 25px;
}

form label {
  display: block;
  margin: 18px 0 8px;
  font-weight: 600;
}

form input {
  width: 100%;
  padding: 14px;
  border: 1px solid #d9dde5;
  border-radius: 7px;
  font-size: 15px;
  box-sizing: border-box;
}

form input:focus {
  border-color: #1769aa;
  outline: none;
}

.password-row {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.password-row label {
  margin-bottom: 8px;
}

.password-row a {
  color: #1769aa;
  font-size: 13px;
  text-decoration: none;
}

.password-row a:hover {
  text-decoration: underline;
}

form > button {
  width: 100%;
  margin-top: 25px;
  padding: 14px;
  border: none;
  border-radius: 7px;
  background: #1769aa;
  color: white;
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
}

form > button:hover {
  background: #125687;
}

form > button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.success {
  margin-top: 18px;
  text-align: center;
  color: #1769aa;
  font-weight: 600;
}

.error {
  margin-top: 18px;
  text-align: center;
  color: #d93025;
  font-weight: 600;
}

.register {
  margin-top: 25px;
  text-align: center;
  color: #687386;
}

.register a {
  color: #1769aa;
  text-decoration: none;
  font-weight: 600;
}

.register a:hover {
  text-decoration: underline;
}

@media (max-width: 500px) {

  .auth-page {
    padding: 25px 14px;
  }

  .auth-card {
    padding: 32px 22px;
  }

  .language-switcher {
    top: 14px;
    right: 14px;
  }

}

</style>