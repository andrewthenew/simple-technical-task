//the value of userId which should be passed into the collect.js
async function getUserId() {
  const resp = await fetch('https://www.uuidtools.com/api/generate/v4');
  const uids = await resp.json();
  return uids[0];
}

//your code goes here
const isRunning = document.currentScript.getAttribute('isRunning') || false;

// style
const styleEl = document.createElement('link');
styleEl.setAttribute('rel', 'stylesheet');
styleEl.setAttribute('type', 'text/css');
styleEl.setAttribute('href', './build/app.css');
document.getElementsByTagName('head')[0].appendChild(styleEl);

// script
const scriptEl = document.createElement('script');
scriptEl.setAttribute('src', './src/app.js');
scriptEl.setAttribute('type', 'module');
document.getElementsByTagName('body')[0].appendChild(scriptEl);

// launch
scriptEl.addEventListener('load', async () => {
  const App = window?.app;
  if (App) {
    const myApp = new App(isRunning);
    const userId = await getUserId();
    myApp.run(userId);
  }
});
