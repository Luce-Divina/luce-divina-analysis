# Root Cause Analysis: Content Rendering Behind Sidebar

**Date:** 2026-02-04
**Status:** Resolved
**Commit:** f9a9f31

---

## Summary

Tabs 4-11 (Keywords, Reviews, Opportunities, Growth Roadmap, Industry Benchmarks, Onboarding Framework, Ad Calculator, FAQ) rendered their content behind the left sidebar. Tabs 1-3 (About FuturProof Labs, Overview, Competitors) displayed correctly.

## Symptoms

- Content on affected tabs appeared at `left: 0`, overlapping the 260px fixed sidebar
- CSS rules (`margin-left: 260px`, `max-width: calc(100% - 260px)`) had no effect on affected tabs
- Inline `<style>` overrides, `!important` declarations, and full CSS replacements all failed to fix the issue
- The same CSS file worked correctly on the CaratTrade dashboard

## Root Cause

A stray extra `</div>` tag on line 3753 inside the Competitors section (`<section id="competitors">`) caused the browser to close `<main class="main-content">` prematurely.

### HTML structure before fix

```
<main class="main-content">            <!-- line 148 -->
    <section id="about-fp">...</section>    <!-- OK -->
    <section id="overview">...</section>    <!-- OK -->
    <section id="competitors">              <!-- line 1734 -->
        <div class="competitor-cards">...</div>
        <div class="market-share-section">...</div>
        <div class="traffic-insights">...</div>
        ...
        <div class="forvr-deep-dive">
            ...
        </div>                              <!-- line 3752: closes forvr-deep-dive -->
    </div>                                  <!-- line 3753: EXTRA - closes <main> -->
    </section>                              <!-- line 3754: now outside <main> -->

    <!-- Everything below here is OUTSIDE <main> -->
    <section id="keywords">...</section>
    <section id="reviews">...</section>
    ...
</main>                                     <!-- already closed, no effect -->
```

The Competitors section had **312 opening** `<div>`/`<section>` tags but **313 closing** tags. The extra `</div>` consumed the depth that `</section>` needed, so `</section>` instead closed the parent `<main class="main-content">` element.

All subsequent sections rendered as siblings of `<main>` rather than children, so they never inherited `margin-left: 260px`.

## Why CSS fixes failed

No CSS change could fix this because the affected sections were structurally outside of `.main-content` in the DOM. The browser's HTML parser auto-closed `<main>` when it encountered the extra `</div>`, so selectors targeting `.main-content > section` or `.main-content` styles simply did not apply to the orphaned sections.

## Fix

1. Removed the extra `</div>` on line 3753
2. Removed inline `<style>` debugging overrides added during troubleshooting
3. Updated CSS cache buster to `v=20260204-fix`

### HTML structure after fix

```
<main class="main-content">
    <section id="about-fp">...</section>
    <section id="overview">...</section>
    <section id="competitors">
        ...
        <div class="forvr-deep-dive">
            ...
        </div>                              <!-- closes forvr-deep-dive -->
    </section>                              <!-- closes competitors, depth back to 0 -->

    <section id="keywords">...</section>    <!-- now correctly inside <main> -->
    <section id="reviews">...</section>
    ...
</main>
```

Post-fix verification: 312 opening tags, 312 closing tags. All 11 sections properly nested inside `<main class="main-content">`.

## Lessons Learned

- When CSS changes have zero visible effect, the problem is likely in the HTML structure, not the stylesheet
- A single mismatched closing tag buried thousands of lines deep can silently break layout for all subsequent content
- Tag-counting scripts are an effective diagnostic when visual inspection of deeply nested HTML is impractical
- The browser's error recovery for mismatched tags (auto-closing parent elements) can produce non-obvious layout failures far from the actual error location
