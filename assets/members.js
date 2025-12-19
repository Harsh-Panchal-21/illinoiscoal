// SAMPLE DATA (replace with real member list)
const MEMBERS = [
  {
    name: "Prairie State Generating Company",
    type: "company",
    city: "Washington County, IL",
    website: "https://illinoiscoal.org/",
    keywords: ["generation", "power", "baseload"]
  },
  {
    name: "Illinois Coal Producers Council",
    type: "associate",
    city: "Springfield, IL",
    website: "https://illinoiscoal.org/",
    keywords: ["policy", "advocacy"]
  },
  {
    name: "Example Mining Company, Inc.",
    type: "company",
    city: "Southern Illinois",
    website: "",
    keywords: ["mining", "operations"]
  },
  {
    name: "Example Rail & Logistics Partner",
    type: "associate",
    city: "Illinois",
    website: "",
    keywords: ["rail", "logistics", "supply chain"]
  }
];

const els = {
  q: document.getElementById('q'),
  type: document.getElementById('type'),
  sort: document.getElementById('sort'),
  clear: document.getElementById('clear'),
  cards: document.getElementById('cards'),
  empty: document.getElementById('empty'),
  count: document.getElementById('count')
};

function normalize(s){ return (s || '').toString().toLowerCase().trim(); }

function matches(member, query){
  if(!query) return true;
  const hay = [
    member.name,
    member.city,
    member.type,
    ...(member.keywords || [])
  ].join(' ');
  return normalize(hay).includes(normalize(query));
}

function typeLabel(t){
  return t === 'company' ? 'Company' : 'Associate';
}

function card(member){
  const badgeClass = member.type === 'company' ? 'company' : 'associate';
  const website = member.website ? `<a href="${member.website}" target="_blank" rel="noopener">Website</a>` : '';
  const email = member.email ? `<a href="mailto:${member.email}">Email</a>` : '';

  return `
    <div class="member-card reveal show">
      <div class="member-top">
        <div>
          <div class="member-name">${member.name}</div>
          <div class="member-meta">${member.city || ''}</div>
        </div>
        <span class="badge ${badgeClass}">${typeLabel(member.type)}</span>
      </div>

      ${member.description ? `<div class="tiny">${member.description}</div>` : ''}

      <div class="member-links">
        ${website}
        ${email}
      </div>
    </div>
  `;
}

function render(){
  const query = normalize(els.q.value);
  const type = els.type.value;
  const sort = els.sort.value;

  let list = MEMBERS.slice();

  // filter type
  if(type !== 'all') list = list.filter(m => m.type === type);

  // search
  list = list.filter(m => matches(m, query));

  // sort
  list.sort((a,b) => {
    const A = normalize(a.name), B = normalize(b.name);
    return sort === 'az' ? A.localeCompare(B) : B.localeCompare(A);
  });

  els.count.textContent = `${list.length} member${list.length === 1 ? '' : 's'} shown`;

  if(list.length === 0){
    els.cards.innerHTML = '';
    els.empty.style.display = 'block';
    return;
  }

  els.empty.style.display = 'none';
  els.cards.innerHTML = list.map(card).join('');
}

els.q.addEventListener('input', render);
els.type.addEventListener('change', render);
els.sort.addEventListener('change', render);
els.clear.addEventListener('click', () => {
  els.q.value = '';
  els.type.value = 'all';
  els.sort.value = 'az';
  render();
});

render();
