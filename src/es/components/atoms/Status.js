// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Display  current status of a project
 * Example at: /src/es/components/pages/Kosmos.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Status
 * @type {CustomElementConstructor}
 * @attribute {
 * {string} status value
 * }
 * @css {
 *  var(--background-color, white)
 *  var(--color, white)
 *  var(--font-size, 1em);
 * }
 */
export default class Status extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('div')
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
    this.css = /* css */`
      :host > div {
        width: 9em;
        height: 9em;
        display: flex;
        transform: rotate(45deg);
        justify-content: center;
        align-items: center;
        background-color: var(--background-color, white);
      }

      :host p {
        transform: rotate(-55deg);
        color: var(--color, white);
        font-size: var(--font-size, 1em);
        text-align: center;
      }
      
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host  {
          width: min(9.7em, 1vw);
          height: min(9.7em, 1vh);
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
    this.html = /* html */ `
      <div><p>${this.getAttribute('status') || 'No status attribute set!'}</p></div>
  `
  }
}