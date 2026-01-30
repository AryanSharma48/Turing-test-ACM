import { GameRound, GameImage } from "../../types";
import childrenAI from "../images/childrenAI.jpeg";
import childrenREAL from "../images/childrenREAL.jpeg";
import trainAI from "../images/trainAI.jpeg";
import trainREAL from "../images/trainREAL.jpeg";
import dogFAKE from "../images/dogFAKE.jpeg";
import dogREAL from "../images/dogREAL.jpeg";
import snowREAL from "../images/snowREAL.jpeg";
import snowAI from "../images/snowAI.jpeg";
import parachuteAI from "../images/parachuteAI.jpeg";
import parachuteREAL from "../images/parachuteREAL.jpeg";
import droneREAL from "../images/droneREAL.jpeg";
import droneAI from "../images/droneAI.jpeg";

import beachAI from "../images/beachAI.jpg";
import beachREAL from "../images/beachREAL.jpg";
import cat1AI from "../images/cat1AI.jpg";
import cat1REAL from "../images/cat1REAL.jpg";
import catAI from "../images/catAI.jpg";
import catREAL from "../images/catREAL.jpg";
import clubAI from "../images/clubAI.png";
import clubREAL from "../images/clubREAL.jpg";
import drinkAI from "../images/drinkAI.png";
import drinkREAL from "../images/drinkREAL.jpg";
import ferrisAI from "../images/ferrisAI.png";
import ferrisREAL from "../images/ferrisREAL.jpg";
import handAI from "../images/handAI.jpg";
import handREAL from "../images/handREAL.jpg";
import nycAI from "../images/nycAI.png";
import nycREAL from "../images/nycREAL.jpg";
import posterAI from "../images/posterAI.jpg";
import posterREAL from "../images/posterREAL.jpg";
import runnerAI from "../images/runnerAI.png";
import runnerREAL from "../images/runnerREAL.jpg";
import tigerAI from "../images/tigerAI.png";
import tigerREAL from "../images/tigerREAL.jpg";



import cherryAI from "../images/cherryAI.jpeg?url";
import cherryREAL from "../images/cherryREAL.jpeg?url";
import dirtbikeAI from "../images/dirtbikeAI.jpeg?url";
import dirtbikeREAL from "../images/dirtbikeREAL.jpeg?url";
import iceballAI from "../images/iceballAI.jpeg?url";
import iceballREAL from "../images/iceballREAL.jpeg?url";
import muffinAI from "../images/muffinAI.jpeg?url";
import muffinREAL from "../images/muffinREAL.jpeg?url";
import smilingREAL from "../images/smilingREAL.jpeg?url";
import smilingAI from "../images/smilingAI.jpeg?url";
import storefrontAI from "../images/storefrontAI.jpeg?url";
import storefrontREAL from "../images/storefrontREAL.jpeg?url";
import urbanAI from "../images/urbanAI.jpeg?url";
import urbanREAL from "../images/urbanREAL.jpeg?url";


import blueberriesAI from "../images/blueberriesAI.png";
import blueberriesREAL from "../images/blueberriesREAL.png";
import bullAI from "../images/bullAI.png";
import bullREAL from "../images/bullREAL.png";
import cakeAI from "../images/cakeAI.png";
import cakeREAL from "../images/cakeREAL.png";
import classAI from "../images/classAI.png";
import cutcakeREAL from "../images/cutcakeREAL.png";
import eyeAI from "../images/eyeAI.png";
import eyeREAL from "../images/eyeREAL.png";
import kittyAI from "../images/kittyAI.png";
import kittyREAL from "../images/kittyREAL.png";
import leavesREAL from "../images/leavesREAL.png";
import leavesAI from "../images/leavesAI.png";
import ramenREAL from "../images/ramenREAL.png";
import ramenAI from "../images/ramenAI.png";
import shedREAL from "../images/shedREAL.png";
import shedAI from "../images/shedAI.png";
import trailAI from "../images/trailAI.png";
import trailREAL from "../images/trailREAL.png";
import turtleAI from "../images/turtleAI.png";
import turtleREAL from "../images/turtleREAL.png";

const STATIC_DATA = [
  {
    subject: "Children playing",
    images: [
      { url: childrenREAL, type: 'AI' },
      { url: childrenAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Train station",
    images: [
      { url: trainREAL, type: 'AI' },
      { url: trainAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Drone view",
    images: [
      { url: droneREAL, type: 'AI' },
      { url: droneAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Dog portrait",
    images: [
      { url: dogREAL, type: 'AI' },
      { url: dogFAKE, type: 'DESIGN' }
    ]
  },
  {
    subject: "Parachute descent",
    images: [
      { url: parachuteREAL, type: 'AI' },
      { url: parachuteAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Snowy landscape",
    images: [
      { url: snowREAL, type: 'AI' },
      { url: snowAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Cherry river",
    images: [
      { url: cherryREAL, type: 'AI' },
      { url: cherryAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Dirt Bike",
    images: [
      { url: dirtbikeREAL, type: 'AI' },
      { url: dirtbikeAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "iceball",
    images: [
      { url: iceballREAL, type: 'AI' },
      { url: iceballAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "muffin",
    images: [
      { url: muffinREAL, type: 'AI' },
      { url: muffinAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "smiling",
    images: [
      { url: smilingREAL, type: 'AI' },
      { url: smilingAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Store Front",
    images: [
      { url: storefrontREAL, type: 'AI' },
      { url: storefrontAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "urban tower",
    images: [
      { url: urbanREAL, type: 'AI' },
      { url: urbanAI, type: 'DESIGN' }
    ]
  },
  {
    subject: "Beach",
    images: [
      { url: beachAI, type: 'AI' },
      { url: beachREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Cat (set 1)",
    images: [
      { url: cat1AI, type: 'AI' },
      { url: cat1REAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Cat (set 2)",
    images: [
      { url: catAI, type: 'AI' },
      { url: catREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Club scene",
    images: [
      { url: clubAI, type: 'AI' },
      { url: clubREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Drink",
    images: [
      { url: drinkAI, type: 'AI' },
      { url: drinkREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Ferris wheel",
    images: [
      { url: ferrisAI, type: 'AI' },
      { url: ferrisREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Hand",
    images: [
      { url: handAI, type: 'AI' },
      { url: handREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "New York City",
    images: [
      { url: nycAI, type: 'AI' },
      { url: nycREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Poster design",
    images: [
      { url: posterAI, type: 'AI' },
      { url: posterREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Runner",
    images: [
      { url: runnerAI, type: 'AI' },
      { url: runnerREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Tiger",
    images: [
      { url: tigerAI, type: 'AI' },
      { url: tigerREAL, type: 'DESIGN' }
    ]
  },
  {
    subject: "Blueberries",
    images: [
      { url: blueberriesREAL, type: "AI" },
      { url: blueberriesAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Bull",
    images: [
      { url: bullREAL, type: "AI" },
      { url: bullAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Cake",
    images: [
      { url: cakeREAL, type: "AI" },
      { url: cakeAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Classroom",
    images: [
      { url: cutcakeREAL, type: "AI" },
      { url: classAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Eye",
    images: [
      { url: eyeREAL, type: "AI" },
      { url: eyeAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Kitten",
    images: [
      { url: kittyAI, type: "DESIGN" },
      { url: kittyREAL, type: "AI" }
    ]
  },
  {
    subject: "Leaves",
    images: [
      { url: leavesREAL, type: "AI" },
      { url: leavesAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Ramen",
    images: [
      { url: ramenREAL, type: "AI" },
      { url: ramenAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Shed",
    images: [
      { url: shedREAL, type: "AI" },
      { url: shedAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Trail",
    images: [
      { url: trailREAL, type: "AI" },
      { url: trailAI, type: "DESIGN" }
    ]
  },
  {
    subject: "Turtle",
    images: [
      { url: turtleREAL, type: "AI" },
      { url: turtleAI, type: "DESIGN" }
    ]
  }

] as const;

/**
 * SHUFFLE HELPER: Fisher-Yates Algorithm
 * Ensures every permutation of the array is equally likely.
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

export async function generateGameRounds(
  onProgress: (progress: number) => void
): Promise<GameRound[]> {
  const rounds: GameRound[] = [];
  const randomizedDataPool = shuffleArray([...STATIC_DATA]);
  const totalSteps = randomizedDataPool.length;

  for (let i = 0; i < totalSteps; i++) {
    const data = randomizedDataPool[i];

    // SAFETY GUARD: Ensure images exist before proceeding to prevent loop crash
    if (!data.images || !data.images[0] || !data.images[1]) {
        console.warn(`Round ${i} skipped: Missing image data for ${data.subject}`);
        continue;
    }

    await new Promise(resolve => setTimeout(resolve, 100));
    
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
