import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

export default function Editor() {
  const [code, setCode] = useState(`#include <iostream>
using namespace std;
int main(){
  cout << "Hello World";
  return 0;
}`);
  const [output, setOutput] = useState("");

  // Send code changes to server
  const handleChange = (e) => {
    setCode(e.target.value);
    socket.emit("code-change", e.target.value);
  };

  // Listen for code updates from other users
  useEffect(() => {
    socket.on("code-change", (newCode) => {
      setCode(newCode);
    });

    return () => socket.off("code-change");
  }, []);

  // Run C++ code by calling backend
  const runCode = async () => {
    try {
      const res = await fetch("http://localhost:5000/run", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ code }),
      });
      const data = await res.json();
      setOutput(data.output || "No output");
    } catch (err) {
      setOutput("⚠️ Error connecting to server");
    }
  };

  return (
    <div className="space-y-4 p-4">
      <h2 className="text-xl font-bold">C++ Online Collaborative Editor</h2>

      {/* Code Editor */}
      <textarea
        className="w-full h-64 p-3 rounded-lg bg-gray-800 text-white font-mono"
        value={code}
        onChange={handleChange}
      />

      {/* Run Button */}
      <button
        onClick={runCode}
        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-500"
      >
        Run Code
      </button>

      {/* Output Section */}
      <div className="bg-black text-green-400 p-3 rounded-lg whitespace-pre-wrap">
        {output}
      </div>
    </div>
  );
}
