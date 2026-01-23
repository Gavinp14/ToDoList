import React from "react";
import Dropdown from "../ui/Dropdown";

function CategoryDropdown({ onCategoryChange, selectedCategory }) {
  //future refactor to fetch categories from constants
  const categoryOptions = [
    { label: "General", onClick: () => onCategoryChange("General") },
    { label: "Work", onClick: () => onCategoryChange("Work") },
    { label: "Personal", onClick: () => onCategoryChange("Personal") },
    { label: "Shopping", onClick: () => onCategoryChange("Shopping") },
    { label: "Chores", onClick: () => onCategoryChange("Chores") },
    { label: "Education", onClick: () => onCategoryChange("Education") },
    { label: "Other", onClick: () => onCategoryChange("Other") },
    {
      label: "Add New Category...",
      onClick: () => onCategoryChange("Add New Category"),
    }, // Placeholder for adding new category
  ];

  return (
    <Dropdown
      dropdownName={"Category"}
      label={selectedCategory}
      options={categoryOptions}
      direction={"right"}
    />
  );
}

export default CategoryDropdown;
