export const CATEGORIES = [
    { value: "food", label: "Food & Dining", color: "#4caf50" },
    { value: "transportation", label: "Transportation", color: "#2196f3" },
    { value: "utilities", label: "Utilities", color: "#ff9800" },
    { value: "entertainment", label: "Entertainment", color: "#9c27b0" },
    { value: "shopping", label: "Shopping", color: "#f44336" },
    { value: "health", label: "Health", color: "#00bcd4" },
    { value: "other", label: "Other", color: "#607d8b" },
];

export const getCategoryObject = (value) => {
    return (
        CATEGORIES.find((cat) => cat.value === value) ||
        CATEGORIES[CATEGORIES.length - 1]
    );
};