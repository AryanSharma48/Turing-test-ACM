import { db, auth } from "../firebase";
import { 
  collection, 
  addDoc, 
  serverTimestamp, 
  doc, 
  getDoc,
  getDocs,
  query,
  where
} from "firebase/firestore";

/**
 * Helper to determine if the current agent is an Admin.
 */
const isUserAdmin = async (uid: string) => {
  try {
    const userDoc = await getDoc(doc(db, "users", uid));
    return userDoc.exists() && userDoc.data().role === 'admin';
  } catch (e) {
    return false;
  }
};

/**
 * SAVE FINAL SCORE (Final Archive)
 * HEARTBEAT / ACTIVE_SESSIONS logic removed to minimize DB overhead.
 * This function is called only once when the game is completed.
 */
export const saveScore = async (
  teamName: string, 
  score: number, 
  timeTaken: number, 
  rounds: any[] 
) => {
  if (!auth.currentUser) {
    console.error("UPLINK_DENIED: No session found.");
    return;
  }

  try {
    const uid = auth.currentUser.uid;
    const email = auth.currentUser.email;
    const isAdmin = await isUserAdmin(uid);
    
    // Admins don't get ranked on the leaderboard
    if (isAdmin) {
      console.log("ADMIN_SESSION: Result not recorded to leaderboard.");
      return;
    }

    // --- CALCULATE ATTEMPT NUMBER ---
    const submissionsRef = collection(db, "submissions");
    const q = query(submissionsRef, where("email", "==", email));
    const querySnapshot = await getDocs(q);
    const attemptNumber = querySnapshot.size + 1; 

    // 1. Permanent Archive Entry (UNIQUE DOCUMENT)
    // We only write to 'submissions' now.
    await addDoc(collection(db, "submissions"), {
      uid: uid,
      name: teamName,
      email: email,
      score: score,
      timeTaken: timeTaken || 0,
      rounds: rounds, 
      attempt: attemptNumber, 
      timestamp: serverTimestamp(),
      status: 'LOCKED',
      role: 'player'
    });

    console.log(`UPLINK_SUCCESS: Locked Attempt #${attemptNumber} for ${email}. Score: ${score}`);
  } catch (e) {
    console.error("DATABASE_CRITICAL_ERROR:", e);
    throw e; 
  }
};
