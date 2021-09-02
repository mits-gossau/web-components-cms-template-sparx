// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/**
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Wrapper
 * @type {CustomElementConstructor}
 * @css {
 *  --margin [20px]
 *  --min-width [370px]
 *  --justify-content [center]
 * }
 */
export default class Wrapper extends Shadow() {
  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
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
   * renders the o-teaser-wrapper css
   *
   * @return {void}
   */
  renderCSS () {
    const teaserAmount = this.root.querySelectorAll('m-teaser').length
    this.css = /* css */`
      :host {
        --carousel-content-width: 100%;
        --carousel-margin: 0;
        --picture-margin: 0;
        --picture-width-mobile: 100%;
        --picture-width: 100%;
        --spacing: 0.5rem;
        display: var(--display, flex);
        flex-wrap: var(--flex-wrap, wrap);
        justify-content: var(--justify-content, space-between);
      }
      :host > * {
        width: calc(50% - var(--spacing));
      }
      :host > *:first-child {
        margin-bottom: 3.5%;
        width: 100%;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          --carousel-content-width-mobile: 100%;
          display: block;
        }
        :host > *:not(style) {
          display: block;
          width: 100%;
          margin: var(--content-spacing-mobile, var(--content-spacing, unset)) auto;
        }
      }
    `
  }
}
