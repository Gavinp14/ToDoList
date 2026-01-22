import React from "react";
import Button from "../ui/Button";
import { db } from "@/lib/firebase"; // Make sure your firebase config is imported
import {
  collection,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";

// Change userID to userId (lowercase 'd')
function DeleteAllButton({ todos, userId }) {
  const handleDeleteAll = async () => {
    if (!userId || !todos.length) return;

    try {
      // 1. Find all docs in 'todos' collection belonging to this user
      const q = query(collection(db, "todos"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);

      // 2. Delete each document
      const deletePromises = querySnapshot.docs.map((todoDoc) =>
        deleteDoc(doc(db, "todos", todoDoc.id)),
      );

      await Promise.all(deletePromises);
      console.log("All tasks deleted successfully");
    } catch (error) {
      console.error("Error deleting tasks:", error);
    }
  };

  return (
    <Button color="red" size="sm" onClick={handleDeleteAll}>
      Delete All Tasks
    </Button>
  );
}

export default DeleteAllButton;
