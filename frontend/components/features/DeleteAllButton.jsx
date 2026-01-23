import React from "react";
import Button from "../ui/Button";
import { db } from "@/lib/firebase"; // Make sure your firebase config is imported
import { deleteAllTodos } from "@/db/todo";

// Change userID to userId (lowercase 'd')
function DeleteAllButton({ todos, userId }) {
  return (
    <Button color="red" size="sm" onClick={() => deleteAllTodos(userId, todos)}>
      Delete All Tasks
    </Button>
  );
}

export default DeleteAllButton;
