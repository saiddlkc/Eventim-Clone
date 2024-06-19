import DrawerDefault from "./Drawer";

function Settings({ setBackgroundColor }) {
  return (
    <div className="fixed bottom-0 right-0 p-2 rounded-xl shadow-md bg-[#F5650D] dark:bg-gray-800 border border-gray-200 dark:border-gray-700 z-50">
      <DrawerDefault setBackgroundColor={setBackgroundColor} />
    </div>
  );
}

export default Settings;
