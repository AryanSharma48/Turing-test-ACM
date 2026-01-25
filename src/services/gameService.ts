import { GameRound, GameImage } from "../../types";
import childrenAI from "../images/childrenAI.jpeg";
import childrenREAL from "../images/childrenREAL.jpeg";
import trainAI from "../images/trainAI.jpeg";
import trainREAL from "../images/trainREAL.jpeg";


// Static Data Source - Replace URLs with your actual image paths later
// type: 'DESIGN' = Real/Human
// type: 'AI' = Artificial
const STATIC_DATA = [
  {
    subject: "Happy Children Playing",
    images: [
      { url: childrenREAL, type: 'DESIGN' },
      { url: childrenAI, type: 'AI' }
    ]
  },
  {
    subject: "Real Train or Not",
    images: [
      { url: trainREAL, type: 'DESIGN' },
      { url: trainAI, type: 'AI' }
    ]
  },
  {
    subject: "Abstract Low Poly Fox",
    images: [
      { url: "https://picsum.photos/seed/poly1/800/800", type: 'DESIGN' },
      { url: "https://picsum.photos/seed/poly2/800/800", type: 'AI' }
    ]
  },
  {
    subject: "Neon Space Station",
    images: [
      { url: "https://picsum.photos/seed/space1/800/800", type: 'DESIGN' },
      { url: "https://picsum.photos/seed/space2/800/800", type: 'AI' }
    ]
  },
  {
    subject: "Hand-Drawn Fantasy Map",
    images: [
      { url: "https://picsum.photos/seed/map1/800/800", type: 'DESIGN' },
      { url: "https://picsum.photos/seed/map2/800/800", type: 'AI' }
    ]
  }
] as const;

export async function generateGameRounds(
  onProgress: (progress: number) => void
): Promise<GameRound[]> {
  const rounds: GameRound[] = [];
  const totalSteps = STATIC_DATA.length;

  // Simulate loading delay for game feel
  for (let i = 0; i < totalSteps; i++) {
    // Fake delay
    await new Promise(resolve => setTimeout(resolve, 400));
    
    const data = STATIC_DATA[i];
    
    const image1: GameImage = {
      id: `round-${i}-img1`,
      url: data.images[0].url,
      type: data.images[0].type as 'DESIGN' | 'AI'
    };

    const image2: GameImage = {
      id: `round-${i}-img2`,
      url: data.images[1].url,
      type: data.images[1].type as 'DESIGN' | 'AI'
    };

    // Randomize order so AI isn't always second
    const isFirst = Math.random() > 0.5;
    
    rounds.push({
      id: i + 1,
      subject: data.subject,
      images: isFirst ? [image1, image2] : [image2, image1],
      userChoiceId: null,
      isCorrect: null
    });

    onProgress(((i + 1) / totalSteps) * 100);
  }

  return rounds;
}