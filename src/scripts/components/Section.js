export class Section {
  constructor({items, renderer}, containerSelector) {
    this._initialArray = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  addItem(element, isAppend) {
    if (isAppend) {
      this._container.append(element);
    } else {
      this._container.prepend(element);
    }
  }

  renderItems() {
    this._initialArray.forEach(item => {
      this._renderer(item);
    })
  }
}