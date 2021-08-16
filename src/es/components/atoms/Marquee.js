// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/**
 * Sample is an icon
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Sample
 * @type {CustomElementConstructor}
 * @attribute {
 *  {number} [animation-duration=20]
 * }
 * @css {
 *  var(--background-color, red);
    var(--color, white);
    var(--font-size, 45px);
    var(--grid-area, footer);
    var(--padding, 0.672em);
    var(--font-size-mobile, var(--font-size, 1rem));
 * }
 */
export default class Marquee extends Shadow() {
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
        background-color: var(--background-color, red);
        color: var(--color, white);
        font-size: var(--font-size, 45px);
        grid-area: var(--grid-area, footer);
        padding: var(--padding, 0.672em);
        white-space: nowrap;
      }
      :host > * {
        animation: marquee ${this.getAttribute('animation-duration') || 20}s linear infinite;
      }
      @keyframes marquee{
        from{
          transform:translateX(101%);
        }
        to{
          transform:translateX(-101%)
        }
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          font-size: var(--font-size-mobile, var(--font-size, 1rem));
        }
      }
    `
  }
}
