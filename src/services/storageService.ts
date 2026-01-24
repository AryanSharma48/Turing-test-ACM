const STORAGE_KEY = 'real_vs_ai_scores';

export interface TeamScore {
  teamName: string;
  score: number;
  timestamp: number;
}

export const saveScore = (teamName: string, score: number) => {
  const existing = getScores();
  // Filter out previous score for this team if it exists (update latest)
  const filtered = existing.filter(s => s.teamName !== teamName);
  
  filtered.push({ 
    teamName, 
    score, 
    timestamp: Date.now() 
  });
  
  // Sort by score desc, then time desc
  filtered.sort((a, b) => b.score - a.score || b.timestamp - a.timestamp);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
};

export const getScores = (): TeamScore[] => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (e) {
    console.error("Failed to parse scores", e);
    return [];
  }
};

export const clearScores = () => {
  localStorage.removeItem(STORAGE_KEY);
};