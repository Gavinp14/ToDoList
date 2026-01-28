import { db } from "@/lib/firebase";
import {
  collection,
  query,
  where,
  orderBy,
  onSnapshot,
  getDocs, // Added for the one-time fetch
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";

export const addCategory = async (userId: string, categoryName: string) => {
  if (!categoryName.trim()) return;
  return await addDoc(collection(db, "userCategories"), {
    categoryName: categoryName,
    userId,
    createdAt: new Date(),
  });
};
