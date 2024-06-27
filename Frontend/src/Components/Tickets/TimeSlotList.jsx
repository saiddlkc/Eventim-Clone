import React, { useState } from "react";

function FilterExample() {
  const [items, setItems] = useState([
    { id: 1, name: "Apple", category: "fruit" },
    { id: 2, name: "Carrot", category: "vegetable" },
    { id: 3, name: "Orange", category: "fruit" },
    { id: 4, name: "Broccoli", category: "vegetable" },
  ]);

  // State to store filtered items
  const [filteredItems, setFilteredItems] = useState(items);

  // Function to filter items based on category
  const filterItems = (category) => {
    const filtered = items.filter((item) => item.category === category);
    setFilteredItems(filtered);
  };

  return (
    <div>
      <button onClick={() => filterItems("fruit")}>Show Fruits</button>
      <button onClick={() => filterItems("vegetable")}>Show Vegetables</button>

      <ul>
        {filteredItems.map((item) => (
          <li key={item.id}>{item.name}</li>
        ))}
      </ul>
    </div>
  );
}

export default FilterExample;
