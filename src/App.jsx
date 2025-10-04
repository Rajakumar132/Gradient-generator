import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
const App = () => {
  const [Num, setNum] = useState(12);
  const [Type, setType] = useState("linear");

  // Random Hex Generator
  const Hexgredientcode = () => {
    const rgb = 255 * 255 * 255;
    const Random = Math.random() * rgb;
    const int = Math.floor(Random);
    const hex = int.toString(16);
    const hexcode = hex.padStart(6, "0");
    return `#${hexcode}`;
  };

  const [gredient, setgredient] = useState([]);

  // Gradient Generator
  const Genaratergredient = () => {
    const color = [];
    for (let i = 0; i < Num; i++) {
      const color1 = Hexgredientcode();
      const color2 = Hexgredientcode();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;
      if (Type === "linear") {
        color.push({
          gradient: `${Type}-gradient(${degreeString}, ${color1}, ${color2})`,
          css: `background:${Type}-gradient(${degreeString}, ${color1}, ${color2})`,
        });
      } else {
        color.push({
          gradient: `radial-gradient(circle, ${color1}, ${color2})`,
          css: `background:'radial-gradient(circle ${color1}, ${color2})'`,
        });
      }
    }
    setgredient(color);
  };
  const onCopy = (css) => {
    navigator.clipboard.writeText(css);
    toast.success("Css code copied ", { position: "top-center" });
  };
  // Call every time Num or Type changes
  useEffect(() => {
    Genaratergredient();
  }, [Num, Type]);

  return (
    <div className="min-h-screen bg-gray-200 py-12">
      <div className="w-9/12 mx-auto space-y-9">
        <div className=" flex justify-between ">
          <h1 className="text-3xl font-bold">🎨 Gradient Generator</h1>
          <div className="flex gap-1">
            <input
              value={Num}
              className="border bg-white border-slate-300 rounded-lg w-[100px] p-2"
              placeholder="12"
              onChange={(e) => {
                setNum(Number(e.target.value));
              }}
            />
            <select
              value={Type}
              className="border border-slate-300 bg-white rounded-lg w-[100px] p-2"
              onChange={(e) => {
                setType(e.target.value.toLowerCase());
              }}
            >
              <option value="linear">Linear</option>
              <option value="radial">Radial</option>
            </select>
            <button
              className="px-14 py-2 bg-rose-500 text-white rounded font-medium cursor-pointer"
              onClick={Genaratergredient}
            >
              {" "}
              Generate
            </button>
          </div>
        </div>
        <div className="grid grid-cols-4 gap-4">
          {gredient.map((item, index) => (
            <div
              key={index}
              className="h-[180px] rounded-xl relative"
              style={{ background: item.gradient }}
            >
              <button
                onClick={() => onCopy(item.css)}
                className="bg-black/50 hover:bg-black text-white rounded absolute bottom-3 left-0 text-[15px] py-1 px-1 my-3 mx-1 cursor-pointer"
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
