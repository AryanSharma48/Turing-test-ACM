import { db, auth } from "../firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  setDoc,
  deleteDoc
} from "firebase/firestore";

export interface TeamScore {
  name: string;
  email: string;
  score: number;
  timestamp: any;
}

// Save partial progress
export const savePartialProgress = async (rounds: any[], score: number, teamName: string) => {
  if (!auth.currentUser) return;

  try {
    const sessionRef = doc(db, "active_sessions", auth.currentUser.uid);
    await setDoc(sessionRef, {
      name: teamName,
      email: auth.currentUser.email,
      rounds: rounds,
      currentScore: score,
      lastActive: serverTimestamp(),
      status: 'IN_PROGRESS'
    }, { merge: true });
  } catch (e) {
    console.error("CRITICAL_SYNC_FAILURE: Failed to upload partial state:", e);
  }
};

// Save final score and clean up active session
export const saveScore = async (teamName: string, score: number) => {
  if (!auth.currentUser) {
    console.error("ACCESS_DENIED: No authenticated agent found.");
    return;
  }

  try {
    await addDoc(collection(db, "submissions"), {
      name: teamName,
      email: auth.currentUser.email,
      score: score,
      timestamp: serverTimestamp(),
    });

    const sessionRef = doc(db, "active_sessions", auth.currentUser.uid);
    await deleteDoc(sessionRef);

    console.log("DATA_UPLINK_SUCCESS: Score committed to mainframe.");
  } catch (e) {
    console.error("DATABASE_ERROR: Final sync failed:", e);
  }
};
