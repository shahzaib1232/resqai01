/**
 * Canonical emergency knowledge base for ResQ AI.
 *
 * This content is authored (not AI-generated at runtime) so that the guidance
 * shown on the Emergency Guide is deterministic, reviewable, and available
 * offline/without an AI call. The AI assistant is layered *on top* of this —
 * it personalises the guidance to the user's described situation.
 */

export type EmergencyNumber = {
  label: string;
  number: string;
};

export type EmergencyModule = {
  slug: string;
  code: string;
  name: string;
  tagline: string;
  overview: string;
  risks: string[];
  symptoms: string[];
  prevention: string[];
  dos: string[];
  donts: string[];
  numbers: EmergencyNumber[];
  /** Seed prompt used when the user opens the AI assistant from this module. */
  assistantPrompt: string;
};

const UNIVERSAL_NUMBERS: EmergencyNumber[] = [
  { label: "Universal emergency", number: "112" },
  { label: "Emergency (US/CA)", number: "911" },
];

export const EMERGENCY_MODULES: EmergencyModule[] = [
  {
    slug: "fire",
    code: "01",
    name: "Fire",
    tagline: "Structural, wildfire and electrical fire response",
    overview:
      "Fire kills far more people through smoke inhalation than through burns. In a structure fire you typically have under three minutes of survivable air once visible smoke reaches head height. Every decision should be optimised for getting low, getting out, and staying out.",
    risks: [
      "Smoke inhalation and carbon monoxide poisoning within 2-3 minutes",
      "Flashover — an entire room igniting at once once temperatures pass ~600°C",
      "Structural collapse of floors, roofs and staircases",
      "Backdraft when opening a door into an oxygen-starved fire",
      "Secondary explosion from gas cylinders, aerosols or fuel storage",
    ],
    symptoms: [
      "Soot around the nose or mouth, hoarse voice or stridor (airway burn)",
      "Persistent cough, chest tightness, shortness of breath",
      "Headache, dizziness, confusion or cherry-red skin (carbon monoxide)",
      "Burns: redness (superficial), blistering (partial), white/charred and painless (full thickness)",
    ],
    prevention: [
      "Install smoke alarms on every floor and test them monthly",
      "Keep a Class ABC extinguisher near the kitchen and know the PASS technique",
      "Never leave cooking, candles or heaters unattended",
      "Avoid daisy-chained extension leads and overloaded sockets",
      "Agree a household escape plan with two exits and an outside meeting point",
    ],
    dos: [
      "Get out immediately and call emergency services from outside",
      "Crawl low under smoke — the cleanest air is 30-60cm above the floor",
      "Feel doors with the back of your hand before opening; if hot, use another route",
      "Close doors behind you to slow the spread",
      "Stop, drop and roll if clothing catches fire",
      "Cool burns under cool running water for 20 minutes",
    ],
    donts: [
      "Do not use lifts or elevators",
      "Do not go back inside for possessions, documents or pets",
      "Do not open a door that is hot or has smoke pushing under it",
      "Do not throw water on an oil, grease or electrical fire",
      "Do not apply ice, butter or ointment to a burn",
    ],
    numbers: [
      { label: "Fire & rescue", number: "101" },
      ...UNIVERSAL_NUMBERS,
      { label: "Poison / CO advice", number: "Local poison centre" },
    ],
    assistantPrompt: "There is a fire where I am. Tell me exactly what to do right now.",
  },
  {
    slug: "flood",
    code: "02",
    name: "Flood",
    tagline: "Flash floods, river flooding and urban water inundation",
    overview:
      "Flood water is deceptively powerful and almost always contaminated. Fifteen centimetres of moving water can knock an adult off their feet, and sixty centimetres will float most cars. The correct instinct is vertical evacuation and early movement — not waiting to see how bad it gets.",
    risks: [
      "Drowning in moving water, submerged culverts and underpasses",
      "Electrocution from submerged wiring and downed power lines",
      "Sewage contamination causing cholera, typhoid, leptospirosis and skin infection",
      "Hypothermia after prolonged immersion",
      "Vehicles stalling and being swept away at very shallow depths",
    ],
    symptoms: [
      "Near-drowning: coughing, frothy sputum, blue lips, altered consciousness",
      "Hypothermia: uncontrollable shivering, slurred speech, drowsiness",
      "Waterborne illness onset: fever, vomiting, watery diarrhoea within 1-3 days",
      "Infected wounds: spreading redness, warmth, pus, red streaking",
    ],
    prevention: [
      "Know whether your address is in a flood-risk zone and register for local alerts",
      "Keep a go-bag with documents in waterproof sleeves, water, torch and power bank",
      "Store valuables and electrics above the historical flood line",
      "Never park in basements or riverside lots during a flood watch",
      "Identify the nearest higher ground and two routes to reach it on foot",
    ],
    dos: [
      "Move to higher ground before water reaches the road, not after",
      "Switch off electricity at the mains if it is safe and dry to do so",
      "Drink only bottled or boiled water",
      "Wear closed shoes if you must move through shallow water and probe ahead with a stick",
      "Tell someone your route and destination before you move",
    ],
    donts: [
      "Never walk, swim or drive through moving flood water — turn around, don't drown",
      "Do not enter a flooded basement or cellar",
      "Do not touch electrical equipment while standing in water",
      "Do not shelter in an attic without a way onto the roof",
      "Do not return home until authorities declare the area safe",
    ],
    numbers: [
      { label: "Disaster helpline", number: "108" },
      ...UNIVERSAL_NUMBERS,
      { label: "Coast guard / water rescue", number: "Local rescue authority" },
    ],
    assistantPrompt: "My area is flooding and the water is rising. What should I do?",
  },
  {
    slug: "earthquake",
    code: "03",
    name: "Earthquake",
    tagline: "Shaking, aftershocks and post-quake structural hazards",
    overview:
      "Most earthquake injuries come from falling objects and from people moving during the shaking, not from buildings collapsing. Drop, Cover and Hold On remains the internationally recommended response. Aftershocks are near-certain and can be as damaging as the main shock on an already weakened structure.",
    risks: [
      "Falling masonry, glass, light fittings and unsecured furniture",
      "Partial or full structural collapse, especially in unreinforced masonry",
      "Gas leaks and fires ignited by ruptured lines",
      "Aftershocks bringing down already-damaged structures",
      "Tsunami if the epicentre is offshore and you are on a low coastline",
    ],
    symptoms: [
      "Crush injury: numb, cold or pulseless limb after prolonged compression",
      "Head injury: confusion, vomiting, unequal pupils, clear fluid from nose or ears",
      "Fracture: deformity, inability to bear weight, severe localised pain",
      "Dust inhalation: coughing, wheezing, eye irritation",
    ],
    prevention: [
      "Anchor bookcases, water heaters and wall-mounted TVs to studs",
      "Keep heavy items on low shelves and away from beds",
      "Identify safe spots in each room: under a sturdy table, against an interior wall",
      "Keep sturdy shoes and a torch beside the bed",
      "Know how to shut off gas, water and electricity",
    ],
    dos: [
      "Drop to your hands and knees, cover your head and neck, hold on until shaking stops",
      "If in bed, stay there and cover your head with a pillow",
      "If outdoors, move to open ground away from buildings, trees and power lines",
      "If driving, pull over clear of overpasses and stay in the vehicle",
      "After the shaking, check for injuries, then gas smell, then structural damage",
      "Expect aftershocks and repeat Drop, Cover, Hold On for each",
    ],
    donts: [
      "Do not run outside or use stairs during the shaking",
      "Do not stand in a doorway — modern doorways are not stronger than the structure",
      "Do not use lifts",
      "Do not light matches, lighters or switch anything electrical if you smell gas",
      "Do not re-enter a damaged building to retrieve belongings",
    ],
    numbers: [
      { label: "Disaster response", number: "108" },
      ...UNIVERSAL_NUMBERS,
      { label: "Gas emergency", number: "Local gas utility" },
    ],
    assistantPrompt: "There is an earthquake happening right now. What do I do?",
  },
  {
    slug: "medical-emergency",
    code: "04",
    name: "Medical Emergency",
    tagline: "Cardiac arrest, choking, bleeding, seizure and unconsciousness",
    overview:
      "In cardiac arrest, survival falls roughly 10% for every minute without CPR. Bystander action in the first four minutes matters more than anything that happens later in hospital. The priority order never changes: danger, response, airway, breathing, circulation.",
    risks: [
      "Cardiac arrest — irreversible brain injury begins after 4-6 minutes",
      "Airway obstruction from choking, vomit or tongue in an unconscious person",
      "Catastrophic haemorrhage — an arterial bleed can be fatal in 3-5 minutes",
      "Anaphylaxis with airway swelling within minutes of exposure",
      "Stroke — treatment window narrows sharply after 4.5 hours",
    ],
    symptoms: [
      "Cardiac arrest: unresponsive, not breathing normally, occasional gasping",
      "Heart attack: central crushing chest pain, radiating to jaw/arm, sweating, nausea",
      "Stroke (FAST): Face droop, Arm weakness, Speech difficulty, Time to call",
      "Anaphylaxis: hives, swelling of lips/tongue, wheeze, sudden collapse",
      "Hypoglycaemia: sweating, confusion, aggression, tremor in a diabetic",
    ],
    prevention: [
      "Learn CPR and how to use an AED — both take under three hours to learn",
      "Know the location of the nearest public defibrillator",
      "Keep a stocked first aid kit and, if prescribed, an in-date adrenaline auto-injector",
      "Record allergies, conditions and medications where responders can find them",
      "Treat chest pain lasting more than 10 minutes as an emergency, always",
    ],
    dos: [
      "Check for danger first — never become a second casualty",
      "Call for help and ask a specific person to fetch an AED",
      "Start chest compressions: centre of chest, 5-6cm deep, 100-120 per minute",
      "Apply firm direct pressure to serious bleeding, and keep pressing",
      "Place a breathing, unresponsive person in the recovery position",
      "For anaphylaxis, use the auto-injector into the outer thigh immediately",
    ],
    donts: [
      "Do not move a person with a suspected spinal injury unless they are in danger",
      "Do not give food or drink to an unconscious or drowsy person",
      "Do not remove an impaled object — pad around it instead",
      "Do not restrain someone having a seizure or put anything in their mouth",
      "Do not stop CPR to check for a pulse repeatedly — continue until help arrives",
    ],
    numbers: [
      { label: "Ambulance", number: "108" },
      ...UNIVERSAL_NUMBERS,
      { label: "Poison control", number: "Local poison centre" },
    ],
    assistantPrompt: "I found an unconscious person who is not responding. Guide me step by step.",
  },
  {
    slug: "road-accident",
    code: "05",
    name: "Road Accident",
    tagline: "Collision scene safety, extraction decisions and trauma first aid",
    overview:
      "At a collision the biggest killer of bystanders is secondary impact from oncoming traffic. Scene safety comes before patient care, always. Most casualties should be left in the vehicle unless there is fire, submersion or an unmanageable airway.",
    risks: [
      "Being struck by traffic while helping at the roadside",
      "Fuel leak and fire, particularly after a high-speed impact",
      "Undeployed airbags discharging during extraction",
      "Spinal cord damage caused by improper movement of a casualty",
      "Internal bleeding with few visible external signs",
    ],
    symptoms: [
      "Shock: pale clammy skin, rapid weak pulse, rapid breathing, anxiety then drowsiness",
      "Internal bleeding: abdominal rigidity, bruising across the seatbelt line",
      "Spinal injury: neck or back pain, tingling, weakness in limbs",
      "Head injury: loss of consciousness, repeated vomiting, worsening confusion",
    ],
    prevention: [
      "Wear a seatbelt on every journey and fit child seats correctly",
      "Keep a reflective triangle, hi-vis vest and first aid kit in the vehicle",
      "Never use a phone while driving, even hands-free in complex traffic",
      "Adjust speed for weather and visibility, not just the posted limit",
      "Check tyres and brakes monthly",
    ],
    dos: [
      "Park beyond the scene with hazards on and put on a hi-vis vest",
      "Place a warning triangle well back — further on a fast road",
      "Switch off the engines of the involved vehicles if reachable safely",
      "Call emergency services with the exact location, number of vehicles and casualties",
      "Control severe bleeding with direct pressure",
      "Support the head and neck in a neutral position and keep the casualty warm",
    ],
    donts: [
      "Do not remove a helmet from a motorcyclist unless the airway is obstructed",
      "Do not move casualties unless there is fire, water or an airway that cannot be maintained",
      "Do not give the casualty anything to eat or drink",
      "Do not stand between vehicles or in the live traffic lane",
      "Do not assume a walking casualty is uninjured — adrenaline masks serious injury",
    ],
    numbers: [
      { label: "Ambulance", number: "108" },
      { label: "Police", number: "100" },
      ...UNIVERSAL_NUMBERS,
      { label: "Highway assistance", number: "1033" },
    ],
    assistantPrompt: "There has been a road accident in front of me. What should I do first?",
  },
  {
    slug: "heatwave",
    code: "06",
    name: "Heatwave",
    tagline: "Heat exhaustion, heat stroke and extreme temperature exposure",
    overview:
      "Heat stroke is the only heat illness that is immediately life-threatening, and it is defined by a core temperature above 40°C with altered mental state. Cooling in the first thirty minutes determines the outcome. Cool first, transport second.",
    risks: [
      "Heat stroke causing brain, kidney and liver damage",
      "Dehydration and electrolyte imbalance leading to collapse",
      "Sharply increased cardiac and respiratory events in older adults",
      "Rapid deterioration of infants and pets left in vehicles",
      "Power outages disabling fans, cooling and medical equipment",
    ],
    symptoms: [
      "Heat exhaustion: heavy sweating, weakness, nausea, headache, cool clammy skin",
      "Heat stroke: hot skin, confusion or aggression, seizure, sweating may STOP",
      "Heat cramps: painful muscle spasms in legs and abdomen after exertion",
      "Dehydration: dark urine, dry mouth, dizziness on standing",
    ],
    prevention: [
      "Drink water before you feel thirsty; add electrolytes for heavy sweating",
      "Shift outdoor work to before 11am or after 5pm",
      "Wear loose, light-coloured clothing and a wide-brimmed hat",
      "Close curtains during the day and ventilate at night",
      "Check on elderly neighbours, infants and anyone living alone daily",
    ],
    dos: [
      "Move the person to shade or air conditioning immediately",
      "For suspected heat stroke, call emergency services and start cooling at once",
      "Cool aggressively: cold water immersion if available, otherwise wet cloths plus fanning",
      "Apply ice packs to neck, armpits and groin",
      "Give cool water only if the person is fully alert",
    ],
    donts: [
      "Do not wait for an ambulance before starting to cool",
      "Do not give alcohol, caffeine or very sugary drinks",
      "Do not leave any person or animal in a parked vehicle, even briefly",
      "Do not give fluids to a confused or unconscious person",
      "Do not resume exertion the same day after a heat illness",
    ],
    numbers: [
      { label: "Ambulance", number: "108" },
      ...UNIVERSAL_NUMBERS,
      { label: "Heat helpline", number: "Local health authority" },
    ],
    assistantPrompt: "Someone has collapsed in extreme heat and seems confused. What do I do?",
  },
  {
    slug: "storm",
    code: "07",
    name: "Storm",
    tagline: "Cyclones, severe thunderstorms, lightning and high wind",
    overview:
      "Severe storms combine four separate hazards — wind, water, lightning and debris — and the safest position is the same for all of them: interior, low, and away from glass. Cyclone eyes bring a deceptive lull; the second half of the storm arrives from the opposite direction and is often worse.",
    risks: [
      "Wind-borne debris travelling at lethal speed",
      "Lightning strike, including side flash from nearby trees and poles",
      "Storm surge and flash flooding in coastal and low-lying areas",
      "Extended power loss and downed live cables",
      "Falling trees and collapsing hoardings and roofing sheets",
    ],
    symptoms: [
      "Lightning strike: cardiac arrest, burns, confusion, temporary paralysis, ruptured eardrums",
      "Debris injury: deep lacerations and penetrating wounds",
      "Hypothermia after prolonged exposure to wind and rain",
      "Crush injury from collapsed structures",
    ],
    prevention: [
      "Register for official meteorological warnings for your district",
      "Trim overhanging branches and secure loose outdoor items before the season",
      "Keep torches, power banks, drinking water and a battery radio charged and ready",
      "Identify the safest interior room with no external windows",
      "Have a paper list of emergency contacts in case the phone dies",
    ],
    dos: [
      "Shelter indoors in an interior room on the lowest safe floor",
      "Apply the 30/30 rule for lightning: shelter if thunder follows a flash within 30 seconds, and wait 30 minutes after the last thunder",
      "Unplug sensitive electronics",
      "Keep listening to official broadcasts during the lull — the eye is not the end",
      "If caught outside, crouch low on the balls of your feet, away from tall isolated objects",
    ],
    donts: [
      "Do not shelter under trees, near windows or against metal structures",
      "Do not go outside during the eye of a cyclone",
      "Do not touch or drive over downed power lines",
      "Do not use a landline or plugged-in device during heavy lightning",
      "Do not drive through wind-blown debris or standing water",
    ],
    numbers: [
      { label: "Disaster helpline", number: "108" },
      ...UNIVERSAL_NUMBERS,
      { label: "Power outage", number: "Local electricity utility" },
    ],
    assistantPrompt: "A severe storm is hitting my area right now. Where is the safest place to be?",
  },
  {
    slug: "landslide",
    code: "08",
    name: "Landslide",
    tagline: "Slope failure, mudflow and debris flow response",
    overview:
      "Landslides usually announce themselves. Ground cracks, tilting trees, sticking doors, and a sudden change in stream water clarity are the classic precursors, often appearing hours before failure. Once movement starts, the only survivable action is lateral escape — perpendicular to the flow, uphill if possible.",
    risks: [
      "Burial by fast-moving debris and mud, which can travel faster than a person can run",
      "Secondary slides on the same destabilised slope",
      "Blocked rivers forming temporary dams that later burst",
      "Severed roads, water lines and power cutting off entire settlements",
      "Rescue delay due to unstable ground preventing responder access",
    ],
    symptoms: [
      "Crush injury and compartment syndrome after prolonged burial",
      "Asphyxiation from mud or soil inhalation",
      "Fractures and internal injury from debris impact",
      "Hypothermia after exposure in wet, cold conditions",
    ],
    prevention: [
      "Avoid building at the base or top of steep slopes and drainage channels",
      "Never block or divert natural drainage; keep hillside culverts clear",
      "Watch for new cracks in ground, walls, kerbs or driveways after heavy rain",
      "Plant deep-rooted vegetation on vulnerable slopes",
      "Plan an evacuation route that moves laterally out of the slide path",
    ],
    dos: [
      "Evacuate immediately at the first precursor signs — do not wait for confirmation",
      "Move sideways out of the path of the flow, then uphill",
      "Listen for a low rumbling that grows louder — that is debris approaching",
      "If escape is impossible, curl into a tight ball and protect your head",
      "Report blocked roads and new cracks to local authorities",
    ],
    donts: [
      "Do not try to outrun a debris flow downhill",
      "Do not return to the slope to recover property or vehicles",
      "Do not camp or park below steep slopes during heavy rain",
      "Do not dig into an unstable slide face to search — call trained rescue",
      "Do not assume the slope is finished moving after the first slide",
    ],
    numbers: [
      { label: "Disaster response", number: "108" },
      ...UNIVERSAL_NUMBERS,
      { label: "Geological survey / slope advisory", number: "Local authority" },
    ],
    assistantPrompt: "I can see cracks in the hillside above my house after heavy rain. Is this a landslide risk?",
  },
  {
    slug: "building-collapse",
    code: "09",
    name: "Building Collapse",
    tagline: "Entrapment, void survival and structural failure response",
    overview:
      "Collapse survivors most often live in voids — spaces preserved by furniture, stairwells or slab pancaking. Survival depends on conserving air, avoiding dust inhalation, and making intermittent, high-energy noise rather than continuous shouting. Untrained rescue attempts frequently cause secondary collapse.",
    risks: [
      "Secondary collapse triggered by movement, rain or untrained digging",
      "Dust and silica inhalation causing progressive respiratory failure",
      "Crush syndrome — sudden cardiac arrest when a crushed limb is released",
      "Ruptured gas lines and live electrical cables in the rubble",
      "Dehydration, hypothermia and delayed haemorrhage during long entrapment",
    ],
    symptoms: [
      "Crush syndrome: swollen limb, dark urine, irregular heartbeat after release",
      "Dust inhalation: dry cough, chest tightness, worsening breathlessness",
      "Compartment syndrome: severe pain out of proportion, tight shiny skin",
      "Traumatic asphyxia: blue-purple face and neck, bloodshot eyes",
    ],
    prevention: [
      "Report visible cracks, sagging slabs or water ingress in load-bearing elements",
      "Never allow unauthorised structural modification of columns or beams",
      "Evacuate any building showing new cracks after an earthquake or blast",
      "Keep escape routes and stairwells permanently clear",
      "Know where the building's structural core and stairwells are",
    ],
    dos: [
      "If trapped, cover your mouth and nose with cloth to filter dust",
      "Tap on pipes or concrete in bursts of three — sound travels further than a voice",
      "Shout only when you hear rescuers close by, to conserve air and energy",
      "Use a phone torch and keep the phone on power saving for signalling",
      "If outside, report exactly how many people are missing and where they were last seen",
    ],
    donts: [
      "Do not light a flame — gas may be present",
      "Do not move rubble above you or kick at supporting debris",
      "Do not enter a partially collapsed structure to search",
      "Do not release a long-crushed limb without medical support present",
      "Do not shout continuously — it exhausts you and fills your lungs with dust",
    ],
    numbers: [
      { label: "Search & rescue", number: "108" },
      { label: "Fire & rescue", number: "101" },
      ...UNIVERSAL_NUMBERS,
    ],
    assistantPrompt: "A building has partially collapsed and people may be trapped inside. What should I do?",
  },
];

export function getModule(slug: string): EmergencyModule | undefined {
  return EMERGENCY_MODULES.find((m) => m.slug === slug);
}

/** Baseline contacts surfaced on the SOS screen and in the guide. */
export const GLOBAL_EMERGENCY_NUMBERS: EmergencyNumber[] = [
  { label: "Universal emergency (GSM)", number: "112" },
  { label: "Emergency (US / Canada)", number: "911" },
  { label: "Emergency (UK)", number: "999" },
  { label: "Emergency (EU)", number: "112" },
  { label: "Ambulance (India)", number: "108" },
  { label: "Police (India)", number: "100" },
  { label: "Fire (India)", number: "101" },
  { label: "Disaster management (India)", number: "1078" },
];
