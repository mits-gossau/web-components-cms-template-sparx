// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global CustomEvent */
/* global self */

/**
 * Animated Logo
 * Example at: /src/es/components/pages/Home2.html & http://localhost:4200/src/es/components/pages/home2.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Logo
 * @type {CustomElementConstructor}
 * @attribute {
    {string} href
 * }
 * @css {
 *
 * }
 */
export default class Logo extends Shadow() {
  constructor (...args) {
    super(...args)

    this.clickListener = () => {
      if (this.getAttribute('href')) {
        if (this.getAttribute('href')[0] === '#') {
          this.dispatchEvent(new CustomEvent(this.getAttribute('click-anchor') || 'click-anchor', {
            detail: {
              selector: this.getAttribute('href')
            },
            bubbles: true,
            cancelable: true,
            composed: true
          }))
        } else {
          self.open(this.getAttribute('href'), this.getAttribute('target') || '_self')
        }
      }
    }
    // link behavior made accessible
    if (this.hasAttribute('href')) {
      this.setAttribute('data-href', this.getAttribute('href'))
      this.setAttribute('role', 'link')
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.addEventListener('click', this.clickListener)
  }

  disconnectedCallback () {
    this.removeEventListener('click', this.clickListener)
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
    return !this.querySelector('section')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
      :host {
        display: block;
        margin-top: 0 !important;
        margin-bottom: 0 !important;
      }
      :host > section {
        ${this.hasAttribute('color') ? `--color: ${this.getAttribute('color')};` : ''}
        box-sizing: border-box;
        cursor:var(--cursor, pointer);
        display:var(--display, flex);
        flex-direction:var(--flex-direction, column);
        align-items: var(--align-items, center);
        justify-content: var(--justify-content, center);
        padding: var(--padding, 0);
        margin: 0 !important;
        width: var(--width, 100%) !important;
        height: 100%;
        white-space: nowrap;
      }
      :host > section > svg {
        max-width: min(98vh, 64.4vw);
      }
      :host > section > svg path {
        fill: var(--color, pink);
      }
      :host > section > svg .x1, :host > section > svg .x2 {
        animation: var(--animation, sparx 2.5s ease infinite);
        animation-delay: var(--animation-delay, .5s);
        clip-path: circle(0% at center);
      }
      :host > section *:first-child {
        width: 100%;
        height: auto;
      }
      :host > section *:not(:first-child):not(sparx-a-call-for-ideas) {
        font-size: var(--font-size, 5rem);
        color: var(--color, pink);
      }
      :host > section *:first-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
        margin-top: var(--margin-top, -0.9em);
        margin-left: var(--margin-left, -1em);
      }
      :host > section *:last-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
        margin-top: var(--margin-top-last, -0.3em);
        margin-left: var(--margin-left-last, 3.2em);
      }
      ${!document.querySelector('html[lang=de]')
        ? /* css */`
          @media only screen and (max-width: 1400px) {
            :host > section *:last-of-type:not(:first-child):not(sparx-a-call-for-ideas) {
              align-self: end;
              margin-left: 0;
            }
          }
          @media only screen and (min-width: 1401px) {
            :host > section *:last-of-type:not(:first-child):not(sparx-a-call-for-ideas) {
              margin-left: var(--margin-left-last-large, var(--margin-left-last, 6.2em));
            }
          }
        `
        : ''
      }
      :host > section sparx-a-call-for-ideas  {
        margin-top: var(--logo-cfi-margin-top, -9%);
        margin-left: var(--logo-cfi-margin-left, 3%);
        align-self: flex-start;
      }
      .xy {
      ${this.hasAttribute('x-disappear')
      ? 'display:none;'
      : 'opacity: 0.8;'} 
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > section > svg {
          max-width: min(90vh, 79.2vw);
        }
        :host > section {
          justify-content: var(--justify-content-mobile, var(--justify-content, center));
          padding: var(--padding-mobile, var(--padding, 0));
        }
        :host > section *:first-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
          margin-left: var(--margin-left-mobile, var(--margin-left, -0.4em));
        }
      }
      @media only screen and (max-width: 800px) {
        :host > section *:not(:first-child):not(sparx-a-call-for-ideas) {
          font-size: max(var(--font-size-mobile, var(--font-size, 5rem)), 8vw);
        }
      }
      @media only screen and (max-width: 650px) {
        :host > section sparx-a-call-for-ideas  {
          margin-top: var(--logo-cfi-margin-top-mobile, var(--logo-cfi-margin-top, min(8%, 4vh)));
          margin-left: var(--logo-cfi-margin-left-mobile, var(--logo-cfi-margin-left, 9%));
        }
      }
      @media only screen and (max-width: 400px) {
        :host > section *:last-of-type:not(:first-child):not(sparx-a-call-for-ideas)  {
          align-self: var(--align-self-last, flex-end);
        }
        :host > section *:not(:first-child):not(sparx-a-call-for-ideas) {
          font-size: var(--font-size-mobile, var(--font-size, 5rem));
        }
      }
      @keyframes sparx{
        0%{
          clip-path: circle(0% at center);
          opacity: 1;
        }
        15%{
          clip-path: circle(100% at center);
        }
        16%{
          opacity: 1;
        }
        27%{
          opacity: 0;
        }
        100%{
          clip-path: circle(0% at center);
          opacity: 0;
        }
      }
    `
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    this.section.innerHTML = /* html */`
      <?xml version="1.0" encoding="utf-8"?>
      <!-- Generator: Adobe Illustrator 24.3.0, SVG Export Plug-In . SVG Version: 6.00 Build 0)  -->
      <svg version="1.1" id="Ebene_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px"
        viewBox="0 0 194 79.4" xml:space="preserve">
        <path d="M27.6,51.8C26.8,45,22.2,40.7,16.1,40c-6.4-0.8-12.4,2.4-13.3,9.8C1.2,62.9,19.3,61.1,18.3,68.9
          c-0.3,2.7-2.7,4.1-6,3.7c-3.7-0.5-6.2-3-6.3-7.6l-6,2.3c0.6,7.6,6.2,11,11.6,11.6c6.2,0.8,12.2-1.9,13.1-9.6
          C26.4,55.8,8.2,57.9,9.2,50.2c0.3-2.7,2.7-4.3,6.1-3.9c3.4,0.4,5.7,2.9,6.1,7.2L27.6,51.8z"/>
        <path d="M42.1,53.8l1.5-14.1l7.8,0.8c3.9,0.4,6.7,3.6,6.3,7.8c-0.4,4.1-3.9,6.8-7.8,6.3L42.1,53.8z M49.2,61
          c7.7,0.8,14-4.3,14.8-12c0.8-7.7-4.3-14-12-14.8l-14.2-1.5l-4.1,39l6.4,0.7l1.3-12.2L49.2,61z"/>
        <path d="M91,28l6.3,18.5L81,44.7L91,28z M109.1,60.8L95,19.8l-6.1-0.6L66.6,56.3l7,0.7l3.7-6.3l22.4,2.3L102,60
          L109.1,60.8z"/>
        <path d="M123,31.3l1.4,2.2l-4.3-0.5l1.5-14.1l8.9,0.9c3.9,0.4,6.8,3.6,6.3,7.8c-0.3,3-2.2,5.2-4.7,6l-3.7-5.9L123,31.3z
          M119.5,39.4l9.4,1l8.6,13.3l8.2,0.9l-10-15.4c4-1.9,6.9-5.8,7.4-10.8c0.8-7.7-4.3-14-12-14.8l-15.2-1.6l-4.1,39l6.4,0.7L119.5,39.4
          z"/>
        <path class="x1" d="M144.8,39.8l4.6,5.7l17-13.7l-4.6-5.7L144.8,39.8z M172.5,17.4l4.6,5.7L194,9.4l-4.6-5.7L172.5,17.4z"/>
        <path class="x2" d="M170.9,32.3l13.7,16.9l5.7-4.6l-13.7-16.9L170.9,32.3z M154.2,0l-5.7,4.6l13.7,17l5.7-4.6L154.2,0z"/>
        <path class="xy" d="M144.8,39.8l4.6,5.7l17-13.7l-4.6-5.7L144.8,39.8z M172.5,17.4l4.6,5.7L194,9.4l-4.6-5.7L172.5,17.4z"/>
        <path class="xy" d="M170.9,32.3l13.7,16.9l5.7-4.6l-13.7-16.9L170.9,32.3z M154.2,0l-5.7,4.6l13.7,17l5.7-4.6L154.2,0z"/>
      </svg>
    `
    Array.from(this.root.children).forEach(node => {
      if (node.tagName !== 'STYLE') this.section.appendChild(node)
    })
    this.html = this.section
  }

  get section () {
    return this._section || (this._section = document.createElement('section'))
  }
}
