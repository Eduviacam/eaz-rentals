<template>
  <div class="home">

    <header class="site-header">
      <div class="header-inner">

        <RouterLink to="/" class="brand">
          <img
            src="../assets/eaz-rentals-logo.png"
            alt="Eaz rentals"
          />
        </RouterLink>

        <nav class="desktop-nav">

          <RouterLink
            to="/"
            class="active"
          >
            {{ t('nav.home') }}
          </RouterLink>

          <RouterLink to="/housing">
            {{ t('nav.housing') }}
          </RouterLink>

          <RouterLink to="/land">
            {{ t('nav.land') }}
          </RouterLink>

          <RouterLink to="/agents">
            {{ t('nav.agents') }}
          </RouterLink>

          <a href="#why-us">
            {{ currentLanguage === 'fr'
              ? 'À propos'
              : 'About'
            }}
          </a>

          <a href="#contact">
            {{ t('footer.contact') }}
          </a>

        </nav>


        <div class="header-actions">

          <!-- LANGUAGE SWITCHER -->

          <div class="home-language-switcher">

            <button
              type="button"
              :class="{
                active: currentLanguage === 'en'
              }"
              @click="changeLanguage('en')"
            >
              EN
            </button>

            <span>/</span>

            <button
              type="button"
              :class="{
                active: currentLanguage === 'fr'
              }"
              @click="changeLanguage('fr')"
            >
              FR
            </button>

          </div>


          <button
            class="search-icon"
            type="button"
            :aria-label="t('common.search')"
            @click="focusSearch"
          >
            ⌕
          </button>


          <RouterLink
            to="/login"
            class="login-button"
          >
            {{ t('nav.login') }}
          </RouterLink>


          <RouterLink
            to="/register"
            class="signup-button"
          >
            {{ t('nav.register') }}
          </RouterLink>


          <RouterLink
            to="/post-property"
            class="post-button"
          >
            <span>⌂</span>
            {{ t('nav.postProperty') }}
          </RouterLink>

        </div>

      </div>
    </header>


    <!-- HERO -->

    <section class="hero">

      <img
        src="../assets/eaz-city-hero.png"
        alt="Eaz rentals city"
        class="hero-image"
      />

      <div class="hero-overlay"></div>


      <div class="hero-content">

        <div class="welcome-label">
          {{ currentLanguage === 'fr'
            ? 'BIENVENUE SUR EAZ RENTALS'
            : 'WELCOME TO EAZ RENTALS'
          }}
        </div>


        <h1>
          <template v-if="currentLanguage === 'fr'">
            {{ 'Trouvez votre' }}
            <br />
            <span>{{ 'logement idéal' }}</span>
          </template>

          <template v-else>
            Find your
            <br />
            perfect <span>home</span>
          </template>
        </h1>


        <p class="hero-description">

          {{ currentLanguage === 'fr'
            ? 'Maisons, appartements, chambres, terrains et plus encore. Tout au même endroit.'
            : 'Houses, Apartments, Rooms, Land and More All in One Place.'
          }}

        </p>


        <div class="hero-benefits">

          <div class="hero-benefit">

            <span class="benefit-icon">
              ✓
            </span>

            {{ currentLanguage === 'fr'
              ? 'Biens vérifiés'
              : 'Verified Listings'
            }}

          </div>


          <div class="hero-benefit">

            <span class="benefit-icon">
              ●
            </span>

            {{ currentLanguage === 'fr'
              ? 'Agents de confiance'
              : 'Trusted Agents'
            }}

          </div>


          <div class="hero-benefit">

            <span class="benefit-icon">
              ⌖
            </span>

            {{ currentLanguage === 'fr'
              ? 'Partout au Cameroun'
              : 'Across Cameroon'
            }}

          </div>

        </div>

      </div>


      <!-- SEARCH -->

      <div
        class="hero-search-wrapper"
        ref="searchPanel"
      >

        <div class="search-tabs">

          <button
            type="button"
            :class="{
              active:
                searchMode === 'housing'
            }"
            @click="setSearchMode('housing')"
          >
            ⌂
            {{ currentLanguage === 'fr'
              ? 'Logements'
              : 'Housing'
            }}
          </button>


          <button
            type="button"
            :class="{
              active:
                searchMode === 'land'
            }"
            @click="setSearchMode('land')"
          >
            ♧
            {{ currentLanguage === 'fr'
              ? 'Terrains'
              : 'Land'
            }}
          </button>

        </div>


        <form
          class="search-box"
          @submit.prevent="searchProperties"
        >

          <div
            class="search-field location-field"
          >

            <span class="field-icon">
              ⌖
            </span>

            <div class="field-content">

              <label>
                {{ currentLanguage === 'fr'
                  ? 'VILLE'
                  : 'CITY'
                }}
              </label>


              <input
                v-model="search"
                type="text"
                :placeholder="
                  currentLanguage === 'fr'
                    ? 'Rechercher par ville ou quartier'
                    : 'Search by city or neighborhood'
                "
              />

            </div>

          </div>


          <div class="search-field">

            <div class="field-content">

              <label>
                {{ currentLanguage === 'fr'
                  ? 'TYPE DE BIEN'
                  : 'PROPERTY TYPE'
                }}
              </label>


              <select
                v-model="propertyType"
              >

                <option value="">
                  {{ currentLanguage === 'fr'
                    ? 'Tous'
                    : 'All'
                  }}
                </option>


                <option
                  v-if="
                    searchMode === 'housing'
                  "
                  value="House"
                >
                  {{ currentLanguage === 'fr'
                    ? 'Maison'
                    : 'House'
                  }}
                </option>


                <option
                  v-if="
                    searchMode === 'housing'
                  "
                  value="Apartment"
                >
                  {{ currentLanguage === 'fr'
                    ? 'Appartement'
                    : 'Apartment'
                  }}
                </option>


                <option
                  v-if="
                    searchMode === 'housing'
                  "
                  value="Studio"
                >
                  {{ currentLanguage === 'fr'
                    ? 'Studio'
                    : 'Studio'
                  }}
                </option>


                <option
                  v-if="
                    searchMode === 'land'
                  "
                  value="Land"
                >
                  {{ currentLanguage === 'fr'
                    ? 'Terrain'
                    : 'Land'
                  }}
                </option>

              </select>

            </div>

          </div>


          <div class="search-field">

            <div class="field-content">

              <label>
                {{ currentLanguage === 'fr'
                  ? 'PRIX'
                  : 'PRICE'
                }}
              </label>


              <select
                v-model="priceRange"
              >

                <option value="">
                  {{ currentLanguage === 'fr'
                    ? 'Tous les prix'
                    : 'Any price'
                  }}
                </option>


                <option value="under-100000">
                  {{ currentLanguage === 'fr'
                    ? 'Moins de 100 000 FCFA'
                    : 'Under 100,000 XAF'
                  }}
                </option>


                <option value="100000-250000">
                  {{ currentLanguage === 'fr'
                    ? '100 000 - 250 000 FCFA'
                    : '100,000 - 250,000 XAF'
                  }}
                </option>


                <option value="250000-500000">
                  {{ currentLanguage === 'fr'
                    ? '250 000 - 500 000 FCFA'
                    : '250,000 - 500,000 XAF'
                  }}
                </option>


                <option value="500000-1000000">
                  {{ currentLanguage === 'fr'
                    ? '500 000 - 1 000 000 FCFA'
                    : '500,000 - 1,000,000 XAF'
                  }}
                </option>


                <option value="over-1000000">
                  {{ currentLanguage === 'fr'
                    ? 'Plus de 1 000 000 FCFA'
                    : 'Over 1,000,000 XAF'
                  }}
                </option>

              </select>

            </div>

          </div>


          <button
            type="submit"
            class="search-button"
          >
            ⌕
            {{ t('common.search') }}
          </button>

        </form>


        <div class="popular-row">

          <div class="popular-label">
            ⌖
            {{ currentLanguage === 'fr'
              ? 'Populaire :'
              : 'Popular:'
            }}
          </div>


          <button
            v-for="city in popularCities"
            :key="city"
            type="button"
            class="city-pill"
            @click="searchCity(city)"
          >
            {{ city }}
          </button>


          <button
            type="button"
            class="advanced-search"
            @click="goAdvancedSearch"
          >
            ☷
            {{ currentLanguage === 'fr'
              ? 'Recherche avancée'
              : 'Advanced Search'
            }}
            →
          </button>

        </div>

      </div>

    </section>


    <!-- CATEGORIES -->

    <section class="categories-section">

      <div class="section-intro">

        <p class="eyebrow">
          {{ currentLanguage === 'fr'
            ? 'Explorer Eaz rentals'
            : 'Explore Eaz rentals'
          }}
        </p>


        <h2>
          {{ currentLanguage === 'fr'
            ? 'Trouvez ce que vous cherchez.'
            : "Find what you're looking for."
          }}
        </h2>

      </div>


      <div class="category-grid">

        <!-- RENT -->

        <RouterLink
          to="/housing?listing=rent"
          class="category-card"
        >

          <div class="category-image">

            <img
              src="https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=900&q=80"
              :alt="
                currentLanguage === 'fr'
                  ? 'Maisons à louer'
                  : 'Houses for rent'
              "
            />

          </div>


          <div class="category-info">

            <div class="category-icon">
              ⌂
            </div>


            <div>

              <h3>
                {{ currentLanguage === 'fr'
                  ? 'Maisons à louer'
                  : 'Houses for Rent'
                }}
              </h3>


              <p>
                {{ currentLanguage === 'fr'
                  ? 'Appartements, logements indépendants, chambres et plus'
                  : 'Apartments, self-contained, rooms and more'
                }}
              </p>

            </div>


            <span>
              →
            </span>

          </div>

        </RouterLink>


        <!-- SALE -->

        <RouterLink
          to="/housing?listing=sale"
          class="category-card"
        >

          <div class="category-image">

            <img
              src="https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?auto=format&fit=crop&w=900&q=80"
              :alt="
                currentLanguage === 'fr'
                  ? 'Maisons à vendre'
                  : 'Houses for sale'
              "
            />

          </div>


          <div class="category-info">

            <div class="category-icon">
              ●
            </div>


            <div>

              <h3>
                {{ currentLanguage === 'fr'
                  ? 'Maisons à vendre'
                  : 'Houses for Sale'
                }}
              </h3>


              <p>
                {{ currentLanguage === 'fr'
                  ? 'Trouvez et achetez la maison de vos rêves'
                  : 'Find and own your dream home'
                }}
              </p>

            </div>


            <span>
              →
            </span>

          </div>

        </RouterLink>


        <!-- LAND -->

        <RouterLink
          to="/land?listing=sale"
          class="category-card"
        >

          <div class="category-image">

            <img
              src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=900&q=80"
              :alt="
                currentLanguage === 'fr'
                  ? 'Terrain à vendre'
                  : 'Land for sale'
              "
            />

          </div>


          <div class="category-info">

            <div class="category-icon">
              ♧
            </div>


            <div>

              <h3>
                {{ currentLanguage === 'fr'
                  ? 'Terrains à vendre'
                  : 'Land for Sale'
                }}
              </h3>


              <p>
                {{ currentLanguage === 'fr'
                  ? 'Terrains résidentiels, commerciaux et agricoles'
                  : 'Residential, commercial, agricultural land'
                }}
              </p>

            </div>


            <span>
              →
            </span>

          </div>

        </RouterLink>


        <!-- AGENTS -->

        <RouterLink
          id="agents"
          to="/agents"
          class="category-card"
        >

          <div
            class="category-image agent-image"
          >

            <img
              src="../assets/eaz-rentals-verified-agent.png"
              :alt="
                currentLanguage === 'fr'
                  ? 'Agent immobilier vérifié'
                  : 'Verified real estate agent'
              "
            />

          </div>


          <div class="category-info">

            <div
              class="category-icon verified-icon"
            >
              ✓
            </div>


            <div>

              <h3>
                {{ currentLanguage === 'fr'
                  ? 'Agents vérifiés'
                  : 'Verified Agents'
                }}
              </h3>


              <p>
                {{ currentLanguage === 'fr'
                  ? 'Travaillez avec des professionnels de confiance'
                  : 'Work with trusted professionals'
                }}
              </p>

            </div>


            <span>
              →
            </span>

          </div>

        </RouterLink>

      </div>

    </section>


    <!-- FEATURED PROPERTIES -->

    <section class="featured-section">

      <div class="section-top">

        <div>

          <h2>
            {{ t('home.featuredProperties') }}
          </h2>


          <p>
            {{ currentLanguage === 'fr'
              ? 'Des biens sélectionnés et vérifiés spécialement pour vous.'
              : 'Handpicked and verified properties just for you.'
            }}
          </p>

        </div>


        <RouterLink
          to="/housing"
          class="view-all"
        >
          {{ currentLanguage === 'fr'
            ? 'Voir tous les biens'
            : 'View All Properties'
          }}
          →
        </RouterLink>

      </div>


      <div
        v-if="loadingProperties"
        class="loading-state"
      >
        {{ t('common.loading') }}
      </div>


      <div
        v-else-if="
          featuredProperties.length
        "
        class="property-grid"
      >

        <RouterLink
          v-for="
            property in featuredProperties
          "
          :key="property.id"
          :to="`/property/${property.id}`"
          class="property-card"
        >

          <div class="property-image">

            <img
              :src="
                getPropertyImage(property)
              "
              :alt="
                property.property_type
              "
            />


            <span
              v-if="property.owner_verified"
              class="verified-badge"
            >
              ✓
              {{ currentLanguage === 'fr'
                ? 'Vérifié'
                : 'Verified'
              }}
            </span>


            <span class="listing-badge">
              {{
                formatListingType(
                  property.listing_type
                )
              }}
            </span>


            <span class="heart">
              ♡
            </span>

          </div>


          <div class="property-content">

            <div class="property-price">

              {{ formatPrice(property.price) }}


              <span
                v-if="
                  isRental(
                    property.listing_type
                  )
                "
              >
                {{
                  currentLanguage === 'fr'
                    ? '/ mois'
                    : '/ month'
                }}
              </span>

            </div>


            <h3>
              {{ getPropertyTitle(property) }}
            </h3>


            <div class="property-location">

              ⌖
              {{ property.neighborhood }},
              {{ property.city }}

            </div>


            <div class="property-meta">

              <span
                v-if="hasUnitAvailability(property)"
                class="unit-availability"
              >
                {{ property.available_units }}
                {{ currentLanguage === 'fr'
                  ? 'disponibles'
                  : 'available'
                }}
              </span>


              <span
                v-if="hasUnitAvailability(property)"
                class="unit-occupied"
              >
                {{ occupiedUnits(property) }}
                {{ currentLanguage === 'fr'
                  ? 'occupées'
                  : 'occupied'
                }}
              </span>


              <span
                v-if="property.bedrooms"
              >
                {{
                  currentLanguage === 'fr'
                    ? `${property.bedrooms} chambres`
                    : `${property.bedrooms} beds`
                }}
              </span>


              <span
                v-if="property.bathrooms"
              >
                {{
                  currentLanguage === 'fr'
                    ? `${property.bathrooms} salles de bain`
                    : `${property.bathrooms} baths`
                }}
              </span>


              <span>
                {{ property.property_type }}
              </span>

            </div>

          </div>

        </RouterLink>

      </div>


      <div
        v-else
        class="empty-featured"
      >

        <h3>
          {{ currentLanguage === 'fr'
            ? 'Biens disponibles bientôt'
            : 'Properties coming soon'
          }}
        </h3>


        <p>
          {{ currentLanguage === 'fr'
            ? 'Les biens approuvés apparaîtront ici.'
            : 'Approved properties will appear here.'
          }}
        </p>


        <RouterLink
          to="/housing"
          class="empty-button"
        >
          {{ currentLanguage === 'fr'
            ? 'Parcourir les biens'
            : 'Browse Properties'
          }}
        </RouterLink>

      </div>

    </section>


    <!-- WHY EAZ RENTALS -->

    <section
      id="why-us"
      class="why-section"
    >

      <div class="section-heading">

        <p class="eyebrow">
          {{ currentLanguage === 'fr'
            ? 'Pourquoi Eaz rentals ?'
            : 'Why Eaz rentals?'
          }}
        </p>


        <h2>
          {{ currentLanguage === 'fr'
            ? 'Une façon plus simple de trouver un bien immobilier au Cameroun.'
            : 'A simpler way to find property in Cameroon.'
          }}
        </h2>

      </div>


      <div class="benefits-grid">

        <div class="benefit-card">

          <div class="large-benefit-icon">
            ✓
          </div>


          <div>

            <h3>
              {{ currentLanguage === 'fr'
                ? 'Biens vérifiés'
                : 'Verified Listings'
              }}
            </h3>


            <p>
              {{ currentLanguage === 'fr'
                ? 'Trouvez des biens authentiques proposés par des propriétaires et agents vérifiés.'
                : 'Find genuine properties from verified landlords and agents.'
              }}
            </p>

          </div>

        </div>


        <div class="benefit-card">

          <div class="large-benefit-icon">
            ●
          </div>


          <div>

            <h3>
              {{ currentLanguage === 'fr'
                ? 'Agents de confiance'
                : 'Trusted Agents'
              }}
            </h3>


            <p>
              {{ currentLanguage === 'fr'
                ? 'Connectez-vous avec des professionnels immobiliers fiables.'
                : 'Connect with reliable property professionals.'
              }}
            </p>

          </div>

        </div>


        <div class="benefit-card">

          <div class="large-benefit-icon">
            ⌕
          </div>


          <div>

            <h3>
              {{ currentLanguage === 'fr'
                ? 'Recherche facile'
                : 'Easy Search'
              }}
            </h3>


            <p>
              {{ currentLanguage === 'fr'
                ? 'Trouvez rapidement et facilement ce dont vous avez besoin.'
                : 'Find what you need quickly and easily.'
              }}
            </p>

          </div>

        </div>


        <div class="benefit-card">

          <div class="large-benefit-icon">
            ↗️
          </div>


          <div>

            <h3>
              {{ currentLanguage === 'fr'
                ? 'Contact direct'
                : 'Direct Contact'
              }}
            </h3>


            <p>
              {{ currentLanguage === 'fr'
                ? 'Échangez directement avec les propriétaires via WhatsApp ou les demandes.'
                : 'Talk directly with owners through WhatsApp or inquiries.'
              }}
            </p>

          </div>

        </div>

      </div>

    </section>


    <!-- CTA -->

    <section class="cta-section">

      <div
        class="cta-card landlord-card"
      >

        <div class="cta-icon">
          ⌂
        </div>


        <div class="cta-content">

          <h3>
            {{ currentLanguage === 'fr'
              ? 'Vous êtes propriétaire ou agent ?'
              : 'Are you a Landlord or Agent?'
            }}
          </h3>


          <p>
            {{ currentLanguage === 'fr'
              ? 'Publiez vos biens et atteignez des locataires et acheteurs potentiels partout au Cameroun.'
              : 'List your properties and reach potential tenants and buyers across Cameroon.'
            }}
          </p>

        </div>


        <RouterLink
          to="/post-property"
          class="cta-button blue-button"
        >
          {{ t('nav.postProperty') }}
          →
        </RouterLink>

      </div>


      <div
        class="cta-card seeker-card"
      >

        <div class="cta-icon gold">
          ●
        </div>


        <div class="cta-content">

          <h3>
            {{ currentLanguage === 'fr'
              ? 'Vous cherchez un logement ou un terrain ?'
              : 'Looking for a Home or Land?'
            }}
          </h3>


          <p>
            {{ currentLanguage === 'fr'
              ? 'Créez un compte, enregistrez vos biens préférés et restez informé.'
              : 'Create an account, save your favorite properties and stay updated.'
            }}
          </p>

        </div>


        <RouterLink
          to="/register"
          class="cta-button gold-button"
        >
          {{ currentLanguage === 'fr'
            ? 'Inscrivez-vous maintenant'
            : 'Sign Up Now'
          }}
          →
        </RouterLink>

      </div>

    </section>


    <!-- FOOTER -->

    <footer
      id="contact"
      class="footer"
    >

      <div class="footer-grid">

        <div class="footer-brand">

          <img
            src="../assets/eaz-rentals-logo.png"
            alt="Eaz rentals"
          />


          <p>
            {{ t('footer.description') }}
          </p>


          <div class="socials">

            <a href="#">
              f
            </a>

            <a href="#">
              ◎
            </a>

            <a href="#">
              X
            </a>

            <a href="#">
              ▶️
            </a>

          </div>

        </div>


        <div class="footer-column">

          <h4>
            {{ t('footer.quickLinks') }}
          </h4>


          <RouterLink to="/">
            {{ t('nav.home') }}
          </RouterLink>


          <RouterLink to="/housing">
            {{ t('nav.housing') }}
          </RouterLink>


          <RouterLink to="/land">
            {{ t('nav.land') }}
          </RouterLink>


          <RouterLink to="/agents">
            {{ t('nav.agents') }}
          </RouterLink>


          <a href="#why-us">
            {{ currentLanguage === 'fr'
              ? 'À propos de nous'
              : 'About Us'
            }}
          </a>


          <a href="#contact">
            {{ t('footer.contact') }}
          </a>

        </div>


        <div class="footer-column">

          <h4>
            {{ currentLanguage === 'fr'
              ? 'Pour les utilisateurs'
              : 'For Users'
            }}
          </h4>


          <RouterLink to="/register">
            {{ t('nav.register') }}
          </RouterLink>


          <RouterLink to="/login">
            {{ t('nav.login') }}
          </RouterLink>


          <RouterLink to="/post-property">
            {{ t('nav.postProperty') }}
          </RouterLink>


          <RouterLink to="/saved-properties">
            {{ t('saved.title') }}
          </RouterLink>


          <RouterLink to="/my-inquiries">
            {{ t('inquiries.title') }}
          </RouterLink>

        </div>


        <div class="footer-column">

          <h4>
            {{ currentLanguage === 'fr'
              ? 'Assistance'
              : 'Support'
            }}
          </h4>


          <a href="#">
            {{ currentLanguage === 'fr'
              ? 'Centre d’aide'
              : 'Help Center'
            }}
          </a>


          <a href="#">
            {{ currentLanguage === 'fr'
              ? 'Conditions générales'
              : 'Terms & Conditions'
            }}
          </a>


          <a href="#">
            {{ currentLanguage === 'fr'
              ? 'Politique de confidentialité'
              : 'Privacy Policy'
            }}
          </a>


          <a href="#">
            {{ currentLanguage === 'fr'
              ? 'Signaler un bien'
              : 'Report a Property'
            }}
          </a>

        </div>


        <div
          class="footer-column newsletter"
        >

          <h4>
            {{ currentLanguage === 'fr'
              ? 'Restez informé'
              : 'Stay Updated'
            }}
          </h4>


          <p>
            {{ currentLanguage === 'fr'
              ? 'Recevez les derniers biens et actualités.'
              : 'Get the latest properties and news.'
            }}
          </p>


          <form
            class="newsletter-form"
            @submit.prevent
          >

            <input
              type="email"
              :placeholder="
                currentLanguage === 'fr'
                  ? 'Votre adresse e-mail'
                  : 'Your email address'
              "
            />


            <button type="submit">
              {{ currentLanguage === 'fr'
                ? 'S’abonner'
                : 'Subscribe'
              }}
            </button>

          </form>


          <p class="copyright">
            ©️ {{ currentYear }}
            Eaz rentals.
            {{ t('footer.rights') }}
          </p>


          <p class="cameroon">
            Cameroon
          </p>

        </div>

      </div>

    </footer>

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
  t,
  locale
} = useI18n()


const currentLanguage =
  computed(() => locale.value)


const search =
  ref('')


const propertyType =
  ref('')


const priceRange =
  ref('')


const searchMode =
  ref('housing')


const searchPanel =
  ref(null)


const featuredProperties =
  ref([])


const loadingProperties =
  ref(true)


const popularCities = [
  'Douala',
  'Yaoundé',
  'Bamenda',
  'Bafoussam',
  'Limbe',
  'Kribi',
  'Garoua'
]


const currentYear =
  new Date().getFullYear()


/*
|--------------------------------------------------------------------------
| LANGUAGE
|--------------------------------------------------------------------------
*/

function changeLanguage(language) {

  locale.value =
    language


  localStorage.setItem(
    'eaz-rentals-language',
    language
  )

}


/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

function focusSearch() {

  searchPanel.value?.scrollIntoView({
    behavior: 'smooth',
    block: 'center'
  })

}


function setSearchMode(mode) {

  searchMode.value =
    mode

  propertyType.value =
    ''

}


function searchCity(city) {

  search.value =
    city

  searchProperties()

}


function goAdvancedSearch() {

  router.push(
    searchMode.value === 'land'
      ? '/land'
      : '/housing'
  )

}


function searchProperties() {

  const query = {}


  if (
    search.value.trim()
  ) {

    query.search =
      search.value.trim()

  }


  if (
    propertyType.value
  ) {

    query.type =
      propertyType.value

  }


  if (
    priceRange.value
  ) {

    query.price =
      priceRange.value

  }


  router.push({

    path:
      searchMode.value === 'land'
        ? '/land'
        : '/housing',

    query

  })

}


/*
|--------------------------------------------------------------------------
| PROPERTY HELPERS
|--------------------------------------------------------------------------
*/

function formatPrice(price) {

  if (
    price === null ||
    price === undefined ||
    price === ''
  ) {

    return currentLanguage.value === 'fr'
      ? 'Prix sur demande'
      : 'Price on request'

  }


  const formatted =
    Number(price).toLocaleString(
      currentLanguage.value === 'fr'
        ? 'fr-FR'
        : 'en-US'
    )


  return `${formatted} ${
    currentLanguage.value === 'fr'
      ? 'FCFA'
      : 'XAF'
  }`

}


function formatListingType(type) {

  const value =
    String(type || '')
      .toLowerCase()


  if (
    value.includes('rent') ||
    value.includes('location')
  ) {

    return currentLanguage.value === 'fr'
      ? 'À louer'
      : 'For Rent'

  }


  if (
    value.includes('sale') ||
    value.includes('sell') ||
    value.includes('vente')
  ) {

    return currentLanguage.value === 'fr'
      ? 'À vendre'
      : 'For Sale'

  }


  return type ||
    (
      currentLanguage.value === 'fr'
        ? 'Disponible'
        : 'Available'
    )

}


function isRental(type) {

  const value =
    String(type || '')
      .toLowerCase()


  return (
    value.includes('rent') ||
    value.includes('location')
  )

}


function getPropertyImage(property) {

  if (
    Array.isArray(
      property.photo_urls
    ) &&
    property.photo_urls.length
  ) {

    return property.photo_urls[0]

  }


  return 'https://images.unsplash.com/photo-1600607687920-4e2a09cf159d?auto=format&fit=crop&w=1000&q=80'

}


function hasUnitAvailability(property) {

  return (
    Number.isFinite(Number(property?.total_units)) &&
    Number(property.total_units) >= 1 &&
    Number.isFinite(Number(property?.available_units)) &&
    Number(property.available_units) >= 0
  )

}


function occupiedUnits(property) {

  if (!hasUnitAvailability(property)) {
    return 0
  }

  return Math.max(
    0,
    Number(property.total_units) -
      Number(property.available_units)
  )

}


function getPropertyTitle(property) {

  const type =
    property.property_type ||
    (
      currentLanguage.value === 'fr'
        ? 'Bien immobilier'
        : 'Property'
    )


  if (
    type
      .toLowerCase()
      .includes('land')
  ) {

    return currentLanguage.value === 'fr'
      ? 'Terrain à vendre'
      : 'Land for Sale'

  }


  const bedrooms =
    Number(
      property.bedrooms || 0
    )


  if (
    bedrooms > 0
  ) {

    return currentLanguage.value === 'fr'
      ? `${bedrooms} chambres ${type}`
      : `${bedrooms} Bedroom ${type}`

  }


  return type

}


/*
|--------------------------------------------------------------------------
| FEATURED PROPERTIES
|--------------------------------------------------------------------------
*/

async function loadFeaturedProperties() {

  loadingProperties.value =
    true


  const {
    data,
    error
  } =
    await supabase
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
        total_units,
        available_units,
        photo_urls,
        owner_verified,
        created_at
      `)
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
      .limit(4)


  if (
    !error &&
    data
  ) {

    featuredProperties.value =
      data

  }


  loadingProperties.value =
    false

}


onMounted(() => {

  loadFeaturedProperties()

})

</script>


<style scoped>

.home {
  min-height: 100vh;
  background: #f7faff;
  color: #0d2342;
}


.site-header {
  position: relative;
  z-index: 20;
  background: white;
  border-bottom: 1px solid #e8eef5;
}


.header-inner {
  width: min(1400px, 94%);
  min-height: 78px;
  margin: auto;
  display: flex;
  align-items: center;
  gap: 25px;
}


.brand {
  width: 205px;
  flex-shrink: 0;
}


.brand img {
  width: 175px;
  height: auto;
  display: block;
}


.desktop-nav {
  display: flex;
  align-items: center;
  gap: 22px;
  flex: 1;
}


.desktop-nav a {
  position: relative;
  color: #18304f;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  padding: 30px 0;
}


.desktop-nav a:hover,
.desktop-nav a.active {
  color: #0879d1;
}


.desktop-nav a.active::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: 20px;
  height: 3px;
  border-radius: 5px;
  background: #0879d1;
}


.header-actions {
  display: flex;
  align-items: center;
  gap: 9px;
}


/*
|--------------------------------------------------------------------------
| HOME LANGUAGE SWITCHER
|--------------------------------------------------------------------------
*/

.home-language-switcher {
  display: flex;
  align-items: center;
  gap: 4px;
  margin-right: 3px;
  font-size: 13px;
  font-weight: 800;
}


.home-language-switcher button {
  border: none;
  background: transparent;
  color: #7b8899;
  padding: 5px 3px;
  cursor: pointer;
  font-size: 13px;
  font-weight: 800;
}


.home-language-switcher button.active {
  color: #0879d1;
}


.home-language-switcher button:hover {
  color: #0879d1;
}


.home-language-switcher span {
  color: #cbd5e1;
}


.search-icon {
  border: none;
  background: transparent;
  color: #0d2342;
  font-size: 28px;
  cursor: pointer;
}


.login-button,
.signup-button,
.post-button {
  text-decoration: none;
  border-radius: 7px;
  padding: 11px 16px;
  font-size: 13px;
  font-weight: 700;
  white-space: nowrap;
}


.login-button {
  color: #0879d1;
  border: 1px solid #0879d1;
  background: white;
}


.signup-button {
  color: white;
  background: #0879d1;
  border: 1px solid #0879d1;
}


.post-button {
  display: flex;
  align-items: center;
  gap: 7px;
  color: #102b4b;
  background: #f5b900;
  border: 1px solid #f5b900;
}


/*
|--------------------------------------------------------------------------
| HERO
|--------------------------------------------------------------------------
*/

.hero {
  position: relative;
  min-height: 610px;
  overflow: visible;
  background: #102b4b;
}


.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
}


.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(3, 20, 43, .48),
      rgba(3, 20, 43, .20),
      rgba(3, 20, 43, .08)
    );
}


.hero-content {
  position: relative;
  z-index: 2;
  width: min(1400px, 94%);
  margin: auto;
  padding: 58px 25px 120px;
}


.welcome-label {
  display: inline-block;
  padding: 7px 15px;
  border-radius: 20px;
  background: rgba(4, 35, 69, .75);
  color: white;
  font-size: 12px;
  font-weight: 800;
}


.hero h1 {
  margin: 14px 0 12px;
  color: white;
  font-size: clamp(48px, 6vw, 74px);
  line-height: .98;
  letter-spacing: -2.5px;
}


.hero h1 span {
  color: #159be9;
}


.hero-description {
  max-width: 650px;
  margin: 0;
  color: white;
  font-size: 17px;
  line-height: 1.5;
}


.hero-benefits {
  display: flex;
  flex-wrap: wrap;
  gap: 28px;
  margin-top: 22px;
}


.hero-benefit {
  display: flex;
  align-items: center;
  gap: 8px;
  color: white;
  font-size: 14px;
  font-weight: 700;
}


.benefit-icon {
  width: 27px;
  height: 27px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
  border-radius: 50%;
}


/*
|--------------------------------------------------------------------------
| SEARCH
|--------------------------------------------------------------------------
*/

.hero-search-wrapper {
  position: absolute;
  z-index: 10;
  left: 50%;
  bottom: -72px;
  transform: translateX(-50%);
  width: min(1320px, 92%);
}


.search-tabs {
  display: flex;
  width: max-content;
}


.search-tabs button {
  border: none;
  padding: 15px 27px;
  background: #eaf1f8;
  color: #17304f;
  font-weight: 800;
  cursor: pointer;
}


.search-tabs button.active {
  background: #0879d1;
  color: white;
}


.search-box {
  display: flex;
  align-items: stretch;
  background: white;
  padding: 9px;
  border-radius: 0 10px 10px 10px;
  box-shadow: 0 15px 35px rgba(13, 35, 66, .16);
}


.search-field {
  flex: 1;
  min-width: 170px;
  padding: 8px 17px;
  border-right: 1px solid #e3eaf2;
}


.location-field {
  flex: 1.5;
  display: flex;
  align-items: center;
  gap: 11px;
}


.field-icon {
  color: #0879d1;
  font-size: 22px;
}


.field-content {
  width: 100%;
}


.search-field label {
  display: block;
  margin-bottom: 4px;
  color: #7b8899;
  font-size: 10px;
  font-weight: 800;
  text-transform: uppercase;
}


.search-field input,
.search-field select {
  width: 100%;
  border: none;
  outline: none;
  background: transparent;
  color: #17304f;
}


.search-button {
  min-width: 145px;
  border: none;
  border-radius: 7px;
  background: #0879d1;
  color: white;
  font-weight: 800;
  cursor: pointer;
}


.popular-row {
  display: flex;
  align-items: center;
  gap: 9px;
  padding: 14px 8px 0;
  flex-wrap: wrap;
}


.popular-label {
  color: #102b4b;
  font-size: 13px;
  font-weight: 800;
}


.city-pill {
  border: 1px solid #e0e8f1;
  background: white;
  color: #314763;
  border-radius: 20px;
  padding: 7px 14px;
  cursor: pointer;
  font-size: 12px;
}


.advanced-search {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #0879d1;
  font-weight: 800;
  cursor: pointer;
}


/*
|--------------------------------------------------------------------------
| CATEGORIES
|--------------------------------------------------------------------------
*/

.categories-section,
.featured-section {
  width: min(1400px, 94%);
  margin: auto;
}


.categories-section {
  padding: 145px 0 45px;
}


.section-intro {
  margin-bottom: 22px;
}


.section-intro h2,
.section-top h2,
.section-heading h2 {
  margin: 0;
  color: #102b4b;
}


.eyebrow {
  margin: 0 0 7px;
  color: #0879d1;
  font-size: 12px;
  font-weight: 900;
  text-transform: uppercase;
}


.category-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}


.category-card {
  overflow: hidden;
  background: white;
  border: 1px solid #e1e8f0;
  border-radius: 8px;
  text-decoration: none;
  color: inherit;
  transition: .2s;
}


.category-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 15px 30px rgba(13,35,66,.1);
}


.category-image {
  height: 150px;
  overflow: hidden;
}


.category-image img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}


.category-info {
  min-height: 100px;
  padding: 15px;
  display: flex;
  align-items: center;
  gap: 11px;
}


.category-icon {
  width: 43px;
  height: 43px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e9f4fc;
  color: #0879d1;
  font-size: 20px;
  font-weight: 900;
}


.category-info h3 {
  margin: 0 0 4px;
  color: #102b4b;
  font-size: 16px;
}


.category-info p {
  margin: 0;
  color: #6c7b8e;
  font-size: 12px;
  line-height: 1.45;
}


.category-info > span {
  margin-left: auto;
  color: #0879d1;
  font-size: 21px;
}


/*
|--------------------------------------------------------------------------
| FEATURED
|--------------------------------------------------------------------------
*/

.featured-section {
  padding: 30px 0 80px;
}


.section-top {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  margin-bottom: 25px;
}


.section-top p {
  margin: 5px 0 0;
  color: #6d7c8f;
  font-size: 14px;
}


.view-all {
  color: #0879d1;
  text-decoration: none;
  font-weight: 800;
  font-size: 13px;
}


.property-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}


.property-card {
  overflow: hidden;
  background: white;
  border: 1px solid #e0e7ef;
  border-radius: 8px;
  color: inherit;
  text-decoration: none;
}


.property-image {
  position: relative;
  height: 215px;
}


.property-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}


.verified-badge {
  position: absolute;
  top: 10px;
  left: 10px;
  background: #0879d1;
  color: white;
  padding: 6px 9px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 800;
}


.listing-badge {
  position: absolute;
  bottom: 10px;
  left: 10px;
  background: white;
  padding: 5px 9px;
  border-radius: 5px;
  font-size: 11px;
  font-weight: 800;
}


.heart {
  position: absolute;
  top: 10px;
  right: 10px;
  background: white;
  border-radius: 50%;
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 22px;
}


.property-content {
  padding: 15px;
}


.property-price {
  color: #0879d1;
  font-weight: 900;
}


.property-price span {
  color: #6c7b8e;
  font-size: 11px;
}


.property-content h3 {
  margin: 7px 0;
  color: #102b4b;
  font-size: 15px;
}


.property-location {
  color: #64758a;
  font-size: 12px;
}


.property-meta {
  display: flex;
  gap: 12px;
  padding-top: 13px;
  margin-top: 12px;
  border-top: 1px solid #edf1f5;
  color: #596c83;
  font-size: 11px;
}


.loading-state,
.empty-featured {
  padding: 55px 20px;
  text-align: center;
  background: white;
  border: 1px solid #e1e8f0;
  border-radius: 10px;
  color: #65768b;
}


.empty-featured h3 {
  color: #102b4b;
}


.empty-button {
  display: inline-block;
  padding: 11px 18px;
  background: #0879d1;
  color: white;
  text-decoration: none;
  border-radius: 6px;
}


/*
|--------------------------------------------------------------------------
| WHY SECTION
|--------------------------------------------------------------------------
*/

.why-section {
  padding: 80px max(3%, calc((100% - 1400px) / 2));
  background: white;
  border-top: 1px solid #e5ebf2;
}


.section-heading {
  margin-bottom: 35px;
}


.section-heading h2 {
  max-width: 650px;
  font-size: 32px;
}


.benefits-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 30px;
}


.benefit-card {
  display: flex;
  gap: 13px;
}


.large-benefit-icon {
  width: 55px;
  height: 55px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #e8f4fd;
  color: #0879d1;
  font-size: 23px;
  font-weight: 900;
}


.benefit-card h3 {
  margin: 4px 0 6px;
  font-size: 15px;
  color: #102b4b;
}


.benefit-card p {
  margin: 0;
  color: #718095;
  font-size: 12px;
  line-height: 1.55;
}


/*
|--------------------------------------------------------------------------
| CTA
|--------------------------------------------------------------------------
*/

.cta-section {
  width: min(1400px, 94%);
  margin: auto;
  padding: 35px 0 80px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}


.cta-card {
  display: flex;
  align-items: center;
  gap: 17px;
  padding: 27px;
  border-radius: 8px;
}


.landlord-card {
  background: #eaf5ff;
}


.seeker-card {
  background: #fff7df;
}


.cta-icon {
  width: 57px;
  height: 57px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  background: #0879d1;
  color: white;
  font-size: 25px;
}


.cta-icon.gold {
  background: #e5a900;
}


.cta-content {
  flex: 1;
}


.cta-content h3 {
  margin: 0 0 6px;
  color: #102b4b;
  font-size: 16px;
}


.cta-content p {
  margin: 0;
  color: #63758a;
  font-size: 12px;
  line-height: 1.5;
}


.cta-button {
  flex-shrink: 0;
  padding: 12px 18px;
  border-radius: 6px;
  text-decoration: none;
  font-size: 12px;
  font-weight: 800;
}


.blue-button {
  background: #0879d1;
  color: white;
}


.gold-button {
  background: #f0b400;
  color: #102b4b;
}


/*
|--------------------------------------------------------------------------
| FOOTER
|--------------------------------------------------------------------------
*/

.footer {
  background: #06294b;
  color: white;
  padding: 65px max(3%, calc((100% - 1400px) / 2)) 30px;
}


.footer-grid {
  display: grid;
  grid-template-columns: 1.6fr .8fr .9fr .9fr 1.3fr;
  gap: 45px;
}


.footer-brand img {
  width: 170px;
  background: white;
  border-radius: 8px;
  padding: 5px;
}


.footer-brand p {
  max-width: 285px;
  color: #c4d2df;
  font-size: 12px;
  line-height: 1.7;
}


.socials {
  display: flex;
  gap: 9px;
  margin-top: 20px;
}


.socials a {
  width: 31px;
  height: 31px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid rgba(255,255,255,.4);
  border-radius: 50%;
  color: white;
  text-decoration: none;
}


.footer-column {
  display: flex;
  flex-direction: column;
  gap: 10px;
}


.footer-column h4 {
  margin: 0 0 7px;
}


.footer-column a {
  color: #c4d2df;
  text-decoration: none;
  font-size: 12px;
}


.newsletter p {
  color: #c4d2df;
  font-size: 12px;
}


.newsletter-form {
  display: flex;
  flex-direction: column;
  gap: 8px;
}


.newsletter-form input {
  height: 42px;
  border: none;
  border-radius: 5px;
  padding: 0 12px;
}


.newsletter-form button {
  height: 42px;
  border: none;
  border-radius: 5px;
  background: #0879d1;
  color: white;
  font-weight: 800;
}


.copyright {
  margin-top: 25px;
}


.cameroon {
  margin-top: 5px;
}


/*
|--------------------------------------------------------------------------
| RESPONSIVE
|--------------------------------------------------------------------------
*/

@media (max-width: 1200px) {

  .desktop-nav {
    gap: 15px;
  }

  .brand {
    width: 170px;
  }

  .brand img {
    width: 145px;
  }

  .home-language-switcher {
    margin-right: 0;
  }

}


@media (max-width: 1150px) {

  .category-grid,
  .property-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .benefits-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .footer-grid {
    grid-template-columns: repeat(3, 1fr);
  }

}


@media (max-width: 950px) {

  .desktop-nav {
    display: none;
  }

  .header-inner {
    justify-content: space-between;
  }

  .hero {
    min-height: 570px;
  }

  .hero-search-wrapper {
    bottom: -130px;
  }

  .search-box {
    flex-wrap: wrap;
  }

  .search-field {
    flex: 1 1 45%;
  }

  .search-button {
    flex: 1 1 100%;
    min-height: 48px;
  }

  .categories-section {
    padding-top: 215px;
  }

  .cta-section {
    grid-template-columns: 1fr;
  }

}


@media (max-width: 650px) {

  .header-actions .search-icon,
  .login-button,
  .post-button {
    display: none;
  }

  .header-actions {
    margin-left: auto;
  }

  .home-language-switcher {
    margin-right: 5px;
  }

  .hero {
    min-height: 570px;
  }

  .hero-image {
    object-position: center;
  }

  .hero-search-wrapper {
    bottom: -240px;
  }

  .search-tabs {
    width: 100%;
  }

  .search-tabs button {
    flex: 1;
    padding: 13px 8px;
    font-size: 11px;
  }

  .search-box {
    flex-direction: column;
  }

  .search-field,
  .location-field {
    width: 100%;
    flex: none;
    border-right: none;
    border-bottom: 1px solid #e3eaf2;
  }

  .search-button {
    width: 100%;
  }

  .popular-row {
    max-height: 125px;
    overflow: hidden;
  }

  .popular-label {
    width: 100%;
  }

  .categories-section {
    padding-top: 320px;
  }

  .category-grid,
  .property-grid,
  .benefits-grid {
    grid-template-columns: 1fr;
  }

  .section-top {
    flex-direction: column;
    align-items: flex-start;
    gap: 12px;
  }

  .cta-card {
    flex-wrap: wrap;
  }

  .cta-button {
    width: 100%;
    text-align: center;
  }

  .footer-grid {
    grid-template-columns: 1fr 1fr;
  }

}


@media (max-width: 420px) {

  .brand {
    width: 150px;
  }

  .brand img {
    width: 130px;
  }

  .hero {
    min-height: 520px;
  }

  .categories-section {
    padding-top: 350px;
  }

  .footer-grid {
    grid-template-columns: 1fr;
  }

}

</style>