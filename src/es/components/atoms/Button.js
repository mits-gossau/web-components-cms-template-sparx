// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
/* global self */
/* global Image */

/**
 * Wrapper for a button element
 * Example at: /src/es/components/pages/Idee.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Button
 * @type {CustomElementConstructor}
 * @attribute {
    {string} href
    {_self | _blank | _parent | _top} target
    {n.a} has-icon
    {n.a} align-center
    'background-color' css props as attribute
    'background-color-hover' css props as attribute
    'color' css props as attribute
    {link/src} icon-image default: ../../../img/ButtonDownload.svg
  }
 * @css {
  var(--margin, 0);
  var(--padding, 0);
  var(--width, 100%);
  var(--height, 100%);
  var(--transition, 0.3s all);
  var(--border, none);
  var(--cursor, pointer);
  var(--color, white);
  var(--background-color, transparent);
  var(--font-family, var(--font-family-bold));
  var(--font-weight, var(--font-weight, normal));
  var(--font-size, 1em);
  var(--text-transform, none);
  var(--text-decoration, none);
  var(--a-text-underline-offset, unset);
  var(--border-radius, 0);
  var(--a-font-family-hover);
  var(--color-hover, --color);
  var(--background-color-hover, --background-color);
  var(--icon-display, flex);
  var(--icon-display-direction, row);
  var(--icon-align-items, center);
  var(--icon-margin-right, 2rem);
  var(--icon-margin-right, .7rem);
  var(--icon-width, 2.7rem);
  var(--font-size-mobile, 1em);
  var(--icon-width-mobile, min(2.7rem, 10vw));
}
 */
export default class Button extends Shadow() {
  constructor (...args) {
    super(...args)

    if (this.hasShadowRoot) {
      // @ts-ignore
      Array.from(this.childNodes).forEach(node => this.button.appendChild(this.root.appendChild(node)))
    }

    this.clickListener = event => {
      if (this.getAttribute('href')) {
        event.stopPropagation()
        if (this.getAttribute('href')[0] === '#') {
          this.dispatchEvent(new CustomEvent(this.getAttribute('click-anchor') || 'click-anchor', {
            detail: {
              selector: this.getAttribute('href')
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        } else {
          self.open(this.getAttribute('href'), this.getAttribute('target') || '_self')
        }
      }
    }
    // link behavior made accessible
    if (this.hasAttribute('href')) {
      this.setAttribute('data-href', this.getAttribute('href'))
      this.setAttribute('role', 'link')
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('button')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
    :host {
      ${this.hasAttribute('background-color-hover') ? `--background-color-hover: ${this.getAttribute('background-color-hover')};` : ''}
      ${this.hasAttribute('background-color') ? `--background-color: ${this.getAttribute('background-color')};` : ''}
      ${this.hasAttribute('color-hover') ? `--color-hover: ${this.getAttribute('color-hover')};` : ''}
      ${this.hasAttribute('color') ? `--color: ${this.getAttribute('color')};` : ''}
      display: var(--display, ${this.hasIcon ? 'inline-flex' : 'flex'});
      justify-content: var(--justify-content, ${this.alignCenter && !this.hasIcon ? 'center' : 'normal'});
      margin: var(--margin, 0);
    }
    :host button {
      width: var(--width, 100%);
      height: var(--height, 100%);
      transition: var(--transition, 0.3s all);
      border: var(--border, none);
      padding:var(${this.hasIcon ? '--padding-button-with-icon' : '--padding'}, 0);
      cursor: var(--cursor, pointer);
      color: var(--color, white);
      background-color: var(--background-color, transparent);
      font-family: var(--font-family, var(--font-family-bold));
      font-weight: var(--font-weight, var(--font-weight, normal));
      font-size: var(--font-size, 1em);
      text-transform: var(--text-transform, none);
      text-decoration: var(--text-decoration, none);
      text-underline-offset: var(--text-underline-offset, unset);
      border-radius: var(--border-radius, 0);
    }
    :host button:hover,  button:active, button:focus {
      font-family: var(--font-family-hover);
      color: var(--color-hover, --color);
      background-color: var(--background-color-hover, --background-color);
    }
    .icon {
      display:var(--icon-display, flex);
      flex-direction: var(--icon-display-direction, row);
      align-items: var(--icon-align-items, center);
      margin-right:var(--icon-margin-right, 2rem);
      background-color:transparent !important;
    }
    .icon > img {
      margin-right:var(--icon-img-margin-right, .7rem);
      width: var(--icon-img-width, 2.7rem);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {
        justify-content: var(--justify-content-mobile, var(--justify-content, ${this.alignCenter && !this.hasIcon ? 'center' : 'normal'}));
      }
      :host button {
        font-size: var(--font-size-mobile, 1em)
      }
      .icon > img {
        width: var(--icon-width-mobile, min(2.7rem, 10vw))
      }
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML () {
    // @ts-ignore
    if (this.hasIcon) this.constructor.addIconToButton(this.button, this.getAttribute('icon-image') || '../../../img/ButtonDownload.svg')
    this.html = this.button
  }

  /**
   * Prepend icon to button
   *
   * @param {HTMLButtonElement} button
   * @param {string} iconSrc
   * @return {HTMLElement}
   */
  static addIconToButton (button, iconSrc) {
    const iconImg = new Image()
    iconImg.src = iconSrc
    iconImg.alt = button.innerText || ''
    button.prepend(iconImg)
    button.classList.add('icon')
    return button
  }

  /**
   * Get button element. If not set, create element and return it
   *
   * @return {HTMLButtonElement}
   */
  get button () {
    return this._button || (this._button = document.createElement('button'))
  }

  /**
   * Evaluate if icon attribute is set
   *
   * @return {boolean}
   */
  get hasIcon () {
    return this.hasAttribute('has-icon')
  }

  /**
   * Evaluate if button should align center
   *
   * @return {boolean}
   */
  get alignCenter () {
    return this.hasAttribute('align-center')
  }
}
