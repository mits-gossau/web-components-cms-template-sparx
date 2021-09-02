// @ts-check
import Style from './Style.js'

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
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return false
  }

  /**
   * renders the o-highlight-list css
   *
   * @return {void}
   */
  renderCSS () {
    super.renderCSS()
    const bodyCss = this.css.replace(/\s>\smain/g, '')
    this.css = ''
    this.css = /* css */`
      ${bodyCss}
      :host  {
        ${Array.from(this.attributes).reduce((acc, attribute) => `${acc}${attribute.name}: ${attribute.value};--${attribute.name}: ${attribute.value};`, '')}
      }
      
      :host > div {
        display:flex;
        flex-direction: row;
        align-items:center;
        justify-content: center;
        width: var(--content-width, 100%);
      }

      :host > div > * {
        margin:var(--margin, 2rem);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > div {
          flex-direction: column;
        }    
      }
    `
  }
}
