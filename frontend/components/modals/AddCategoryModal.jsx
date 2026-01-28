import React from "react";
import PopUp from "../ui/PopUp";
import Button from "../ui/Button";
import Input from "../ui/Input";

function AddCategoryModal({ isOpen, onClose, currentUser }) {
  const handleSave = async () => {
    if (!currentUser) return;
  };

  return (
    <PopUp title="Add Category" isOpen={isOpen} onClose={onClose}>
      <div className="flex flex-col gap-4">
        <Input placeholder="Add new category..." />
        <Button color="blue" onClick={null} className="w-full">
          Save Changes
        </Button>
      </div>
    </PopUp>
  );
}

export default AddCategoryModal;
