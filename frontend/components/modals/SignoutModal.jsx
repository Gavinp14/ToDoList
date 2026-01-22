import React, { useState, useEffect, use } from "react";
import { useAuth } from "@/hooks/useAuth";
import Popup from "../ui/PopUp";
import Button from "../ui/Button";

function SignoutModal({ isOpen, onClose }) {
  const { signOutUser } = useAuth();

  return (
    <div>
      <Popup
        title="Are you sure you want to log out?"
        isOpen={isOpen}
        onClose={onClose}
      >
        <div className="flex flex-col gap-4">
          <Button color="red" className="w-full" onClick={signOutUser}>
            Log Out
          </Button>
        </div>
      </Popup>
    </div>
  );
}

export default SignoutModal;
