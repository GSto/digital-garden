# Shopify Theme Development

## Resources
  - [How to set up a local theme development](https://www.shopify.com/partners/blog/95401862-3-simple-steps-for-setting-up-a-local-shopify-theme-development-environment)
  - [Theme Development Best Practices](https://www.shopify.com/partners/blog/best-practices-for-developing-shopify-themes)

## Working locally on an existing theme
  - Install theme kit `brew install themekit`
  - get the theme url. Go to the site admin > online store > theme > edit code > get ID from URL.
  - create a private app in the store. get the api key and password
  - `mkdir myLocalTheme && cd myLocalTheme`
  - `theme get --password=[your-api-password] --store=[your-store.myshopify.com] --themeid=[your-theme-id]`
  - start a github repo and commit. 
  - to develop & update locally: `theme watch --allow-live`
  - to pull from production: `theme get`

## Notes
  - Seems to use a mix of variables that can be edited in the admin, along with css and html. 
  - Set up a local version that automatically syncs with production.
  - **Theme Structure**
      - `/assets` - css, js, images, etc.
      - `/config`
          - `settings.json` - where **theme settings** are stored. Accessed by clicking 'Customize' from the themes page.
      - `/layout`
          - `theme.liquid` the main template file for the theme.
      - `/sections`
          - Reusable sections that have their own config and can be used in the theme customization.
      - `/snippets`
          - reusable pieces of the template. think 'components.'
      - `/templates`
          - page templates. examples inlude `index.liquid`, `article.liquid`, etc.
      - config.yml - used to sync local store with shopify store
  - **Tackling a Theme**
      - 1. Setup, get local environment and everything you need.
      - 2. Typography
      - 3. Forms
      - 4. Buttons - don't forget hover states!
      - 5. Hero image
      - 6. Other Home page parts
      - 7. Featured Products
      - 8. other, depends on theme
      - Sections have custom stylesheets and javascripts. Path forward seems to be to build out sections, add customization where necessary. 
  - **Snippets vs. Sections**
      - snippets are static, and must be manually added to sections in your application. Sections have their own config and can be moved in the theme editor.
      - To make a section available in the theme editor, add a presets to settings, with 
  - **Section boilerplate**
  - presets is optional, but required if you want your section to show up in the editor.
  - **Section Setting Types**:
      - text
      - richtext
      - collection
      - checkbox
      - range
      - color
      - select
      - image_picker
      - url
