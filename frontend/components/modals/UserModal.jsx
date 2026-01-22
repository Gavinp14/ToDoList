import React, { useState, useEffect, use } from "react";
import Popup from "../ui/PopUp";
import Button from "../ui/Button";

function UserModal({ isOpen, onClose, currentUser }) {
  console.log("Current User:", currentUser);
  return (
    <div>
      <Popup title="User Settings" isOpen={isOpen} onClose={onClose}>
        <h2 className="text-lg text-center font-medium text-gray-900 mb-5">
          <b>Username:</b> {currentUser?.email} <br />
          <b>Account Created:</b>{" "}
          {currentUser?.metadata.creationTime.slice(0, 17)}
        </h2>
        <div className="flex flex-col gap-4">
          <Button color="red" className="w-full" onClick={null}>
            Delete Account
          </Button>
        </div>
      </Popup>
    </div>
  );
}

export default UserModal;
