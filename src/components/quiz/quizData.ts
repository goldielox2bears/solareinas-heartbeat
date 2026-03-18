import marketIcon from "@/assets/quiz/market-icon.png";

export interface QuizOption {
  text: string;
  icon: string;
  imageIcon?: string;
  weights: Record<string, number>;
}

export interface SliderStop {
  label: string;
  emoji: string;
  weights: Record<string, number>;
}

export interface QuizQuestion {
  id: number;
  text: string;
  subtitle?: string;
  type?: "options" | "slider";
  options: QuizOption[];
  sliderStops?: SliderStop[];
}

export interface PersonalityProfile {
  id: string;
  name: string;
  identity: string;
  tagline: string;
  description: string;
  emoji: string;
  color: string;
  animalMatch: string;
  retreatExperience: {
    name: string;
    description: string;
    link: string;
  };
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
      { text: "A slow wander through a local market", icon: "", imageIcon: marketIcon, weights: { culture: 3, social: 1 } },
      { text: "Feeding the animals before anyone else is awake", icon: "🌾", weights: { stewardship: 3, nature: 1 } },
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
      { text: "Animals count, right?", icon: "🐾", weights: { nature: 3, stewardship: 1 } },
    ],
  },
  {
    id: 3,
    text: "Pick a landscape that calls to you",
    subtitle: "Close your eyes and imagine",
    options: [
      { text: "Rugged mountain trails with wildflowers", icon: "🏔️", weights: { adventure: 3, nature: 2 } },
      { text: "A sunlit olive grove with birdsong", icon: "🫒", weights: { calm: 3, culture: 1 } },
      { text: "A working farm where the land feeds the animals", icon: "🌿", weights: { stewardship: 3, nature: 1 } },
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
      { text: "Help cook the meal", icon: "🍳", weights: { stewardship: 2, social: 1, culture: 1 } },
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
      { text: "Knowing my visit makes a real difference", icon: "💪", weights: { stewardship: 3, social: 1 } },
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
      { text: "Falling asleep knowing you helped something today", icon: "🌙", weights: { stewardship: 3, calm: 1 } },
    ],
  },
  {
    id: 7,
    text: "What feels most missing from your life right now?",
    subtitle: "Be honest with yourself",
    options: [
      { text: "Deep rest without guilt", icon: "😮‍💨", weights: { calm: 3, introspective: 1 } },
      { text: "A real sense of discovery", icon: "🔭", weights: { adventure: 3, culture: 1 } },
      { text: "A deeper connection to something real", icon: "🫀", weights: { introspective: 3, nature: 1 } },
      { text: "A sense of purpose and contribution", icon: "🏡", weights: { stewardship: 3, social: 1 } },
    ],
  },
  {
    id: 8,
    text: "Which moment would stay with you the longest?",
    subtitle: "The one you'd tell someone about",
    options: [
      { text: "A quiet moment beside an animal who trusts you", icon: "🐴", weights: { nature: 2, stewardship: 1, calm: 1 } },
      { text: "A long table dinner with local food and conversation", icon: "🍽️", weights: { social: 2, culture: 2 } },
      { text: "Watching the sunrise in total stillness", icon: "🌅", weights: { introspective: 3, calm: 1 } },
      { text: "Helping with something meaningful — and being thanked by the animals", icon: "🤲", weights: { stewardship: 3, nature: 1 } },
    ],
  },
  {
    id: 9,
    text: "How do you usually feel after a holiday?",
    subtitle: "Slide to where you land most often",
    type: "slider",
    sliderStops: [
      { label: "Still tired — just in a prettier location", emoji: "😴", weights: { calm: 3, introspective: 1 } },
      { label: "Entertained but not deeply moved", emoji: "🤷", weights: { adventure: 2, culture: 1 } },
      { label: "Relaxed but unchanged", emoji: "😌", weights: { introspective: 3 } },
      { label: "Genuinely recharged and grateful", emoji: "✨", weights: { nature: 2, calm: 1, social: 1 } },
      { label: "Transformed — it shifted something in me", emoji: "🦋", weights: { stewardship: 2, introspective: 1, nature: 1 } },
    ],
    options: [
      { text: "Still tired — just in a prettier location", icon: "😴", weights: { calm: 3, introspective: 1 } },
      { text: "Entertained but not deeply moved", icon: "🤷", weights: { adventure: 2, culture: 1 } },
      { text: "Relaxed but unchanged", icon: "😌", weights: { introspective: 3 } },
      { text: "Genuinely recharged and grateful", icon: "✨", weights: { nature: 2, calm: 1, social: 1 } },
      { text: "Transformed — it shifted something in me", icon: "🦋", weights: { stewardship: 2, introspective: 1, nature: 1 } },
    ],
  },
  {
    id: 10,
    text: "What kind of luxury matters most to you now?",
    subtitle: "The real kind",
    options: [
      { text: "Silence and space", icon: "🤫", weights: { calm: 3, introspective: 1 } },
      { text: "Experiences that feel real", icon: "✊", weights: { adventure: 3, culture: 1 } },
      { text: "Beauty that feels natural, not staged", icon: "🌸", weights: { nature: 2, introspective: 1 } },
      { text: "Knowing my stay supports something meaningful", icon: "💚", weights: { stewardship: 3, nature: 1 } },
    ],
  },
];

export const personalityProfiles: PersonalityProfile[] = [
  {
    id: "bee",
    name: "The Bee",
    identity: "The Rest-Seeker",
    tagline: "You seek stillness to recharge — then you pollinate the world.",
    description:
      "You crave deep rest, quiet mornings, and the kind of peace that actually heals. You're drawn to sanctuaries — not resorts. When you're restored, you bring sweetness and energy back to everyone around you.",
    emoji: "🐝",
    color: "from-amber-500 to-yellow-600",
    animalMatch: "Miss Loretta",
    retreatExperience: {
      name: "Restorative Sanctuary Stay",
      description: "A gentle immersion into ranch life — morning routines with the animals, olive grove walks, slow meals, and total permission to do nothing. This is rest that actually restores.",
      link: "/",
    },
    traits: ["Restorative", "Nurturing", "Quietly powerful"],
  },
  {
    id: "rabbit",
    name: "The Rabbit",
    identity: "The Explorer",
    tagline: "Curiosity is your compass — you follow it fearlessly.",
    description:
      "You're energised by new terrain, new challenges, and the thrill of what's around the next bend. You don't just want to see a mountain — you want to climb it, learn its name, and understand its geology.",
    emoji: "🐇",
    color: "from-orange-500 to-red-600",
    animalMatch: "Onyx",
    retreatExperience: {
      name: "Explorer Experience",
      description: "The full mountain trek on mule-back through the Sierra Nevada — summit trails, sunrise rituals, and wilderness that rewards the bold. For those who travel to feel alive.",
      link: "/",
    },
    traits: ["Adventurous", "Curious", "Bold"],
  },
  {
    id: "llama",
    name: "The Llama",
    identity: "The Soul Seeker",
    tagline: "You stand tall, stay grounded, and find peace in wide-open spaces.",
    description:
      "You're drawn to land, animals, and the rhythms of nature. You don't need entertainment — you need connection. A horse grazing in a meadow, birdsong at dawn, the smell of earth after rain — that's your luxury.",
    emoji: "🦙",
    color: "from-emerald-600 to-teal-700",
    animalMatch: "Bear",
    retreatExperience: {
      name: "Grounded Nature Retreat",
      description: "Days spent with the sanctuary animals, walking the land, learning the stories of rescue and recovery. Evenings under open sky with the sounds of the herd. Nature as your guide.",
      link: "/",
    },
    traits: ["Grounded", "Nature-led", "Steady"],
  },
  {
    id: "chameleon",
    name: "The Chameleon",
    identity: "The Adaptive Traveler",
    tagline: "You blend in everywhere because you truly see everyone.",
    description:
      "You're a connector — drawn to people, cultures, and causes that matter. You adapt, you listen, and you leave places better than you found them. Travel for you is about purpose as much as pleasure.",
    emoji: "🦎",
    color: "from-violet-600 to-purple-700",
    animalMatch: "Buffy",
    retreatExperience: {
      name: "Adaptive Sanctuary Experience",
      description: "A flexible blend of cultural immersion, community meals, volunteer time with the animals, and meaningful conversations. Your stay directly supports the sanctuary's mission.",
      link: "/",
    },
    traits: ["Empathetic", "Purposeful", "Adaptable"],
  },
  {
    id: "horse",
    name: "The Horse",
    identity: "The Steward",
    tagline: "You feel most alive when your presence truly matters.",
    description:
      "You're a protector at heart — purpose-driven, generous, and deeply loyal. You don't just visit places, you invest in them. You're energised by helping, contributing, and knowing that your time left something better behind. People and animals sense your steadiness and trust you instinctively.",
    emoji: "🐎",
    color: "from-rose-600 to-amber-700",
    animalMatch: "Harry",
    retreatExperience: {
      name: "Stewardship Sanctuary Experience",
      description: "Hands-on time with the rescue animals, land restoration work, community meals, and the deep satisfaction of contributing to something real. Your stay directly sustains the sanctuary.",
      link: "/",
    },
    traits: ["Dependable", "Generous", "Purpose-driven", "Loyal"],
  },
];

// --- Scoring & Result Logic ---

export interface QuizResult {
  primary: PersonalityProfile;
  secondary: PersonalityProfile;
  isBlended: boolean;
}

/**
 * Calculates weighted profile scores from quiz answers
 * and returns the top two profiles with a blended flag.
 */
export function calculateResult(answers: Record<number, number>): QuizResult {
  const scores: Record<string, number> = {
    adventure: 0,
    calm: 0,
    nature: 0,
    culture: 0,
    social: 0,
    introspective: 0,
    stewardship: 0,
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

  return getTopTwoProfiles(scores);
}

/**
 * Maps trait scores to profile scores, sorts descending,
 * and returns primary + secondary with blended flag (diff ≤ 2).
 */
function getTopTwoProfiles(scores: Record<string, number>): QuizResult {
  const profileScores = personalityProfiles.map((profile) => {
    let score = 0;
    switch (profile.id) {
      case "bee":
        score = scores.calm * 2 + scores.introspective * 1.5;
        break;
      case "rabbit":
        score = scores.adventure * 2.5 + scores.culture * 0.5;
        break;
      case "llama":
        score = scores.nature * 2 + scores.introspective * 1 + scores.calm * 0.5;
        break;
      case "chameleon":
        score = scores.social * 2 + scores.culture * 1 + scores.nature * 0.5;
        break;
      case "horse":
        score = scores.stewardship * 2.5 + scores.nature * 0.5 + scores.social * 0.5;
        break;
    }
    return { profile, score };
  });

  profileScores.sort((a, b) => b.score - a.score);

  const primary = profileScores[0];
  const secondary = profileScores[1];
  const isBlended = Math.abs(primary.score - secondary.score) <= 2;

  return {
    primary: primary.profile,
    secondary: secondary.profile,
    isBlended,
  };
}
