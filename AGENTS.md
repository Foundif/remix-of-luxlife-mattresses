<!-- LOVABLE:BEGIN -->
> [!IMPORTANT]
> This project is connected to [Lovable](https://lovable.dev). Avoid rewriting
> published git history — force pushing, or rebasing/amending/squashing commits
> that are already pushed — as it rewrites history on Lovable's side and the
> user will likely lose their project history.
>
> Commits you push to the connected branch sync back to Lovable and show up in
> the editor, so keep the branch in a working state.
<!-- LOVABLE:END -->

- Keep payment-term calculations in a shared browser-safe module so checkout and order displays use the same split.
- Store new order payment choices as method:plan in the existing payment_method text field and decode legacy method-only values for backward-compatible order history.
- Keep enquiry-only products on dedicated routes outside the priced catalog until verified product specifications and pricing are supplied.
- Use the shared dialog for bulk enquiries above navigation layers so offers remain accessible on all screen sizes.
