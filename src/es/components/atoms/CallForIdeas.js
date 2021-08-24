// @ts-check
import { Intersection } from '../web-components-cms-template/src/es/components/prototypes/Intersection.js'

/* global CustomEvent */
/* global location */
/* global self */

/**
 * CallForIdeas Button.
 * Example at: /src/es/components/pages/Home2.html & http://localhost:4200/src/es/components/pages/Idee.html
 * https://jira.migros.net/browse/SPARX-72
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class CallForIdeas
 * @type {CustomElementConstructor}
 * @attribute {
    {string} href
    {string} title
    {string} text
    {n.a.} star
    {number} spacing / set the percentage to add spacing to text (eg. 10 === +10%)
    'background-color' css props as attribute
    'color' css props as attribute
    'position' css props as attribute
    'top' css props as attribute
    'right' css props as attribute
    'bottom' css props as attribute
    'left' css props as attribute
    'position-mobile' css props as attribute
    'top-mobile' css props as attribute
    'right-mobile' css props as attribute
    'bottom-mobile' css props as attribute
    'left-mobile' css props as attribute
 * }
 * @css {
 * --star-transition / used for star rotation
 * {number} --star-rotate / used to define the number of 360deg rotations
    var(--position, absolute);
    var(--top, unset);
    var(--right, unset);
    var(--bottom, unset);
    var(--left, unset);
    var(--display, grid);
    var(--text-transform, rotate(30deg));
    var(--text-margin, 0);
    var(--text-text-align, center);
    var(--background-display, grid);
    var(--background-transform, rotate(35deg));
    var(--background-color, red);
    var(--position-mobile, absolute);
    var(--top-mobile, var(--top, unset));
    var(--right-mobile, var(--right, unset));
    var(--bottom-mobile, var(--bottom, unset));
    var(--left-mobile, var(--left, unset));
 * }
 */
export default class CallForIdeas extends Intersection() {
  constructor (...args) {
    super({ intersectionObserverInit: { rootMargin: '-200px 0px -200px 0px' } }, ...args)

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
          location.href = this.getAttribute('href')
        }
      }
    }
    // resize listeners
    let timeout = null
    this.resizeListener = event => {
      clearTimeout(timeout)
      timeout = setTimeout(() => this.makeItSquare(), 200)
    }
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.makeItSquare()
    this.addEventListener('click', this.clickListener)
    self.addEventListener('resize', this.resizeListener)
  }

  disconnectedCallback () {
    super.disconnectedCallback()
    this.removeEventListener('click', this.clickListener)
    self.removeEventListener('resize', this.resizeListener)
  }

  intersectionCallback (entries, observer) {
    if (entries && entries[0]) this.classList[entries[0].isIntersecting ? 'add' : 'remove']('hover')
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
    return !this.root.querySelector('div.one')
  }

  /**
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */ `
      :host {
        ${this.hasAttribute('background-color') ? `--background-color: ${this.getAttribute('background-color')};` : ''}
        ${this.hasAttribute('color') ? `--color: ${this.getAttribute('color')};` : ''}
        ${this.hasAttribute('position') ? `--position: ${this.getAttribute('position')};` : ''}
        position: var(--position, absolute);
        ${this.hasAttribute('top') ? `--top: ${this.getAttribute('top')};` : ''}
        top: var(--top, unset);
        ${this.hasAttribute('right') ? `--right: ${this.getAttribute('right')};` : ''}
        right: var(--right, unset);
        ${this.hasAttribute('bottom') ? `--bottom: ${this.getAttribute('bottom')};` : ''}
        bottom: var(--bottom, unset);
        ${this.hasAttribute('left') ? `--left: ${this.getAttribute('left')};` : ''}
        left: var(--left, unset);
        display: var(--display, grid);
        cursor: pointer;
        width: auto !important;
        z-index: var(--z-index, 1);
      }
      :host > *, .background > * {
        grid-column: 1;
        grid-row: 1;
        width: auto;
      }
      :host .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: var(--text-transform, rotate(0deg));
        z-index: 1;
      }
      :host .text > * {
        margin: 0;
      }
      :host .text h4 {
        color: var(--h4-color, var(--color, black));
        font-size: var(--h4-font-size, min(2rem, 10vw));
        font-family: var(--h4-font-family);
        font-weight: var(--h4-font-weight, var(--font-weight, normal));
        line-height: var(--h4-line-height, normal);
        text-align: var(--h4-text-align, center);
        word-break: var(--h4-word-break, normal);
        text-transform: var(--h4-text-transform, none);
        margin: var(--h4-margin, var(--content-spacing, 0)) auto;
        padding: var(--h4-padding, 0 0 0.2em);
      }
      :host .text br {
        line-height: 0;
      }
      :host .text > p {
        color: var(--p-color, var(--color, white));
        font-family: var(--p-font-family, var(--font-family-secondary));
        font-weight: var(--p-font-weight, var(--font-weight, normal));
        text-align: var(--p-text-align, center);
        text-transform: var(--p-text-transform, none);
        margin: var(--p-margin, var(--content-spacing, 0)) auto;
      }
      .background {
        display: var(--background-display, grid);
        transform: var(--background-transform, rotate(35deg));
      }
      .background > * {
        background-color: var(--background-color, red);
        width: 1${this.getAttribute('spacing') || '16'}%;
        height: 1${this.getAttribute('spacing') || '16'}%;
        left: -${this.getAttribute('spacing') ? this.getAttribute('spacing') / 2 : '8'}%;
        top: -${this.getAttribute('spacing') ? this.getAttribute('spacing') / 2 : '8'}%;
        position: relative;
      }
      .background > .one {
        ${this.hasAttribute('star')
        ? 'transform: rotate(22.5deg);'
        : `
            border-radius: 50%;
          `}
      }
      .background > .two {
        transform: rotate(45deg);
      }
      .background > .three {
        transform: rotate(67.5deg);
      }
      ${this.hasAttribute('star')
        ? `
          .background {
            transition: var(--star-transition, transform .3s ease);
          }
          :host(:hover) .background {
            transform: rotate(calc(360deg * var(--star-rotate, 5)));
          }
        `
        : ''}
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          ${this.hasAttribute('position-mobile') ? `--position-mobile: ${this.getAttribute('position-mobile')};` : ''}
          position: var(--position-mobile, var(--position, absolute));
          ${this.hasAttribute('top-mobile') ? `--top-mobile: ${this.getAttribute('top-mobile')};` : ''}
          top: var(--top-mobile, var(--top, unset));
          ${this.hasAttribute('right-mobile') ? `--right-mobile: ${this.getAttribute('right-mobile')};` : ''}
          right: var(--right-mobile, var(--right, unset));
          ${this.hasAttribute('bottom-mobile') ? `--bottom-mobile: ${this.getAttribute('bottom-mobile')};` : ''}
          bottom: var(--bottom-mobile, var(--bottom, unset));
          ${this.hasAttribute('left-mobile') ? `--left-mobile: ${this.getAttribute('left-mobile')};` : ''}
          left: var(--left-mobile, var(--left, unset));
        }
        ${this.hasAttribute('star')
        ? `
            :host(.hover) .background {
              transform: rotate(calc(360deg * var(--star-rotate-mobile, var(--star-rotate, 5))));
            }
          `
        : ''}
        :host .text h4 {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, min(2rem, 10vw)));
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
    this.html = /* html */`
      <section class=background>
        <div class=one></div>
        ${this.hasAttribute('star')
        ? /* html */`
            <div class=two></div>
            <div class=three></div>
            <div class=four></div>
          `
        : ''}
      </section>
      <section class=text>
        <h4>${this.getAttribute('title') || 'No title attribute set!'}</h4>
        <p>${this.getAttribute('text') || 'No text attribute set!'}</p>
      </section>
    `
    if (this.h4) this.root.querySelector('.text h4').replaceWith(this.h4.parentNode !== this.root ? this.h4.parentNode : this.h4)
    if (this.p) this.root.querySelector('.text p').replaceWith(this.p)
  }

  makeItSquare () {
    self.requestAnimationFrame(timeStamp => (this.css = /* css */ `
      :host > * {
        height: ${this.offsetWidth}px;
      }
    `))
  }

  get h4 () {
    return this.root.querySelector('h4')
  }

  get p () {
    return this.root.querySelector('p')
  }
}
