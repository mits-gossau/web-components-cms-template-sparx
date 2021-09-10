// @ts-check
import BaseFooter from '../web-components-cms-template/src/es/components/organisms/Footer.js'

/* global self */

/**
 * Footer is sticky
 * Example at: /src/es/components/pages/Kosmos.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {
 *  NOTE: grid-area: footer;
 *  var(--background-color, black)
 *  var(--z-index, 100)
 *  var(--content-spacing, 0)
 *  var(--content-width, 80%)
 *  var(--align-content, normal)
 *  var(--box-sizing, content-box);
 *  var(--color, white)
 *  var(--display, flex);
 *  var(--flex-direction, row);
 *  var(--justify-content, normal);
 *  var(--padding, 0);
 *  var(--ul-list-style-type, none);
 *  var(--ul-padding, 0);
 *  var(--li-line-height, 1.5em);
 *  var(--wrapper-language-align-items, flex-start);
 *  var(--wrapper-language-display, flex);
 *  var(--wrapper-language-flex-direction, column);
 *  var(--wrapper-language-justify-content, space-between);
 *  var(--language-switcher-li-float, left);
 *  var(--language-switcher-li-padding, 0 1.4em 0 0);
 *  var(--wrapper-logo-display, flex);
 *  var(--wrapper-logo-flex-direction, column);
 *  var(--wrapper-logo-justify-content, start);
 *  var(--wrapper-info-links-display, flex);
 *  var(--wrapper-logo-flex-direction, column)
 *  var(--wrapper-logo-justify-content, flex-end);
 * }
 */
export default class Footer extends BaseFooter {
  /**
   * renders the o-footer css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        background-color: var(--background-color, black);
        grid-area: footer;
        z-index: var(--z-index, 100);
      }
      :host > * {
        margin: var(--content-spacing, 0) auto;
        width: var(--content-width, 80%);
      }
      :host > footer {
        align-content: var(--align-content, normal);
        box-sizing: var(--box-sizing, content-box);
        color: var(--color, white);
        display: var(--display, flex);
        flex-direction: var(--flex-direction, row);
        justify-content: var(--justify-content, normal);
        padding: var(--padding, 0);
      }
      :host > footer ul {
        list-style-type: var(--ul-list-style-type, none);
        padding: var(--ul-padding, 0);
        margin: var(--ul-margin, 1em 0);
      }
      :host > footer li {
        line-height:var(--li-line-height, 1.5em);
      }
      :host .wrapper-language {
        align-items: var(--wrapper-language-align-items, flex-start);
        display:var(--wrapper-language-display, flex);
        flex-direction: var(--wrapper-language-flex-direction, column);
        justify-content: var(--wrapper-language-justify-content, space-between);
      }
      :host .language-switcher li {
        float:var(--language-switcher-li-float, left);
        padding:var(--language-switcher-li-padding, 0 1.4em 0 0);
      }
      :host .language-block-links li {
        padding:var(--language-switcher-li-padding, 0 1.4em 0 0);
      }
      :host .wrapper-logo {
        display: var(--wrapper-logo-display, flex);
        flex-direction:var(--wrapper-logo-flex-direction, column);
        justify-content: var(--wrapper-logo-justify-content, start);
      }
      :host .wrapper-info-links {
        display:var(--wrapper-info-links-display, flex);
        flex-direction: var(--wrapper-logo-flex-direction, column);
        justify-content: var(--wrapper-logo-justify-content, flex-end); 
      }
      :host a-link {
        --padding: var(--a-link-content-spacing, 0);
        --display: var(--a-link-display);
        --display-mobile: var(--a-link-display-mobile);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > * {
          width: var(--content-width-mobile, 80%);
          margin: var(--content-spacing-mobile, 0) auto; 
        }
        :host > footer {     
          flex-direction: var(--flex-direction-mobile, column);
        }
        :host > footer ul {
          margin: var(--ul-margin-mobile, 0.5em 0);
        }
        :host .language-block-links li {
          float: var(--language-switcher-li-float-mobile, left);
        }
      
      }
    `
  }
}
