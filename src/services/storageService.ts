import { db, auth } from "../firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export interface TeamScore {
  name: string;
  email: string;
  score: number;
  timestamp: any; // Firestore serverTimestamp
}

export const saveScore = async (teamName: string, score: number) => {
  // Ensure we have a logged-in user to associate the score with
  if (!auth.currentUser) {
    console.error("No authenticated user found. Score not saved.");
    return;
  }

  try {
    // We push to the 'submissions' collection which the Admin Dashboard listens to
    await addDoc(collection(db, "submissions"), {
      name: teamName,
      email: auth.currentUser.email,
      score: score,
      timestamp: serverTimestamp(), // Uses Firebase's clock for accuracy
    });
    console.log("Score successfully uploaded to cloud mainframe.");
  } catch (e) {
    console.error("Failed to sync score to Firestore:", e);
    // Optional: Fallback to localStorage if the internet is down
  }
};

// Note: getScores and clearScores are now handled 
// automatically by the AdminDashboard's onSnapshot listener.
