// @ts-check
import { Intersection } from '../web-components-cms-template/src/es/components/prototypes/Intersection.js'

/* global CustomEvent */
/* global location */
/* global self */

/**
 * CallForIdeas Button
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
    super({ intersectionObserverInit: { rootMargin: '-300px 0px -300px 0px' } }, ...args)

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
    return !this.root.querySelector('style[_css]')
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
      }
      :host > *, .background > * {
        grid-column: 1;
        grid-row: 1;
        width: auto;
      }
      .text {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        transform: var(--text-transform, rotate(30deg));
        z-index: 1;
      }
      .text > * {
        color: var(--color, white);
        margin: var(--text-margin, 0);
        text-align: var(--text-text-align, center);
      }
      .background {
        display: var(--background-display, grid);
        transform: var(--background-transform, rotate(35deg));
      }
      .background > * {
        background-color: var(--background-color, red);
      }
      .background > .one {
        ${this.hasAttribute('star')
          ? 'transform: rotate(22.5deg);'
          : `
            width: 120%;
            height: 120%;
            left: -10%;
            top: -10%;
            position: relative;
            transform: var(--text-transform, rotate(30deg));
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
        <h2>${this.getAttribute('title') || 'No title attribute set!'}</h2>
        <p>${this.getAttribute('text') || 'No text attribute set!'}</p>
      </section>
    `
  }

  makeItSquare () {
    self.requestAnimationFrame(timeStamp => (this.css = /* css */ `
      :host > *, .background > * {
        height: ${this.offsetWidth}px;
      }
    `))
  }
}
