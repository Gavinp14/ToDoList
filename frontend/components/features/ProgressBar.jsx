import React, { useState, useEffect } from "react";

// components/features/ProgressBar.jsx

export default function ProgressBar({ todos = [] }) {
  const totalCount = todos.length;
  const completedCount = todos.filter((todo) => todo.isChecked).length;
  const percentage = totalCount > 0 ? (completedCount / totalCount) * 100 : 0;

  //write a unit test for this
  const changeColorBasedOnProgress = (percent) => {
    switch (true) {
      case percent < 30:
        return "bg-red-600";
      case percent >= 30 && percent < 50:
        return "bg-yellow-500";
      case percent >= 51 && percent < 99:
        return "bg-lime-500";
    }
    return "bg-green-600";
  };

  //write unit test for this
  const changeCompleteTextColor = (percent) => {
    return percent === 100 ? "text-green-600" : "text-blue-600";
  };

  return (
    <div className="my-10 w-full">
      {/* Label above the bar */}
      <div className="flex justify-between mb-2">
        <span className="text-sm font-bold text-gray-700">
          {completedCount} of {totalCount} Tasks Completed
        </span>
        <span
          className={`text-sm font-medium ${changeCompleteTextColor(percentage)}`}
        >
          {Math.round(percentage)}% Complete
        </span>
      </div>

      {/* The Track */}
      <div className="w-full bg-gray-200 rounded-full h-4 dark:bg-gray-700">
        {/* The Fill */}
        <div
          className={`${changeColorBasedOnProgress(percentage)} h-4 rounded-full transition-all duration-700 ease-in-out`}
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  );
}
