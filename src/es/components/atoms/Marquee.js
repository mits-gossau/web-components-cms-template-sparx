// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

/* global self */

/**
 * Sample is an icon
 * Example at: /src/es/components/pages/Home.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Sample
 * @type {CustomElementConstructor}
 * @attribute {
 *  {number} [animation-duration=20] example 20 seconds for an 800px text to cross the screen
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
  constructor (...args) {
    super(...args)

    let timeout = null
    this.resizeListener = event => {
      clearTimeout(timeout)
      timeout = setTimeout(() => this.renderCSSByChildrenOffsetWidth(), 200)
    }
    const css = document.createElement('style')
    css.setAttribute('protected', 'true')
    this.html = css
    let clientX = 0
    let lastClientX = 0
    let touchTimeout = null
    this.touchstartListener = event => {
      clearTimeout(touchTimeout)
      clientX = event.changedTouches[0].clientX - lastClientX
    }
    this.touchmoveListener = event => {
      css.textContent = /* css */`
        :host > section {
          transform: translateX(${event.changedTouches[0].clientX - clientX}px);
        }
      `
    }
    this.touchendListener = event => {
      touchTimeout = setTimeout(() => {
        css.textContent = ''
        lastClientX = 0
      }, 3000)
      lastClientX = event.changedTouches[0].clientX - clientX
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) this.renderHTML()
    self.addEventListener('resize', this.resizeListener)
    this.addEventListener('touchstart', this.touchstartListener)
    this.addEventListener('touchmove', this.touchmoveListener)
    this.addEventListener('touchend', this.touchendListener)
  }

  disconnectedCallback () {
    self.removeEventListener('resize', this.resizeListener)
    this.removeEventListener('touchstart', this.touchstartListener)
    this.removeEventListener('touchmove', this.touchmoveListener)
    this.removeEventListener('touchend', this.touchendListener)
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
    return !this.root.querySelector('section')
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
        padding: var(--padding, 0.672em 0);
        visibility: hidden;
        white-space: nowrap;
      }:host > section {
        transition: transform .3s ease;
      }
      :host > section > * {
        animation: marquee ${this._animationDuration = this.getAttribute('animation-duration') || 20}s linear infinite;
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host {
          font-size: var(--font-size-mobile, var(--font-size, 1rem));
        }
      }
    `
    this.html = this._css = this._css.cloneNode() // set the clone as this.css reference and by that safe the original away to never be overwritten by the this.css setter
    this.renderCSSByChildrenOffsetWidth()
  }

  /**
   * Does set host visible after receiving the absolute width of the text by an animation frame
   * takes the absolute width aka. offsetWidth and generates the animation-duration and the keyframes of the marquee animation
   *
   * @return {void}
   */
  renderCSSByChildrenOffsetWidth () {
    Promise.all(Array.from(this.root.children).map(node => {
      if (node.tagName === 'STYLE') return null
      const position = node.style.position
      // set node position to absolute to receive the actual node width incl. overflow
      node.style.position = 'absolute'
      return new Promise(resolve => {
        self.requestAnimationFrame(timeStamp => {
          resolve(node.offsetWidth)
          node.style.position = position
        })
      })
    })).then(offsetWidths => Math.max(...offsetWidths)).then(offsetWidth => {
      this.css = ''
      this.css = /* css */`
        :host {
          visibility: visible;
        }
        ${this.generateAnimationDuration((Number(this.getAttribute('animation-duration')) || 20) * (offsetWidth / 800))}
        ${this.generateKeyframesMarquee('100%', `-${offsetWidth}px`)}
      `
    })
  }

  /**
   * generates the keyframes css
   *
   * @param {number} [animationDuration = this._animationDuration || 20]
   * @return {string}
   */
  generateAnimationDuration (animationDuration = this._animationDuration || 20) {
    this._animationDuration = animationDuration = Math.round(animationDuration)
    return /* css */`
      :host > section > * {
        animation-duration: ${animationDuration}s;
      }
      :host(:hover) > section > *, :host(:focus) > section > * {
        animation-play-state: paused;
      }
    `
  }

  /**
   * generates the keyframes css
   *
   * @param {string} [from = '100%']
   * @param {string} [to = '-100%']
   * @return {string}
   */
  generateKeyframesMarquee (from = '100%', to = '-100%') {
    return `@keyframes marquee{
      from{
        transform: translateX(${from});
      }
      to{
        transform: translateX(${to});
      }
    }`
  }

  /**
   * renders the a-link html
   *
   * @return {void}
   */
  renderHTML () {
    const section = this.root.appendChild(document.createElement('section'))
    Array.from(this.root.children).forEach(node => {
      if (node === section || node.getAttribute('slot') || node.nodeName === 'STYLE') return false
      section.appendChild(node)
    })
  }
}
