// Single source of truth for every fictional spec, price and part. Concept project.
export const SPECS: [string, string][] = [
  ['Burr', '48 mm conical, hardened steel'],
  ['Adjustment', '0.02 mm per click, external dial'],
  ['Range', '0 to 60 clicks (0 to 1.20 mm)'],
  ['Capacity', '20 g of beans'],
  ['Body', '6061 aluminium, machined from bar'],
  ['Weight', '640 g'],
  ['Height', '168 mm overall (152 mm without the crank)'],
  ['Bearings', 'Two sealed, top and bottom of the shaft'],
  ['Warranty', '5 years (concept figure)'],
];

export const COMPARE: { row: string; grist: string; typical: string }[] = [
  { row: 'Burr diameter', grist: '48 mm', typical: '38 mm' },
  { row: 'Step per click', grist: '0.02 mm', typical: '0.04 mm' },
  { row: 'Adjustment', grist: 'External dial', typical: 'Internal, under the hopper' },
  { row: 'Shaft support', grist: 'Two bearings', typical: 'One bush' },
  { row: 'Capacity', grist: '20 g', typical: '25 g' },
  { row: 'Weight', grist: '640 g', typical: '420 g' },
];

export interface Part { id: string; name: string; dim: string; note: string }
export const PARTS: Part[] = [
  { id: 'handle', name: 'Crank', dim: '100 mm arm', note: 'Folds flat for the bag. Beech knob turns on a captive pin, so the arm stays still while your hand turns.' },
  { id: 'cap', name: 'Bearing cap', dim: '2 sealed bearings', note: 'Holds the top of the shaft true. A wobbling shaft is what makes uneven grounds.' },
  { id: 'hopper', name: 'Body', dim: 'Ø 55 mm, 6061 alloy', note: 'Machined from a single bar, then bead-blasted. Holds 20 g of beans.' },
  { id: 'dial', name: 'Adjuster ring', dim: '0.02 mm / click', note: 'Sits outside the body. Count clicks from zero; no taking it apart to change your grind.' },
  { id: 'burr', name: 'Conical burr', dim: 'Ø 48 mm steel', note: 'Hardened steel cone. The larger diameter means fewer turns per dose.' },
  { id: 'cup', name: 'Catch cup', dim: '20 g capacity', note: 'Threads on and locks. Same thread as the body cap, so it doubles as a lid.' },
];

export const FINISHES = [
  { id: 'raw', name: 'Raw', hex: '#C3C8CA', add: 0 },
  { id: 'orange', name: 'Signal Orange', hex: '#FF4D00', add: 10 },
  { id: 'graphite', name: 'Graphite', hex: '#3A3E42', add: 10 },
  { id: 'bone', name: 'Bone', hex: '#E4DFD2', add: 10 },
] as const;

export const BURRS = [
  { id: 'filter', name: 'Filter', detail: 'Tuned for clicks 20 to 60', add: 0 },
  { id: 'espresso', name: 'Espresso-ready', detail: 'Finer stop at click 6, stiffer stage', add: 49 },
] as const;

export const EXTRAS = [{ id: 'case', name: 'Travel case', add: 29 }] as const;

export const BASE_PRICE = 239;

export const METHODS: { name: string; from: number; to: number }[] = [
  { name: 'Espresso', from: 8, to: 14 },
  { name: 'Moka pot', from: 15, to: 21 },
  { name: 'AeroPress', from: 22, to: 28 },
  { name: 'Pour-over', from: 29, to: 38 },
  { name: 'French press', from: 44, to: 56 },
];

export const FAQ: [string, string][] = [
  ['Can I change the grind without taking it apart?', 'Yes. The adjuster ring sits on the outside of the body. Turn it to the click count you want. No tools.'],
  ['What does one click change?', 'The gap between the burrs moves 0.02 mm. Ten clicks is 0.2 mm.'],
  ['Does the espresso burr set fit the standard body?', 'Yes. The two burr sets share a shaft and a carrier. Swapping takes about a minute and one hex key, which stores in the crank.'],
  ['How do I clean it?', 'Unscrew the cup, lift the burr out, brush. Do not wash the bearings; they are sealed, not submersible.'],
  ['Is this a real product?', 'No. Grist is a fictional brand made for a design portfolio. There is no store, no stock and no checkout. Every spec, price and review on this page is invented.'],
];

export const REVIEWS: { q: string; who: string }[] = [
  { q: 'The dial is the first adjuster I have used that I could set from memory.', who: 'Sample reviewer A, pour-over' },
  { q: 'Heavier than my old one. Worth it for how little it moves while cranking.', who: 'Sample reviewer B, AeroPress' },
  { q: 'Would like a larger hopper. Everything else, nothing to fault.', who: 'Sample reviewer C, espresso' },
];
