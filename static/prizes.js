// ✨ YOUR PRIZE EDITOR ✨
// Add, edit, or remove prize objects in this list.
// rarity: "common", "rare", "epic", or "legendary"
// weight controls how likely this prize is compared with prizes of the SAME rarity.
// Keep a comma between objects. No other files need editing to add a prize.

window.ARCADE_PRIZES = [
  {
    id: "silly-frog",
    name: "Certified Menace",
    emoji: "🐸",
    rarity: "common",
    weight: 10,
    message: "ur literally my favourite idiot. unfortunately for u, i am keeping u."
  },
  {
    id: "tiny-duck",
    name: "Tiny Duck",
    emoji: "🐤",
    rarity: "common",
    weight: 10,
    message: "this duck has reviewed ur behaviour and decided ur kinda cute."
  },
  {
    id: "strawberry",
    name: "Sweet Berry",
    emoji: "🍓",
    rarity: "common",
    weight: 8,
    message: "sweet, a little ridiculous, and somehow always on my mind."
  },
  {
    id: "spider-boy",
    name: "Spider-Boy",
    emoji: "🕷️",
    rarity: "rare",
    weight: 6,
    message: "even spider-man needs someone to remind him he's loved. hi, that's me."
  },
  {
    id: "favourite-person",
    name: "My Favourite Person",
    emoji: "💗",
    rarity: "rare",
    weight: 5,
    message: "if i could pick my favourite person in every universe, i'd still pick you."
  },
  {
    id: "tiny-crown",
    name: "King of Being Annoying",
    emoji: "👑",
    rarity: "epic",
    weight: 4,
    message: "your official royal title is: my favourite pain in the neck."
  },
  {
    id: "golden-envelope",
    name: "A Letter For You",
    emoji: "💌",
    rarity: "legendary",
    weight: 1,
    message: "Saba, you are one of my favourite parts of being alive. Thank you for being you, for making ordinary moments feel special, and for being the person I want to tell all my little thoughts to. I love you more than this tiny arcade could ever fit. ♡"
  }
];

// Overall chance of each rarity. The game normalizes these numbers automatically.
window.ARCADE_RARITY_WEIGHTS = {
  common: 60,
  rare: 25,
  epic: 12,
  legendary: 3
};
