// @ts-check
import BaseFooter from '../web-components-cms-template/src/es/components/organisms/Footer.js'

/* global self */

/**
 * Footer is sticky and hosts uls
 * Example at: /src/es/components/pages/Kosmos.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Footer
 * @type {CustomElementConstructor}
 * @attribute {}
 * @css {
 *  NOTE: grid-area: footer;
 *  --background-color [black]
 *  --z-index [100]
 *  --content-spacing [40px]
 *  --a-link-content-spacing [0]
 *  --a-link-font-size [1rem]
 *  --a-link-font-size-2 [1rem]
 *  --list-style [none]
 *  --align-items [start]
 *  --font-size [1rem]
 *  --p-margin [0]
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
        grid-area: footer;
        z-index: var(--z-index, 100);
        background-color: var(--background-color, black);
      }
    
      :host > * {
        width: var(--content-width, 80%);
        margin: var(--content-spacing, 0) auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
      }
      
      
      
      :host > footer {
        width: var(--content-width, 80%);
        display: var(--display, flex);
       
        justify-content: var(--justify-content, normal);
        flex-direction: var(--flex-direction, row);
        align-content: var(--align-content, normal);
        padding: var(${this.getAttribute('homepage') === 'true'
          ? '--homepage-padding'
          : '--padding'}, 0);
        box-sizing: var(--box-sizing, content-box);
      }

      :host .wrapper-left {
        display:flex;
        flex-direction: column;
        align-items: flex-start;
      }
      
      :host .logo-container {
        width: ${this.getAttribute('homepage') === 'true' ? '100%' : 'unset'};
        justify-content: var(${this.getAttribute('homepage') === 'true'
          ? '--homepage-logo-container-justify-content'
          : '--logo-container-justify-content'}, space-between);
        display: flex;
        flex-wrap: var(--logo-container-flex-wrap, nowrap);
        align-content: var(--logo-container-align-content, normal);
      }
      :host .logo-container.wrapped {
        justify-content: var(--logo-container-justify-content-wrapped, var(--logo-container-justify-content, space-between));
      }
      ${this.getAttribute('homepage') === 'true'
        ? ''
        : /* css */`
          :host .logo-container:first-child {
            --logo-height: var(--logo-height-first, max(65px, 4.8vw));
            --logo-height-mobile: var(--logo-height-first-mobile, 48px);
          }
        `
      }
      
      :host .footer-links {
        display: flex;
        justify-content: center;
        flex-wrap: wrap;
      }

      :host a-link {
        --padding: var(--a-link-content-spacing, 0);
        --display: var(--a-link-display);
        --display-mobile: var(--a-link-display-mobile);
      }
      :host > footer ul > li {
        color: var(--color, red);
      }
      :host > footer ul > li > * {
        font-size: var(--a-link-font-size, 1rem);
        display: block;
      }
      :host > footer ul > li > a-link {
        --font-size: var(--a-link-font-size, 1rem);
      }
      :host > footer ul > li > ul a-link {
        --font-size: var(--a-link-font-size-2, 1rem);
      }

      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > * {
          width: var(--content-width-mobile, 90%);
          margin: var(--content-spacing-mobile, 0) auto; /* Warning! Keep horizontal margin at auto, otherwise the content width + margin may overflow into the scroll bar */
        }
        :host > footer {
          padding: var(${this.getAttribute('homepage') === 'true'
          ? '--homepage-padding-mobile'
          : '--padding-mobile'}, 0);
        }
        :host > span, :host > div, :host > p, :host > ul, :host > ol {
          width: var(--content-width-not-web-component-mobile, 90%);
        }
        :host .logo-container {
          flex-wrap: var(--logo-container-flex-wrap-mobile, nowrap);
          justify-content: var(${this.getAttribute('homepage') === 'true'
          ? '--homepage-logo-container-justify-content'
          : '--logo-container-justify-content-mobile'}, space-between);
        }
        :host .logo-container.wrapped {
          justify-content: var(--logo-container-justify-content-wrapped-mobile, var(--logo-container-justify-content-mobile, space-between));
        }
        :host .logo-container:first-child {
          --logo-height: var(--logo-height-first-mobile, 50px);
        }
        :host .footer-links {
          flex-direction: column;
        }
      }
    `
  }
}
