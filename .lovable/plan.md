

## Plan: Mobile Expand/Collapse for Experience Descriptions

### What changes

**File: `src/components/Experience.tsx`**

- Add `useState` to track which experience index is currently expanded (single value, not array — only one can be open at a time).
- Use `useIsMobile()` hook to conditionally render the collapse/expand behavior only on mobile.
- Add `useRef` array to reference each experience card for scroll-on-collapse.
- Add a global click listener (`useEffect`) that auto-collapses the open description when the user clicks anywhere outside a "Read more" button.

### Description rendering logic (mobile only)

On desktop: no change — descriptions always visible.

On mobile, the bullet-point description list is wrapped in a collapsible container:

- **Collapsed (default):** Description hidden. A blue link-style button appears: `"Read more"` + `ChevronDown` icon. On hover it turns gray.
- **Expanded:** Description visible with a smooth CSS height transition. Button changes to `"Close"` + `X` icon (same styling).

### Interaction behaviors

| Action | Result |
|--------|--------|
| Click "Read more" | Expand description. If another block was open, silently collapse it (no scroll). |
| Click "Close" | Collapse description. Scroll so the card's title aligns to the top of the viewport (accounting for navbar height). |
| Click anywhere else on page | Silently collapse any open description (no scroll). |

### Scroll behavior details

- **Expand:** No scroll — user stays where they are.
- **Explicit close:** After collapse animation, scroll the card's top (title) into view using `scrollIntoView` or manual `scrollTo`, offset by navbar height.
- **Auto-collapse (clicking another "Read more" or clicking elsewhere):** No scroll at all.

### Technical approach

- A single `expandedIndex: number | null` state determines which card is open.
- A `collapseSource` ref distinguishes explicit close (user clicked "Close") from auto-collapse (clicked elsewhere), so we only scroll on explicit close.
- Global `mousedown` listener on `document` detects outside clicks; checks if the click target is inside any "Read more"/"Close" button using a data attribute. If not, sets `expandedIndex` to `null`.
- The description container uses `overflow-hidden` with `max-height` transition (or a simple conditional render) for smooth expand/collapse.
- Each card gets a `ref` via a ref array; on explicit close, we call `scrollTo` targeting that ref's offsetTop minus navbar height.

### Styling

- Button: `text-blue-accent hover:text-gray-400 transition-colors text-sm flex items-center gap-1 mt-3`
- Uses `ChevronDown` and `X` icons from lucide-react (already available in the project).
- Consistent with existing design system — no new dependencies needed.

