// ---------------------------------------------------------------------------
// i18n — Multi-Language Support (English, Hindi, Gujarati, Marathi, Telugu)
// Built specifically for Indian shopkeepers and retail businesses.
// ---------------------------------------------------------------------------

export type LanguageKey = 'en' | 'hi' | 'gu' | 'mr' | 'te';

export type LanguageOption = {
  key: LanguageKey;
  label: string;
  nativeName: string;
  flag: string;
};

export const LANGUAGES: LanguageOption[] = [
  { key: 'en', label: 'English', nativeName: 'English', flag: '🇬🇧' },
  { key: 'hi', label: 'Hindi', nativeName: 'हिंदी', flag: '🇮🇳' },
  { key: 'gu', label: 'Gujarati', nativeName: 'ગુજરાતી', flag: '🇮🇳' },
  { key: 'mr', label: 'Marathi', nativeName: 'मराठी', flag: '🇮🇳' },
  { key: 'te', label: 'Telugu', nativeName: 'తెలుగు', flag: '🇮🇳' },
];

export const TRANSLATIONS: Record<LanguageKey, Record<string, string>> = {
  en: {
    // Navigation
    dashboard: 'Dashboard',
    newBill: 'New Bill',
    onlineOrders: 'Online Orders',
    customers: 'Customers',
    items: 'Items',
    inventory: 'Inventory',
    billHistory: 'Bill History',
    settings: 'Settings',
    admin: 'Admin',
    downloadOurApp: 'Download Our App',
    logOut: 'Log out',
    freeTrial: '21-Day Free Trial',
    daysRemaining: 'days remaining',
    signedInAs: 'Signed in as',

    // Buttons & Actions
    save: 'Save',
    cancel: 'Cancel',
    delete: 'Delete',
    edit: 'Edit',
    search: 'Search',
    print: 'Print',
    share: 'Share',
    downloadPdf: 'Download PDF',
    loading: 'Loading…',
    action: 'Action',
    saveSettings: 'Save Settings',

    // Dashboard
    totalCustomers: 'Total Customers',
    totalItems: 'Total Products',
    totalBills: 'Total Bills',
    monthlyRevenue: 'This Month',
    totalRevenue: 'Total Revenue',
    recentBills: 'Recent Bills',
    sales7Days: 'Last 7 Days Sales',
    quickActions: 'Quick Actions',

    // Billing Form
    billDetails: 'Bill Details',
    billNumber: 'Bill Number',
    customerName: 'Customer Name',
    selectOrCreateCustomer: 'Type or select customer',
    patientName: 'Patient Name',
    patientAddress: 'Patient Address',
    doctorName: 'Prescribing Doctor',
    addItemToBill: '+ Add Item',
    selectProduct: 'Select product',
    qty: 'Qty',
    rate: 'Rate',
    discount: 'Discount',
    taxGst: 'Tax / GST',
    subtotal: 'Subtotal',
    grandTotal: 'Grand Total',
    generateBill: 'Generate Bill',
    updateBill: 'Update Bill',

    // Settings
    language: 'App Language',
    selectLanguageDesc: 'Choose your preferred language for the app interface.',
    storeType: 'Store Type',
    invoicePaperSize: 'Invoice Paper Size',
    shopProfile: 'Shop Profile',
    shopName: 'Shop Name',
    phone: 'Phone Number',
    address: 'Shop Address',

    // Stock & Inventory
    stockQty: 'Stock Qty',
    lowStock: 'Low Stock',
    restock: 'Restock',
  },
  hi: {
    // Navigation
    dashboard: 'डैशबोर्ड',
    newBill: 'नया बिल',
    onlineOrders: 'ऑनलाइन ऑर्डर',
    customers: 'ग्राहक (Customers)',
    items: 'सामान (Products)',
    inventory: 'स्टॉक / इन्वेंटरी',
    billHistory: 'बिल इतिहास (History)',
    settings: 'सेटिंग्स',
    admin: 'एडमिन पैनल',
    downloadOurApp: 'ऐप डाउनलोड करें',
    logOut: 'लॉग आउट करें',
    freeTrial: '21-दिन का मुफ्त ट्रायल',
    daysRemaining: 'दिन शेष',
    signedInAs: 'लॉग इन किया:',

    // Buttons & Actions
    save: 'सहेजें (Save)',
    cancel: 'रद्द करें',
    delete: 'हटाएं (Delete)',
    edit: 'बदलें (Edit)',
    search: 'खोजें (Search)',
    print: 'प्रिंट करें',
    share: 'शेयर करें',
    downloadPdf: 'PDF डाउनलोड करें',
    loading: 'लोड हो रहा है…',
    action: 'कार्रवाई',
    saveSettings: 'सेटिंग्स सहेजें',

    // Dashboard
    totalCustomers: 'कुल ग्राहक',
    totalItems: 'कुल सामान',
    totalBills: 'कुल बिल',
    monthlyRevenue: 'इस महीने का राजस्व',
    totalRevenue: 'कुल बिक्री (Revenue)',
    recentBills: 'हाल के बिल',
    sales7Days: 'पिछले 7 दिनों की बिक्री',
    quickActions: 'त्वरित कार्य',

    // Billing Form
    billDetails: 'बिल विवरण',
    billNumber: 'बिल नंबर',
    customerName: 'ग्राहक का नाम',
    selectOrCreateCustomer: 'ग्राहक चुनें या नाम लिखें',
    patientName: 'मरीज़ का नाम',
    patientAddress: 'मरीज़ का पता',
    doctorName: 'डॉक्टर का नाम',
    addItemToBill: '+ सामान जोड़ें',
    selectProduct: 'सामान चुनें',
    qty: 'मात्रा (Qty)',
    rate: 'दर (Rate)',
    discount: 'छूट (Discount)',
    taxGst: 'टैक्स / GST',
    subtotal: 'उप-योग (Subtotal)',
    grandTotal: 'कुल योग (Grand Total)',
    generateBill: 'बिल बनाएं (Generate)',
    updateBill: 'बिल अपडेट करें',

    // Settings
    language: 'ऐप की भाषा (Language)',
    selectLanguageDesc: 'अपनी सुविधानुसार अपनी भाषा चुनें।',
    storeType: 'दुकान का प्रकार (Store Type)',
    invoicePaperSize: 'बिल का पेपर साइज',
    shopProfile: 'दुकान का प्रोफ़ाइल',
    shopName: 'दुकान का नाम',
    phone: 'फ़ोन नंबर',
    address: 'दुकान का पता',

    // Stock & Inventory
    stockQty: 'स्टॉक मात्रा',
    lowStock: 'कम स्टॉक',
    restock: 'स्टॉक भरें',
  },
  gu: {
    // Navigation
    dashboard: 'ડેશબોર્ડ',
    newBill: 'નવું બિલ',
    onlineOrders: 'ઓનલાઈન ઓર્ડર',
    customers: 'ગ્રાહકો (Customers)',
    items: 'સામાન (Products)',
    inventory: 'સ્ટોક / ઇન્વેન્ટરી',
    billHistory: 'બિલ હિસ્ટ્રી',
    settings: 'સેટિંગ્સ',
    admin: 'એડમિન પેનલ',
    downloadOurApp: 'એપ ડાઉનલોડ કરો',
    logOut: 'લોગ આઉટ કરો',
    freeTrial: '21-દિવસની ફ્રી ટ્રાયલ',
    daysRemaining: 'દિવસો બાકી',
    signedInAs: 'લોગિન કર્યું:',

    // Buttons & Actions
    save: 'સાચવો (Save)',
    cancel: 'રદ કરો',
    delete: 'કાઢી નાખો (Delete)',
    edit: 'ફેરફાર કરો (Edit)',
    search: 'શોધો (Search)',
    print: 'પ્રિન્ટ કરો',
    share: 'શેર કરો',
    downloadPdf: 'PDF ડાઉનલોડ કરો',
    loading: 'લોડ થઈ રહ્યું છે…',
    action: 'કારવાઈ',
    saveSettings: 'સેટિંગ્સ સાચવો',

    // Dashboard
    totalCustomers: 'કુલ ગ્રાહકો',
    totalItems: 'કુલ પ્રોડક્ટ્સ',
    totalBills: 'કુલ બિલો',
    monthlyRevenue: 'આ મહિનાનું વેચાણ',
    totalRevenue: 'કુલ વેચાણ (Revenue)',
    recentBills: 'તાજેતરના બિલો',
    sales7Days: 'છેલ્લા 7 દિવસનું વેચાણ',
    quickActions: 'ઝડપી કાર્યો',

    // Billing Form
    billDetails: 'બિલ વિગતો',
    billNumber: 'બિલ નંબર',
    customerName: 'ગ્રાહકનું નામ',
    selectOrCreateCustomer: 'ગ્રાહક પસંદ કરો અથવા નામ લખો',
    patientName: 'દર્દીનું નામ',
    patientAddress: 'દર્દીનું સરનામું',
    doctorName: 'ડોક્ટરનું નામ',
    addItemToBill: '+ સામાન ઉમેરો',
    selectProduct: 'સામાન પસંદ કરો',
    qty: 'નંગ (Qty)',
    rate: 'ભાવ (Rate)',
    discount: 'ડિસ્કાઉન્ટ',
    taxGst: 'ટેક્સ / GST',
    subtotal: 'સરવાળો (Subtotal)',
    grandTotal: 'કુલ રકમ (Grand Total)',
    generateBill: 'બિલ બનાવો (Generate)',
    updateBill: 'બિલ અપડેટ કરો',

    // Settings
    language: 'એપની ભાષા (Language)',
    selectLanguageDesc: 'તમારી પસંદગી મુજબ એપની ભાષા પસંદ કરો.',
    storeType: 'દુકાનનો પ્રકાર (Store Type)',
    invoicePaperSize: 'બિલ પેપર સાઇઝ',
    shopProfile: 'દુકાનની પ્રોફાઇલ',
    shopName: 'દુકાનનું નામ',
    phone: 'ફોન નંબર',
    address: 'દુકાનનું સરનામું',

    // Stock & Inventory
    stockQty: 'સ્ટોક જથ્થો',
    lowStock: 'ઓછો સ્ટોક',
    restock: 'સ્ટોક ઉમેરો',
  },
  mr: {
    // Navigation
    dashboard: 'डॅशबोर्ड',
    newBill: 'नवीन बिल',
    onlineOrders: 'ऑनलाइन ऑर्डर्स',
    customers: 'ग्राहक (Customers)',
    items: 'वस्तू (Products)',
    inventory: 'स्टॉक / इन्व्हेंटरी',
    billHistory: 'बिल इतिहास (History)',
    settings: 'सेटिंग्ज',
    admin: 'ॲडमिन पॅनेल',
    downloadOurApp: 'ॲप डाउनलोड करा',
    logOut: 'लॉग आउट करा',
    freeTrial: '21-दिवसांची मोफत ट्रायल',
    daysRemaining: 'दिवस बाकी',
    signedInAs: 'लॉग इन केले:',

    // Buttons & Actions
    save: 'जतन करा (Save)',
    cancel: 'रद्द करा',
    delete: 'हटवा (Delete)',
    edit: 'बदला (Edit)',
    search: 'शोधा (Search)',
    print: 'प्रिंट करा',
    share: 'शेअर करा',
    downloadPdf: 'PDF डाउनलोड करा',
    loading: 'लोड होत आहे…',
    action: 'कृती',
    saveSettings: 'सेटिंग्ज जतन करा',

    // Dashboard
    totalCustomers: 'एकूण ग्राहक',
    totalItems: 'एकूण वस्तू',
    totalBills: 'एकूण बिलांची संख्या',
    monthlyRevenue: 'या महिन्याची विक्री',
    totalRevenue: 'एकूण विक्री (Revenue)',
    recentBills: 'नुकतीच झालेली बिले',
    sales7Days: 'मागील 7 दिवसांची विक्री',
    quickActions: 'जलद कृती',

    // Billing Form
    billDetails: 'बिल तपशील',
    billNumber: 'बिल क्रमांक',
    customerName: 'ग्राहकाचे नाव',
    selectOrCreateCustomer: 'ग्राहक निवडा किंवा नाव टाका',
    patientName: 'रुग्णाचे नाव',
    patientAddress: 'रुग्णाचा पत्ता',
    doctorName: 'डॉक्टरांचे नाव',
    addItemToBill: '+ वस्तू जोडा',
    selectProduct: 'वस्तू निवडा',
    qty: 'प्रमाण (Qty)',
    rate: 'दर (Rate)',
    discount: 'सवलत (Discount)',
    taxGst: 'कर / GST',
    subtotal: 'एकूण रक्कम (Subtotal)',
    grandTotal: 'एकूण बिल (Grand Total)',
    generateBill: 'बिल तयार करा (Generate)',
    updateBill: 'बिल अपडेट करा',

    // Settings
    language: 'ॲपची भाषा (Language)',
    selectLanguageDesc: 'आपल्या सोयीनुसार ॲपची भाषा निवडा.',
    storeType: 'दुकानाचा प्रकार (Store Type)',
    invoicePaperSize: 'बिल कागदाचा आकार',
    shopProfile: 'दुकानाचे प्रोफाईल',
    shopName: 'दुकानाचे नाव',
    phone: 'फोन नंबर',
    address: 'दुकानाचा पत्ता',

    // Stock & Inventory
    stockQty: 'स्टॉक प्रमाण',
    lowStock: 'कमी स्टॉक',
    restock: 'स्टॉक भरा',
  },
  te: {
    // Navigation
    dashboard: 'డాష్‌బోర్డ్',
    newBill: 'కొత్త బిల్లు',
    onlineOrders: 'ఆన్‌లైన్ ఆర్డర్లు',
    customers: 'కస్టమర్లు (Customers)',
    items: 'వస్తువులు (Products)',
    inventory: 'స్టాక్ / ఇన్వెంటరీ',
    billHistory: 'బిల్లు హిస్టరీ (History)',
    settings: 'సెట్టింగ్‌లు',
    admin: 'అడ్మిన్ ప్యానెల్',
    downloadOurApp: 'యాప్ డౌన్‌లోడ్ చేయండి',
    logOut: 'లాగ్ అవుట్',
    freeTrial: '21 రోజుల ఉచిత ట్రయల్',
    daysRemaining: 'రోజులు మిగిలి ఉన్నాయి',
    signedInAs: 'లాగిన్ అయ్యారు:',

    // Buttons & Actions
    save: 'సేవ్ చేయండి (Save)',
    cancel: 'రద్దు చేయండి',
    delete: 'తొలగించండి (Delete)',
    edit: 'సవరించండి (Edit)',
    search: 'వెతకండి (Search)',
    print: 'ప్రింట్ చేయండి',
    share: 'షేర్ చేయండి',
    downloadPdf: 'PDF డౌన్‌లోడ్ చేయండి',
    loading: 'లోడ్ అవుతోంది…',
    action: 'చర్య',
    saveSettings: 'సెట్టింగ్‌లు సేవ్ చేయండి',

    // Dashboard
    totalCustomers: 'మొత్తం కస్టమర్లు',
    totalItems: 'మొత్తం వస్తువులు',
    totalBills: 'మొత్తం బిల్లులు',
    monthlyRevenue: 'ఈ నెల అమ్మకాలు',
    totalRevenue: 'మొత్తం ఆదాయం (Revenue)',
    recentBills: 'ఇటీవలి బిల్లులు',
    sales7Days: 'గత 7 రోజుల అమ్మకాలు',
    quickActions: 'త్వరిత చర్యలు',

    // Billing Form
    billDetails: 'బిల్లు వివరాలు',
    billNumber: 'బిల్లు నంబర్',
    customerName: 'కస్టమర్ పేరు',
    selectOrCreateCustomer: 'కస్టమర్‌ను ఎంచుకోండి లేదా పేరు నమోదు చేయండి',
    patientName: 'రోగి పేరు',
    patientAddress: 'రోగి చిరునామా',
    doctorName: 'డాక్టర్ పేరు',
    addItemToBill: '+ వస్తువును జోడించండి',
    selectProduct: 'వస్తువును ఎంచుకోండి',
    qty: 'పరిమాణం (Qty)',
    rate: 'ధర (Rate)',
    discount: 'డిస్కౌంట్',
    taxGst: 'పన్ను / GST',
    subtotal: 'ఉప మొత్తం (Subtotal)',
    grandTotal: 'మొత్తం బిల్లు (Grand Total)',
    generateBill: 'బిల్లును రూపొందించండి (Generate)',
    updateBill: 'బిల్లును అప్‌డేట్ చేయండి',

    // Settings
    language: 'యాప్ భాష (Language)',
    selectLanguageDesc: 'మీకు నచ్చిన భాషను ఎంచుకోండి.',
    storeType: 'దుకాణం రకం (Store Type)',
    invoicePaperSize: 'ఇన్‌వాయిస్ పేపర్ సైజు',
    shopProfile: 'దుకాణం ప్రొఫైల్',
    shopName: 'దుకాణం పేరు',
    phone: 'ఫోన్ నంబర్',
    address: 'దుకాణం చిరునామా',

    // Stock & Inventory
    stockQty: 'స్టాక్ పరిమాణం',
    lowStock: 'తక్కువ స్టాక్',
    restock: 'స్టాక్ జోడించండి',
  },
};
