// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/**
 * Sample is an icon
 * Example at: /src/es/components/pages/Home2.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Sample
 * @type {CustomElementConstructor}
 * @attribute {
 *  
 * }
 * @css {
 *  
 * }
 */
export default class CallForIdeas extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderCSS () {
    return !this.root.querySelector('style[_css]')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        left:3em;
        position:fixed;
        top:60%;
        z-index:100;
      }
      :host > a {
        color: var(--a-color, var(--color-secondary, var(--color, pink)));
        font-weight: var(--a-font-weight, var(--font-weight, normal));
        text-align: var(--a-text-align, unset);
        text-decoration: var(--a-text-decoration, var(--text-decoration, none));
        text-underline-offset: var(--a-text-underline-offset, unset);
        display: var(--a-display, inline);
        margin: var(--a-margin, var(--content-spacing, unset)) auto;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > a {
          margin: var(--a-margin-mobile, var(--a-margin, var(--content-spacing-mobile, var(--content-spacing, unset)))) auto;
        }
      }
    `
  }
}
