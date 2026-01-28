import React from "react";
import Dropdown from "../ui/Dropdown";

function PriorityDropdown({ onPriorityChange, selectedPriority }) {
  const priorityOptions = [
    { label: "High", onClick: () => onPriorityChange("High") },
    { label: "Medium", onClick: () => onPriorityChange("Medium") },
    { label: "Low", onClick: () => onPriorityChange("Low") },
  ];

  return (
    <Dropdown
      dropdownName={"Priority"}
      label={selectedPriority}
      options={priorityOptions}
      direction={"right"}
    />
  );
}

export default PriorityDropdown;
