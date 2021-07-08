// @ts-check
import Body from '../web-components-cms-template/src/es/components/organisms/Body.js'

/**
 * Defines a Style for content
 * Example at: /src/es/components/pages/Idee.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Style
 * @type {CustomElementConstructor}
 * @attribute {
 *  {string} [color=n.a.]
 *  {string} [background-color=n.a.]
 * }
 * @css {
 *  Note: all of src/es/components/web-components-cms-template/src/es/components/organisms/Body.js
 * }
 */
export default class Style extends Body {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
      :host {
        display: block;
        padding: var(--content-spacing, unset) 0;
        ${Array.from(this.attributes).reduce((acc, attribute) => `${acc}${attribute.name}: ${attribute.value};--${attribute.name}: ${attribute.value};`, '')}
      }
    `
  }
}
