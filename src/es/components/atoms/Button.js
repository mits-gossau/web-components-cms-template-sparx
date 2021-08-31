// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
/* global location */


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
    {n.a} icon 
    {n.a} center
    'background-color' css props as attribute
    'background-color-hover' css props as attribute
    'color' css props as attribute
 * }
 * @css {
 *
 * }
 */
export default class Button extends Shadow() {
  constructor(...args) {
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
          location.href = this.getAttribute('href')
        }
      }
    }
  }

  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback() {
    this.removeEventListener('click', this.clickListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS() {
    return !this.root.querySelector(`:host > style[_css], ${this.tagName} > style[_css]`)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML() {
    return !this.root.querySelector('button')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS() {
    this.css = /* css */ `
    :host {
      display: ${this.hasIcon ? 'inline-block' : 'flex'};
      ${this.shouldAlignCenter && !this.hasIcon ? 'justify-content: center' : ''};
      margin: var(--margin, 0);
    }
    :host  button {
      ${this.hasAttribute('background-color') ? `--background-color: ${this.getAttribute('background-color')};` : ''}
      ${this.hasAttribute('color') ? `--color: ${this.getAttribute('color')};` : ''}
      ${this.hasIcon ? `--padding: var(--padding, 0);` : '0'}
      width: var(--width, 100%);
      height: var(--height, 100%);
      transition: var(--transition, 0.3s all);
      border: var(--border, none);
      padding:var(--padding, 0);
      cursor: var(--cursor, pointer);
      color: var(--color, white);
      background-color: var(--background-color, transparent);
      font-family: var(--font-family, var(--font-family-bold));
      font-weight: var(--font-weight, var(--font-weight, normal));
      font-size: var(--font-size, 1em);
      text-transform: var(--text-transform, none);
      text-decoration: var(--text-decoration, none);
      text-underline-offset: var(--a-text-underline-offset, unset);
      border-radius: var(--border-radius, 0);
    }
    :host button:hover,  button:active, button:focus {
      ${this.hasAttribute('background-color-hover') ? `--background-color-hover: ${this.getAttribute('background-color-hover')};` : ''}
      font-family: var(--a-font-family-hover);
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
      margin-right:var(--icon-margin-right, .7rem);
      width: var(--icon-width, 2.7rem);
    }
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
      :host {${this.hasIcon ? '' : 'justify-content: center'}}      
      :host button {font-size: var(--font-size-mobile, 1em)}
      .icon > img {width: var(--icon-width-mobile, min(2.7rem, 10vw))}
    }
  `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML() {
    if (this.hasIcon) this.addIconToButton(this.button)
    this.html = this.button
  }

  /**
   * Prepend icon to button
   * 
   * @param {HTMLButtonElement} button 
   * @return {void}
   */
  addIconToButton(button) {
    const iconImg = new Image()
    iconImg.src = "../../../img/ButtonDownload.svg"
    iconImg.alt = button.innerText || ""
    button.prepend(iconImg)
    button.classList.add('icon')
  }

  /**
   * Get button element. If not set, create element and return it
   * 
   * @return {HTMLButtonElement}
   */
  get button() {
    return this._button || (this._button = document.createElement('button'))
  }

  /**
   * Evaluate if icon attribute is set
   * 
   * @return {boolean}
   */
  get hasIcon() {
    return this.hasAttribute('icon')
  }

  /**
   * Evaluate if button should align center
   * 
   * @return {boolean}
   */
  get shouldAlignCenter() {
    return this.hasAttribute('center')
  }

  get color() {
    return this.getAttribute('color')
  }

  get backgroundColor() {
    return this.getAttribute('background-color')
  }
}
