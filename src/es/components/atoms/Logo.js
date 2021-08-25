// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
/* global location */
/* global self */

/**
 * Animated Logo
 * Example at: /src/es/components/pages/Home2.html & http://localhost:4200/src/es/components/pages/home2.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Logo
 * @type {CustomElementConstructor}
 * @attribute {
    {string} href
 * }
 * @css {
 *
 * }
 */
export default class Logo extends Shadow() {
  constructor (...args) {
    super(...args)

    this.clickListener = () => {
      if (this.getAttribute('href')) {
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

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
      :host {
        box-sizing: border-box;
        cursor:var(--cursor, pointer);
        display:var(--display, flex);
        flex-direction:var(--flex-direction, column);
        align-items: var(--align-items, center);
        justify-content: var(--justify-content, center);
        padding: var(--padding, 0);
        margin: 0 !important;
        width: var(--width, 100%) !important;
        height: 100%;
      }
      :host *:first-child {
        width: 100%;
        height: auto;
      }
      :host *:not(:first-child) {
        font-size: var(--font-size, 5rem);
      }
      :host *:first-of-type:not(:first-child)  {
        margin-top: var(--margin-top, -0.7em);
      }
      :host *:last-of-type:not(:first-child)  {
        margin-top: var(--margin-top-last, -0.3em);
        margin-left: var(--margin-left-last, 4.3em);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          justify-content: var(--justify-content-mobile, var(--justify-content, center));
          padding: var(--padding-mobile, var(--padding, 0));
        }
        :host *:not(:first-child) {
          font-size: var(--font-size-mobile, var(--font-size, 5rem));
        }
      }
      @media only screen and (max-width: 1000px) {
        :host *:last-of-type:not(:first-child)  {
          align-self: var(--align-self-last, flex-end);
        }
      }
    `
  }
}
