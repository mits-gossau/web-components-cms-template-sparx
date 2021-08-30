// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
/* global location */
/* global self */

/**
 * Animated Button
 * Example at: /src/es/components/pages/Home2.html & http://localhost:4200/src/es/components/pages/home2.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Button
 * @type {CustomElementConstructor}
 * @attribute {
    {string} href
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
  }

  connectedCallback() {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  disconnectedCallback() {
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
      display:block;
      margin: var(--margin, 0);
      position: var(--position, static);
      top: var(--top, auto);
      right: var(--right, auto);
      bottom: var(--bottom, auto);
      left: var(--left, auto);
      transform: var(--transform, none);
    }

    :host > button {
      width: var(--width, 100%);
      height: var(--height, 100%);
      transition: var(--transition, 0.3s all);
      border: var(--border, none);
      padding: var(--padding, 0);
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
    
    @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {}
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML() {
    this.html = this.button
  }

  get button() {
    return this._button || (this._button = document.createElement('button'))
  }
}
