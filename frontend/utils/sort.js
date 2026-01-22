export const sortTodos = (todos, sortBy) => {
  if (!todos) return [];
  const list = [...todos];

  switch (sortBy) {
    // 1. Alphabetical Title (A-Z)
    case "Title (A-Z)":
      return list.sort((a, b) => a.title.localeCompare(b.title));

    // 2. Alphabetical Title (Z-A)
    case "Title (Z-A)":
      return list.sort((a, b) => b.title.localeCompare(a.title));

    // 3. Category (A-Z) - assuming a 'category' field exists
    case "Category":
      return list.sort((a, b) =>
        (a.category || "").localeCompare(b.category || ""),
      );

    // 4. Priority (High to Low) - assuming 1 is High, 3 is Low
    case "Priority":
      return list.sort((a, b) => (a.priority || 0) - (b.priority || 0));

    // 5. Show Completed Only (Completed at top)
    case "Completed":
      return list.sort((a, b) =>
        a.isChecked === b.isChecked ? 0 : a.isChecked ? -1 : 1,
      );

    // 6. Show Not Completed Only (Incomplete at top)
    case "Not Completed":
      return list.sort((a, b) =>
        a.isChecked === b.isChecked ? 0 : a.isChecked ? 1 : -1,
      );

    // 7. Default: Newest First
    case "Date Created":
    default:
      return list.sort((a, b) => {
        const dateA = a.createdAt?.seconds || new Date(a.createdAt).getTime();
        const dateB = b.createdAt?.seconds || new Date(b.createdAt).getTime();
        return dateB - dateA;
      });
  }
};
