// @ts-check
import Style from './Style.js'

/* global self */

/**
 * As an organism, this component shall hold molecules and/or atoms
 * Example at: /src/es/components/pages/Tester1.html
 * Example at: /src/es/components/pages/Netzwerk.html
 *
 * @export
 * @class Wrapper
 * @type {CustomElementConstructor}
 * @attribute {
 *  {has} no-content-width-overwrite (do not overwrite the :host > section --content-width-not-web-component with --content-width)
 *  {number} spacing
 *  {percent} first-width
 *  {percent} last-width
 *  {has} four
 *  {has} three
 * }
 */
export default class Wrapper extends Style {
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
    super.renderCSS()
    this.css = /* css */`
      :host {
        ${this.hasAttribute('no-content-width-overwrite')
          ? ''
          : /* css */`
            --content-width-not-web-component: var(--content-width);
            --content-width-not-web-component-mobile: var(--content-width-mobile);
          `
        }
        ${this.hasAttribute('spacing') ? `--spacing: ${this.getAttribute('spacing')};` : '--spacing: 0.5em;'}
        --carousel-content-width: 100%;
        --carousel-margin-mobile: 0;
        --carousel-margin: 0;
        --picture-margin: 0;
        --picture-height-mobile: auto;
        --picture-height: 100%;
        --picture-width-mobile: 100%;
        --picture-width: 100%;
        --picture-img-width: auto;
        --video-margin: 0;
        --video-min-height: 100%;
        --video-width-mobile: 100%;
        --video-min-width: 100%;
      }
      :host > section {
        display: flex;
        flex-wrap: wrap;
        justify-content: var(--justify-content, space-between);
        margin: 0 auto;
      }
      ${this.nextSibling && this.nextSibling.tagName === this.tagName
        ? /* css */`
          :host > section {
            margin-bottom: var(--content-spacing);
          }
        `
        : ''
      }
      ${this.div
        ? /* css */`
          ${!this.hasAttribute('four') && !this.hasAttribute('three')
            ? /* css */`
              :host > section > div {
                display: flex;
                flex-direction: column;
                justify-content: center;
              }
              :host > section > div > * {
                width: 100%;
              }
              :host > section > a-picture, :host > section > a {
                align-self: var(--align-self, center);
              }
              :host > section > a {
                margin: 0;
              }
            `
            : ''
          }
          :host > section > div > *:last-child {
            margin-bottom: 0;
            padding-bottom: 0;
          }
          @media only screen and (min-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
            :host > section > div > *:first-child {
              margin-top: 0;
              padding-top: 0;
            }
          }
        `
        : ''
      }
      ${this.hasAttribute('first-width') || this.hasAttribute('last-width')
        ? /* css */`
          :host > section > * {
            width: calc(${100 - Number(this.getAttribute('first-width') || this.getAttribute('last-width'))}% - var(--spacing));
          }
          :host > section > *:${this.hasAttribute('first-width') ? 'first' : 'last'}-child {
            width: calc(${this.getAttribute('first-width') || this.getAttribute('last-width')}% - var(--spacing));
          }
        `
        : /* css */ `
          :host > section > * {
            width: calc(${this.hasAttribute('four') ? '25' : this.hasAttribute('three') ? '33' : '50'}% - var(--spacing));
          }
        `
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          --carousel-content-width-mobile: 100%;
        }
        :host > section {
          display: ${this.hasAttribute('four') || this.hasAttribute('three') ? 'flex' : 'block'};
        }
        ${this.hasAttribute('four') || this.hasAttribute('three')
          ? /* css */`
            :host > section {
              justify-content: var(--justify-content-mobile, center);
            }
            :host > section > * {
              min-width: calc(${this.hasAttribute('three') ? '100' : '50'}% - var(--spacing) / 2);
            }
            ${this.hasAttribute('three')
              ? /* css */`
                :host > section > * {
                  margin-bottom: var(--content-spacing-mobile);
                }
              `
              : /* css */`
                :host > section > *:nth-of-type(2n) {
                  margin-left: var(--spacing);
                }
                :host > section > *:first-child, :host > section > *:first-child + * {
                  margin-bottom: var(--content-spacing-mobile);
                }
              `
            }
          `
          : /* css */`
            :host > section > * {
              display: block;
              width: auto !important;
              margin: var(--content-spacing-mobile, var(--content-spacing, unset)) auto;
            }
          `
        }
        :host > section > *:first-child {
          margin-top: 0;
        }
        :host > section > *:last-child {
          margin-bottom: 0;
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

  get div () {
    return this.root.querySelector('div')
  }
}
