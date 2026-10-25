# Moonlit Archives — immersive comic reader update

This is a static HTML/CSS/JavaScript site. No database or build step is required.

## What changed
- Redesigned story reader to match the Moonlit Archives cinematic reference: episode rail, central comic canvas, and series detail rail.
- The reader displays the complete episode as a comic page sequence instead of forcing the reader to click through one panel at a time.
- Narration and dialogue are overlaid directly on the artwork as caption boxes and speech bubbles. There is no separate narration block below each image.
- Comic artwork keeps its original aspect ratio (`width: 100%; height: auto; object-fit: contain`) to prevent cropping.
- Each published panel uses a distinct episode-specific image path; image failures show a clear fallback instead of silently leaving a blank panel.
- Responsive layout: on smaller screens the episode rail becomes horizontally scrollable and comic panels stack vertically.
- Story and episode navigation remains functional, including links to other available episodes.

## Deploy to Vercel
1. Extract this ZIP.
2. Copy the **contents** of the `moonlit-finished` folder into the root of the GitHub repository (the folder containing `index.html`, `app.js`, `stories.js`, `styles.css`, `assets/`, and `vercel.json`).
3. Commit and push to the same branch configured as the Vercel Production Branch.
4. In Vercel → Project → Settings → Git, verify the connected repository and production branch. In Deployments, confirm a new deployment was created for the commit. If it failed, inspect its build logs.
5. Since this is a static site, the Vercel output directory should be the project root (`.`); no framework build command is required.
6. After deployment completes, open the production domain and hard-refresh with Ctrl+Shift+R.

## Important
The speech bubbles and narration captions are rendered as HTML overlays on the illustrations, visually integrated into the comic panel. They are not permanently rasterized into the image files, which keeps dialogue editable and readable on mobile. The existing scene artwork is unique per panel in the two published episodes, but the art remains generated/illustrative rather than hand-drawn by a human artist.


## Comic reader image/narration fix
- Replaced episode panel references that accidentally pointed to homepage-composite screenshots.
- Each published episode panel now points to a standalone artwork file, with narration/dialogue rendered only once as comic bubbles over the image.
- Panel images use contain/auto sizing to preserve full illustration proportions.
- The new `assets/images/comic/shadow-heir/scene-*.webp` and `assets/images/comic/last-train/scene-*.webp` files are unique image files/crops from the standalone story artwork, not homepage screenshots.
