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
            ? 'Votre marketplace immobilier.'
            : 'Your property marketplace.'
          }}
        </p>
      </div>

      <h2>
        {{ currentLanguage === 'fr'
          ? 'Créer un compte'
          : 'Create an account'
        }}
      </h2>

      <p class="subtitle">
        {{ currentLanguage === 'fr'
          ? 'Rejoignez Eaz rentals dès aujourd’hui.'
          : 'Join Eaz rentals today.'
        }}
      </p>

      <form @submit.prevent="register">

        <label>
          {{ currentLanguage === 'fr'
            ? 'Nom complet'
            : 'Full Name'
          }}
        </label>

        <input
          v-model="form.name"
          type="text"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez votre nom complet'
            : 'Enter your full name'"
          required
        />

        <label>
          {{ currentLanguage === 'fr'
            ? 'E-mail'
            : 'Email'
          }}
        </label>

        <input
          v-model="form.email"
          type="email"
          :placeholder="currentLanguage === 'fr'
            ? 'Entrez votre e-mail'
            : 'Enter your email'"
          required
        />

        <label>
          {{ currentLanguage === 'fr'
            ? 'Numéro de téléphone'
            : 'Phone Number'
          }}
        </label>

        <input
          v-model="form.phone"
          type="tel"
          :placeholder="currentLanguage === 'fr'
            ? 'Exemple : 6XXXXXXXX'
            : 'Example: 6XXXXXXXX'"
          required
        />

        <label>
          {{ currentLanguage === 'fr'
            ? 'Mot de passe'
            : 'Password'
          }}
        </label>

        <input
          v-model="form.password"
          type="password"
          :placeholder="currentLanguage === 'fr'
            ? 'Créez un mot de passe'
            : 'Create a password'"
          minlength="6"
          required
        />

        <label>
          {{ currentLanguage === 'fr'
            ? 'Type de compte'
            : 'Account Type'
          }}
        </label>

        <select
          v-model="form.accountType"
          required
        >

          <option
            disabled
            value=""
          >
            {{ currentLanguage === 'fr'
              ? 'Sélectionnez le type de compte'
              : 'Select Account Type'
            }}
          </option>

          <option value="user">
            {{ currentLanguage === 'fr'
              ? 'Chercheur de propriété'
              : 'Property Seeker'
            }}
          </option>

          <option value="landlord">
            {{ currentLanguage === 'fr'
              ? 'Propriétaire'
              : 'Landlord / Property Owner'
            }}
          </option>

          <option value="agent">
            {{ currentLanguage === 'fr'
              ? 'Agent immobilier'
              : 'Real Estate Agent'
            }}
          </option>

        </select>

        <button
          type="submit"
          :disabled="loading"
        >
          {{ loading
            ? (currentLanguage === 'fr'
                ? 'Création du compte...'
                : 'Creating Account...')
            : (currentLanguage === 'fr'
                ? 'Créer un compte'
                : 'Create Account')
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

      <p class="account-link">

        {{ currentLanguage === 'fr'
          ? 'Vous avez déjà un compte ?'
          : 'Already have an account?'
        }}

        <RouterLink to="/login">
          {{ currentLanguage === 'fr'
            ? 'Se connecter'
            : 'Login'
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
  useI18n
} from 'vue-i18n'

import {
  supabase
} from '../supabase'

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

const form = ref({

  name: '',

  email: '',

  phone: '',

  password: '',

  accountType: ''

})

const loading =
  ref(false)

const message =
  ref('')

const error =
  ref('')

async function register() {

  loading.value =
    true

  message.value =
    ''

  error.value =
    ''

  try {

    const {
      data,
      error: signUpError
    } =
      await supabase.auth
        .signUp({

          email:
            form.value.email,

          password:
            form.value.password,

          options: {

            data: {

              full_name:
                form.value.name,

              phone:
                form.value.phone,

              account_type:
                form.value.accountType

            }

          }

        })

    if (signUpError) {
      throw signUpError
    }

    if (data.user) {

      message.value =
        currentLanguage.value === 'fr'
          ? 'Compte créé avec succès. Vérifiez votre e-mail pour confirmer votre compte.'
          : 'Account created successfully. Check your email to confirm your account.'

      form.value = {

        name: '',

        email: '',

        phone: '',

        password: '',

        accountType: ''

      }

    }

  } catch (err) {

    console.error(
      err
    )

    error.value =
      err.message ||
      (
        currentLanguage.value === 'fr'
          ? 'Échec de l’inscription.'
          : 'Registration failed.'
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
  max-width: 480px;
  background: white;
  padding: 40px;
  border-radius: 14px;
  border: 1px solid #e5e9ef;
  box-shadow:
    0 8px 30px rgba(
      0,
      0,
      0,
      0.06
    );
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
  color: #333;
}

form input,
form select {
  width: 100%;
  padding: 14px;
  border: 1px solid #d9dde5;
  border-radius: 7px;
  font-size: 15px;
  outline: none;
  background: white;
  color: #333;
  box-sizing: border-box;
}

form input:focus,
form select:focus {
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

.account-link {
  margin-top: 25px;
  text-align: center;
  color: #687386;
}

.account-link a {
  color: #1769aa;
  font-weight: 600;
  text-decoration: none;
}

.account-link a:hover {
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