import React, { useState, useEffect } from "react";
import Dropdown from "../ui/Dropdown";
import AddCategoryModal from "../modals/AddCategoryModal";
import { getUserCategories } from "@/db/users";

function CategoryDropdown({ onCategoryChange, selectedCategory, currentUser }) {
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [userCategories, setUserCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      // Don't attempt fetch if we don't have a user ID yet
      if (!currentUser) return;

      try {
        setIsLoading(true);
        const categories = await getUserCategories(currentUser);

        // Ensure we fall back to an empty array if the document/field is missing
        setUserCategories(categories);
      } catch (error) {
        console.error("Error fetching categories:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, [currentUser]); // Re-run only if the User ID changes

  const categoryOptions = [
    ...userCategories.map((cat) => ({
      label: cat,
      onClick: () => onCategoryChange(cat),
    })),
    {
      label: "Add New Category...",
      onClick: () => setIsCategoryModalOpen(true),
    },
  ];

  console.log(currentUser);
  console.log(userCategories);

  return (
    <>
      <Dropdown
        dropdownName={"Category"}
        // Show "Loading..." while fetching, otherwise the selected cat or default
        label={selectedCategory}
        options={categoryOptions}
        direction={"right"}
      />
      <AddCategoryModal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        currentUser={currentUser}
        // Tip: Pass a refresh function to the modal so it can tell this component to re-fetch
        refreshCategories={async () => {
          const updated = await getUserCategories(currentUser);
          setUserCategories(updated || []);
        }}
      />
    </>
  );
}

export default CategoryDropdown;
