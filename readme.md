# Vite Starter
A Vite starting point for Codepen-sized vanilla js projects. [Repo](https://github.com/kevinnewcombe/vite-starter)

## Generating HTML
There's two ways of generating the HTML.

### Pug
* Create a file at partials/index.pug
* Add the following to /index.html: `<pug src="partials/index.pug" />`
* Replace the contents of vite.config.js with the following 
    ```
    import { defineConfig } from "vite"
    import pugPlugin from "vite-plugin-pug"

    export default defineConfig({
      plugins: [pugPlugin({ pretty: true })]
    })
   ```

### HTML Partials
* Create a file at partials/index.html
* Add the following to /index.html `{{> index }}`
* Replace the contents of vite.config.js with the following 
    ```
    import { defineConfig } from "vite"
    import { resolve } from 'path';
    import handlebars from 'vite-plugin-handlebars';
    
    export default defineConfig({
      plugins: [
        handlebars({
          partialDirectory: resolve(__dirname, 'partials'),
        }),
      ],
    })
    ```

## Scripts
* `npm install`
* `npm run dev`
* `npm run host`
