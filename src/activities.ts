export type Band = '5–7' | '8–10' | '11–13';

export interface Activity {
  id: string;
  title: string;
  band: Band;
  kind: 'Draw' | 'Code' | 'Sound' | 'Story' | 'Build';
  minutes: number;
  intro: string;
  steps: [string, string, string];
  tools: string[];
  twists: [string, string, string];
}

export const bands: Band[] = ['5–7', '8–10', '11–13'];

export const activities: Activity[] = [
  { id:'shape-creature', title:'Build a shape creature', band:'5–7', kind:'Draw', minutes:12, intro:'Turn circles, squares, and triangles into a new creature.', steps:['Draw or stamp six large shapes.','Join the shapes without erasing any.','Add a home and name the creature.'], tools:['Tux Paint'], twists:['It can only move sideways.','It sleeps inside a teacup.','Its spots change with the weather.'] },
  { id:'sound-hunt', title:'Record a tiny sound hunt', band:'5–7', kind:'Sound', minutes:10, intro:'Find three safe sounds and arrange them into a short rhythm.', steps:['Pick three sounds in this room.','Record or copy each sound twice.','Play them in a new order for someone.'], tools:['Audacity'], twists:['Leave one quiet beat between sounds.','Start with the softest sound.','Make the last sound surprising.'] },
  { id:'pixel-pet', title:'Draw an 8 by 8 pixel pet', band:'5–7', kind:'Draw', minutes:15, intro:'Make a small pet with only four colors.', steps:['Draw an 8 by 8 square grid.','Fill squares using four colors.','Change three squares to show a feeling.'], tools:['Piskel'], twists:['The pet has square ears.','The pet lives on the Moon.','The pet is hiding one snack.'] },
  { id:'three-panel', title:'Tell a three-box story', band:'5–7', kind:'Story', minutes:15, intro:'Show a beginning, a change, and an ending in three boxes.', steps:['Draw who appears in box one.','Make one thing change in box two.','Show what happens next in box three.'], tools:['Tux Paint','LibreOffice'], twists:['No words are allowed.','A sock solves the problem.','The ending happens at night.'] },
  { id:'dance-arrow', title:'Write a dance with arrows', band:'5–7', kind:'Code', minutes:10, intro:'Use arrow cards to write and test a tiny dance.', steps:['Choose four arrow moves.','Put the moves in an order.','Repeat the order twice and fix one move.'], tools:['Scratch'], twists:['Add one clap command.','Run it backwards.','Let another person change one arrow.'] },
  { id:'paper-town', title:'Map a paper town', band:'5–7', kind:'Build', minutes:20, intro:'Build a map that helps a toy travel between three places.', steps:['Place three paper buildings.','Draw roads between every building.','Test the roads with a toy traveler.'], tools:['Tux Paint'], twists:['One road must curve.','Add a quiet park.','A bridge crosses one road.'] },
  { id:'color-rules', title:'Invent a color rule', band:'5–7', kind:'Draw', minutes:12, intro:'Make a picture where every color follows one rule.', steps:['Choose three colors.','Give each color a simple job.','Draw a scene and follow each rule.'], tools:['Krita'], twists:['Blue can only touch yellow.','Red marks moving things.','Green shapes must be tiny.'] },
  { id:'maze-message', title:'Code a maze message', band:'8–10', kind:'Code', minutes:20, intro:'Guide a character through a maze to reveal a message.', steps:['Draw a maze with five turns.','Add arrow commands for the route.','Ask someone to test your commands.'], tools:['Scratch'], twists:['Add one repeat command.','Include a safe wrong turn.','The route draws a letter.'] },
  { id:'loop-beat', title:'Make a four-part loop', band:'8–10', kind:'Sound', minutes:20, intro:'Layer four short sounds into a loop that changes once.', steps:['Record or choose four short sounds.','Place each sound on a different beat.','Change one beat in the second loop.'], tools:['Audacity'], twists:['Use one sound made with paper.','Remove every fourth beat.','Make the quietest sound lead.'] },
  { id:'impossible-machine', title:'Draw an impossible machine', band:'8–10', kind:'Draw', minutes:18, intro:'Design a machine for a small problem that does not need solving.', steps:['Choose a silly small problem.','Draw five connected machine parts.','Label how energy moves through it.'], tools:['Krita','Inkscape'], twists:['One part is powered by sneezes.','It must fit under a bed.','A bird can operate it.'] },
  { id:'branching-tale', title:'Write a two-choice tale', band:'8–10', kind:'Story', minutes:25, intro:'Write a short story where the reader chooses what happens.', steps:['Write a four-sentence opening.','Offer two clear choices.','Write one ending for each choice.'], tools:['LibreOffice'], twists:['Both endings use the same object.','One choice looks safer but is not.','The reader meets a future version of themself.'] },
  { id:'symmetry-stamp', title:'Design a symmetry stamp', band:'8–10', kind:'Draw', minutes:15, intro:'Make a small tile that changes when it repeats.', steps:['Draw inside one square.','Copy and flip the square.','Repeat both squares to make a strip.'], tools:['Inkscape'], twists:['Use only straight lines.','Hide one small face.','Rotate every third tile.'] },
  { id:'bug-game', title:'Make a catch-the-bug game', band:'8–10', kind:'Code', minutes:30, intro:'Build a game with one moving target and a score.', steps:['Make one sprite move by itself.','Add one point when it is clicked.','Test three speeds and keep one.'], tools:['Scratch'], twists:['The target shrinks each time.','A miss changes the background.','The game ends at seven points.'] },
  { id:'moon-postcard', title:'Send a postcard from a moon', band:'8–10', kind:'Story', minutes:18, intro:'Combine one real space fact with an invented visit.', steps:['Choose a moon and find one fact.','Draw what a visitor sees there.','Write four lines home.'], tools:['Stellarium','Krita'], twists:['The postcard arrives ten years late.','The visitor forgot one useful item.','Describe gravity without naming it.'] },
  { id:'secret-alphabet', title:'Build a secret alphabet', band:'11–13', kind:'Draw', minutes:25, intro:'Design a readable symbol system and test it with a friend.', steps:['Choose six common letters.','Draw one distinct symbol for each.','Write and decode a six-letter word.'], tools:['Inkscape'], twists:['Every symbol uses one circle.','Symbols must work upside down.','Group vowels with one shared mark.'] },
  { id:'one-button', title:'Code a one-button toy', band:'11–13', kind:'Code', minutes:35, intro:'Make one key produce a useful chain of changes.', steps:['Choose one keyboard key.','Connect it to three visible changes.','Ask someone to use it without instructions.'], tools:['Scratch'], twists:['Holding the key changes the result.','The third press resets everything.','Sound gives one useful clue.'] },
  { id:'found-sound', title:'Cut a found-sound minute', band:'11–13', kind:'Sound', minutes:30, intro:'Edit household sounds into a one-minute beginning, middle, and end.', steps:['Record five safe household sounds.','Trim and arrange three sections.','Fade the final sound to silence.'], tools:['Audacity'], twists:['Repeat one sound exactly five times.','Use silence as a section.','Reverse one short sound.'] },
  { id:'data-poster', title:'Draw a one-day data poster', band:'11–13', kind:'Draw', minutes:30, intro:'Turn something you count today into a clear visual pattern.', steps:['Count one harmless event for a day.','Choose one mark for each count.','Arrange the marks so a pattern is visible.'], tools:['Inkscape','LibreOffice'], twists:['Show time without a clock.','Use size instead of color.','Add one sentence about the surprise.'] },
  { id:'paper-controller', title:'Prototype a paper controller', band:'11–13', kind:'Build', minutes:30, intro:'Design controls for an imaginary tool and test their labels.', steps:['Choose what the tool helps someone do.','Cut or draw four different controls.','Ask someone what each control might do.'], tools:['Inkscape'], twists:['One control must slide.','It works with one hand.','Remove the least clear control.'] },
  { id:'remix-rule', title:'Make a remix rule set', band:'11–13', kind:'Code', minutes:35, intro:'Create rules that transform a drawing, tune, or story.', steps:['Choose something you made before.','Write three repeatable change rules.','Apply the rules twice and compare.'], tools:['Scratch','Krita'], twists:['One rule uses a random choice.','The second pass must get quieter.','Swap one rule with a friend.'] }
];

export const toolLinks: Record<string, string> = {
  'Tux Paint':'https://tuxpaint.org/',
  'Audacity':'https://www.audacityteam.org/',
  'Piskel':'https://www.piskelapp.com/',
  'LibreOffice':'https://www.libreoffice.org/',
  'Scratch':'https://scratch.mit.edu/projects/editor/',
  'Krita':'https://krita.org/',
  'Inkscape':'https://inkscape.org/',
  'Stellarium':'https://stellarium.org/'
};
