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
    const rawPanels = ep.panels || [];
    const panels = rawPanels.filter((p, i) => !p.image || rawPanels.findIndex(x => x.image === p.image) === i);
    const panel = panels[activePanel]; if (!panel) return;
    const scene = String(panel.scene || 'moon').toLowerCase().replace(/[^a-z0-9-]/g, '');
    const image = panel.image ? `<img class="panel-image" src="${esc(panel.image)}" alt="${esc(panel.alt || (s.title + ' — comic scene ' + (activePanel + 1)))}" fetchpriority="high">` : `<div class="panel-artwork scene-${scene}" role="img" aria-label="${esc(panel.alt || panel.scene || s.title)}"><span class="art-moon"></span><span class="art-silhouette"></span><span class="art-grain"></span></div>`;
    const narration = panel.narration ? `<div class="narration-box">${esc(panel.narration)}</div>` : '';
    const dialogue = panel.dialogue ? `<div class="speech-bubble">${esc(panel.dialogue)}</div>` : '';
    const last = activePanel === panels.length - 1;
    const nextEpisode = s.episodes.find(e => e.number > ep.number && e.status === 'available');
    $('#readerContent').innerHTML = `<div class="comic-reader"><header class="comic-toolbar"><button class="reader-back" data-open-story="${esc(s.id)}" aria-label="Back to story">← <span>Story</span></button><div class="reader-heading"><strong>${esc(s.title)}</strong><span>${esc(ep.title)}</span></div><button class="reader-close" data-route="discover" aria-label="Exit reader">✕</button></header><div class="book-stage"><div class="book-page" id="bookPage"><div class="page-art">${image}${narration}${dialogue}<span class="art-page-mark">MOONLIT ARCHIVES · ${String(activePanel + 1).padStart(2,'0')}</span></div></div></div><footer class="comic-controls"><button class="page-button" data-panel="-1" ${activePanel === 0 ? 'disabled' : ''}>← <span>Previous</span></button><div class="page-progress"><span>PAGE ${String(activePanel + 1).padStart(2,'0')} / ${String(panels.length).padStart(2,'0')}</span><div class="progress-track"><i style="width:${((activePanel+1)/panels.length)*100}%"></i></div></div>${last ? (nextEpisode ? `<button class="page-button next" data-open-episode="${esc(s.id)}" data-episode="${nextEpisode.number}"><span>Next episode</span> →</button>` : `<button class="page-button next" data-open-story="${esc(s.id)}"><span>Episode complete</span> ↗</button>`) : '<button class="page-button next" data-panel="1"><span>Turn page</span> →</button>'}</footer><p class="reader-hint">Use ← → arrow keys to turn pages · Images fit without cropping</p></div>`;
    const page = $('#bookPage'); page.classList.remove('turn-in'); void page.offsetWidth; page.classList.add('turn-in');
  }
  document.addEventListener('click', event => {
    const target = event.target.closest('button, a'); if (!target) return;
    if (target.dataset.route) { event.preventDefault(); navigate(target.dataset.route); }
    if (target.dataset.openStory) { event.preventDefault(); openStory(target.dataset.openStory); }
    if (target.dataset.openEpisode) { event.preventDefault(); openEpisode(target.dataset.openEpisode, target.dataset.episode); }
    if (target.dataset.panel) {
      const s = storyById(activeStory); const ep = s?.episodes.find(e => e.number === activeEpisode);
      const panels = (ep?.panels || []).filter((p, i, all) => !p.image || all.findIndex(x => x.image === p.image) === i);
      const next = activePanel + Number(target.dataset.panel);
      if (ep && next >= 0 && next < panels.length) { activePanel = next; renderReader(); }
    }
    if (target.hasAttribute('data-back')) navigate('discover');
  });
  $('#genreFilters').addEventListener('click', event => { const b = event.target.closest('[data-genre]'); if (!b) return; genre = b.dataset.genre; $$('#genreFilters button').forEach(x => x.classList.toggle('active', x === b)); renderDiscover(); });
  $('#storySearch').addEventListener('input', renderDiscover);
  $('#menuToggle').addEventListener('click', () => { const open = $('#mainNav').classList.toggle('open'); $('#menuToggle').setAttribute('aria-expanded', String(open)); });
  window.addEventListener('hashchange', () => { const key = location.hash.slice(1); if (views[key]) navigate(key, false); else if (!key || key === 'home') navigate('home', false); });
  const themeSelect = $('#themeSelect');
  const setTheme = value => { document.documentElement.dataset.theme = value; if (themeSelect) themeSelect.value = value; try { localStorage.setItem('moonlit-theme', value); } catch (_) {} };
  let savedTheme = 'dark'; try { savedTheme = localStorage.getItem('moonlit-theme') || 'dark'; } catch (_) {}
  setTheme(savedTheme);
  themeSelect?.addEventListener('change', e => setTheme(e.target.value));
  document.addEventListener('keydown', e => { if (document.body.dataset.view !== 'reader') return; if (e.key === 'ArrowRight') $('[data-panel="1"]')?.click(); if (e.key === 'ArrowLeft') $('[data-panel="-1"]')?.click(); if (e.key === 'Escape') navigate('discover'); });
  renderStoryGrids();
  const initial = location.hash.slice(1); if (views[initial]) navigate(initial, false); else navigate('home', false);
})();
