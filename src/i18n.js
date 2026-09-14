import { createI18n } from 'vue-i18n'

const messages = {
  en: {
    nav: {
      home: 'Home',
      housing: 'Housing',
      land: 'Land',
      agents: 'Agents',
      postProperty: 'Post Property',
      dashboard: 'Dashboard',
      login: 'Login',
      register: 'Register',
      logout: 'Logout'
    },

    common: {
      search: 'Search',
      save: 'Save',
      saved: 'Saved',
      view: 'View',
      viewProperty: 'View Property',
      edit: 'Edit',
      delete: 'Delete',
      cancel: 'Cancel',
      confirm: 'Confirm',
      close: 'Close',
      submit: 'Submit',
      loading: 'Loading...',
      retry: 'Try Again',
      back: 'Back',
      next: 'Next',
      previous: 'Previous',
      by: 'by',
      logout: 'Logout',
      verified: 'Verified',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',
      available: 'Available',
      unavailable: 'Unavailable',
      yes: 'Yes',
      no: 'No',
      phone: 'Phone',
      email: 'Email',
      name: 'Name',
      location: 'Location',
      price: 'Price',
      type: 'Type',
      status: 'Status',
      actions: 'Actions'
    },

    home: {
      title: 'Find your perfect home',
      subtitle:
        'Discover houses, apartments and land across Cameroon.',
      searchPlaceholder:
        'Search by city, neighborhood or property type',
      search: 'Search',
      findHousing: 'Find Housing',
      findHousingDescription:
        'Find houses and apartments that match your needs.',
      findLand: 'Find Land',
      findLandDescription:
        'Discover land for sale in locations across Cameroon.',
      becomeLandlord: 'List Your Property',
      becomeLandlordDescription:
        'Reach people looking for properties on Eaz rentals.',
      featuredProperties: 'Featured Properties',
      viewAll: 'View All',
      noFeatured:
        'No featured properties available yet.',
      trusted: 'Trusted Property Marketplace',
      trustedDescription:
        'Eaz rentals connects property seekers with landlords and real estate agents.',
      getStarted: 'Get Started'
    },

    housing: {
      title: 'Find Housing',
      subtitle:
        'Find houses, apartments and other accommodation across Cameroon.',
      searchPlaceholder:
        'Search by city or neighborhood',
      filters: 'Filters',
      clearFilters: 'Clear Filters',
      resetFilters: 'Reset Filters',
      propertyType: 'Property Type',
      allTypes: 'All Types',
      house: 'House',
      apartment: 'Apartment',
      studio: 'Studio',
      room: 'Room',
      duplex: 'Duplex',
      villa: 'Villa',
      listingType: 'Listing Type',
      allListingTypes: 'All Listing Types',
      rent: 'For Rent',
      sale: 'For Sale',
      city: 'City',
      neighborhood: 'Neighborhood',
      minPrice: 'Minimum Price',
      maxPrice: 'Maximum Price',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      any: 'Any',
      verifiedOwner: 'Verified Owner',
      results: 'properties found',
      noResults: 'No properties found',
      noResultsDescription:
        'Try changing your search or filters.',
      noProperties: 'No properties found',
      noPropertiesDescription:
        'We could not find a property matching your search.',
      loading: 'Loading properties...',
      viewProperty: 'View Property',
      saveProperty: 'Save Property',
      removeSaved: 'Remove from Saved',
      activeFilters: 'Active Filters',
      allCameroon: 'All Cameroon',
      search: 'Search',
      sortBy: 'Sort By',
      newest: 'Newest',
      priceHigh: 'Price: High to Low',
      priceLow: 'Price: Low to High'
    },

    land: {
      title: 'Find Land',
      subtitle:
        'Discover land available for sale across Cameroon.',
      searchPlaceholder:
        'Search by city or neighborhood',
      filters: 'Filters',
      clearFilters: 'Clear Filters',
      resetFilters: 'Reset Filters',
      landType: 'Land Type',
      allLandTypes: 'All Land Types',
      residential: 'Residential',
      commercial: 'Commercial',
      agricultural: 'Agricultural',
      industrial: 'Industrial',
      mixedUse: 'Mixed Use',
      listingType: 'Listing Type',
      allListingTypes: 'All Listing Types',
      sale: 'For Sale',
      city: 'City',
      neighborhood: 'Neighborhood',
      minPrice: 'Minimum Price',
      maxPrice: 'Maximum Price',
      verifiedOwner: 'Verified Owner',
      results: 'properties found',
      noResults: 'No land found',
      noResultsDescription:
        'Try changing your search or filters.',
      noProperties: 'No land found',
      noPropertiesDescription:
        'We could not find land matching your search.',
      loading: 'Loading land...',
      viewProperty: 'View Property',
      saveProperty: 'Save Property',
      removeSaved: 'Remove from Saved',
      activeFilters: 'Active Filters',
      allCameroon: 'All Cameroon',
      search: 'Search'
    },

    property: {
      details: 'Property Details',
      propertyType: 'Property Type',
      listingType: 'Listing Type',
      description: 'Description',
      location: 'Location',
      price: 'Price',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',

      unitAvailability: 'Unit Availability',
      totalUnits: 'Total Units',
      availableUnits: 'Available Units',
      occupiedUnits: 'Occupied Units',

      contactOwner: 'Contact Owner',
      contactWhatsApp: 'Contact on WhatsApp',
      sendInquiry: 'Send Inquiry',

      message: 'Message',
      send: 'Send Inquiry',

      saveProperty: 'Save Property',
      removeSaved: 'Remove from Saved',
      owner: 'Owner',
      agent: 'Agent',
      verifiedOwner: 'Verified Owner',
      photo: 'Property photo',
      noPhoto: 'No photo',
      priceOnRequest: 'Price on request',
      rent: 'For Rent',
      sale: 'For Sale',
      available: 'Available',
      pending: 'Pending Approval',
      rejected: 'Rejected',
      notFound: 'Property not found',
      loadError: 'Unable to load property.',
      loginRequired:
        'You must be logged in to save a property.',
      inquiryTitle: 'Property Inquiry',
      inquiryPlaceholder: 'Write your message...',
      inquirySent:
        'Your inquiry has been sent successfully.',
      inquiryError:
        'Unable to send your inquiry.',
      close: 'Close',
      yourProperty: 'Your Property',
      yourPropertyText:
        'This is one of your own properties.',
      editProperty: 'Edit Property'
    },

    auth: {
      login: 'Login',
      register: 'Register',
      email: 'Email',
      password: 'Password',
      fullName: 'Full Name',
      phone: 'Phone Number',
      accountType: 'Account Type',
      propertySeeker: 'Property Seeker',
      landlord: 'Landlord / Property Owner',
      agent: 'Real Estate Agent',
      loginButton: 'Login',
      registerButton: 'Create Account',
      forgotPassword: 'Forgot Password?',
      resetPassword: 'Reset Password',
      noAccount: "Don't have an account?",
      haveAccount: 'Already have an account?',
      loginSuccess: 'Login successful.',
      registerSuccess:
        'Account created successfully.',
      loginError:
        'Unable to log in. Please check your details.',
      registerError:
        'Unable to create your account.',
      passwordResetSent:
        'Password reset instructions have been sent to your email.',
      passwordResetError:
        'Unable to send password reset email.',
      newPassword: 'New Password',
      confirmPassword: 'Confirm Password',
      passwordMismatch:
        'Passwords do not match.',
      updatePassword: 'Update Password',
      passwordUpdated:
        'Password updated successfully.',
      passwordUpdateError:
        'Unable to update your password.'
    },

    adminLogin: {
      portal: 'Administrator Portal',
      title: 'Administrator Login',
      email: 'Email',
      emailPlaceholder: 'Enter administrator email',
      password: 'Password',
      passwordPlaceholder: 'Enter password',
      loggingIn: 'Logging in...',
      login: 'Login',
      loginFailed:
        'Unable to log in as administrator.'
    },

    dashboard: {
      title: 'Dashboard',
      welcome: 'Welcome',
      myAccount: 'My Account',
      name: 'Name',
      email: 'Email',
      accountType: 'Account Type',
      propertySeeker: 'Property Seeker',
      landlordPropertyOwner:
        'Landlord / Property Owner',
      realEstateAgent: 'Real Estate Agent',
      professionalProfile: 'Professional Profile',
      professionalProfileDescription:
        'Complete your professional profile so property seekers can learn more about you.',
      agentProfilePhoto: 'Agent profile photo',
      changeProfilePhoto: 'Change Profile Photo',
      uploading: 'Uploading...',
      photoHelp:
        'Upload a JPG, PNG or WebP image. Maximum size: 5 MB.',
      photoTooLarge:
        'The photo must be smaller than 5 MB.',
      invalidPhotoType:
        'Please upload a JPG, PNG or WebP image.',
      photoUploaded:
        'Profile photo uploaded successfully.',
      photoUploadError:
        'Unable to upload profile photo. Please try again.',
      agencyCompany: 'Agency / Company',
      agencyPlaceholder:
        'Enter your agency or company name',
      location: 'Location',
      locationPlaceholder:
        'Enter your operating location',
      yearsExperience: 'Years of Experience',
      experiencePlaceholder:
        'Enter years of experience',
      experienceValidation:
        'Years of experience must be between 0 and 100.',
      professionalBio: 'Professional Bio',
      bioPlaceholder:
        'Tell property seekers about your experience and services.',
      saving: 'Saving...',
      saveProfessionalProfile:
        'Save Professional Profile',
      profileSaved:
        'Professional profile saved successfully.',
      profileSaveError:
        'Unable to save professional profile. Please try again.',
      findProperty: 'Find a Property',
      findHousing: 'Find Housing',
      findHousingDescription:
        'Browse houses, apartments and other available accommodation.',
      findLand: 'Find Land',
      findLandDescription:
        'Browse land available for sale across Cameroon.',
      savedProperties: 'Saved Properties',
      savedPropertiesDescription:
        'View properties you saved for later.',
      myInquiries: 'My Inquiries',
      myInquiriesDescription:
        'View and manage your property inquiries.',
      manageProperties: 'Manage Properties',
      postProperty: 'Post Property',
      postPropertyDescription:
        'List a house, apartment or land on Eaz rentals.',
      myProperties: 'My Properties',
      myPropertiesDescription:
        'Manage the properties you have listed.',
      pendingApproval: 'Pending Approval',
      pendingApprovalDescription:
        'View properties waiting for administrator approval.',
      approvedProperties: 'Approved Properties',
      approvedPropertiesDescription:
        'View your approved properties.',
      receivedInquiriesDescription:
        'View inquiries from people interested in your properties.',
      overview: 'Overview',
      notifications: 'Notifications',
      totalProperties: 'Total Properties',
      approvedPropertiesCount:
        'Approved Properties',
      pendingProperties: 'Pending Properties',
      rejectedProperties: 'Rejected Properties',
      totalInquiries: 'Total Inquiries',
      unreadNotifications:
        'Unread Notifications',
      profile: 'Profile',
      account: 'Account',
      verified: 'Verified',
      notVerified: 'Not Verified'
    },

    postProperty: {
      title: 'Post a Property',
      editTitle: 'Edit Property',
      subtitle:
        'List your property on Eaz rentals.',
      category: 'Category',
      housing: 'Housing',
      land: 'Land',
      propertyType: 'Property Type',
      listingType: 'Listing Type',
      titleLabel: 'Property Title',
      titlePlaceholder:
        'Enter a title for your property',
      description: 'Description',
      descriptionPlaceholder:
        'Describe your property',
      price: 'Price',
      pricePlaceholder: 'Enter price',
      city: 'City',
      cityPlaceholder: 'Enter city',
      neighborhood: 'Neighborhood',
      neighborhoodPlaceholder:
        'Enter neighborhood',
      bedrooms: 'Bedrooms',
      bathrooms: 'Bathrooms',
      area: 'Area',
      areaPlaceholder: 'Enter area',
      landType: 'Land Type',

      totalUnits: 'Total Number of Units',
      availableUnits: 'Available Units',
      occupiedUnits: 'Occupied Units',
      totalUnitsPlaceholder:
        'Example: 20',
      availableUnitsPlaceholder:
        'Example: 19',
      unitAvailability:
        'Unit Availability',
      occupiedUnitsAutomatically:
        'Occupied units are calculated automatically.',
      availabilitySummary:
        '{available} available, {occupied} occupied, {total} total',

      photos: 'Property Photos',
      uploadPhotos: 'Upload Photos',
      removePhoto: 'Remove Photo',
      photoHelp:
        'Upload clear photos of your property.',
      photoLimit:
        'You can upload up to 8 photos.',
      photoLimitReached:
        'You can upload a maximum of 8 photos.',
      photosRemaining:
        '{count} photo(s) remaining.',
      clearPhoto:
        'Remove Photo',

      mapLocation: 'Map Location',
      selectLocation: 'Select Location',
      submit: 'Submit Property',
      update: 'Update Property',
      submitting: 'Submitting...',
      updating: 'Updating...',
      success:
        'Property submitted successfully and is pending approval.',
      updateSuccess:
        'Property updated successfully and is pending approval.',
      error:
        'Unable to submit property. Please try again.',
      updateError:
        'Unable to update property. Please try again.',
      required: 'This field is required.',

      totalUnitsRequired:
        'Please enter the total number of units.',
      totalUnitsInvalid:
        'Total units must be a whole number greater than 0.',
      availableUnitsInvalid:
        'Available units must be a whole number from 0 to the total number of units.',
      availableUnitsTooHigh:
        'Available units cannot be greater than total units.'
    },

    myProperties: {
      title: 'My Properties',
      subtitle:
        'Manage the properties you have listed on Eaz rentals.',

      loading: 'Loading your properties...',

      allProperties: 'All Properties',
      pendingProperties:
        'Pending Properties',
      approvedProperties:
        'Approved Properties',
      rejectedProperties:
        'Rejected Properties',

      pending: 'Pending Approval',
      approved: 'Approved',
      rejected: 'Rejected',

      property: 'property',
      properties: 'properties',

      showAll: 'Show All',
      viewAllProperties:
        'View All Properties',

      noProperties: 'No Properties Yet',
      noPropertiesDescription:
        'You have not posted any properties yet.',
      noPropertiesWithStatus:
        'There are no properties with this status.',
      noPendingProperties:
        'No Pending Properties',
      noApprovedProperties:
        'No Approved Properties',
      noRejectedProperties:
        'No Rejected Properties',
      postFirst: 'Post Your First Property',

      postProperty: 'Post a Property',
      edit: 'Edit',
      editProperty: 'Edit Property',
      view: 'View',
      viewProperty: 'View Property',
      delete: 'Delete',
      deleteProperty: 'Delete Property',

      deleteConfirm:
        'Are you sure you want to delete this property?',
      deleting: 'Deleting...',
      deleteSuccess:
        'Property deleted successfully.',
      deleteError:
        'Unable to delete property.',
      ownPropertiesOnly:
        'You can only delete your own properties.',

      verifiedOwner: 'Verified Owner',
      ownerNotVerified:
        'Owner Not Verified',
      notVerifiedOwner:
        'Owner Not Verified',

      verifiedMessage:
        'Your account has been verified by Eaz rentals.',
      unverifiedMessage:
        'Your account has not yet been verified by Eaz rentals.',

      statusLive: 'Your Property Is Live',
      statusApprovedMessage:
        'Your property has been approved and is now visible to property seekers.',
      statusActionRequired:
        'Action Required',
      statusRejectedMessage:
        'Your property was rejected. Please review the property information and make the necessary changes before submitting it again.',
      statusWaiting:
        'Waiting for Approval',
      statusPendingMessage:
        'Your property has been submitted and is waiting for administrator approval.',

      noPhoto: 'No Photo',
      photo: 'photo',
      photos: 'photos',

      priceOnRequest: 'Price on request',

      tryAgain: 'Try Again',
      loadError:
        'Unable to load your properties.',
      loginRequired:
        'You must be logged in.',

      propertyUpdated:
        'Property updated successfully.',
      propertyDeleted:
        'Property deleted successfully.'
    },

    saved: {
      title: 'Saved Properties',
      subtitle:
        'View properties you saved for later.',
      loading:
        'Loading saved properties...',
      noProperties:
        'No saved properties',
      noPropertiesDescription:
        'Properties you save will appear here.',
      browseHousing: 'Browse Housing',
      browseLand: 'Browse Land',
      noPhoto: 'No photo',
      viewProperty: 'View Property',
      removing: 'Removing...',
      remove: 'Remove',
      loginRequired:
        'You must be logged in.',
      loadError:
        'Unable to load saved properties.',
      removeConfirm:
        'Are you sure you want to remove this property from your saved properties?',
      removeError:
        'Unable to remove saved property.'
    },

    inquiries: {
      title: 'My Inquiries',
      subtitle:
        'View and manage your property inquiries.',
      loading: 'Loading inquiries...',
      received: 'Received',
      sent: 'Sent',
      receivedTitle: 'Received Inquiries',
      sentTitle: 'Sent Inquiries',
      receivedDescription:
        'People interested in your properties.',
      sentDescription:
        'Your property inquiries.',
      interestedClient: 'Interested Client',
      name: 'Name',
      phone: 'Phone',
      eazUser: 'Eaz rentals User',
      clientMessage: 'Client Message',
      yourMessage: 'Your Message',
      viewProperty: 'View Property',
      whatsappClient: 'WhatsApp Client',
      noInquiries: 'No inquiries yet',
      noInquiriesDescription:
        'Your property inquiries will appear here.',
      findHousing: 'Find Housing',
      loginRequired:
        'You must be logged in.',
      loadError:
        'Unable to load inquiries.'
    },

    notifications: {
      title: 'Notifications',
      subtitle:
        'Stay updated about your properties and inquiries.',
      markAllRead: 'Mark all as read',
      markRead: 'Mark as read',
      loading: 'Loading notifications...',
      tryAgain: 'Try Again',
      unread: 'Unread',
      viewProperty: 'View Property',
      noNotifications:
        'No notifications yet',
      noNotificationsDescription:
        'Important updates about your Eaz rentals activity will appear here.',
      loginRequired:
        'You must be logged in.',
      loadError:
        'Unable to load notifications.',
      updateError:
        'Unable to update notifications.',
      propertyApproved:
        'Your property has been approved.',
      propertyRejected:
        'Your property has been rejected.',
      newInquiry:
        'You have received a new property inquiry.',
      inquirySent:
        'Your property inquiry has been sent.',
      notificationError:
        'Unable to load notifications.'
    },

    agents: {
      title: 'Verified Agents',
      subtitle:
        'Connect with trusted real estate professionals on Eaz rentals.',
      loading:
        'Loading verified agents...',
      noAgents:
        'No verified agents yet',
      noAgentsDescription:
        'Verified agents will appear here once they are approved.',
      verified: 'Verified',
      verifiedAgent:
        'Verified Agent',
      profilePhoto: 'profile photo',
      agentType:
        'Real Estate Agent',
      phone: 'Phone',
      properties: 'Properties',
      whatsapp: 'WhatsApp',
      viewProfile: 'View Profile',
      loadError:
        'Unable to load verified agents. Please try again.'
    },

    agentProfile: {
      title: 'Agent Profile',
      verified: 'Verified Agent',
      verifiedAgent:
        'Verified Agent',
      realEstateAgent:
        'Real Estate Agent',
      professionalInformation:
        'Professional Information',
      profilePhoto: 'profile photo',
      phone: 'Phone',
      agency: 'Agency / Company',
      location: 'Location',
      experience: 'Experience',
      years: 'years',
      accountStatus: 'Account Status',
      propertiesBy: 'Properties by',
      properties: 'Properties',
      property: 'Property',
      available: 'available',
      about: 'About',
      viewProperty: 'View Property',
      whatsapp: 'WhatsApp',
      noProperties:
        'No properties yet',
      noPropertiesDescription:
        'This agent has no approved properties at the moment.',
      loading:
        'Loading agent profile...',
      loadError:
        'Unable to load agent profile.',
      agentNotFound:
        'Agent not found',
      backToAgents:
        'Back to Agents'
    },

    admin: {
      title: 'Admin Dashboard',
      subtitle:
        'Manage users and properties on the platform.',
      checkingAccess:
        'Checking administrator access...',

      totalProperties: 'Total Properties',
      pendingProperties:
        'Pending Properties',
      approvedProperties:
        'Approved Properties',
      rejectedProperties:
        'Rejected Properties',
      totalUsers: 'Total Users',

      propertySeekers:
        'Property Seekers',
      landlords: 'Landlords',
      agents: 'Agents',
      verifiedAccounts:
        'Verified Accounts',

      userManagement:
        'User Management',
      userManagementDescription:
        'Manage registered property seekers, landlords and agents.',
      refreshUsers: 'Refresh Users',

      searchUsers: 'Search users',
      searchUsersPlaceholder:
        'Search name or phone',
      accountType: 'Account Type',
      allAccountTypes:
        'All account types',
      realEstateAgents:
        'Real Estate Agents',

      verification: 'Verification',
      allVerificationStatuses:
        'All verification statuses',
      verified: 'Verified',
      unverified: 'Unverified',
      notApplicable: 'Not applicable',

      loadingUsers: 'Loading users...',
      noUsers: 'No users found',
      noUsersDescription:
        'Try changing your search or account type filter.',
      clearFilters: 'Clear filters',

      name: 'Name',
      phone: 'Phone',
      registered: 'Registered',
      action: 'Action',
      notProvided: 'Not provided',
      verify: 'Verify',
      remove: 'Remove',
      updating: 'Updating...',

      propertySubmissions:
        'Property Submissions',
      propertySubmissionsDescription:
        'Review properties submitted by landlords and agents.',
      refreshProperties:
        'Refresh Properties',

      searchProperties:
        'Search properties',
      searchPropertiesPlaceholder:
        'Search city, neighborhood or property type',
      status: 'Status',
      allStatuses: 'All statuses',
      pending: 'Pending',
      approved: 'Approved',
      rejected: 'Rejected',

      category: 'Category',
      allProperties: 'All properties',
      housing: 'Housing',
      land: 'Land',

      loadingProperties:
        'Loading properties...',
      noProperties:
        'No properties found',
      noPropertiesDescription:
        'Try changing your search or filters.',

      verifiedOwner:
        'Verified Owner',
      listing: 'Listing',
      listingType: 'Listing Type',
      owner: 'Owner',
      unknown: 'Unknown',
      submitted: 'Submitted',
      review: 'Review',

      propertyReview:
        'Property Review',
      noPhotosUploaded:
        'No photos uploaded',
      photo: 'Photo',
      ownerInformation:
        'Owner Information',
      noDescription:
        'No description provided.',
      propertyId: 'Property ID',

      rejectProperty:
        'Reject Property',
      approveProperty:
        'Approve Property',

      propertySeeker:
        'Property Seeker',
      landlord: 'Landlord',
      realEstateAgent:
        'Real Estate Agent',

      accessDenied:
        'Access denied. Administrator access required.',
      unableToVerifyAccess:
        'Unable to verify administrator access.',
      failedToLoadProperties:
        'Failed to load properties.',
      failedToLoadUsers:
        'Failed to load users.',
      failedToUpdateVerification:
        'Failed to update verification status.',
      failedToUpdateProperty:
        'Failed to update property.',

      thisAccount: 'this account',

      verifyConfirm:
        'Are you sure you want to verify {name}?',
      removeVerificationConfirm:
        'Are you sure you want to remove verification from {name}?',
      approveConfirm:
        'Are you sure you want to approve this property?',
      rejectConfirm:
        'Are you sure you want to reject this property?'
    },

    footer: {
      description:
        'Find houses, apartments and land across Cameroon.',
      quickLinks: 'Quick Links',
      housing: 'Housing',
      land: 'Land',
      agents: 'Agents',
      postProperty: 'Post Property',
      account: 'Account',
      login: 'Login',
      register: 'Register',
      dashboard: 'Dashboard',
      contact: 'Contact',
      rights: 'All rights reserved.'
    },

    errors: {
      general:
        'Something went wrong. Please try again.',
      network:
        'Network error. Please check your connection.',
      unauthorized:
        'You are not authorized to perform this action.',
      notFound:
        'The requested item could not be found.'
    }
  },

  fr: {
    nav: {
      home: 'Accueil',
      housing: 'Logements',
      land: 'Terrains',
      agents: 'Agents',
      postProperty: 'Publier un bien',
      dashboard: 'Tableau de bord',
      login: 'Connexion',
      register: 'Inscription',
      logout: 'Déconnexion'
    },

    common: {
      search: 'Rechercher',
      save: 'Enregistrer',
      saved: 'Enregistré',
      view: 'Voir',
      viewProperty: 'Voir le bien',
      edit: 'Modifier',
      delete: 'Supprimer',
      cancel: 'Annuler',
      confirm: 'Confirmer',
      close: 'Fermer',
      submit: 'Envoyer',
      loading: 'Chargement...',
      retry: 'Réessayer',
      back: 'Retour',
      next: 'Suivant',
      previous: 'Précédent',
      by: 'par',
      logout: 'Déconnexion',
      verified: 'Vérifié',
      pending: 'En attente',
      approved: 'Approuvé',
      rejected: 'Rejeté',
      available: 'Disponible',
      unavailable: 'Indisponible',
      yes: 'Oui',
      no: 'Non',
      phone: 'Téléphone',
      email: 'E-mail',
      name: 'Nom',
      location: 'Localisation',
      price: 'Prix',
      type: 'Type',
      status: 'Statut',
      actions: 'Actions'
    },

    home: {
      title: 'Trouvez votre logement idéal',
      subtitle:
        'Découvrez des maisons, appartements et terrains partout au Cameroun.',
      searchPlaceholder:
        'Rechercher par ville, quartier ou type de bien',
      search: 'Rechercher',
      findHousing: 'Trouver un logement',
      findHousingDescription:
        'Trouvez des maisons et appartements adaptés à vos besoins.',
      findLand: 'Trouver un terrain',
      findLandDescription:
        'Découvrez des terrains à vendre dans différentes régions du Cameroun.',
      becomeLandlord: 'Publier votre bien',
      becomeLandlordDescription:
        'Touchez les personnes à la recherche de biens sur Eaz rentals.',
      featuredProperties: 'Biens à la une',
      viewAll: 'Voir tout',
      noFeatured:
        'Aucun bien à la une pour le moment.',
      trusted:
        'Marketplace immobilière de confiance',
      trustedDescription:
        'Eaz rentals met en relation les personnes à la recherche de biens avec les propriétaires et agents immobiliers.',
      getStarted: 'Commencer'
    },

    housing: {
      title: 'Trouver un logement',
      subtitle:
        'Trouvez des maisons, appartements et autres logements partout au Cameroun.',
      searchPlaceholder:
        'Rechercher par ville ou quartier',
      filters: 'Filtres',
      clearFilters:
        'Effacer les filtres',
      resetFilters:
        'Réinitialiser les filtres',
      propertyType:
        'Type de bien',
      allTypes:
        'Tous les types',
      house: 'Maison',
      apartment: 'Appartement',
      studio: 'Studio',
      room: 'Chambre',
      duplex: 'Duplex',
      villa: 'Villa',
      listingType:
        'Type d’annonce',
      allListingTypes:
        'Tous les types d’annonces',
      rent: 'À louer',
      sale: 'À vendre',
      city: 'Ville',
      neighborhood: 'Quartier',
      minPrice: 'Prix minimum',
      maxPrice: 'Prix maximum',
      bedrooms: 'Chambres',
      bathrooms: 'Salles de bain',
      any: 'Tous',
      verifiedOwner:
        'Propriétaire vérifié',
      results: 'biens trouvés',
      noResults:
        'Aucun bien trouvé',
      noResultsDescription:
        'Essayez de modifier votre recherche ou vos filtres.',
      noProperties:
        'Aucun bien trouvé',
      noPropertiesDescription:
        'Nous n’avons trouvé aucun bien correspondant à votre recherche.',
      loading:
        'Chargement des biens...',
      viewProperty:
        'Voir le bien',
      saveProperty:
        'Enregistrer le bien',
      removeSaved:
        'Retirer des biens enregistrés',
      activeFilters:
        'Filtres actifs',
      allCameroon:
        'Tout le Cameroun',
      search:
        'Rechercher',
      sortBy:
        'Trier par',
      newest:
        'Plus récents',
      priceHigh:
        'Prix : du plus élevé au plus bas',
      priceLow:
        'Prix : du plus bas au plus élevé'
    },

    land: {
      title: 'Trouver un terrain',
      subtitle:
        'Découvrez des terrains disponibles à la vente partout au Cameroun.',
      searchPlaceholder:
        'Rechercher par ville ou quartier',
      filters: 'Filtres',
      clearFilters:
        'Effacer les filtres',
      resetFilters:
        'Réinitialiser les filtres',
      landType:
        'Type de terrain',
      allLandTypes:
        'Tous les types de terrains',
      residential:
        'Résidentiel',
      commercial:
        'Commercial',
      agricultural:
        'Agricole',
      industrial:
        'Industriel',
      mixedUse:
        'Usage mixte',
      listingType:
        'Type d’annonce',
      allListingTypes:
        'Tous les types d’annonces',
      sale:
        'À vendre',
      city:
        'Ville',
      neighborhood:
        'Quartier',
      minPrice:
        'Prix minimum',
      maxPrice:
        'Prix maximum',
      verifiedOwner:
        'Propriétaire vérifié',
      results:
        'biens trouvés',
      noResults:
        'Aucun terrain trouvé',
      noResultsDescription:
        'Essayez de modifier votre recherche ou vos filtres.',
      noProperties:
        'Aucun terrain trouvé',
      noPropertiesDescription:
        'Nous n’avons trouvé aucun terrain correspondant à votre recherche.',
      loading:
        'Chargement des terrains...',
      viewProperty:
        'Voir le bien',
      saveProperty:
        'Enregistrer le bien',
      removeSaved:
        'Retirer des biens enregistrés',
      activeFilters:
        'Filtres actifs',
      allCameroon:
        'Tout le Cameroun',
      search:
        'Rechercher'
    },

    property: {
      details:
        'Détails du bien',
      propertyType:
        'Type de bien',
      listingType:
        'Type d’annonce',
      description:
        'Description',
      location:
        'Localisation',
      price:
        'Prix',
      bedrooms:
        'Chambres',
      bathrooms:
        'Salles de bain',
      area:
        'Superficie',

      unitAvailability:
        'Disponibilité des unités',
      totalUnits:
        'Nombre total d’unités',
      availableUnits:
        'Unités disponibles',
      occupiedUnits:
        'Unités occupées',

      contactOwner:
        'Contacter le propriétaire',
      contactWhatsApp:
        'Contacter sur WhatsApp',
      sendInquiry:
        'Envoyer une demande',

      message:
        'Message',
      send:
        'Envoyer la demande',

      saveProperty:
        'Enregistrer le bien',
      removeSaved:
        'Retirer des biens enregistrés',
      owner:
        'Propriétaire',
      agent:
        'Agent',
      verifiedOwner:
        'Propriétaire vérifié',
      photo:
        'Photo du bien',
      noPhoto:
        'Aucune photo',
      priceOnRequest:
        'Prix sur demande',
      rent:
        'À louer',
      sale:
        'À vendre',
      available:
        'Disponible',
      pending:
        'En attente d’approbation',
      rejected:
        'Rejeté',
      notFound:
        'Bien introuvable',
      loadError:
        'Impossible de charger le bien.',
      loginRequired:
        'Vous devez être connecté pour enregistrer un bien.',
      inquiryTitle:
        'Demande concernant le bien',
      inquiryPlaceholder:
        'Écrivez votre message...',
      inquirySent:
        'Votre demande a été envoyée avec succès.',
      inquiryError:
        'Impossible d’envoyer votre demande.',
      close:
        'Fermer',
      yourProperty:
        'Votre bien',
      yourPropertyText:
        'Il s’agit de l’un de vos propres biens.',
      editProperty:
        'Modifier le bien'
    },

    auth: {
      login:
        'Connexion',
      register:
        'Inscription',
      email:
        'E-mail',
      password:
        'Mot de passe',
      fullName:
        'Nom complet',
      phone:
        'Numéro de téléphone',
      accountType:
        'Type de compte',
      propertySeeker:
        'Chercheur de bien',
      landlord:
        'Propriétaire',
      agent:
        'Agent immobilier',
      loginButton:
        'Se connecter',
      registerButton:
        'Créer un compte',
      forgotPassword:
        'Mot de passe oublié ?',
      resetPassword:
        'Réinitialiser le mot de passe',
      noAccount:
        'Vous n’avez pas de compte ?',
      haveAccount:
        'Vous avez déjà un compte ?',
      loginSuccess:
        'Connexion réussie.',
      registerSuccess:
        'Compte créé avec succès.',
      loginError:
        'Impossible de se connecter. Vérifiez vos informations.',
      registerError:
        'Impossible de créer votre compte.',
      passwordResetSent:
        'Les instructions de réinitialisation ont été envoyées à votre adresse e-mail.',
      passwordResetError:
        'Impossible d’envoyer l’e-mail de réinitialisation.',
      newPassword:
        'Nouveau mot de passe',
      confirmPassword:
        'Confirmer le mot de passe',
      passwordMismatch:
        'Les mots de passe ne correspondent pas.',
      updatePassword:
        'Mettre à jour le mot de passe',
      passwordUpdated:
        'Mot de passe mis à jour avec succès.',
      passwordUpdateError:
        'Impossible de mettre à jour votre mot de passe.'
    },

    adminLogin: {
      portal:
        'Portail administrateur',
      title:
        'Connexion administrateur',
      email:
        'E-mail',
      emailPlaceholder:
        'Entrez l’e-mail administrateur',
      password:
        'Mot de passe',
      passwordPlaceholder:
        'Entrez votre mot de passe',
      loggingIn:
        'Connexion...',
      login:
        'Se connecter',
      loginFailed:
        'Impossible de se connecter en tant qu’administrateur.'
    },

    dashboard: {
      title:
        'Tableau de bord',
      welcome:
        'Bienvenue',
      myAccount:
        'Mon compte',
      name:
        'Nom',
      email:
        'E-mail',
      accountType:
        'Type de compte',
      propertySeeker:
        'Chercheur de bien',
      landlordPropertyOwner:
        'Propriétaire',
      realEstateAgent:
        'Agent immobilier',
      professionalProfile:
        'Profil professionnel',
      professionalProfileDescription:
        'Complétez votre profil professionnel afin que les personnes à la recherche d’un bien puissent mieux vous connaître.',
      agentProfilePhoto:
        'Photo de profil de l’agent',
      changeProfilePhoto:
        'Modifier la photo de profil',
      uploading:
        'Téléchargement...',
      photoHelp:
        'Téléchargez une image JPG, PNG ou WebP. Taille maximale : 5 Mo.',
      photoTooLarge:
        'La photo doit faire moins de 5 Mo.',
      invalidPhotoType:
        'Veuillez télécharger une image JPG, PNG ou WebP.',
      photoUploaded:
        'Photo de profil téléchargée avec succès.',
      photoUploadError:
        'Impossible de télécharger la photo de profil. Veuillez réessayer.',
      agencyCompany:
        'Agence / Entreprise',
      agencyPlaceholder:
        'Entrez le nom de votre agence ou entreprise',
      location:
        'Localisation',
      locationPlaceholder:
        'Entrez votre zone d’activité',
      yearsExperience:
        'Années d’expérience',
      experiencePlaceholder:
        'Entrez vos années d’expérience',
      experienceValidation:
        'Les années d’expérience doivent être comprises entre 0 et 100.',
      professionalBio:
        'Présentation professionnelle',
      bioPlaceholder:
        'Parlez aux personnes à la recherche d’un bien de votre expérience et de vos services.',
      saving:
        'Enregistrement...',
      saveProfessionalProfile:
        'Enregistrer le profil professionnel',
      profileSaved:
        'Profil professionnel enregistré avec succès.',
      profileSaveError:
        'Impossible d’enregistrer le profil professionnel. Veuillez réessayer.',
      findProperty:
        'Trouver un bien',
      findHousing:
        'Trouver un logement',
      findHousingDescription:
        'Parcourez les maisons, appartements et autres logements disponibles.',
      findLand:
        'Trouver un terrain',
      findLandDescription:
        'Parcourez les terrains disponibles à la vente au Cameroun.',
      savedProperties:
        'Biens enregistrés',
      savedPropertiesDescription:
        'Consultez les biens que vous avez enregistrés.',
      myInquiries:
        'Mes demandes',
      myInquiriesDescription:
        'Consultez et gérez vos demandes concernant les biens.',
      manageProperties:
        'Gérer mes biens',
      postProperty:
        'Publier un bien',
      postPropertyDescription:
        'Publiez une maison, un appartement ou un terrain sur Eaz rentals.',
      myProperties:
        'Mes biens',
      myPropertiesDescription:
        'Gérez les biens que vous avez publiés.',
      pendingApproval:
        'En attente d’approbation',
      pendingApprovalDescription:
        'Consultez les biens en attente d’approbation par l’administrateur.',
      approvedProperties:
        'Biens approuvés',
      approvedPropertiesDescription:
        'Consultez vos biens approuvés.',
      receivedInquiriesDescription:
        'Consultez les demandes des personnes intéressées par vos biens.',
      overview:
        'Vue d’ensemble',
      notifications:
        'Notifications',
      totalProperties:
        'Total des biens',
      approvedPropertiesCount:
        'Biens approuvés',
      pendingProperties:
        'Biens en attente',
      rejectedProperties:
        'Biens rejetés',
      totalInquiries:
        'Total des demandes',
      unreadNotifications:
        'Notifications non lues',
      profile:
        'Profil',
      account:
        'Compte',
      verified:
        'Vérifié',
      notVerified:
        'Non vérifié'
    },

    postProperty: {
      title:
        'Publier un bien',
      editTitle:
        'Modifier le bien',
      subtitle:
        'Publiez votre bien sur Eaz rentals.',
      category:
        'Catégorie',
      housing:
        'Logement',
      land:
        'Terrain',
      propertyType:
        'Type de bien',
      listingType:
        'Type d’annonce',
      titleLabel:
        'Titre du bien',
      titlePlaceholder:
        'Entrez un titre pour votre bien',
      description:
        'Description',
      descriptionPlaceholder:
        'Décrivez votre bien',
      price:
        'Prix',
      pricePlaceholder:
        'Entrez le prix',
      city:
        'Ville',
      cityPlaceholder:
        'Entrez la ville',
      neighborhood:
        'Quartier',
      neighborhoodPlaceholder:
        'Entrez le quartier',
      bedrooms:
        'Chambres',
      bathrooms:
        'Salles de bain',
      area:
        'Superficie',
      areaPlaceholder:
        'Entrez la superficie',
      landType:
        'Type de terrain',

      totalUnits:
        'Nombre total d’unités',
      availableUnits:
        'Unités disponibles',
      occupiedUnits:
        'Unités occupées',
      totalUnitsPlaceholder:
        'Exemple : 20',
      availableUnitsPlaceholder:
        'Exemple : 19',
      unitAvailability:
        'Disponibilité des unités',
      occupiedUnitsAutomatically:
        'Les unités occupées sont calculées automatiquement.',
      availabilitySummary:
        '{available} disponibles, {occupied} occupées, {total} au total',

      photos:
        'Photos du bien',
      uploadPhotos:
        'Télécharger des photos',
      removePhoto:
        'Supprimer la photo',
      photoHelp:
        'Téléchargez des photos claires de votre bien.',
      photoLimit:
        'Vous pouvez télécharger jusqu’à 8 photos.',
      photoLimitReached:
        'Vous pouvez télécharger un maximum de 8 photos.',
      photosRemaining:
        'Il reste {count} photo(s) disponible(s).',
      clearPhoto:
        'Supprimer la photo',

      mapLocation:
        'Localisation sur la carte',
      selectLocation:
        'Sélectionner la localisation',
      submit:
        'Soumettre le bien',
      update:
        'Mettre à jour le bien',
      submitting:
        'Envoi...',
      updating:
        'Mise à jour...',
      success:
        'Bien soumis avec succès et en attente d’approbation.',
      updateSuccess:
        'Bien mis à jour avec succès et en attente d’approbation.',
      error:
        'Impossible de soumettre le bien. Veuillez réessayer.',
      updateError:
        'Impossible de mettre à jour le bien. Veuillez réessayer.',
      required:
        'Ce champ est obligatoire.',

      totalUnitsRequired:
        'Veuillez entrer le nombre total d’unités.',
      totalUnitsInvalid:
        'Le nombre total d’unités doit être un nombre entier supérieur à 0.',
      availableUnitsInvalid:
        'Le nombre d’unités disponibles doit être un nombre entier compris entre 0 et le nombre total d’unités.',
      availableUnitsTooHigh:
        'Le nombre d’unités disponibles ne peut pas être supérieur au nombre total d’unités.'
    },

    myProperties: {
      title:
        'Mes biens',
      subtitle:
        'Gérez les biens que vous avez publiés sur Eaz rentals.',

      loading:
        'Chargement de vos biens...',

      allProperties:
        'Tous les biens',
      pendingProperties:
        'Biens en attente',
      approvedProperties:
        'Biens approuvés',
      rejectedProperties:
        'Biens rejetés',

      pending:
        'En attente d’approbation',
      approved:
        'Approuvé',
      rejected:
        'Rejeté',

      property:
        'bien',
      properties:
        'biens',

      showAll:
        'Afficher tout',
      viewAllProperties:
        'Voir tous les biens',

      noProperties:
        'Aucun bien pour le moment',
      noPropertiesDescription:
        'Vous n’avez encore publié aucun bien.',
      noPropertiesWithStatus:
        'Aucun bien ne possède ce statut.',
      noPendingProperties:
        'Aucun bien en attente',
      noApprovedProperties:
        'Aucun bien approuvé',
      noRejectedProperties:
        'Aucun bien rejeté',
      postFirst:
        'Publier votre premier bien',

      postProperty:
        'Publier un bien',
      edit:
        'Modifier',
      editProperty:
        'Modifier le bien',
      view:
        'Voir',
      viewProperty:
        'Voir le bien',
      delete:
        'Supprimer',
      deleteProperty:
        'Supprimer le bien',

      deleteConfirm:
        'Êtes-vous sûr de vouloir supprimer ce bien ?',
      deleting:
        'Suppression...',
      deleteSuccess:
        'Bien supprimé avec succès.',
      deleteError:
        'Impossible de supprimer le bien.',
      ownPropertiesOnly:
        'Vous pouvez uniquement supprimer vos propres biens.',

      verifiedOwner:
        'Propriétaire vérifié',
      ownerNotVerified:
        'Propriétaire non vérifié',
      notVerifiedOwner:
        'Propriétaire non vérifié',

      verifiedMessage:
        'Votre compte a été vérifié par Eaz rentals.',
      unverifiedMessage:
        'Votre compte n’a pas encore été vérifié par Eaz rentals.',

      statusLive:
        'Votre bien est en ligne',
      statusApprovedMessage:
        'Votre bien a été approuvé et est maintenant visible par les personnes à la recherche d’un bien.',
      statusActionRequired:
        'Action requise',
      statusRejectedMessage:
        'Votre bien a été rejeté. Veuillez vérifier les informations du bien et effectuer les modifications nécessaires avant de le soumettre à nouveau.',
      statusWaiting:
        'En attente d’approbation',
      statusPendingMessage:
        'Votre bien a été soumis et attend l’approbation de l’administrateur.',

      noPhoto:
        'Aucune photo',
      photo:
        'photo',
      photos:
        'photos',

      priceOnRequest:
        'Prix sur demande',

      tryAgain:
        'Réessayer',
      loadError:
        'Impossible de charger vos biens.',
      loginRequired:
        'Vous devez être connecté.',

      propertyUpdated:
        'Bien mis à jour avec succès.',
      propertyDeleted:
        'Bien supprimé avec succès.'
    },

    saved: {
      title:
        'Biens enregistrés',
      subtitle:
        'Consultez les biens que vous avez enregistrés.',
      loading:
        'Chargement des biens enregistrés...',
      noProperties:
        'Aucun bien enregistré',
      noPropertiesDescription:
        'Les biens que vous enregistrez apparaîtront ici.',
      browseHousing:
        'Parcourir les logements',
      browseLand:
        'Parcourir les terrains',
      noPhoto:
        'Aucune photo',
      viewProperty:
        'Voir le bien',
      removing:
        'Suppression...',
      remove:
        'Retirer',
      loginRequired:
        'Vous devez être connecté.',
      loadError:
        'Impossible de charger les biens enregistrés.',
      removeConfirm:
        'Êtes-vous sûr de vouloir retirer ce bien de vos biens enregistrés ?',
      removeError:
        'Impossible de retirer le bien enregistré.'
    },

    inquiries: {
      title:
        'Mes demandes',
      subtitle:
        'Consultez et gérez vos demandes concernant les biens.',
      loading:
        'Chargement des demandes...',
      received:
        'Reçues',
      sent:
        'Envoyées',
      receivedTitle:
        'Demandes reçues',
      sentTitle:
        'Demandes envoyées',
      receivedDescription:
        'Personnes intéressées par vos biens.',
      sentDescription:
        'Vos demandes concernant des biens.',
      interestedClient:
        'Client intéressé',
      name:
        'Nom',
      phone:
        'Téléphone',
      eazUser:
        'Utilisateur Eaz rentals',
      clientMessage:
        'Message du client',
      yourMessage:
        'Votre message',
      viewProperty:
        'Voir le bien',
      whatsappClient:
        'Contacter le client sur WhatsApp',
      noInquiries:
        'Aucune demande pour le moment',
      noInquiriesDescription:
        'Vos demandes concernant les biens apparaîtront ici.',
      findHousing:
        'Trouver un logement',
      loginRequired:
        'Vous devez être connecté.',
      loadError:
        'Impossible de charger les demandes.'
    },

    notifications: {
      title:
        'Notifications',
      subtitle:
        'Restez informé concernant vos biens et vos demandes.',
      markAllRead:
        'Tout marquer comme lu',
      markRead:
        'Marquer comme lu',
      loading:
        'Chargement des notifications...',
      tryAgain:
        'Réessayer',
      unread:
        'Non lu',
      viewProperty:
        'Voir le bien',
      noNotifications:
        'Aucune notification pour le moment',
      noNotificationsDescription:
        'Les mises à jour importantes concernant votre activité sur Eaz rentals apparaîtront ici.',
      loginRequired:
        'Vous devez être connecté.',
      loadError:
        'Impossible de charger les notifications.',
      updateError:
        'Impossible de mettre à jour les notifications.',
      propertyApproved:
        'Votre bien a été approuvé.',
      propertyRejected:
        'Votre bien a été rejeté.',
      newInquiry:
        'Vous avez reçu une nouvelle demande concernant un bien.',
      inquirySent:
        'Votre demande concernant le bien a été envoyée.',
      notificationError:
        'Impossible de charger les notifications.'
    },

    agents: {
      title:
        'Agents vérifiés',
      subtitle:
        'Contactez des professionnels de l’immobilier de confiance sur Eaz rentals.',
      loading:
        'Chargement des agents vérifiés...',
      noAgents:
        'Aucun agent vérifié pour le moment',
      noAgentsDescription:
        'Les agents vérifiés apparaîtront ici une fois qu’ils auront été approuvés.',
      verified:
        'Vérifié',
      verifiedAgent:
        'Agent vérifié',
      profilePhoto:
        'photo de profil',
      agentType:
        'Agent immobilier',
      phone:
        'Téléphone',
      properties:
        'Biens',
      whatsapp:
        'WhatsApp',
      viewProfile:
        'Voir le profil',
      loadError:
        'Impossible de charger les agents vérifiés. Veuillez réessayer.'
    },

    agentProfile: {
      title:
        'Profil de l’agent',
      verified:
        'Agent vérifié',
      verifiedAgent:
        'Agent vérifié',
      realEstateAgent:
        'Agent immobilier',
      professionalInformation:
        'Informations professionnelles',
      profilePhoto:
        'photo de profil',
      phone:
        'Téléphone',
      agency:
        'Agence / Entreprise',
      location:
        'Localisation',
      experience:
        'Expérience',
      years:
        'ans',
      accountStatus:
        'Statut du compte',
      propertiesBy:
        'Biens de',
      properties:
        'Biens',
      property:
        'Bien',
      available:
        'disponibles',
      about:
        'À propos de',
      viewProperty:
        'Voir le bien',
      whatsapp:
        'WhatsApp',
      noProperties:
        'Aucun bien pour le moment',
      noPropertiesDescription:
        'Cet agent n’a actuellement aucun bien approuvé.',
      loading:
        'Chargement du profil de l’agent...',
      loadError:
        'Impossible de charger le profil de l’agent.',
      agentNotFound:
        'Agent introuvable',
      backToAgents:
        'Retour aux agents'
    },

    admin: {
      title:
        'Tableau de bord administrateur',
      subtitle:
        'Gérez les utilisateurs et les biens sur la plateforme.',
      checkingAccess:
        'Vérification de l’accès administrateur...',

      totalProperties:
        'Total des biens',
      pendingProperties:
        'Biens en attente',
      approvedProperties:
        'Biens approuvés',
      rejectedProperties:
        'Biens rejetés',
      totalUsers:
        'Total des utilisateurs',

      propertySeekers:
        'Chercheurs de biens',
      landlords:
        'Propriétaires',
      agents:
        'Agents',
      verifiedAccounts:
        'Comptes vérifiés',

      userManagement:
        'Gestion des utilisateurs',
      userManagementDescription:
        'Gérez les chercheurs de biens, propriétaires et agents enregistrés.',
      refreshUsers:
        'Actualiser les utilisateurs',

      searchUsers:
        'Rechercher des utilisateurs',
      searchUsersPlaceholder:
        'Rechercher par nom ou téléphone',
      accountType:
        'Type de compte',
      allAccountTypes:
        'Tous les types de compte',
      realEstateAgents:
        'Agents immobiliers',

      verification:
        'Vérification',
      allVerificationStatuses:
        'Tous les statuts de vérification',
      verified:
        'Vérifié',
      unverified:
        'Non vérifié',
      notApplicable:
        'Non applicable',

      loadingUsers:
        'Chargement des utilisateurs...',
      noUsers:
        'Aucun utilisateur trouvé',
      noUsersDescription:
        'Essayez de modifier votre recherche ou le filtre de type de compte.',
      clearFilters:
        'Effacer les filtres',

      name:
        'Nom',
      phone:
        'Téléphone',
      registered:
        'Inscription',
      action:
        'Action',
      notProvided:
        'Non renseigné',
      verify:
        'Vérifier',
      remove:
        'Retirer',
      updating:
        'Mise à jour...',

      propertySubmissions:
        'Soumissions de biens',
      propertySubmissionsDescription:
        'Examinez les biens soumis par les propriétaires et les agents.',
      refreshProperties:
        'Actualiser les biens',

      searchProperties:
        'Rechercher des biens',
      searchPropertiesPlaceholder:
        'Rechercher une ville, un quartier ou un type de bien',
      status:
        'Statut',
      allStatuses:
        'Tous les statuts',
      pending:
        'En attente',
      approved:
        'Approuvé',
      rejected:
        'Rejeté',

      category:
        'Catégorie',
      allProperties:
        'Tous les biens',
      housing:
        'Logement',
      land:
        'Terrain',

      loadingProperties:
        'Chargement des biens...',
      noProperties:
        'Aucun bien trouvé',
      noPropertiesDescription:
        'Essayez de modifier votre recherche ou vos filtres.',

      verifiedOwner:
        'Propriétaire vérifié',
      listing:
        'Annonce',
      listingType:
        'Type d’annonce',
      owner:
        'Propriétaire',
      unknown:
        'Inconnu',
      submitted:
        'Soumis le',
      review:
        'Examiner',

      propertyReview:
        'Examen du bien',
      noPhotosUploaded:
        'Aucune photo téléchargée',
      photo:
        'Photo',
      ownerInformation:
        'Informations du propriétaire',
      noDescription:
        'Aucune description fournie.',
      propertyId:
        'Identifiant du bien',

      rejectProperty:
        'Rejeter le bien',
      approveProperty:
        'Approuver le bien',

      propertySeeker:
        'Chercheur de bien',
      landlord:
        'Propriétaire',
      realEstateAgent:
        'Agent immobilier',

      accessDenied:
        'Accès refusé. L’accès administrateur est requis.',
      unableToVerifyAccess:
        'Impossible de vérifier l’accès administrateur.',
      failedToLoadProperties:
        'Impossible de charger les biens.',
      failedToLoadUsers:
        'Impossible de charger les utilisateurs.',
      failedToUpdateVerification:
        'Impossible de mettre à jour le statut de vérification.',
      failedToUpdateProperty:
        'Impossible de mettre à jour le bien.',

      thisAccount:
        'ce compte',

      verifyConfirm:
        'Êtes-vous sûr de vouloir vérifier {name} ?',
      removeVerificationConfirm:
        'Êtes-vous sûr de vouloir retirer la vérification de {name} ?',
      approveConfirm:
        'Êtes-vous sûr de vouloir approuver ce bien ?',
      rejectConfirm:
        'Êtes-vous sûr de vouloir rejeter ce bien ?'
    },

    footer: {
      description:
        'Trouvez des maisons, appartements et terrains partout au Cameroun.',
      quickLinks:
        'Liens rapides',
      housing:
        'Logements',
      land:
        'Terrains',
      agents:
        'Agents',
      postProperty:
        'Publier un bien',
      account:
        'Compte',
      login:
        'Connexion',
      register:
        'Inscription',
      dashboard:
        'Tableau de bord',
      contact:
        'Contact',
      rights:
        'Tous droits réservés.'
    },

    errors: {
      general:
        'Une erreur s’est produite. Veuillez réessayer.',
      network:
        'Erreur réseau. Vérifiez votre connexion.',
      unauthorized:
        'Vous n’êtes pas autorisé à effectuer cette action.',
      notFound:
        'L’élément demandé est introuvable.'
    }
  }
}

const savedLanguage =
  localStorage.getItem('eaz-language') || 'en'

const i18n = createI18n({
  legacy: false,
  locale: savedLanguage,
  fallbackLocale: 'en',
  messages
})

export default i18n