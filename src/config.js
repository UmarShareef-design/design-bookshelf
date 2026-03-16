export const SUPPORTED_LANGUAGES = [
    { code: 'en', name: 'English', native: 'English' },
    { code: 'ta', name: 'Tamil', native: 'தமிழ்' },
    { code: 'hi', name: 'Hindi', native: 'हिन्दी' },
    { code: 'te', name: 'Telugu', native: 'తెలుగు' },
    { code: 'ml', name: 'Malayalam', native: 'മലയാളം' },
    { code: 'kn', name: 'Kannada', native: 'ಕನ್ನಡ' },
    { code: 'bn', name: 'Bengali', native: 'বাংলা' },
    { code: 'mr', name: 'Marathi', native: 'मराठी' },
    { code: 'gu', name: 'Gujarati', native: 'ગુજરાતી' },
    { code: 'pa', name: 'Punjabi', native: 'ਪੰਜਾਬੀ' },
    { code: 'or', name: 'Odia', native: 'ଓଡ଼ିଆ' }
];

export const LANGUAGE_CODES = SUPPORTED_LANGUAGES.map(l => l.code);
export const NON_DEFAULT_LANG_CODES = LANGUAGE_CODES.filter(c => c !== 'en');

export const FAVORITES_STORAGE_KEY = 'design-bookshelf-favorites';
export const GA_MEASUREMENT_ID = 'G-PKCP0G5RGP';
export const FEEDBACK_URL = 'https://docs.google.com/forms/d/e/1FAIpQLSdizXwJUzLnyEQVH_fjZClIUir9lMg9RnIZQkWooexjJz9e7Q/viewform?usp=header';
