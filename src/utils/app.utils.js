export function addScript(attributes) {
  const attributesKeys = Object.keys(attributes);
  const all = document.getElementsByTagName('script');

  for (const script of all) {
    const atts = script.getAttributeNames();
    for (const att of atts) {
      if (attributesKeys.includes(att) && att === 'src' && attributes[att] === script.getAttribute(att)) {
        return;
      }
    }
  }

  const scriptEl = document.createElement('script');
  if (Object.keys(attributes).length > 0) {
    for (const key in attributes) {
      scriptEl.setAttribute(key, attributes[key]);
    }
  }

  document.getElementsByTagName('body')[0].appendChild(scriptEl);
}

export function addElementToDom(elType = 'div', attributes, addTo) {
  const el = document.createElement(elType);
  if (Object.keys(attributes).length > 0) {
    for (const key in attributes) {
      el.setAttribute(key, attributes[key]);
    }
  }
  const addElement = document.querySelector(addTo);
  Array.isArray(addElement) ? addElement[0].appendChild(el) : addElement.appendChild(el);

  return el;
}

export function getElement(selector) {
  return document.querySelector(selector);
}

export function disableScroll() {
  document.getElementsByTagName('html')[0].style.overflow = 'hidden';
}

export function enableScroll() {
  document.getElementsByTagName('html')[0].style.overflow = 'auto';
}

export function setVal(key, val) {
  window.localStorage.setItem(key, val);
}
export function getVal(val) {
  return window.localStorage.getItem(val);
}
export function removeVal(key) {
  window.localStorage.removeItem(key);
}
