//your code goes here
import { CHOICE_KEY, OUT_URL } from './src/constants/app.constants.js';

const userId = document.currentScript?.getAttribute('userid') || window.localStorage.getItem(CHOICE_KEY) || null;

const outObj = {
  userId,
  date: Date.now().toString(),
  url: window.location.href,
  uag: window.navigator.userAgent,
  uag_lang: window.navigator.language,
  location: 'any lookup service available' // todo: probably todo
};

if (userId) {
  const onUnload = () => {
    navigator.sendBeacon(OUT_URL, JSON.stringify(outObj));
  };
  document.addEventListener('unload', onUnload);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      navigator.sendBeacon(OUT_URL, JSON.stringify(outObj));
    }
  });
}
