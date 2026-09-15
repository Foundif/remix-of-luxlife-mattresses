# Mobile Navigation and Scroll-Led Hero

## Build
- Add a fixed mobile bottom bar with Home, Shop, Search, Account, and Bag actions, including the live bag count.
- Keep it above phone safe areas and reserve page space so it never covers content.
- Reduce and constrain the desktop hero headline while preserving the bold KRUX look.
- Turn the homepage hero into a pinned, scroll-led sequence: scrolling progresses through the three films, then smoothly releases into the product sections.
- Preserve manual film controls, keyboard/accessibility behavior, and reduced-motion preferences.

## Technical details
- Reuse the existing cart, account, search, and design-system controls.
- Connect the bottom Search action to the existing live recommendations panel.
- Use a sticky hero stage with scroll progress rather than blocking normal browser scrolling.
- Verify desktop and mobile layouts and the transition from the last film into products.
