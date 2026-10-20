/*
  STORY CONTENT FILE
  Add new series and episodes here. Keep IDs lowercase and URL-friendly.
  For illustrated panels, set image to a file path such as:
  image: "assets/images/stories/red-moon/ep02-panel01.webp"
  If image is blank, the site shows a styled text panel as a placeholder.
*/
window.ARCHIVE_STORIES = [
  {
    id: "red-moon", title: "The Red Moon", genre: "Dark fantasy", mood: "Ancient magic · Mystery",
    description: "A traveller wakes beneath a red moon with a silver mark on their palm — and a forest that knows their name.",
    status: "Ongoing", updated: "Episode 01 available", symbol: "☾", coverA: "#64263b", coverB: "#c34c61",
    episodes: [
      { number: 1, title: "The Forest Called Back", subtitle: "The night the forest remembered", status: "available", panels: [
        { narration: "The moon was red the night the traveller woke.", dialogue: "", image: "" },
        { narration: "There was mud on their hands. A silver mark on their palm. And a voice somewhere beyond the trees.", dialogue: "", image: "" },
        { narration: "The trees leaned closer, though there was no wind.", dialogue: "“You took your time,” the forest whispered.", image: "" },
        { narration: "Somewhere in the dark, something ancient opened its eyes.", dialogue: "", image: "" }
      ]},
      { number: 2, title: "A Footstep in the Mist", subtitle: "The next chapter is being prepared", status: "coming-soon", panels: [] }
    ]
  },
  {
    id: "moon-petal", title: "The Moon-Petal Well", genre: "Folklore", mood: "Folklore · Wonder",
    description: "Once every hundred years, moon-petals fall into a village well. This time, the water answers back.",
    status: "Coming soon", updated: "In development", symbol: "✿", coverA: "#39465a", coverB: "#a9a3d6", episodes: []
  },
  {
    id: "empty-throne", title: "The Empty Throne", genre: "Mystery", mood: "Royal mystery · Secrets",
    description: "The crown remains at dawn. The king is gone. Only a wet footprint leads toward the locked library.",
    status: "Coming soon", updated: "In development", symbol: "♜", coverA: "#4d374e", coverB: "#b08a72", episodes: []
  },
  {
    id: "last-train", title: "The Last Train", genre: "Romance", mood: "Quiet drama · Fate",
    description: "The last train is almost empty. Almost. A familiar stranger has saved the seat beside the window.",
    status: "Coming soon", updated: "In development", symbol: "月", coverA: "#344858", coverB: "#b28ca5", episodes: []
  }
];
