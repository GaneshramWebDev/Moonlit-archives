(() => {
  const stories = window.ARCHIVE_STORIES || [];
  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];
  let genre = 'All', activeStory = stories[0]?.id, activeEpisode = 1, activePanel = 0;
  const views = { home: $('#homeView'), discover: $('#discoverView'), latest: $('#latestView'), fanfiction: $('#fanfictionView'), series: $('#seriesView'), reader: $('#readerView') };
  const esc = value => String(value ?? '').replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const storyById = id => stories.find(s => s.id === id);
  const coverStyle = s => `--cover-a:${s.coverA || '#542536'};--cover-b:${s.coverB || '#a33b54'}`;
  const availableEpisodes = s => (s.episodes || []).filter(e => e.status === 'available');

  function storyCard(s) {
    const available = availableEpisodes(s).length;
    return `<article class="story-card"><div class="story-cover ${s.coverImage ? 'has-cover-image' : ''}" style="${coverStyle(s)}">${s.coverImage ? `<img src="${esc(s.coverImage)}" alt="Illustration for ${esc(s.title)}" loading="lazy">` : `<span class="cover-symbol" aria-hidden="true">${esc(s.symbol || '✦')}</span>`}<span class="cover-label">${s.type === 'fanfiction' ? '✧ Fanfiction' : '✦ ' + esc(s.genre)}</span></div><div class="story-info"><h3>${esc(s.title)}</h3><p>${esc(s.description)}</p><div class="meta"><span>${esc(s.status)}</span><span class="tag">${available} ${available === 1 ? 'episode' : 'episodes'}</span></div></div><button class="card-button" data-open-story="${esc(s.id)}"><span>${available ? 'Read story' : 'Series details'}</span><span>↗</span></button></article>`;
  }
  function episodeRow(s, ep) {
    const available = ep.status === 'available';
    return `<div class="episode-row"><div><strong>${esc(ep.title)}</strong><small>${esc(s.title)} · Episode ${String(ep.number).padStart(2,'0')} · ${esc(ep.subtitle || '')}</small></div>${available ? `<button class="button primary" data-open-episode="${esc(s.id)}" data-episode="${ep.number}">Read episode ↗</button>` : '<span class="tag">Coming soon</span>'}</div>`;
  }
  function renderStoryGrids() {
    $('#homeStories').innerHTML = stories.slice(0,4).map(storyCard).join('');
    renderDiscover();
    const releases = stories.flatMap(s => availableEpisodes(s).map(e => ({s,e}))).reverse();
    const html = releases.length ? releases.map(({s,e}) => episodeRow(s,e)).join('') : '<div class="empty">The first episode is being prepared.</div>';
    $('#homeLatest').innerHTML = html;
    $('#allLatest').innerHTML = html;
    renderFanfiction();
  }
  function renderFanfiction() {
    const fanStories = stories.filter(s => s.type === 'fanfiction' || s.category === 'fanfiction');
    const target = $('#fanfictionStories');
    if (!target) return;
    target.innerHTML = fanStories.length ? fanStories.map(storyCard).join('') : '<div class="empty fanfiction-empty"><span class="empty-symbol">✧ 🌙 ✧</span><h2>The next world is being written</h2><p>Fanfiction stories will appear here as they are released.<br>Alternate universes, untold moments and new endings await.</p><span class="tag">Coming soon</span></div>';
  }
  function renderDiscover() {
    const q = ($('#storySearch').value || '').trim().toLowerCase();
    const found = stories.filter(s => (genre === 'All' || s.genre === genre) && `${s.title} ${s.genre} ${s.description} ${s.mood}`.toLowerCase().includes(q));
    $('#discoverStories').innerHTML = found.length ? found.map(storyCard).join('') : '<div class="empty">No stories found. Try a different search or genre.</div>';
  }
  function navigate(id, updateHash = true) {
    const key = views[id] ? id : 'home';
    Object.entries(views).forEach(([name, el]) => el.classList.toggle('active', name === key));
    $$('#mainNav a').forEach(a => a.classList.toggle('active', a.dataset.route === key));
    document.body.dataset.view = key;
    $('#mainNav').classList.remove('open'); $('#menuToggle').setAttribute('aria-expanded','false');
    if (updateHash && location.hash !== `#${key}`) history.replaceState(null, '', `#${key}`);
    window.scrollTo({top:0, behavior:'smooth'});
  }
  function openStory(id) {
    const s = storyById(id); if (!s) return;
    activeStory = id;
    const available = availableEpisodes(s);
    $('#seriesContent').innerHTML = `<div class="story-detail"><div class="detail-art ${s.coverImage ? 'has-cover-image' : ''}" style="${coverStyle(s)}">${s.coverImage ? `<img src="${esc(s.coverImage)}" alt="Illustration for ${esc(s.title)}">` : `<span aria-hidden="true">${esc(s.symbol || '✦')}</span>`}</div><div class="detail-copy"><p class="eyebrow">${s.type === 'fanfiction' ? '✧ Fanfiction · Fictional AU' : esc(s.genre)} · ${esc(s.mood)}</p><h1>${esc(s.title)}</h1><p>${esc(s.description)}</p>${s.disclaimer ? `<p class="muted disclaimer">${esc(s.disclaimer)}</p>` : ''}<p>${available.length} episode${available.length === 1 ? '' : 's'} available · ${esc(s.status)}</p>${available.length ? `<button class="button primary" data-open-episode="${esc(s.id)}" data-episode="${available[0].number}">Start reading ↗</button>` : '<span class="tag">First episode in preparation</span>'}</div></div><div class="section-heading"><div><p class="eyebrow">Read in order</p><h2>Episodes</h2></div></div><div class="episode-list">${(s.episodes || []).length ? s.episodes.map(ep => episodeRow(s,ep)).join('') : '<div class="empty">This series is in development. Check back for its first episode.</div>'}</div>`;
    navigate('series');
  }
  function openEpisode(id, number) {
    const s = storyById(id); const ep = s?.episodes.find(e => e.number === Number(number) && e.status === 'available');
    if (!s || !ep) return;
    activeStory = id; activeEpisode = ep.number; activePanel = 0; renderReader(); navigate('reader');
  }
  function renderReader() {
    const s = storyById(activeStory); const ep = s?.episodes.find(e => e.number === activeEpisode);
    if (!s || !ep) return;
    const panels = ep.panels || [];
    const episodeNav = stories.filter(x => x.episodes?.some(e => e.status === 'available')).map(x => `
      <section class="reader-side-series"><h3>${esc(x.symbol || '✦')} ${esc(x.title)}</h3>${availableEpisodes(x).map(e => `<button class="reader-episode ${x.id === s.id && e.number === ep.number ? 'current' : ''}" data-open-episode="${esc(x.id)}" data-episode="${e.number}"><span class="reader-thumb">${x.coverImage ? `<img src="${esc(x.coverImage)}" alt="" loading="lazy">` : esc(x.symbol || '✦')}</span><span><small>Episode ${String(e.number).padStart(2,'0')}</small><strong>${esc(e.title)}</strong></span></button>`).join('')}</section>`).join('');
    const panelMarkup = panels.map((panel, i) => {
      const bubble = panel.dialogue ? `<div class="comic-bubble dialogue-bubble">${esc(panel.dialogue)}</div>` : '';
      const caption = panel.narration ? `<div class="comic-bubble narration-bubble">${esc(panel.narration)}</div>` : '';
      return `<article class="comic-page-panel" id="comic-panel-${i+1}"><img class="comic-art" src="${esc(panel.image || '')}" alt="Illustrated scene ${i+1}: ${esc(ep.title)}" loading="${i < 2 ? 'eager' : 'lazy'}" decoding="async"><span class="comic-frame-number">${String(i+1).padStart(2,'0')}</span>${caption}${bubble}<div class="comic-image-error" hidden>Illustration unavailable. Check that the image file is included in your deployment.</div></article>`;
    }).join('');
    const nextEp = s.episodes.find(e => e.number === ep.number + 1 && e.status === 'available');
    $('#readerContent').innerHTML = `<div class="comic-reader-shell">
      <aside class="reader-left-rail"><div class="reader-brand"><span>☾</span><div><strong>Moonlit Archives</strong><small>Whispers of legend</small></div></div><a class="reader-home-link" href="#home" data-route="home">⌂ &nbsp; Home</a><div class="reader-side-scroll">${episodeNav}</div><button class="reader-back" data-open-story="${esc(s.id)}">← Series details</button></aside>
      <main class="reader-center"><div class="reader-toolbar"><div><button class="reader-back-inline" data-open-story="${esc(s.id)}">← ${esc(s.title)}</button><div class="reader-breadcrumb">${esc(s.title)} <span>›</span> Episode ${ep.number} — ${esc(ep.title)}</div></div><span class="reader-counter">${panels.length} panels</span></div><div class="reader-title-block"><p class="eyebrow">${esc(s.genre)} · Episode ${String(ep.number).padStart(2,'0')}</p><h1>${esc(ep.title)}</h1><p>${esc(ep.subtitle || '')}</p></div><div class="comic-canvas">${panelMarkup || '<div class="empty">This episode is being illustrated.</div>'}</div><div class="comic-end-card"><span>✦ END OF EPISODE ✦</span><h2>To be continued…</h2><p>Every legend leaves a door open.</p>${nextEp ? `<button class="button primary" data-open-episode="${esc(s.id)}" data-episode="${nextEp.number}">Read next episode →</button>` : `<button class="button secondary" data-open-story="${esc(s.id)}">Explore episode list →</button>`}</div></main>
      <aside class="reader-right-rail"><div class="right-cover">${s.coverImage ? `<img src="${esc(s.coverImage)}" alt="${esc(s.title)} cover">` : `<span>${esc(s.symbol || '✦')}</span>`}</div><p class="eyebrow">${s.type === 'fanfiction' ? 'Fanfiction · Fictional AU' : 'Original series'}</p><h2>${esc(s.title)}</h2><p class="reader-genre">${esc(s.genre)} · ${esc(s.status)}</p><p class="reader-description">${esc(s.description)}</p>${s.disclaimer ? `<p class="reader-disclaimer">${esc(s.disclaimer)}</p>` : ''}<button class="button secondary reader-continue" data-open-story="${esc(s.id)}">View all episodes →</button><div class="right-episode-list"><h3>Episode list</h3>${availableEpisodes(s).map(e => `<button class="right-episode ${e.number === ep.number ? 'current' : ''}" data-open-episode="${esc(s.id)}" data-episode="${e.number}"><span>${e.number}.</span>${esc(e.title)}</button>`).join('')}</div><div class="reader-quote">“Some destinies are not chosen… they are remembered.”</div><div class="reader-ad-slot">✦ Advertisement</div></aside>
    </div>`;
    $$('.comic-art', $('#readerContent')).forEach(img => img.addEventListener('error', () => { const panel = img.closest('.comic-page-panel'); if (panel) { img.hidden = true; const err = $('.comic-image-error', panel); if (err) err.hidden = false; } }));
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('button, a'); if (!target) return;
    if (target.dataset.route) { event.preventDefault(); navigate(target.dataset.route); }
    if (target.dataset.openStory) { event.preventDefault(); openStory(target.dataset.openStory); }
    if (target.dataset.openEpisode) { event.preventDefault(); openEpisode(target.dataset.openEpisode, target.dataset.episode); }
    if (target.dataset.panel) {
      const s = storyById(activeStory); const ep = s?.episodes.find(e => e.number === activeEpisode); const next = activePanel + Number(target.dataset.panel);
      if (ep && next >= 0 && next < ep.panels.length) { activePanel = next; renderReader(); window.scrollTo({top:0,behavior:'smooth'}); }
      else if (ep && next >= ep.panels.length) { $('.episode-end')?.scrollIntoView({behavior:'smooth',block:'center'}); }
    }
    if (target.hasAttribute('data-back')) navigate('discover');
  });
  $('#genreFilters').addEventListener('click', event => { const b = event.target.closest('[data-genre]'); if (!b) return; genre = b.dataset.genre; $$('#genreFilters button').forEach(x => x.classList.toggle('active', x === b)); renderDiscover(); });
  $('#storySearch').addEventListener('input', renderDiscover);
  $('#menuToggle').addEventListener('click', () => { const open = $('#mainNav').classList.toggle('open'); $('#menuToggle').setAttribute('aria-expanded', String(open)); });
  window.addEventListener('hashchange', () => { const key = location.hash.slice(1); if (views[key]) navigate(key, false); else if (!key || key === 'home') navigate('home', false); });
  renderStoryGrids();
  const initial = location.hash.slice(1); if (views[initial]) navigate(initial, false); else navigate('home', false);
})();
