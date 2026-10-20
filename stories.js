/*
  STORY ENGINE CONTENT
  To publish another episode: add an episode object to the matching series below,
  set status: "available", and add its panels. Image paths are relative to this folder.
*/
window.ARCHIVE_STORIES = [
  {
    id: "the-shadow-heir", title: "The Shadow Heir", genre: "Dark fantasy", mood: "Cursed bloodline · Hidden kingdom",
    description: "A runaway apprentice discovers that the monster haunting his dreams has been waiting for him to remember his real name.",
    type: "original", coverImage: "assets/images/stories/shadow-heir-cover.png", status: "Ongoing", updated: "Episode 01 · The Bell That Rang Twice", symbol: "☾", coverA: "#111b3b", coverB: "#a92e4b",
    episodes: [
      { number: 1, title: "The Bell That Rang Twice", subtitle: "At midnight, the dead kingdom called its heir home.", status: "available", panels: [
        { narration: "The first bell rang at midnight. Every dog in the village hid beneath a bed.", dialogue: "Nobody spoke of the second bell.", caption: "THE NIGHT OF THE RED MOON" },
        { narration: "Seventeen-year-old Ren had spent his whole life pretending the silver scar on his wrist was nothing. Tonight, it began to glow through his sleeve.", dialogue: "Not now. Please, not now." },
        { narration: "Outside, the rain stopped in midair. Every drop hung like glass. At the end of the lane stood a warrior wearing a mask split down the middle: one side white, one side black." },
        { narration: "The stranger bowed, as if Ren were a king and not a boy who repaired broken lanterns for coins.", dialogue: "“Your Majesty. The throne has been empty for seventeen years.”" },
        { narration: "Ren backed away. “You have the wrong person.” Behind the mask, the stranger's eyes flickered gold.", dialogue: "“Then why did the kingdom wake when you lied?”" },
        { narration: "The second bell rang. Beneath the village square, something enormous answered. The stone road cracked, revealing a staircase descending into a darkness filled with stars." },
        { narration: "A voice rose from below — gentle, familiar, impossible. Ren had heard it every night in his dreams.", dialogue: "“Little heir… you finally came back.”" },
        { narration: "The masked warrior seized Ren's wrist. The silver scar burned bright enough to turn the rain to steam. Far below, a pair of crimson eyes opened.", dialogue: "“Run,” the warrior whispered. “Your father has found you.”", caption: "TO BE CONTINUED…" }
      ]},
      { number: 2, title: "The Staircase Beneath the Village", subtitle: "Coming soon — the first step has already been taken.", status: "coming-soon", panels: [] }
    ]
  },
  {
    id: "the-last-train", title: "The Last Train to Seoul", genre: "Romance", mood: "K-pop AU · Quiet mystery · Found family",
    description: "A night-shift illustrator keeps finding unsigned sketches on the last train. The stranger leaving them knows a secret about her missing brother — and a melody nobody has heard in years.",
    type: "fanfiction", category: "fanfiction", coverImage: "assets/images/stories/last-train-cover.png", status: "Ongoing", updated: "Episode 01 · The Seat by the Window", symbol: "♫", coverA: "#172a46", coverB: "#9c6ba8",
    disclaimer: "An unofficial, fictional K-pop-inspired alternate universe. Kim Min-jae and all other characters in this story are fictional and are not representations of, or affiliated with, BTS or any real artist.",
    episodes: [
      { number: 1, title: "The Seat by the Window", subtitle: "Some strangers arrive before the song does.", status: "available", panels: [
        { narration: "At 12:17 a.m., Seoul looked like a city someone had painted with wet neon. Hana boarded the last train with ink on her fingers and three hours of sleep left in her week." },
        { narration: "The seat by the window was empty — except for a folded paper crane. Inside its wings was a tiny pencil sketch of the station clock, stopped at 12:17." },
        { narration: "“You found it.” A young man in a black cap stood by the doors, mask tucked under his chin, a guitar case resting against one shoulder. His voice was familiar in the way a song from childhood is familiar." },
        { narration: "Hana held up the crane. “Did you draw this?” He glanced at it, then at the empty platform slipping past the glass.", dialogue: "“I drew the first one. I didn't leave this one.”" },
        { narration: "His name was Kim Min-jae. Online, he was known for sold-out shows and never giving interviews. Here, he looked like someone who had been awake for far too long." },
        { narration: "Hana opened her sketchbook. The stranger's drawing matched a page her missing brother had made years ago: the same clock, the same station, the same little star hidden in the corner." },
        { narration: "Min-jae saw the star and went completely still. For the first time, the practiced smile disappeared from his face.", dialogue: "“Where did you get that?”" },
        { narration: "The train lights blinked once. Every window turned black, reflecting only the two of them — and, between their reflections, a third figure standing in the next carriage." },
        { narration: "Min-jae stepped in front of Hana. From his guitar case came a single, impossible note: the opening of a melody that had never been released.", dialogue: "“When the doors open,” he said, “don't follow the person who looks like me.”", caption: "NEXT STOP: A SECRET THAT SHOULD HAVE STAYED BURIED · TO BE CONTINUED…" }
      ]},
      { number: 2, title: "The Passenger in Car Seven", subtitle: "Coming soon — the train has made one stop too many.", status: "coming-soon", panels: [] }
    ]
  },
  {
    id: "moon-petal", title: "The Moon-Petal Well", genre: "Folklore", mood: "Village legends · Wonder",
    description: "Once every hundred years, moon-petals fall into a village well. This time, the water answers back.", type: "original", status: "Coming soon", updated: "In development", symbol: "✿", coverA: "#39465a", coverB: "#a9a3d6", episodes: []
  },
  {
    id: "empty-throne", title: "The Empty Throne", genre: "Mystery", mood: "Royal mystery · Secrets",
    description: "The crown remains at dawn. The king is gone. Only a wet footprint leads toward the locked library.", type: "original", status: "Coming soon", updated: "In development", symbol: "♜", coverA: "#4d374e", coverB: "#b08a72", episodes: []
  }
];
