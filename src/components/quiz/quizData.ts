import { Mountain, Sun, Users, Compass, TreePine, Coffee, Tent, Heart, Music, Camera, Footprints, Wind } from "lucide-react";

export interface QuizOption {
  text: string;
  icon: string; // emoji for simplicity
  weights: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  subtitle?: string;
  options: QuizOption[];
}

export interface PersonalityProfile {
  id: string;
  name: string;
  tagline: string;
  description: string;
  emoji: string;
  color: string; // tailwind class
  animalMatch: string; // name to match from Supabase animals table
  retreatRecommendation: string;
  traits: string[];
}

export const questions: QuizQuestion[] = [
  {
    id: 1,
    text: "Your ideal morning starts with…",
    subtitle: "Pick what feels right",
    options: [
      { text: "Coffee on a quiet porch, watching mist rise", icon: "☕", weights: { calm: 3, nature: 1 } },
      { text: "Lacing up boots for a sunrise hike", icon: "🥾", weights: { adventure: 3, nature: 1 } },
      { text: "A slow wander through a local market", icon: "🛒", weights: { culture: 3, social: 1 } },
      { text: "Journaling under a tree, no agenda", icon: "📓", weights: { calm: 2, introspective: 2 } },
    ],
  },
  {
    id: 2,
    text: "You're happiest traveling with…",
    subtitle: "Be honest",
    options: [
      { text: "A small group of like-minded souls", icon: "👥", weights: { social: 3, adventure: 1 } },
      { text: "One trusted companion", icon: "🤝", weights: { calm: 1, social: 1, introspective: 1 } },
      { text: "Just myself and my thoughts", icon: "🧘", weights: { introspective: 3, calm: 1 } },
      { text: "Animals count, right?", icon: "🐾", weights: { nature: 3, calm: 1 } },
    ],
  },
  {
    id: 3,
    text: "Pick a landscape that calls to you",
    subtitle: "Close your eyes and imagine",
    options: [
      { text: "Rugged mountain trails with wildflowers", icon: "🏔️", weights: { adventure: 3, nature: 2 } },
      { text: "A sunlit olive grove with birdsong", icon: "🫒", weights: { calm: 3, culture: 1 } },
      { text: "A hidden beach with turquoise water", icon: "🏖️", weights: { calm: 2, adventure: 1 } },
      { text: "Rolling hills with grazing horses", icon: "🐴", weights: { nature: 3, calm: 1 } },
    ],
  },
  {
    id: 4,
    text: "At a dinner table with strangers, you…",
    subtitle: "No wrong answer",
    options: [
      { text: "Ask everyone about their story", icon: "💬", weights: { social: 3, culture: 1 } },
      { text: "Listen quietly and observe", icon: "👀", weights: { introspective: 3, calm: 1 } },
      { text: "Help cook the meal", icon: "🍳", weights: { social: 1, nature: 1, culture: 2 } },
      { text: "Step outside to look at the stars", icon: "✨", weights: { introspective: 2, nature: 2 } },
    ],
  },
  {
    id: 5,
    text: "What draws you to a new place?",
    subtitle: "First instinct",
    options: [
      { text: "History and traditions to discover", icon: "🏛️", weights: { culture: 3, introspective: 1 } },
      { text: "Physical challenges and new terrain", icon: "⛰️", weights: { adventure: 3 } },
      { text: "A chance to slow down and reset", icon: "🌿", weights: { calm: 3, nature: 1 } },
      { text: "Meeting people who live differently", icon: "🌍", weights: { social: 2, culture: 2 } },
    ],
  },
  {
    id: 6,
    text: "Your perfect evening ends with…",
    subtitle: "The one that makes you exhale",
    options: [
      { text: "A campfire under the Milky Way", icon: "🔥", weights: { nature: 2, adventure: 1, calm: 1 } },
      { text: "Local wine and long conversations", icon: "🍷", weights: { social: 2, culture: 2 } },
      { text: "Reading by lantern light in a painted tent", icon: "🕯️", weights: { calm: 2, introspective: 2 } },
      { text: "Falling asleep to the sounds of animals", icon: "🌙", weights: { nature: 3, calm: 1 } },
    ],
  },
];

export const personalityProfiles: PersonalityProfile[] = [
  {
    id: "trail-whisperer",
    name: "The Trail Whisperer",
    tagline: "You don't follow paths — you feel them.",
    description:
      "You're drawn to wild places and quiet rhythms. You'd rather listen to a stream than a playlist, and you find peace where others find challenge. The mountains talk to you — and you talk back.",
    emoji: "🌿",
    color: "from-emerald-600 to-teal-700",
    animalMatch: "Bear",
    retreatRecommendation:
      "The 3-day mountain ride is made for you — mule trails through the Sierra Nevada, sleeping under painted canvas, guided by generations of local knowledge.",
    traits: ["Nature-led", "Quietly brave", "Grounded"],
  },
  {
    id: "rooted-nomad",
    name: "The Rooted Nomad",
    tagline: "You travel far, but always carry home with you.",
    description:
      "You're fascinated by how people live — their food, their land, their stories. You don't just visit a place, you absorb it. Slow travel isn't a trend for you — it's the only way.",
    emoji: "🧭",
    color: "from-amber-600 to-orange-700",
    animalMatch: "Buffy",
    retreatRecommendation:
      "Join the pizza dinner welcome night and cultural immersion days — taste the olive oil, hear the family stories, walk the land that feeds the ranch.",
    traits: ["Culturally curious", "Adaptable", "Soulful"],
  },
  {
    id: "gentle-explorer",
    name: "The Gentle Explorer",
    tagline: "Your courage is quiet, but it runs deep.",
    description:
      "You seek connection — with animals, with land, with yourself. You don't need adrenaline to feel alive. A sunrise, a nuzzle from a horse, a conversation that changes your perspective — that's your adventure.",
    emoji: "🦋",
    color: "from-sky-500 to-indigo-600",
    animalMatch: "Miss Loretta",
    retreatRecommendation:
      "Arrive a day early and spend time with the sanctuary animals — meet the residents, learn their stories, and feel the heartbeat of the ranch.",
    traits: ["Empathetic", "Thoughtful", "Open-hearted"],
  },
  {
    id: "summit-seeker",
    name: "The Summit Seeker",
    tagline: "The view from the top is just the beginning.",
    description:
      "You live for the next ridge, the next challenge, the next breathtaking vista. Comfort zones are for other people. You come alive when the terrain gets rough and the air gets thin.",
    emoji: "🦅",
    color: "from-rose-600 to-red-700",
    animalMatch: "Onyx",
    retreatRecommendation:
      "The mountain ascent on mule-back to the rocky summit — test your limits with the Sierra Nevada under your feet and eagles overhead.",
    traits: ["Bold", "Resilient", "Free-spirited"],
  },
  {
    id: "starlight-dreamer",
    name: "The Starlight Dreamer",
    tagline: "You find magic where others see the ordinary.",
    description:
      "You travel to feel — sunsets, silence, stories whispered by old walls. You're the one who stays up late watching the stars and wakes up knowing something has shifted inside you.",
    emoji: "🌙",
    color: "from-violet-600 to-purple-700",
    animalMatch: "Ebony",
    retreatRecommendation:
      "The painted tent experience under the stars — fall asleep to mountain silence and wake to the sound of horses grazing in the pines.",
    traits: ["Introspective", "Imaginative", "Present"],
  },
];

export function calculateResult(answers: Record<number, number>): PersonalityProfile {
  const scores: Record<string, number> = {
    adventure: 0,
    calm: 0,
    nature: 0,
    culture: 0,
    social: 0,
    introspective: 0,
  };

  // Tally weights from all answers
  Object.entries(answers).forEach(([questionId, optionIndex]) => {
    const question = questions.find((q) => q.id === Number(questionId));
    if (!question) return;
    const option = question.options[optionIndex];
    if (!option) return;
    Object.entries(option.weights).forEach(([trait, weight]) => {
      scores[trait] = (scores[trait] || 0) + weight;
    });
  });

  // Map profiles to dominant trait combinations
  const profileScores = personalityProfiles.map((profile) => {
    let score = 0;
    switch (profile.id) {
      case "trail-whisperer":
        score = scores.nature * 2 + scores.calm;
        break;
      case "rooted-nomad":
        score = scores.culture * 2 + scores.social;
        break;
      case "gentle-explorer":
        score = scores.calm * 1.5 + scores.introspective + scores.nature * 0.5;
        break;
      case "summit-seeker":
        score = scores.adventure * 2.5;
        break;
      case "starlight-dreamer":
        score = scores.introspective * 2 + scores.calm * 0.5;
        break;
    }
    return { profile, score };
  });

  profileScores.sort((a, b) => b.score - a.score);
  return profileScores[0].profile;
}
