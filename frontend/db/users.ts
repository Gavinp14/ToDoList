import { db } from "@/lib/firebase";
import { doc, getDoc, onSnapshot } from "firebase/firestore";

// Option A: One-time fetch (Good for settings pages)
export const getUserProfile = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);

  if (userSnap.exists()) {
    return userSnap.data();
  } else {
    console.log("No such user document!");
    return null;
  }
};

// Option B: Real-time listener (Good for showing live XP or points)
export const subscribeToUserProfile = (
  uid: string,
  callback: (data: any) => void,
) => {
  const userRef = doc(db, "users", uid);
  return onSnapshot(userRef, (doc) => {
    callback(doc.data());
  });
};

export const getUserCategories = async (uid: string) => {
  const userRef = doc(db, "users", uid);
  const userSnap = await getDoc(userRef);
  if (userSnap.exists()) {
    const userData = userSnap.data();
    return userData.categories || [];
  } else {
    console.log("No such user document!");
    return [];
  }
};
