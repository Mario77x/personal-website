

## Fix: Prevent scroll jumps on auto-collapse

### The problem

When an expanded description auto-collapses (user clicks elsewhere or opens another block), the content height shrinks. If the collapsing block is above the user's current viewport position, everything shifts up, causing a visible "jump." The user loses their place.

### The solution

Before setting `expandedIndex` to null (or to a new index) during auto-collapse, measure and compensate for the height change:

1. **Capture the collapsing block's content height** before it collapses (the description container's `scrollHeight`).
2. **Check if the collapsing block is above the viewport** (its top is above the current scroll position).
3. **If it is above**, immediately adjust `window.scrollTo` by subtracting the lost height, so the visible content stays in place. Use `behavior: "instant"` (no smooth scroll) to make it imperceptible.

### Technical changes in `src/components/Experience.tsx`

- Store a ref to each description container (the `div` with `overflow-hidden`), not just the card.
- In the global `mousedown` handler (auto-collapse path): before calling `setExpandedIndex(null)`, read the expanded description's `scrollHeight` and its card's position. After the state update (via a `useEffect` or `requestAnimationFrame`), adjust scroll if needed.
- In `handleToggle` when opening a new block (which auto-collapses the previous one): same scroll compensation logic for the previously expanded block.
- The explicit "Close" button path remains unchanged (it already scrolls to the card title intentionally).

### Why this works

The jump happens because the browser keeps `scrollY` constant while content above shrinks. By proactively subtracting the collapsed height from `scrollY`, the content the user is looking at stays visually pinned in place.

