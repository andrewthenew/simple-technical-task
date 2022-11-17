import {
  addElementToDom,
  addScript,
  disableScroll,
  enableScroll,
  getElement,
  getVal, removeVal,
  setVal
} from './utils/app.utils.js';
import { CHOICE_ACCEPT, CHOICE_KEY, CHOICE_REJECT, USER_ID_KEY } from './constants/app.constants.js';


export const app = class App {
  constructor(enabled) {
    this.enabled = enabled === 'true';
    removeVal(USER_ID_KEY);
  }

  handleTriangleCLick = () => {
    this.showModal();
  };
  handleBtnCLick = (choice) => {
    setVal(CHOICE_KEY, choice);
    this.hideModal();
  };

  addCollectScript = () => {
    addScript({
      // userid: this.userId,
      src: './collect.js',
      type: 'module',
    });
  };
  addTriangle = () => {
    const tri = addElementToDom('div', { id: 'triangle' }, 'body');
    tri.addEventListener('click', this.handleTriangleCLick);
  };
  addModal = () => {
    addElementToDom('div', { id: 'backDrop' }, 'body');
    addElementToDom('div', { id: 'modal' }, '#backDrop');
    const btnAccept = addElementToDom('div', { class: 'w3-button w3-padding-large w3-green' }, '#modal');
    btnAccept.innerText = 'Accept';
    btnAccept.addEventListener('click', () => {
      this.handleBtnCLick(CHOICE_ACCEPT);
      this.addCollectScript();
    });

    const btnReject = addElementToDom('div', { class: 'w3-button w3-padding-large w3-red' }, '#modal');
    btnReject.innerText = 'Reject';
    btnReject.addEventListener('click', () => {
      this.handleBtnCLick(CHOICE_REJECT);
    });
  };
  hideModal = () => {
    enableScroll();
    const back = getElement('#backDrop');
    if (back && back.classList.length === 0) {
      back.classList.add('hidden');
    }
  };
  showModal = () => {
    disableScroll();
    const back = getElement('#backDrop');
    if (!back) {
      this.addModal();
    } else {
      back.classList.length > 0 && back.classList.remove('hidden');
    }
  };

  run = (userId) => {
    if (!this.enabled) return;
    this.userId = userId;
    setVal(USER_ID_KEY, userId); // fallback for module-type script
    this.addTriangle();
    if (getVal(CHOICE_KEY) === CHOICE_ACCEPT) this.addCollectScript();
  };
};

// or localStorage... or whatever.
window.app = app;
