# web-components-cms-template-sparx
Using web-components-cms-template Repository

## [organize components](https://wiki.migros.net/display/OCC/Web+Components+CMS+Template)

## Releases with [Web Components + Umbraco === Mutobo](http://mutobo.ch/)

- pending

## TODO:

  - [ ] animation
  - [x] back button in studio/projects/project behavior absolute/static analog call for ideas button https://www.sketch.com/s/4ba85331-0ced-4476-91ef-3c8f857efcd5/a/zxkaAg4
  - [x] cookie banner style
  - [x] Footer

## TODO Anja:

  - [x] navigation show scroll up and hide scroll down
  - [x] desktop call for ideas slower evtl. font turn, endless (font turn is UXish a uncool)
  - [x] mobile nav align top not vertical centered
  - [x] desktop Studio > Sparx Studio align left
  - [x] desktop menu sub menu point font-size all 22px
  - [x] desktop logo 172x70
  - [x] spacing between two pic one big same https://testadmin.sparx-space.ch/about/idee/
  - [x] sparx-a-heading     letter-spacing: 0.02em;
  - [x] sparx-a-call-for-ideas > line-height: 1em; , Button round, more spacing=30 (move to backend when done)
  - [x] details>summary mobile styling https://www.sketch.com/s/4ba85331-0ced-4476-91ef-3c8f857efcd5/a/1K59Jg4
  - [x] mobile sparx-o-wrapper cards spacing double
  - [x] variablen.css button always background pinkish on hover background gold font black only font-family change
  - [x] sparx-o-wrapper align flex-start
  - [x] marquee no underline and slower
  - [X] Termine Styling https://testadmin.sparx-space.ch/forderung / https://www.sketch.com/s/4ba85331-0ced-4476-91ef-3c8f857efcd5/a/DPyQKke solved => http://localhost:4200/src/es/components/pages/Tester1.html:L117

## Fixes

  - [ ] Pictures too big fix
    ```
      --carousel-picture-img-max-width: var(--img-max-width);
      --picture-img-max-width: var(--img-max-width);
      --img-max-width: 100vh;
      --macro-carousel-gap: 0;
    ```
