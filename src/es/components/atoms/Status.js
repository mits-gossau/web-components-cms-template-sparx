// @ts-check
import { Intersection } from '../web-components-cms-template/src/es/components/prototypes/Intersection.js'

/* global self */
/* global CustomEvent */

/**
 * Display current status of a project
 * Example at: /src/es/components/pages/Projekte.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Status
 * @type {CustomElementConstructor}
 * @attribute {
 * {string} text value
 * {string} color
 * {string} background-color
 * }
 * @css {
 *  var(--background-color, white)
 *  var(--color, white)
 *  var(--font-size, 1em);
 * }
 */
export default class Status extends Intersection() {
  constructor (...args) {
    super({ intersectionObserverInit: { rootMargin: '-200px 0px -200px 0px' } }, ...args)

    this.clickListener = event => {
      if (this.getAttribute('href')) {
        event.stopPropagation()
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
    // resize listeners
    let timeout = null
    this.resizeListener = event => {
      clearTimeout(timeout)
      timeout = setTimeout(() => this.makeItSquare(true), 200)
    }
  }

  connectedCallback () {
    super.connectedCallback()
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    this.makeItSquare()
    // avoid any render delays
    setTimeout(() => this.makeItSquare(true), 200)
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
  shouldComponentRenderHTML () {
    return !this.root.querySelector('div')
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
   * renders the css
   *
   * @return {void}
   */
  renderCSS () {
    this.css = /* css */`
      :host {
        ${this.hasAttribute('background-color') ? `--background-color: ${this.getAttribute('background-color')};` : ''}
        ${this.hasAttribute('color') ? `--color: ${this.getAttribute('color')};` : ''}
        transition: opacity .5s ease;
        z-index: 1;
      }
      :host(:hover), :host(:focus) {
        opacity: 0;
      }
      :host > div {
        align-items: center;
        background-color: var(--background-color, #D2BB61);
        display: flex;
        justify-content: center;
        transform: rotate(45deg);
        padding: var(--padding, 1.5em);
      }
      :host p {
        color: var(--color, #282828);
        font-family: var(--font-family, var(--font-family-secondary));
        font-size: var(--font-size, 1em);
        font-weight: var(--font-weight, var(--font-weight, normal));
        text-align: var(--text-align, center);
        transform: rotate(-51deg);
        line-height: 1em;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          opacity: 0;
        }
        :host(.hover) {
          opacity: 1;
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
    if (this.getAttribute('text')) {
      this.html = /* html */ `
        <div><p>${this.getAttribute('text') || 'No text attribute set!'}</p></div>
      `
    } else {
      const div = document.createElement('div')
      Array.from(this.root.children).forEach(node => {
        if (node.tagName !== 'STYLE') div.appendChild(node)
      })
      this.html = div
    }
    this.makeItSquareStyle.setAttribute('protected', 'true')
    this.root.appendChild(this.makeItSquareStyle)
  }

  makeItSquare (force = false, recursive = 0) {
    if (force || !this.isSquare) {
      this.makeItSquareStyle.textContent = ''
      self.requestAnimationFrame(timeStamp => {
        const size = Math.max(this.text.offsetWidth, this.text.offsetHeight)
        this.makeItSquareStyle.textContent = /* css */ `
          :host > div {
            width: ${size}px;
            height: ${size}px;
          }
        `
        // incase it wouldn't have worked, re-trigger makeItSquare
        if (recursive < 5) self.requestAnimationFrame(timeStamp => this.makeItSquare(false, recursive++))
      })
    }
  }

  get isSquare () {
    return Math.abs(this.background.offsetWidth) === Math.abs(this.background.offsetHeight)
  }

  get makeItSquareStyle () {
    return this._makeItSquareStyle || (this._makeItSquareStyle = document.createElement('style'))
  }

  get background () {
    return this.root.querySelector(':host > div')
  }

  get text () {
    return this.root.querySelector(':host p')
  }
}
