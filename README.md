# Moonlit Archives — static story engine

A static, no-login comic/story site. Visitors can read without registering. There is no user database or backend.

## Deploy with GitHub + Netlify
1. Upload the contents of this folder to the root of your GitHub repository.
2. In Netlify, import that repository. Build command: leave blank. Publish directory: `.`
3. After each GitHub commit, Netlify redeploys automatically.

## Add an episode
- Open `stories.js` and find the series object.
- Add a new object inside its `episodes` array with `number`, `title`, `subtitle`, `status: "available"`, and `panels`.
- Each panel can have `narration`, `dialogue`, `caption`, and `image`. Put artwork under `assets/images/stories/<series-id>/` and use a relative image path.
- For Google to index an episode as its own search result, create a static page under `episodes/<series-slug>/episode-XX/index.html` and add its URL to `sitemap.xml`. Hash-based SPA views alone are not ideal standalone search landing pages.
- Update `sitemap.xml` whenever new crawlable pages are added. Commit and push.

## Search Console setup (account owner must do this)
1. Confirm the site's primary production domain in Netlify. Replace `https://moonlit-archives.netlify.app` in `index.html`, `robots.txt`, `sitemap.xml`, and each episode page if the primary URL differs. Do not submit a deploy-preview URL as the permanent site URL.
2. Open https://search.google.com/search-console/ and add a **URL-prefix property** for the exact production URL.
3. Choose the HTML-tag verification method and copy the meta tag Google provides into the `<head>` of `index.html`; redeploy. (Alternatively use DNS verification for a custom domain.)
4. After verification, open **Sitemaps**, submit `sitemap.xml`, then use **URL Inspection** to request indexing for the homepage and the episode URLs.
5. Google indexing can take days or weeks and is not guaranteed. Re-submit after meaningful new public episodes.

## SEO included
- Descriptive page titles and descriptions
- Canonical links, Open Graph basics, robots.txt and sitemap.xml
- Standalone HTML landing pages for the first two episodes

## Story notes
- **The Shadow Heir** is an original dark-fantasy series. Episode 1 ends on a cliffhanger.
- **The Last Train to Seoul** is an unofficial fictional K-pop-inspired AU. Kim Min-jae is an original fictional character, not a representation of or affiliation with BTS or any real artist. The story is mystery/adventure, not an account of real people.
- Ad areas are placeholders only. They do not show ads or generate revenue until an ad provider is separately approved and integrated.


## Visual refresh
- Cinematic moonlit hero artwork lives at `assets/images/moonlit-hero.png`.
- Episode panel artwork lives under `assets/images/comic/`.
- To add a comic panel, add an image file and set `image: "assets/images/comic/..."` on the matching panel in `stories.js`.
- Upload the project root to GitHub; Netlify redeploys on commit.
