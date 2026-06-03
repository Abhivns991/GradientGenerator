import React,{useEffect, useState}  from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {
  const [num, setNum] = useState(12);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  const getHexColorCode = () => {
    
    const rgb = 255*255*255;
    const radom =  Math.random() * rgb;
    const int = Math.floor(radom);
    const hexCode = int.toString(16).padStart(6, '0');
    return `#${hexCode}`;
  }

  const generateGradient = () => {
    const colors = [];
    for(let i=0; i<num; i++){
      const color1 = getHexColorCode();
      const color2 = getHexColorCode();
      const degree = Math.floor(Math.random() * 360);
      colors.push({
        gradient:`linear-gradient(${degree}deg, ${color1}, ${color2})`,
        radialGradient: `radial-gradient(circle at center, ${color1}, ${color2})`,
        cssCopy: type === "linear" ? `background: linear-gradient(${degree}deg, ${color1}, ${color2});` : `background: radial-gradient(circle at center, ${color1}, ${color2});`
      });

    }
    setGradients(colors);
  }


  useEffect(() => {
    generateGradient();
  }, [num, type]);

  
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-9/12 mx-auto">
      <div className="flex justify-between">
         <h1 className="text-3xl font-bold">Gradient Generator - {type}</h1>

        <div className="flex gap-4"> 
         <input 
         value={num}
         onChange={(e) => setNum(Number(e.target.value))}
          type="number"
          placeholder="12"
          className="w-[100px] border bg-white border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4" />
        <select 
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-[100px] border bg-white border-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-md py-2 px-4">
          <option value="linear">Linear</option>
          <option value="radial">Radial</option>
        </select>

         <button onClick={generateGradient} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Generate</button>
       
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 mt-8">
        {
          gradients.map((item, index) => (
            <div key={index} 
                className="h-[180px] border rounded-xl relative"
                style={{ background: type === "linear" ? item.gradient : item.radialGradient }}>
              <button onClick={() => {
                navigator.clipboard.writeText(item.cssCopy);
                toast.success("CSS copied to clipboard!" , {position: "top-center", autoClose: 2000, hideProgressBar: true, closeOnClick: true, pauseOnHover: true, draggable: true, progress: undefined, theme: "colored"});
              }} className="text-[10px] absolute bottom-3 right-3 bg-black/50 text-white px-4 py-1 rounded-md hover:bg-gray-500">Copy</button>
            </div>
          ))
        }
       
      </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;