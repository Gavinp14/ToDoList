import React from "react";
import Dropdown from "../ui/Dropdown";

function SortDropdown({ onSortChange }) {
  const sortOptions = [
    { label: "Date Created", onClick: () => onSortChange("Date Created") },
    { label: "Title (A-Z)", onClick: () => onSortChange("Title (A-Z)") },
    { label: "Title (Z-A)", onClick: () => onSortChange("Title (Z-A)") },
    { label: "Category", onClick: () => onSortChange("Category") },
    { label: "Priority", onClick: () => onSortChange("Priority") },
    { label: "Completed", onClick: () => onSortChange("Completed") },
    { label: "Not Completed", onClick: () => onSortChange("Not Completed") },
  ];

  return <Dropdown label="Sort By" options={sortOptions} />;
}

export default SortDropdown;
