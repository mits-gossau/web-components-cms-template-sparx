// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
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
    return !this.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
      :host {
        display: block;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      :host > section {
        ${this.hasAttribute('color') ? `--color: ${this.getAttribute('color')};` : ''}
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
      :host > section *:first-child {
        width: 100%;
        height: auto;
      }
      :host > section *:not(:first-child):not(sparx-a-call-for-ideas) {
        font-size: var(--font-size, 5rem);
        color: var(--color, pink);
      }
      :host > section *:first-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
        margin-top: var(--margin-top, -0.7em);
      }
      :host > section *:last-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
        margin-top: var(--margin-top-last, -0.3em);
        margin-left: var(--margin-left-last, 4.3em);
      }
      :host > section sparx-a-call-for-ideas  {
        margin-top: var(--logo-cfi-margin-top, -9%);
        margin-left: var(--logo-cfi-margin-left, 16%);
        align-self: flex-start;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > section {
          justify-content: var(--justify-content-mobile, var(--justify-content, center));
          padding: var(--padding-mobile, var(--padding, 0));
        }
      }
      @media only screen and (max-width: 800px) {
        :host > section *:not(:first-child):not(sparx-a-call-for-ideas) {
          font-size: max(var(--font-size-mobile, var(--font-size, 5rem)), 8vw);
        }
      }
      @media only screen and (max-width: 650px) {
        :host > section sparx-a-call-for-ideas  {
          margin-top: var(--logo-cfi-margin-top-mobile, var(--logo-cfi-margin-top, min(8%, 4vh)));
          margin-left: var(--logo-cfi-margin-left-mobile, var(--logo-cfi-margin-left, 15%));
        }
      }
      @media only screen and (max-width: 400px) {
        :host > section *:last-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
          align-self: var(--align-self-last, flex-end);
        }
        :host > section *:not(:first-child):not(sparx-a-call-for-ideas) {
          font-size: var(--font-size-mobile, var(--font-size, 5rem));
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    Array.from(this.root.children).forEach(node => {
      if (node.tagName !== 'STYLE') this.section.appendChild(node)
    })
    this.html = this.section
  }

  get section () {
    return this._section || (this._section = document.createElement('section'))
  }
}
