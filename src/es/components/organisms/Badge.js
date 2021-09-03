// @ts-check
import Style from './Style.js'

/* global self */

/**
 * Defines a badge wrapper for content - Wrap Heading and CallForIdeas Components
 * Example at: /src/es/components/pages/kosmos.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Style
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {
 *  Note: all of src/es/components/web-components-cms-template/src/es/components/organisms/Body.js
 * }
 */
export default class Badge extends Style {
  /**
   * renders the o-highlight-list css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host > div {
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content: center;
        width: var(--content-width, 100%);
      }
      :host > div > * {
        margin:var(--margin, 2em);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > div {
          flex-direction: column;
        }    
      }
    `
  }
}
