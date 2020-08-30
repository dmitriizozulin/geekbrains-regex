class RegexConventer {
  constructor(parentRoot = '.regex') {
    this.parentRoot = document.querySelector(parentRoot);
    this.form = this.parentRoot.querySelector('.regex-form');
    this.input = this.parentRoot.querySelector('.regex-input');
    this.submit = this.parentRoot.querySelector('.regex-submit');
    this.out = this.parentRoot.querySelector('.regex-out');
    this.regex = /(?:(?<!n)'|(?<=\s)')((?:[\w;,.!?\s]|(?:n't))+)(?:'(?!t))/gm;

    this._init();
  }

  _init() {
    this._handleActions();
  }

  _handleActions() {
    this.form.addEventListener('submit', this._handleSubmit.bind(this));
  }

  _handleSubmit(e) {
    e.preventDefault();
    const convertedText = this._convert(this.input.value);
    this._render(convertedText);
  }

  _convert(rawText) {
    return rawText.trim().replaceAll(this.regex, '"$1"');
  }

  _render(text) {
    this.out.innerText = text;
  }
}

new RegexConventer();

class FormValidator {
  constructor(parentRoot = '.validator') {
    this.nameRegex = /^[a-z]+$/i;
    this.phoneRegex = /^\+7\(\d{3}\)\d{3}-\d{4}$/;
    this.emailRegex = /^[a-z]+(?:(-|\.)?[a-z]+)@mail\.ru$/i;

    this.parentRoot = document.querySelector(parentRoot);
    this.names = this.parentRoot.querySelectorAll('.validator-name');
    this.phones = this.parentRoot.querySelectorAll('.validator-phone');
    this.emails = this.parentRoot.querySelectorAll('.validator-email');
    this.texts = this.parentRoot.querySelectorAll('.validator-text');

    this._init();
  }

  _init() {
    this._handleActions();
  }

  _handleActions() {
    const { names, phones, emails, texts } = this;
    const items = [...names, ...phones, ...emails, ...texts];

    items.forEach(item => {
      item.addEventListener('change', this._handleChange.bind(this));
    });

    this.parentRoot.addEventListener('submit', e => {
      e.preventDefault();
    });
  }

  _handleChange(e) {
    const target = e.target;
    const targetClassList = target.classList;

    let matchRegex = null;

    targetClassList.forEach(item => {
      const regex = item.match(/(?:validator-)(\w+)/m)[1];
      if (regex) matchRegex = this[regex + 'Regex'];
    });

    let match = this._matchInput(target.value, matchRegex);

    this._changeBorder(target, match);
  }

  _matchInput(value, regex) {
    return value.match(regex);
  }

  _changeBorder(elem, state) {
    elem.style.border = `2px solid ${state ? 'green' : 'red'}`;
  }
}

new FormValidator();
