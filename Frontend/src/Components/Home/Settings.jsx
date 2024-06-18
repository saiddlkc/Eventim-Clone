import React from "react";
import DrawerDefault from "./Drawer";

function Settings() {
  return (
    <div className="fixed bottom-0 right-0 p-3 rounded-xl shadow-md bg-[#F5650D] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
      <DrawerDefault />
    </div>
  );
}

export default Settings;
