import fs from 'fs';
import path from 'path';

const rawData = `
* **Finale SHERLOCKED** - COMPUTER CENTRE, SMCC 4TH FLOOR - 10:00 AM to 12:00 PM - 11TH APRIL
* **Finale PASS THE BATON** - COMPUTER CENTRE, SMCC 4TH FLOOR - 12:30 PM to 2:30 PM - 11TH APRIL
* **Finale SYSTEM VANGUARD** - COMPUTER CENTRE, SMCC 4TH FLOOR - 3:00 PM to 5:00 PM - 11TH APRIL
* **Finale UNCODE** - COMPUTER CENTRE, SMCC 4TH FLOOR - 10:00 AM to 12:00 PM - 12TH APRIL
* **Finale H42** - COMPUTER CENTRE, SMCC 4TH FLOOR - 1:00 PM to 4:00 PM - 12TH APRIL
* **GAMING** - 2nd year CLASSROOM, SMCC 3RD FLOOR - 10:00 AM to 5:00 PM - 10TH, 11TH, and 12TH APRIL
* **Prelims CYPHER 3331** - Smart CLASSROOM, SMCC 3RD FLOOR - 12:00 PM to 5:00 PM - 10TH APRIL
* **Prelims ESCAPE ROOM** - Smart CLASSROOM, SMCC 3RD FLOOR - 10:00 AM to 5:00 PM - 11TH APRIL
* **Finale EPOCHALYPSE** - Smart CLASSROOM, SMCC 3RD FLOOR - 10:00 AM to 12:00 PM - 12TH APRIL
* **Prelims CYPHER 3331** - 1ST YR CLASSROOM, SMCC 3RD FLOOR - 12:00 PM to 5:00 PM - 10TH APRIL
* **Finale OPENAIMER** - 1ST YR CLASSROOM, SMCC 3RD FLOOR - 10:00 AM to 2:00 PM - 11TH APRIL
* **Prelims Escape Room** - 1ST YR CLASSROOM, SMCC 3RD FLOOR - 2:00 PM to 5:00 PM - 11TH APRIL
* **Finale SNAP SYNTAX** - 1ST YR CLASSROOM, SMCC 3RD FLOOR - 10:00 AM to 2:00 PM - 12TH APRIL
* **GAMING** - FINAL YEAR CLASSROOM, SMCC 2ND FLOOR - 10:00 AM to 5:00 PM - 10TH, 11TH, and 12TH APRIL
* **GAMING** - Exam hall/3rd yr class, SMCC 2ND FLOOR - 10:00 AM to 5:00 PM - 10TH, 11TH, and 12TH APRIL
* **Prelims CYPHER 3331** - Seminar Hall 2, SMCC 1ST FLOOR - 12:00 PM to 5:00 PM - 10TH APRIL
* **Prelims Escape Room** - Seminar Hall 2, SMCC 1ST FLOOR - 10:00 AM to 5:00 PM - 11TH APRIL
* **Finale SNAP SYNTAX** - Seminar Hall 2, SMCC 1ST FLOOR - 10:00 AM to 2:00 PM - 12TH APRIL
* **Finale CYPHER 3331** - Seminar Hall 2, SMCC 1ST FLOOR - 2:00 PM to 5:00 PM - 12TH APRIL
* **Finale IOT BIDWARS** - 3rd year classroom, IEE 4th floor - 10:00 AM to 4:00 PM - 10TH APRIL
* **Finale BRIDGE THE GAP** - 3RD YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 10:00 AM to 5:00 PM - 10TH APRIL
* **Finale DATA DRIFT** - 3RD YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 10:00 AM to 5:00 PM - 11TH APRIL
* **Finale Math-E-Magician** - 3RD YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 10:00 AM to 4:00 PM - 12TH APRIL
* **Prelims JUST DEFY** - 2ND YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 10:00 AM to 2:00 PM - 10TH APRIL
* **Finale JUST DEFY** - 2ND YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 10:00 AM to 1:00 PM - 12TH APRIL
* **Finale ESCAPE ROOM** - 2ND YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 2:00 PM to 5:00 PM - 12TH APRIL
* **Prelims JUST DEFY** - 1ST YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 10:00 AM to 2:00 PM - 10TH APRIL
* **Finale ESCAPE ROOM** - 1ST YEAR CLASSROOM, CONSTRUCTION 2ND FLOOR - 2:00 PM to 5:00 PM - 12TH APRIL
* **Finale BRIDGE THE GAP** - SEMINAR HALL, CONSTRUCTION 1ST FLOOR - 10:00 AM to 5:00 PM - 10TH APRIL
* **Finale CASE-O-MANIA** - SEMINAR HALL, CONSTRUCTION 1ST FLOOR - 10:00 AM to 5:00 PM - 11TH APRIL
* **Finale Pack-o-vation** - 1ST & 2ND YEAR CLASSROOMS, PRINTING 2ND FLOOR - 10:00 AM to 4:00 PM - 10TH APRIL
* **Prelims Industrix** - 3RD & 4TH YEAR CLASSROOMS, POWER 4TH FLOOR - 10:00 AM to 4:00 PM - 10TH APRIL
* **Finale STRATEDGEX** - 3RD & 4TH YEAR CLASSROOMS, POWER 4TH FLOOR - 11:00 AM to 3:00 PM - 11TH APRIL
* **Finale Industrix** - 3RD & 4TH YEAR CLASSROOMS, POWER 4TH FLOOR - 2:00 PM to 4:00 PM - 12TH APRIL
* **Prelims Math-E-Magician** - SEMINAR HALL & 2ND YEAR CLASSROOM, POWER 2ND FLOOR - 10:00 AM to 2:00 PM - 10TH APRIL
* **Finale ACE THE CASE** - SEMINAR HALL, POWER 2ND FLOOR - 2:00 PM to 5:00 PM - 10TH APRIL
* **Prelims THUNDERVOLTS VOLTEDGED** - SEMINAR HALL, POWER 2ND FLOOR - 10:00 AM to 2:00 PM - 11TH APRIL
* **Finale THUNDERVOLTS VOLTEDGED** - SEMINAR HALL, POWER 2ND FLOOR - 2:00 PM to 4:00 PM - 11TH APRIL
* **Finale BIZNEZ PLAN** - SEMINAR HALL, POWER 2ND FLOOR - 11:00 AM to 3:00 PM - 12TH APRIL
* **Finale CAPITAL CLASH** - 2ND YEAR CLASSROOM, POWER 2ND FLOOR - 12:00 PM to 3:00 PM - 12TH APRIL
* **Prelims COLD CASE** - AMENITY CENTRE, BIG HALL, 1ST FLOOR - 11:00 AM to 5:00 PM - 10TH APRIL
* **Finale XSTREAM** - AMENITY CENTRE, BIG HALL & 2 SMALL ROOMS, 1ST FLOOR - 10:00 AM to 2:00 PM - 11TH APRIL
* **Finale TRAFFIQ** - AMENITY CENTRE, 1 SMALL ROOM, 1ST FLOOR - 10:00 AM to 2:00 PM - 11TH APRIL
* **Finale COLD CASE** - AMENITY CENTRE, 1 SMALL ROOM, 1ST FLOOR - 10:00 AM to 12:00 PM - 12TH APRIL
* **Prelims ROBOSOCCER** - QUAD AREA - 10:00 AM to 5:00 PM - 10TH APRIL
* **Finale ROBOSOCCER & Prelims HIGHWAY TO HELL** - QUAD AREA - 10:00 AM to 5:00 PM - 11TH APRIL
* **Finale HIGHWAY TO HELL** - QUAD AREA - 10:00 AM to 5:00 PM - 12TH APRIL
* **Prelims LORD OF THE RINGS** - COMMON ROOM - 10:00 AM to 5:00 PM - 10TH APRIL
* **Finale LORD OF THE RINGS** - COMMON ROOM - 10:00 AM to 5:00 PM - 11TH APRIL
* **Prelims HOMECOMING** - COMMON ROOM - 10:00 AM to 2:00 PM - 12TH APRIL
* **Finale HOMECOMING** - COMMON ROOM - 2:00 PM to 5:00 PM - 12TH APRIL
* **Quizotopia** - STAGE - 12:00 PM to 3:00 PM - 11TH APRIL
* **Finale DANK JUNK** - STAGE - 3:00 PM to 4:00 PM - 11TH APRIL
* **Finale JALASTRA & SKYSPRINT** - CAB GROUND - 10:00 AM to 5:00 PM - 10TH & 11TH APRIL
* **Prelims DEATH RACE** - POWER PARKING LOT - 10:00 AM to 5:00 PM - 10TH & 11TH APRIL
* **Finale DEATH RACE** - POWER PARKING LOT - 10:00 AM to 5:00 PM - 12TH APRIL
`;

function toTitleCase(str) {
  return str.toLowerCase().split(' ').map(function(word) {
    if (word.match(/^(and|to|the|of|in|on|at|for|a|an)$/)) return word;
    if (word.toUpperCase() === 'SMCC' || word.toUpperCase() === 'IOT') return word.toUpperCase();
    return (word.charAt(0).toUpperCase() + word.slice(1));
  }).join(' ');
}

// Convert input text into structured schedule objects
const lines = rawData.trim().split('\\n');
const parsedEvents = [];

for (const line of lines) {
  const match = line.match(/\\* \\*\\*(.*?)\\*\\* - (.*?) - (.*?) - (.*)/);
  if (match) {
    let [_, titleBlock, venue, time, date] = match;
    
    // Handle split titles inside titleBlock (e.g. "Finale ROBOSOCCER & Prelims HIGHWAY TO HELL")
    const splits = titleBlock.split(' & ');
    for (const split of splits) {
      let round = 'General';
      let eventName = split.trim();
      
      const lower = eventName.toLowerCase();
      if (lower.startsWith('prelims ')) {
        round = 'Prelims';
        eventName = eventName.substring(8);
      } else if (lower.startsWith('finale ')) {
        round = 'Finals';
        eventName = eventName.substring(7);
      }
      
      // Clean dates
      let cleanDate = toTitleCase(date.replace('10TH, 11TH, and 12TH APRIL', '10th, 11th, & 12th April').replace('10TH & 11TH APRIL', '10th & 11th April').trim());
      
      parsedEvents.push({
        eventName: eventName.trim().toLowerCase(),
        round,
        venue: toTitleCase(venue.trim()),
        time: time.trim().toLowerCase().replace(' to ', '-'),
        date: cleanDate
      });
    }
  }
}

// Group into final mapping
const eventMap = {};
for (const p of parsedEvents) {
  if (!eventMap[p.eventName]) {
    eventMap[p.eventName] = {};
  }
  
  const key = `${p.round}_${p.date}`;
  if (!eventMap[p.eventName][key]) {
    eventMap[p.eventName][key] = {
      title: p.round !== 'General' ? p.round : undefined,
      date: p.date,
      timeSlotsMap: {}
    };
  }
  
  if (!eventMap[p.eventName][key].timeSlotsMap[p.time]) {
     eventMap[p.eventName][key].timeSlotsMap[p.time] = new Set();
  }
  eventMap[p.eventName][key].timeSlotsMap[p.time].add(p.venue);
}

// Convert to final array structure mapping
const finalSchedules = {};
for (const [eventName, keys] of Object.entries(eventMap)) {
  finalSchedules[eventName] = [];
  for (const [key, obj] of Object.entries(keys)) {
    const timeSlots = [];
    for (const [time, venues] of Object.entries(obj.timeSlotsMap)) {
      timeSlots.push({ time, venues: Array.from(venues) });
    }
    finalSchedules[eventName].push({
      title: obj.title,
      date: obj.date,
      timeSlots
    });
  }
}

// Update the TS file
let fileContent = fs.readFileSync('c:/Users/sagni/Srijan26/data/eventsList.ts', 'utf8');

// Title mapping for fuzzy matcher
const nameMap = {
  'sherlocked': 'sherlocked',
  'pass the baton': 'ptb',
  'system vanguard': 'sv1',
  'uncode': 'uncode',
  'h42': 'h42',
  'gaming': 'none', // Skip gaming as there's no gaming title directly
  'cypher 3331': 'cypher3331',
  'escape room': 'er',
  'epochalypse': 'epoch',
  'openaimer': 'openaimer',
  'snap syntax': 'ss3',
  'iot bidwars': 'iotbw',
  'bridge the gap': 'btg26',
  'data drift': 'datadrift26',
  'math-e-magician': 'mathemagician',
  'just defy': 'justdefy',
  'case-o-mania': 'case-o-mania',
  'pack-o-vation': 'pkv',
  'industrix': 'indx',
  'stratedgex': 'stratedgex',
  'ace the case': 'ace-the-case',
  'thundervolts voltedged': 'thunderbolts',
  'biznez plan': 'biznez-plan',
  'capital clash': 'capital-clash',
  'cold case': 'cc',
  'xstream': 'xstream',
  'traffiq': 'traffiq',
  'robosoccer': 'rbs',
  'highway to hell': 'h2h',
  'lord of the rings': 'lord-of-the-ring',
  'homecoming': 'hcg',
  'quizotopia': 'qtp',
  'dank junk': 'djk',
  'jalastra': 'jal',
  'skysprint': 'skysprint',
  'death race': 'death-race'
};

let matchCount = 0;

for (const [eventName, scheduleArray] of Object.entries(finalSchedules)) {
  const matchSlug = nameMap[eventName];
  if (!matchSlug || matchSlug === 'none') continue;

  const scheduleJSON = JSON.stringify(scheduleArray, null, 4)
    .replace(/"([^"]+)":/g, '$1:')
    .split('\\n').map(l => '    ' + l).join('\\n').trim();

  // find the object in fileContent matching slug
  // regex to match: slug: "matchSlug", and then all lines inside its block until the end
  const regexStr = `(slug:\\s*["']${matchSlug}["'][\\s\\S]*?)(status:\\s*["'][A-Za-z]+["']|,\\s*coordinators:)`;
  const regex = new RegExp(regexStr, 'g');
  
  fileContent = fileContent.replace(regex, (match, prefix, suffix) => {
    matchCount++;
    // Clean old schedule dates
    let cleanPrefix = prefix
      .replace(/\\s*prelimsDate:\\s*["'].*?["'],/g, '')
      .replace(/\\s*finalsDate:\\s*["'].*?["'],/g, '')
      .replace(/\\s*schedule:\\s*\\[[\\s\\S]*?\\],/g, '');
    
    // Add new schedule
    cleanPrefix = cleanPrefix.trimEnd() + '\\n    schedule: ' + scheduleJSON + ',\\n    ';
    return cleanPrefix + suffix;
  });
}

fs.writeFileSync('c:/Users/sagni/Srijan26/data/eventsList.ts', fileContent);
console.log('Successfully updated ' + matchCount + ' event components!');
