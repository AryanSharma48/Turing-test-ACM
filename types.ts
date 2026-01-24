export interface GameImage {
  id: string;
  url: string;
  type: 'AI' | 'DESIGN'; // DESIGN represents 'Real' in the code logic
}

export interface GameRound {
  id: number;
  subject: string;
  images: [GameImage, GameImage]; // Tuple of 2 images
  userChoiceId: string | null;
  isCorrect: boolean | null;
}

export interface GameState {
  status: 'LOGIN' | 'IDLE' | 'GENERATING' | 'PLAYING' | 'FINISHED' | 'ADMIN';
  rounds: GameRound[];
  loadingProgress: number;
  score: number;
  teamName?: string;
}