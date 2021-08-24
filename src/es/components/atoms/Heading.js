// @ts-check
import { Shadow } from '../web-components-cms-template/src/es/components/prototypes/Shadow.js'

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
export default class Heading extends Shadow() {
  constructor (...args) {
    super({ intersectionObserverInit: { rootMargin: '-200px 0px -200px 0px' } }, ...args)

    this.initialHTML = this.html
    // resize listeners
    let timeout = null
    this.resizeListener = event => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        this.makeSparkels('left')
        this.makeSparkels('right')
      }, 200)
    }
  }

  connectedCallback () {
    if (this.shouldComponentRenderCSS()) this.renderCSS()
    if (this.shouldComponentRenderHTML()) {
      this.renderHTML(this.hasAttribute('sparkle'), this.initialHTML)
      if (this.hasAttribute('sparkle')) {
        this.makeSparkels('left')
        this.makeSparkels('right')
        self.addEventListener('resize', this.resizeListener)
      }
    }
  }

  disconnectedCallback () {
    if (this.hasAttribute('sparkle')) self.removeEventListener('resize', this.resizeListener)
  }

  /**
   * evaluates if a render is necessary
   *
   * @return {boolean}
   */
  shouldComponentRenderHTML () {
    return !this.root.querySelector('div.left')
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
        --sparkle1-margin: 0 0 20px 5px;
        --sparkle2-margin: 0 0 20px 0;
        --sparkle3-margin: 20px 0 0 0;
        --sparkle4-margin: 20px 0 0 5px;
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
        text-transform: var(--any-text-transform, none);
        transform: rotate(var(--title-rotation, -6deg));
        margin: var(--any-margin, unset);
        padding: var(--any-padding, unset);
      }
      :host h1 {
        font-size: var(--h1-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h2 {
        font-size: var(--h2-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h3 {
        font-size: var(--h3-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h4 {
        font-size: var(--h4-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h5 {
        font-size: var(--h5-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      :host h6 {
        font-size: var(--h6-font-size, var(--any-font-size, min(5rem, 10vw))) !important;
      }
      .left {
        padding:0 10px 30px 0;
        position:relative;
        top:30px;
      }
      .right {
        padding:0 0 10px 10px;
        position:relative;
        bottom:10px;
      }
      .left > div, .right > div {
        background-color: var(--any-color, white);
        display:block;
        height:5px;
        width:25px;
      }
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
        :host h1 {
          font-size: var(--h1-font-size-mobile, var(--h1-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h2 {
          font-size: var(--h2-font-size-mobile, var(--h2-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h3 {
          font-size: var(--h3-font-size-mobile, var(--h3-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h4 {
          font-size: var(--h4-font-size-mobile, var(--h4-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h5 {
          font-size: var(--h5-font-size-mobile, var(--h5-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
        :host h6 {
          font-size: var(--h6-font-size-mobile, var(--h6-font-size, var(--any-font-size-mobile, var(--any-font-size, min(5rem, 10vw))))) !important;
        }
      }
    `
  }

  /**
   * renders the html
   *
   * @return {void}
   */
  renderHTML (hasSparkle = true, any = this.html) {
    this.html = ''
    this.html = /* html */ `
    ${hasSparkle ? '<div class="stripes left"></div>' : ''}
      ${any}
    ${hasSparkle ? '<div class="stripes right"></div>' : ''}
   `
  }

  /**
   * Make sparkels
   * TODO: clear divs on each call
   * TODO: calculate position and size according to font-size aka. offsetHeight
   *
   * @param {*} className
   */
  makeSparkels (className) {
    console.log('offsetHeight', this.root.querySelector('*:not(.stripes):not(style)').offsetHeight);
    const parentClassName = `.${className}`

    const rotationDirection = {
      left: '+',
      right: '-'
    }

    const rotationDegrees = {
      0: 35,
      1: 10,
      2: 10,
      3: 35
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
}
