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
          ? 'Réinitialiser le mot de passe'
          : 'Reset Password'
        }}
      </h2>

      <p class="subtitle">
        {{ currentLanguage === 'fr'
          ? 'Entrez un nouveau mot de passe pour votre compte Eaz rentals.'
          : 'Enter a new password for your Eaz rentals account.'
        }}
      </p>

      <form @submit.prevent="updatePassword">

        <label>
          {{ currentLanguage === 'fr'
            ? 'Nouveau mot de passe'
            : 'New Password'
          }}
        </label>

        <input
          v-model="password"
          type="password"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez votre nouveau mot de passe'
            : 'Enter your new password'"
          minlength="6"
          required
        />

        <label>
          {{ currentLanguage === 'fr'
            ? 'Confirmer le mot de passe'
            : 'Confirm Password'
          }}
        </label>

        <input
          v-model="confirmPassword"
          type="password"
          :placeholder="currentLanguage === 'fr'
            ? 'Confirmez votre nouveau mot de passe'
            : 'Confirm your new password'"
          minlength="6"
          required
        />

        <button
          type="submit"
          :disabled="loading"
        >
          {{ loading
            ? (currentLanguage === 'fr'
                ? 'Mise à jour...'
                : 'Updating...')
            : (currentLanguage === 'fr'
                ? 'Mettre à jour le mot de passe'
                : 'Update Password')
          }}
        </button>

      </form>

      <p
        v-if="message"
        class="message"
      >
        {{ message }}
      </p>

      <p
        v-if="error"
        class="error"
      >
        {{ error }}
      </p>

      <RouterLink
        to="/login"
        class="back-link"
      >
        {{ currentLanguage === 'fr'
          ? 'Retour à la connexion'
          : 'Back to Login'
        }}
      </RouterLink>

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
} = useI18n()

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

const password =
  ref('')

const confirmPassword =
  ref('')

const loading =
  ref(false)

const message =
  ref('')

const error =
  ref('')

async function updatePassword() {

  message.value =
    ''

  error.value =
    ''

  if (
    password.value !==
    confirmPassword.value
  ) {

    error.value =
      currentLanguage.value === 'fr'
        ? 'Les mots de passe ne correspondent pas.'
        : 'Passwords do not match.'

    return

  }

  loading.value =
    true

  try {

    const {
      error: updateError
    } =
      await supabase.auth
        .updateUser({

          password:
            password.value

        })

    if (updateError) {
      throw updateError
    }

    message.value =
      currentLanguage.value === 'fr'
        ? 'Mot de passe mis à jour avec succès.'
        : 'Password updated successfully.'

    setTimeout(() => {

      router.push(
        '/login'
      )

    }, 2000)

  } catch (err) {

    console.error(
      err
    )

    error.value =
      err.message ||
      (
        currentLanguage.value === 'fr'
          ? 'Échec de la mise à jour du mot de passe.'
          : 'Password update failed.'
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
  margin-bottom: 10px;
  font-size: 27px;
}

.subtitle {
  color: #687386;
  line-height: 1.6;
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
  outline: none;
}

form input:focus {
  border-color: #1769aa;
}

form button {
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

form button:hover {
  background: #125687;
}

form button:disabled {
  opacity: 0.7;
  cursor: not-allowed;
}

.message {
  margin-top: 18px;
  text-align: center;
  color: #1769aa;
  font-weight: 600;
  line-height: 1.5;
}

.error {
  margin-top: 18px;
  text-align: center;
  color: #d93025;
  font-weight: 600;
  line-height: 1.5;
}

.back-link {
  display: block;
  margin-top: 25px;
  text-align: center;
  color: #1769aa;
  font-weight: 600;
  text-decoration: none;
}

.back-link:hover {
  text-decoration: underline;
}

@media (max-width: 500px) {

  .auth-page {
    padding: 25px 14px;
  }

  .auth-card {
    padding: 32px 22px;
  }

}

</style>