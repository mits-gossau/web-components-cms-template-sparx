// @ts-check
import BaseBody from '../web-components-cms-template/src/es/components/organisms/Body.js'

/* global location */
/* global self */

/**
 * Defines a body body for content and maps variables to global tags
 * Example at: /src/es/components/pages/General.html
 * As an organism, this component shall hold molecules and/or atoms
 *
 * @export
 * @class Body
 * @type {CustomElementConstructor}
 * @css {
 *  NOTE: grid-area: body;
 *  --content-spacing [40px]
 *  --content-width [80%]
 *  --h1-color [--color, black]
 *  --font-family-secondary
 * }
 */
export default class Body extends BaseBody {
  renderCSS () {
    super.renderCSS()
    this.css = /* css */`
      :host > main sparx-a-heading {
        margin: var(--sparx-a-heading-margin);
      }
      :host > main h2 {
        margin: var(--h2-margin);
      }
      :host > main h3 {
        margin: var(--h3-margin);
      }
      :host > main p {
        margin: var(--p-margin);
      }
      @media only screen and (max-width: ${this.getAttribute('mobile-breakpoint') ? this.getAttribute('mobile-breakpoint') : self.Environment && !!self.Environment.mobileBreakpoint ? self.Environment.mobileBreakpoint : '1000px'}) {
        :host > main h2 {
          margin: var(--h2-margin-mobile, var(--h2-margin));
        }
        :host > main sparx-a-heading {
          margin: var(--sparx-a-heading-margin-mobile, var(--sparx-a-heading-margin));
        }
        :host > main h3 {
          margin: var(--h3-margin-mobile, var(--h3-margin));
        }
        :host > main p {
          margin: var(--p-margin-mobile, var(--p-margin));
        }
      }
    `
  }
}
