// @ts-check
import { Intersection } from '../web-components-cms-template/src/es/components/prototypes/Intersection.js'

/* global self */

/**
 * Heading is a general purpose Title element
 * Example at: /src/es/components/pages/Idee.html & /src/es/components/pages/Home2.html
 * As an atom, this component can not hold further children (those would be quantum)
 *
 * @export
 * @class Heading
 * @type {CustomElementConstructor}
 * @attribute {
    {string} [title-rotation=-6] example -6 degree for text rotation
    {n.a} sparkle / Determines if title has sparkles
    {n.a} no-animation / Animation can only take place if there are sparkles
 * }
 * @css {
    --sparkle1-margin, --sparkle2-margin, --sparkle3-margin, --sparkle4-margin
    var(--margin, var(--content-spacing, unset))
    var(--padding, unset)
    var(--any-color, var(--color, black))
    var(--any-font-size, min(5rem, 10vw))
    var(--any-font-family, var(--font-family-bold))
    var(--any-font-weight, var(--font-weight, normal))
    var(--any-line-height, normal)
    var(--any-text-align, start)
    var(--any-word-break, normal)
    var(--any-text-transform, none)
    var(--title-rotation, -6deg))
    var(--any-color, white)
 * }
 */
export default class Heading extends Intersection() {
  constructor (...args) {
    super({ intersectionObserverInit: { rootMargin: '0px 0px 0px 0px', threshold: 1 } }, ...args)

    this.initialHTML = this.html
    // resize listeners
    let timeout = null
    this.resizeListener = event => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.makeSparkles('left')
        this.makeSparkles('right')
      }, 100)
    }
    this.loadPromise = new Promise(resolve => document.body.addEventListener(this.getAttribute('wc-config-load') || 'wc-config-load', event => resolve(), { once: true }))
  }

  connectedCallback () {
    if (this.hasAttribute('sparkle')) {
      if (!this.hasAttribute('no-animation')) super.connectedCallback()
      self.addEventListener('resize', this.resizeListener)
    }
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) {
      this.renderHTML(this.initialHTML)
      if (this.hasAttribute('sparkle')) {
        self.requestAnimationFrame(timeStamp => {
          this.makeSparkles('left')
          this.makeSparkles('right')
        })
      }
    }
  }

  disconnectedCallback () {
    if (this.hasAttribute('sparkle')) {
      if (!this.hasAttribute('no-animation')) super.disconnectedCallback()
      self.removeEventListener('resize', this.resizeListener)
    }
  }

  intersectionCallback (entries, observer) {
    if (entries && entries[0] && entries[0].isIntersecting) {
      this.loadPromise.then(() => this.classList.add('hover'))
      setTimeout(() => this.classList.add('hover'), 2000) // incase there isn't a 'wc-config-load' event fired just add it after 2s
      this.intersectionObserveStop()
    }
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return (this.hasAttribute('sparkle') && !this.root.querySelector('div.left')) || false
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
        --sparkle1-margin: 0 0 0.9em 0.9em;
        --sparkle2-margin: 0 0 0.9em 0;
        --sparkle3-margin: 0.9em 0 0 0;
        --sparkle4-margin: 0.9em 0 0 0.9em;
        ${this.hasAttribute('color') ? `--any-color: ${this.getAttribute('color')};` : ''}
        ${this.hasAttribute('title-rotation') ? `--title-rotation: ${this.getAttribute('title-rotation')}deg;` : ''}
        align-items: center;
        display:flex;
        margin: var(--margin, var(--content-spacing, unset)) auto;
        padding: var(--padding, unset);
        flex-direction: row;
        justify-content: center;
      }
      :host *:not(.stripes):not(style) {
        color: var(--any-color, var(--color, black));
        font-size: var(--any-font-size, min(5rem, 10vw));
        font-family: var(--any-font-family, var(--font-family-bold));
        font-weight: var(--any-font-weight, var(--font-weight, normal));
        line-height: var(--any-line-height, normal);
        text-align: var(--any-text-align, start);
        word-break: var(--any-word-break, normal);
        letter-spacing: var(--any-letter-spacing, 0.02em);
        text-transform: var(--any-text-transform, none);
        transform: rotate(var(--title-rotation, -6deg));
        margin: var(--any-margin, unset);
        padding: var(--any-padding, unset);
      }
      :host h1, :host h1 > span {
        font-size: var(--h1-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h2, :host h2 > span {
        font-size: var(--h2-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h3, :host h3 > span {
        font-size: var(--h3-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h4, :host h4 > span {
        font-size: var(--h4-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h5, :host h5 > span {
        font-size: var(--h5-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h6, :host h6 > span {
        font-size: var(--h6-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      .left {
        padding:0 0 0.681em 0;
        position:relative;
        top:1.2em;
      }
      .right {
        padding:0 0 0.909em 0;
        position:relative;
        bottom:0.15rem;
      }
      .left, .right {
        min-width:2em;
      }
      .left > div, .right > div {
        background-color: var(--any-color, white);
        display:block;
        height:0.272em;
        opacity: 0;
        width:0px;
        transition: var(--transition, width 0.5s cubic-bezier(1, -1.46, 0, 2.49), opacity 0.6s ease);
      }
      ${!this.hasAttribute('no-animation') ? ':host(.hover)' : ''} .left > div, ${!this.hasAttribute('no-animation') ? ':host(.hover)' : ''} .right > div {
        opacity: 1;
        width:1em;
      }
      ${!this.hasAttribute('no-animation')
        ? /* css */`
          :host(.hover) {
            animation: var(--animation, bounce 0.4s cubic-bezier(1, -1.46, 0, 2.49));
          }
          @keyframes bounce{
            from{
              transform: scale(0.9);
            }
            to{
              transform: scale(1);
            }
          }
        `
        : ''} 
      .left-0{margin:var(--sparkle1-margin)}
      .left-1{margin:var(--sparkle2-margin)}
      .left-2{margin:var(--sparkle3-margin)}
      .left-3{margin:var(--sparkle4-margin)}
      .right-0{margin:var(--sparkle2-margin)}
      .right-1{margin:var(--sparkle1-margin)}
      .right-2{margin:var(--sparkle4-margin)}
      .right-3{margin:var(--sparkle3-margin)}
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host *:not(.stripes):not(style) {
          font-size: var(--any-font-size-mobile, var(--any-font-size, min(2rem, 10vw)));
        }
        :host h1, :host h1 > span {
          font-size: var(--h1-font-size-mobile, var(--h1-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h2, :host h2 > span {
          font-size: var(--h2-font-size-mobile, var(--h2-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h3, :host h3 > span {
          font-size: var(--h3-font-size-mobile, var(--h3-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h4, :host h4 > span {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h5, :host h5 > span {
          font-size: var(--h5-font-size-mobile, var(--h5-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h6, :host h6 > span {
          font-size: var(--h6-font-size-mobile, var(--h6-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        .left {
          top:0.9em;
        }
        .right {
          bottom:0.1em;
        }
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML (initialHTML = this.html) {
    this.html = ''
    this.html = /* html */ `
      ${this.hasAttribute('sparkle') ? '<div class="stripes left"></div>' : ''}
      ${initialHTML}
      ${this.hasAttribute('sparkle') ? '<div class="stripes right"></div>' : ''}
   `
    this.measureSpan = document.createElement('span')
    this.root.querySelector('*:not(.stripes):not(style)').prepend(this.measureSpan)
  }

  /**
   * Make sparkles
   * TODO: clear divs on each call
   * TODO: calculate position and size according to font-size aka. offsetHeight
   *
   * @param {*} className
   */
  makeSparkles (className) {
    const parentClassName = `.${className}`
    /** @type {[number, number]} */
    let lines = [1, 1]
    if ((lines = this.countTitleLineBreak(this.root.querySelector('*:not(.stripes):not(style)'), this.measureSpan))[0] > 1) {
      this.setSparkleForMultiLineTitle(this.root.querySelector(parentClassName), lines)
    } else {
      this.resetSparkleForMultiLineTitle(this.root.querySelector(parentClassName))
    }

    this.removeSparkles(parentClassName)

    const rotationDirection = {
      left: '+',
      right: '-'
    }

    const rotationDegrees = {
      0: 55,
      1: 15,
      2: 15,
      3: 55
    }

    for (let i = 0; i < 4; i++) {
      let direction = rotationDirection[className]
      if (i >= 2) direction = rotationDirection[Object.keys(rotationDirection).find(key => rotationDirection[key] !== direction)]
      const sparkleDiv = document.createElement('div')
      sparkleDiv.style.transform = `rotate(${direction}${rotationDegrees[i]}deg)`
      sparkleDiv.classList.add(`${className}-${i}`)
      sparkleDiv.classList.add('stripes')
      this.root.querySelector(parentClassName).appendChild(sparkleDiv)
    }
  }

  /**
   * Delete all child elements
   * @param {string} parentSelector
   * @returns {void}
   */
  removeSparkles (parentSelector) {
    if (!parentSelector) return
    this.root.querySelector(parentSelector).innerHTML = ''
  }

  /**
   * Test if title has line break
   * @param {HTMLElement} title
   * @param {HTMLElement} reference
   * @returns {[number, number]}
   */
  countTitleLineBreak (title, reference) {
    if (!title) return [1, 1]
    return [Math.round(title.offsetHeight / reference.offsetHeight), title.innerHTML.split('<br>').length]
  }

  /**
   * Set position for sparkle if title has two lines
   * @param {HTMLElement} element
   * @param {[number, number]} lines
   */
  setSparkleForMultiLineTitle (element, lines) {
    this.root.querySelector('*:not(.stripes):not(style)').style.textAlign = lines[0] > lines[1] ? 'center' : ''
    if (element.classList.contains('left')) element.style.top = `-${lines[0] === 2 ? 0 : lines[0] * 0.3}em`
    if (element.classList.contains('right')) element.style.bottom = `-${lines[0] * 0.5}em`
  }

  resetSparkleForMultiLineTitle (element) {
    if (element.classList.contains('left')) element.style.top = ''
    if (element.classList.contains('right')) element.style.bottom = ''
  }
}
