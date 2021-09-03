// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Wrapper
 * @type {CustomElementConstructor}
 * @attribute {
 *  {has} first (tells the first item to be big, else its the last)
 * }
 * @css {
 *  --margin [20px]
 *  --min-width [370px]
 *  --justify-content [center]
 * }
 */
export default class Wrapper extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
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
    return !this.root.querySelector('section')
  }

  /**
   * renders the o-teaser-wrapper css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        --carousel-content-width: 100%;
        --carousel-margin: 0;
        --picture-margin: 0;
        --picture-width-mobile: 100%;
        --picture-width: 100%;
        --spacing: 0.5rem;
        display: block;
      }
      :host > section {
        display: flex;
        flex-wrap: wrap;
        justify-content: var(--justify-content, space-between);
      }
      :host > section > * {
        width: calc(50% - var(--spacing));
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          --carousel-content-width-mobile: 100%;
        }
        :host > section {
          display: block;
        }
        :host > section > * {
          display: block;
          width: 100%;
          margin: var(--content-spacing-mobile, var(--content-spacing, unset)) auto;
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
    const section = document.createElement('section')
    Array.from(this.root.children).forEach(node => {
      if (node.tagName !== 'STYLE') section.appendChild(node)
    })
    this.html = section
  }
}
