# KRUX PWA, Sidebar Navigation, and Live Search

## Goal
Turn KRUX into an installable, offline-capable shopping app with a branded K identity, faster product discovery, and consistent add-to-bag actions.

## Build
- Create a crisp KRUX “K” app mark and derive the favicon, Apple touch icon, Android install icons, and splash-ready maskable icon set from it.
- Add the install manifest, standalone app settings, theme colors, and mobile status-bar metadata.
- Add guarded offline support and automatic updates for the published app. Service workers will stay disabled in Lovable preview so editing never becomes stale.
- Replace the current dropdown/mobile menu behavior with a polished slide-in navigation drawer, backdrop, nested category transitions, focus handling, body scroll lock, and reduced-motion support.
- Turn the header search into an animated search panel. As the shopper types, show matching products with image, name, category, and price; support keyboard navigation, empty state, product links, and a “view all results” action.
- Keep the shop-page search synchronized through its URL so a search opened from the header lands on the matching results.
- Make “Add to bag” permanently available on every product tile across touch and desktop layouts, while preserving the image-first presentation and instant fly-cart update.

## Technical Details
- Use `vite-plugin-pwa` with generated `/sw.js`, `NetworkFirst` navigation caching, cache-first hashed assets, and exclusion of authentication callback paths.
- Register through one guarded client wrapper only in production, outside iframes and Lovable preview hosts; support `?sw=off` cleanup.
- Generate 192px, 512px, maskable, Apple touch, and favicon assets from one K source mark. Add manifest and icon links in the root document metadata.
- Reuse the existing public catalog query for typeahead results; debounce input and avoid duplicate requests.
- Preserve current KRUX color and typography tokens and all existing cart/auth behavior.

## Validation
- Verify install metadata and generated icons.
- Verify sidebar open/close, nested menus, keyboard Escape, backdrop, and mobile scrolling.
- Verify search recommendations, keyboard selection, product navigation, and shop results.
- Verify every rendered product tile exposes a working add-to-bag action and updates the bag.
- Check desktop and 393px mobile layouts in the live preview; confirm offline behavior through the production build configuration because preview intentionally disables it.
