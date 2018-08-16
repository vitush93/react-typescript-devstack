import i18next from 'i18next';
import XHR from 'i18next-xhr-backend';
import { get } from 'tiny-cookie';

i18next.use(XHR);

declare var __DEVELOPMENT__: boolean;

export const supportedLanguages = ['cs-CZ', 'en-US'];

const selectedLanguage = get('lang') || supportedLanguages[0];

i18next.init(
    {
        lng: selectedLanguage,
        fallbackLng: {
            en: ['en-US'],
            cs: ['cs-CZ'],
            default: supportedLanguages,
        },
        resources: require('../locale/index.locales.js'),
        debug: typeof __DEVELOPMENT__ !== 'undefined' && __DEVELOPMENT__,
        preload: [],
    },
    (err: any) => {
        if (err) {
            console.error('i18n error: ', err);
        } else {
            console.log('Locale initilized');
        }
    },
);

export default i18next;
