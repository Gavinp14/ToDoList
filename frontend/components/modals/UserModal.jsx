"use client";

import React, { useState, useEffect } from "react";
import { getUserProfile } from "@/db/users";
import Popup from "../ui/PopUp";
import Button from "../ui/Button";

function UserModal({ isOpen, onClose, currentUser }) {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Only fetch if the modal is open and we have a user
    if (isOpen && currentUser?.uid) {
      const fetchProfile = async () => {
        setLoading(true);
        try {
          const data = await getUserProfile(currentUser.uid);
          setProfile(data);
        } catch (error) {
          console.error("Error fetching profile:", error);
        } finally {
          setLoading(false);
        }
      };

      fetchProfile();
    }
  }, [isOpen, currentUser?.uid]);

  return (
    <Popup title="User Settings" isOpen={isOpen} onClose={onClose}>
      {loading ? (
        <p className="text-center py-4">Loading profile...</p>
      ) : (
        <>
          <div className="text-lg text-center font-medium text-gray-900 mb-5 leading-relaxed">
            <p>
              <b>Name:</b> {profile?.name || "Guest"}
            </p>
            <p>
              <b>Email:</b> {currentUser?.email}
            </p>
            <p>
              <b>Birthdate:</b> {profile?.birthdate || "Not set"}
            </p>
            <p>
              <b>Joined:</b>{" "}
              {currentUser?.metadata?.creationTime
                ? new Date(
                    currentUser.metadata.creationTime,
                  ).toLocaleDateString()
                : "N/A"}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <Button
              color="red"
              className="w-full"
              onClick={() => alert("Are you sure?")}
            >
              Delete Account
            </Button>
          </div>
        </>
      )}
    </Popup>
  );
}

export default UserModal;
