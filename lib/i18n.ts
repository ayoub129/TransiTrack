import { I18nManager } from 'react-native';

export type Locale = 'en' | 'fr' | 'ar';

export const locales: Locale[] = ['en', 'fr', 'ar'];

export const isRTL = (locale: Locale): boolean => locale === 'ar';

export const setRTL = (locale: Locale) => {
  const rtl = isRTL(locale);
  I18nManager.allowRTL(rtl);
  I18nManager.forceRTL(rtl);
};

export const translations = {
  en: {
    // Auth
    welcome: 'Welcome to TransportMVP',
    welcomeSubtitle: 'Connect clients with transporters for efficient delivery',
    login: 'Login',
    register: 'Register',
    email: 'Email',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    forgotPassword: 'Forgot Password?',
    dontHaveAccount: "Don't have an account?",
    alreadyHaveAccount: 'Already have an account?',
    signUp: 'Sign Up',
    signIn: 'Sign In',
    
    // Roles
    selectRole: 'Select Your Role',
    client: 'Client',
    clientDescription: 'I need to send packages and goods',
    transporter: 'Transporter',
    transporterDescription: 'I provide delivery services',
    
    // KYC
    kycTitle: 'Complete Your Profile',
    personalInfo: 'Personal Information',
    vehicleInfo: 'Vehicle Information',
    documents: 'Documents',
    serviceZones: 'Service Zones',
    review: 'Review & Submit',
    firstName: 'First Name',
    lastName: 'Last Name',
    phone: 'Phone Number',
    vehicleType: 'Vehicle Type',
    licensePlate: 'License Plate',
    uploadPhoto: 'Upload Photo',
    takePhoto: 'Take Photo',
    chooseFromGallery: 'Choose from Gallery',
    selectZones: 'Select Service Zones',
    
    // Offers
    createOffer: 'Create Offer',
    from: 'From',
    to: 'To',
    goodsType: 'Goods Type',
    weight: 'Weight (kg)',
    volume: 'Volume (m³)',
    photos: 'Photos',
    dateTime: 'Date & Time',
    getEstimate: 'Get Estimate',
    postOffer: 'Post Offer',
    
    // Cost Estimate
    costEstimate: 'Cost Estimate',
    distance: 'Distance',
    estimatedPrice: 'Estimated Price',
    priceRange: 'Price Range',
    termsNote: 'Final price may vary based on transporter bids',
    
    // Home
    home: 'Home',
    offers: 'Offers',
    map: 'Map',
    list: 'List',
    online: 'Online',
    offline: 'Offline',
    goOnline: 'Go Online',
    goOffline: 'Go Offline',
    
    // Bidding
    placeBid: 'Place Bid',
    yourBid: 'Your Bid',
    counterOffer: 'Counter Offer',
    acceptBid: 'Accept Bid',
    rejectBid: 'Reject Bid',
    
    // Messages
    messages: 'Messages',
    conversations: 'Conversations',
    typeMessage: 'Type a message...',
    send: 'Send',
    
    // Delivery
    myTrips: 'My Trips',
    activeDelivery: 'Active Delivery',
    deliveryHistory: 'Delivery History',
    startDelivery: 'Start Delivery',
    pickedUp: 'Picked Up',
    inTransit: 'In Transit',
    delivered: 'Delivered',
    confirmDelivery: 'Confirm Delivery',
    enterPin: 'Enter 6-digit PIN',
    
    // Profile
    profile: 'Profile',
    settings: 'Settings',
    language: 'Language',
    darkMode: 'Dark Mode',
    notifications: 'Notifications',
    help: 'Help',
    logout: 'Logout',
    
    // Status
    pending: 'Pending',
    approved: 'Approved',
    rejected: 'Rejected',
    created: 'Created',
    assigned: 'Assigned',
    completed: 'Completed',
    cancelled: 'Cancelled',
    
    // Common
    save: 'Save',
    cancel: 'Cancel',
    confirm: 'Confirm',
    retry: 'Retry',
    loading: 'Loading...',
    error: 'Error',
    success: 'Success',
    empty: 'No items found',
    tryAgain: 'Try Again',
  },
  
  fr: {
    // Auth
    welcome: 'Bienvenue sur TransportMVP',
    welcomeSubtitle: 'Connectez les clients avec les transporteurs pour une livraison efficace',
    login: 'Connexion',
    register: 'S\'inscrire',
    email: 'Email',
    password: 'Mot de passe',
    confirmPassword: 'Confirmer le mot de passe',
    forgotPassword: 'Mot de passe oublié?',
    dontHaveAccount: 'Vous n\'avez pas de compte?',
    alreadyHaveAccount: 'Vous avez déjà un compte?',
    signUp: 'S\'inscrire',
    signIn: 'Se connecter',
    
    // Roles
    selectRole: 'Sélectionnez votre rôle',
    client: 'Client',
    clientDescription: 'J\'ai besoin d\'envoyer des colis et des marchandises',
    transporter: 'Transporteur',
    transporterDescription: 'Je fournis des services de livraison',
    
    // KYC
    kycTitle: 'Complétez votre profil',
    personalInfo: 'Informations personnelles',
    vehicleInfo: 'Informations du véhicule',
    documents: 'Documents',
    serviceZones: 'Zones de service',
    review: 'Révision et soumission',
    firstName: 'Prénom',
    lastName: 'Nom de famille',
    phone: 'Numéro de téléphone',
    vehicleType: 'Type de véhicule',
    licensePlate: 'Plaque d\'immatriculation',
    uploadPhoto: 'Télécharger une photo',
    takePhoto: 'Prendre une photo',
    chooseFromGallery: 'Choisir dans la galerie',
    selectZones: 'Sélectionner les zones de service',
    
    // Offers
    createOffer: 'Créer une offre',
    from: 'De',
    to: 'À',
    goodsType: 'Type de marchandises',
    weight: 'Poids (kg)',
    volume: 'Volume (m³)',
    photos: 'Photos',
    dateTime: 'Date et heure',
    getEstimate: 'Obtenir une estimation',
    postOffer: 'Publier l\'offre',
    
    // Cost Estimate
    costEstimate: 'Estimation des coûts',
    distance: 'Distance',
    estimatedPrice: 'Prix estimé',
    priceRange: 'Gamme de prix',
    termsNote: 'Le prix final peut varier selon les offres des transporteurs',
    
    // Home
    home: 'Accueil',
    offers: 'Offres',
    map: 'Carte',
    list: 'Liste',
    online: 'En ligne',
    offline: 'Hors ligne',
    goOnline: 'Se mettre en ligne',
    goOffline: 'Se mettre hors ligne',
    
    // Bidding
    placeBid: 'Faire une offre',
    yourBid: 'Votre offre',
    counterOffer: 'Contre-offre',
    acceptBid: 'Accepter l\'offre',
    rejectBid: 'Rejeter l\'offre',
    
    // Messages
    messages: 'Messages',
    conversations: 'Conversations',
    typeMessage: 'Tapez un message...',
    send: 'Envoyer',
    
    // Delivery
    myTrips: 'Mes trajets',
    activeDelivery: 'Livraison active',
    deliveryHistory: 'Historique des livraisons',
    startDelivery: 'Commencer la livraison',
    pickedUp: 'Récupéré',
    inTransit: 'En transit',
    delivered: 'Livré',
    confirmDelivery: 'Confirmer la livraison',
    enterPin: 'Entrez le code PIN à 6 chiffres',
    
    // Profile
    profile: 'Profil',
    settings: 'Paramètres',
    language: 'Langue',
    darkMode: 'Mode sombre',
    notifications: 'Notifications',
    help: 'Aide',
    logout: 'Déconnexion',
    
    // Status
    pending: 'En attente',
    approved: 'Approuvé',
    rejected: 'Rejeté',
    created: 'Créé',
    assigned: 'Assigné',
    completed: 'Terminé',
    cancelled: 'Annulé',
    
    // Common
    save: 'Enregistrer',
    cancel: 'Annuler',
    confirm: 'Confirmer',
    retry: 'Réessayer',
    loading: 'Chargement...',
    error: 'Erreur',
    success: 'Succès',
    empty: 'Aucun élément trouvé',
    tryAgain: 'Réessayer',
  },
  
  ar: {
    // Auth
    welcome: 'مرحباً بك في TransportMVP',
    welcomeSubtitle: 'ربط العملاء مع الناقلين لتوصيل فعال',
    login: 'تسجيل الدخول',
    register: 'إنشاء حساب',
    email: 'البريد الإلكتروني',
    password: 'كلمة المرور',
    confirmPassword: 'تأكيد كلمة المرور',
    forgotPassword: 'نسيت كلمة المرور؟',
    dontHaveAccount: 'ليس لديك حساب؟',
    alreadyHaveAccount: 'لديك حساب بالفعل؟',
    signUp: 'إنشاء حساب',
    signIn: 'تسجيل الدخول',
    
    // Roles
    selectRole: 'اختر دورك',
    client: 'عميل',
    clientDescription: 'أحتاج لإرسال الطرود والبضائع',
    transporter: 'ناقل',
    transporterDescription: 'أقدم خدمات التوصيل',
    
    // KYC
    kycTitle: 'أكمل ملفك الشخصي',
    personalInfo: 'المعلومات الشخصية',
    vehicleInfo: 'معلومات المركبة',
    documents: 'المستندات',
    serviceZones: 'مناطق الخدمة',
    review: 'المراجعة والإرسال',
    firstName: 'الاسم الأول',
    lastName: 'اسم العائلة',
    phone: 'رقم الهاتف',
    vehicleType: 'نوع المركبة',
    licensePlate: 'رقم اللوحة',
    uploadPhoto: 'رفع صورة',
    takePhoto: 'التقاط صورة',
    chooseFromGallery: 'اختيار من المعرض',
    selectZones: 'اختيار مناطق الخدمة',
    
    // Offers
    createOffer: 'إنشاء عرض',
    from: 'من',
    to: 'إلى',
    goodsType: 'نوع البضائع',
    weight: 'الوزن (كغ)',
    volume: 'الحجم (م³)',
    photos: 'الصور',
    dateTime: 'التاريخ والوقت',
    getEstimate: 'الحصول على تقدير',
    postOffer: 'نشر العرض',
    
    // Cost Estimate
    costEstimate: 'تقدير التكلفة',
    distance: 'المسافة',
    estimatedPrice: 'السعر المقدر',
    priceRange: 'نطاق السعر',
    termsNote: 'السعر النهائي قد يختلف حسب عروض الناقلين',
    
    // Home
    home: 'الرئيسية',
    offers: 'العروض',
    map: 'الخريطة',
    list: 'القائمة',
    online: 'متصل',
    offline: 'غير متصل',
    goOnline: 'الاتصال',
    goOffline: 'قطع الاتصال',
    
    // Bidding
    placeBid: 'تقديم عرض',
    yourBid: 'عرضك',
    counterOffer: 'عرض مضاد',
    acceptBid: 'قبول العرض',
    rejectBid: 'رفض العرض',
    
    // Messages
    messages: 'الرسائل',
    conversations: 'المحادثات',
    typeMessage: 'اكتب رسالة...',
    send: 'إرسال',
    
    // Delivery
    myTrips: 'رحلاتي',
    activeDelivery: 'التوصيل النشط',
    deliveryHistory: 'تاريخ التوصيلات',
    startDelivery: 'بدء التوصيل',
    pickedUp: 'تم الاستلام',
    inTransit: 'في الطريق',
    delivered: 'تم التسليم',
    confirmDelivery: 'تأكيد التسليم',
    enterPin: 'أدخل الرمز السري المكون من 6 أرقام',
    
    // Profile
    profile: 'الملف الشخصي',
    settings: 'الإعدادات',
    language: 'اللغة',
    darkMode: 'الوضع المظلم',
    notifications: 'الإشعارات',
    help: 'المساعدة',
    logout: 'تسجيل الخروج',
    
    // Status
    pending: 'في الانتظار',
    approved: 'موافق عليه',
    rejected: 'مرفوض',
    created: 'تم الإنشاء',
    assigned: 'تم التعيين',
    completed: 'مكتمل',
    cancelled: 'ملغي',
    
    // Common
    save: 'حفظ',
    cancel: 'إلغاء',
    confirm: 'تأكيد',
    retry: 'إعادة المحاولة',
    loading: 'جاري التحميل...',
    error: 'خطأ',
    success: 'نجح',
    empty: 'لا توجد عناصر',
    tryAgain: 'حاول مرة أخرى',
  },
} as const;

export type TranslationKeys = keyof typeof translations.en;

export const t = (key: TranslationKeys, locale: Locale = 'en'): string => {
  return translations[locale][key] || translations.en[key] || key;
};
