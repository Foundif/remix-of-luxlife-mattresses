# Complete Luxlife premium storefront polish

## Scope

- Fix the current missing reviews-carousel build error and any follow-on type or runtime errors.
- Remove every remaining KRUX, socks, footwear, athletics, and sports-fashion reference from visible pages, metadata, empty states, labels, and accessibility text.
- Add a premium auto-advancing customer reviews carousel with rating, customer details, controls, swipe/drag support, pause on interaction, and reduced-motion behavior.
- Strengthen section-title and content entrance animations with restrained staggered reveals and smooth transitions across home, shop, product, cart, and checkout pages.
- Add a persistent “Custom Mattress” side badge that opens an accessible animated enquiry panel.
- Include custom width, length, thickness, comfort, mattress type, quantity, name, and phone fields; submit the completed request through Luxlife WhatsApp.
- Add the same custom-build action prominently on every single-product page, with the current mattress preselected.
- Refresh the footer with Luxlife branding, contact details, WhatsApp/call links, email, Instagram, Salem address, mattress navigation, and sleep-focused newsletter copy.
- Correct mattress-specific details such as delivery thresholds, replacement language, image descriptions, sizing labels, and cart empty-state copy.

## Implementation details

- Create reusable `TestimonialsCarousel` and `CustomMattress` components, mounting the custom-build panel globally so it works from every page.
- Use existing semantic colors, typography, buttons, and motion conventions; add only reusable animation utilities to the global styles.
- Keep the existing autoplaying three-film hero and add polished slide text transitions without returning to scroll-controlled playback.
- Preserve COD/UPI checkout and the existing cart, search, account, PWA, and mobile navigation behavior.
- Update the roadmap as work completes.

## Verification

- Search the full source and public assets for old-brand or sock/shoe language.
- Check the generated build diagnostics and TypeScript results.
- Test desktop and mobile views for the homepage carousel, sticky header, custom mattress panel, product-page custom action, menu/search transitions, and add-to-bag flow.
