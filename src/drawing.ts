// Authored SVG of the Grist One. Colours come from CSS vars set by the surrounding section,
// so one drawing serves as line art (hero), teardown (graphite) and filled render (configurator).
// Each part sits in a group with data-part; --ex (0..1) scales its explode offset.
const OFFSETS: Record<string, number> = { handle: -170, cap: -105, hopper: -40, dial: 30, burr: 100, cup: 175 };

function ticks(): string {
  let s = '';
  for (let i = 0; i <= 30; i++) {
    const x = 132 + (i * 136) / 30;
    s += `<line x1="${x.toFixed(1)}" y1="${i % 5 === 0 ? 312 : 318}" x2="${x.toFixed(1)}" y2="326" class="tick"/>`;
  }
  return s;
}

export function grinderSVG(opts: { id: string; dims?: boolean; balloons?: boolean; viewBox?: string; label: string }): string {
  const BAL: Record<string, [number, number, string]> = { handle: [366, 38, '1'], cap: [250, 85, '2'], hopper: [260, 200, '3'], dial: [270, 322, '4'], burr: [260, 400, '5'], cup: [266, 528, '6'] };
  const balloon = (id: string) => {
    if (!opts.balloons) return '';
    const [x, y, n] = BAL[id];
    return `<g class="balloon" aria-hidden="true"><line x1="${x}" y1="${y}" x2="${x + 34}" y2="${y}"/><circle cx="${x + 48}" cy="${y}" r="14"/><text x="${x + 48}" y="${y + 5}" text-anchor="middle">${n}</text></g>`;
  };
  const g = (id: string, body: string) =>
    `<g class="part" data-part="${id}" style="transform:translateY(calc(var(--ex,0) * ${OFFSETS[id]}px))">${body}${balloon(id)}</g>`;
  return `<svg id="${opts.id}" class="grinder" viewBox="${opts.viewBox ?? '0 0 460 960'}" role="img" aria-label="${opts.label}" focusable="false">
  <g transform="translate(0,170)">
    ${g('handle', `
      <rect class="body" x="198" y="30" width="170" height="16" rx="2"/>
      <rect class="body" x="346" y="46" width="20" height="56" rx="4"/>
      <rect class="body" x="186" y="44" width="28" height="26" rx="2"/>`)}
    ${g('cap', `
      <rect class="body" x="150" y="70" width="100" height="30" rx="3"/>
      <line class="tick" x1="150" y1="82" x2="250" y2="82"/>`)}
    ${g('hopper', `
      <rect class="body" x="140" y="100" width="120" height="200" rx="6"/>
      <line class="tick" x1="170" y1="120" x2="170" y2="280"/>
      <line class="tick" x1="230" y1="120" x2="230" y2="280"/>`)}
    ${g('dial', `
      <rect class="accent" x="130" y="300" width="140" height="44" rx="3"/>
      ${ticks()}`)}
    ${g('burr', `
      <rect class="body" x="140" y="344" width="120" height="100" rx="3"/>
      <polygon class="burr" points="148,356 252,356 226,432 174,432"/>
      <line class="tick" x1="170" y1="372" x2="230" y2="372"/>
      <line class="tick" x1="174" y1="392" x2="226" y2="392"/>
      <line class="tick" x1="178" y1="412" x2="222" y2="412"/>`)}
    ${g('cup', `
      <rect class="body" x="134" y="444" width="132" height="14" rx="2"/>
      <rect class="body" x="140" y="458" width="120" height="140" rx="6"/>`)}
    ${opts.dims ? `
    <g class="dim" aria-hidden="true">
      <line x1="100" y1="30" x2="100" y2="598"/><line x1="92" y1="30" x2="108" y2="30"/><line x1="92" y1="598" x2="108" y2="598"/>
      <text x="88" y="314" transform="rotate(-90 88 314)" text-anchor="middle">168 mm overall</text>
      <line x1="254" y1="400" x2="420" y2="400" class="lead"/><text x="424" y="396">BURR</text><text x="424" y="416">Ø 48 mm</text>
      <line x1="262" y1="200" x2="420" y2="200" class="lead"/><text x="424" y="196">BODY</text><text x="424" y="216">Ø 55 mm</text>
      <line x1="268" y1="322" x2="420" y2="322" class="lead"/><text x="424" y="318">0.02 mm</text><text x="424" y="338">per click</text>
      <line x1="368" y1="110" x2="420" y2="110" class="lead"/><text x="424" y="114">CRANK 100 mm</text>
    </g>` : ''}
  </g>
</svg>`;
}

// Deterministic particle field for the grind dial (no Math.random: same picture every time).
export function particleField(clicks: number, w = 520, h = 160): string {
  const inset = 4;
  const size = Math.max(1.5, clicks * 0.02 * 14); // px per mm-ish, purely illustrative
  let seed = 7;
  const rnd = () => ((seed = (seed * 16807) % 2147483647) / 2147483647);
  const n = Math.min(400, Math.round(9000 / (size * size)));
  let out = '';
  for (let i = 0; i < n; i++) {
    const r = size * (0.6 + rnd() * 0.8);
    const rr = Math.min(r / 2, 40);
    out += `<circle cx="${(rr + inset + rnd() * (w - 2 * (rr + inset))).toFixed(1)}" cy="${(rr + inset + rnd() * (h - 2 * (rr + inset))).toFixed(1)}" r="${rr.toFixed(2)}"/>`;
  }
  // 1 mm scale bar (same units as the particle diameters: 14 px per mm)
  out += `<g class="sbar"><rect x="${inset + 6}" y="${h - 22}" width="14" height="4"/><text x="${inset + 26}" y="${h - 17}">1 mm</text></g>`;
  return out;
}
