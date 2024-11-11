"use client";
import { useState, useEffect, useRef } from "react";
import Cytoscape from "cytoscape";
import palindromeConfig from "@/app/palindromeConfig";

export default function Home() {
  const [input, setInput] = useState("");
  const [result, setResult] = useState(null);
  const [steps, setSteps] = useState([]);
  const cyRef = useRef(null);

  useEffect(() => {
    if (!cyRef.current) {
      cyRef.current = Cytoscape({
        container: document.getElementById("cy"),
        elements: getElementsFromConfig(palindromeConfig),
        style: [
          {
            selector: "node",
            style: {
              label: "data(label)",
              "text-valign": "center",
              "background-color": "#61bffc",
              width: "40px",
              height: "40px",
            },
          },
          {
            selector: "edge",
            style: {
              "curve-style": "bezier",
              "target-arrow-shape": "triangle",
            },
          },
        ],
      });
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await fetch("/api/turingMachine", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ input }),
    });

    const data = await res.json();
    setResult(data);
    setSteps(data.steps);
  };

  return (
    <div>
      <h1>Palindrome Turing Machine</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter binary input"
        />
        <button type="submit">Simulate</button>
      </form>
      {result && (
        <p>
          {result.isPalindrome
            ? `Palindrome (${result.palindromeType})`
            : "Not a palindrome"}
        </p>
      )}
      <div id="cy" style={{ width: "600px", height: "400px" }}></div>
      {steps.length > 0 && (
        <div>
          <h2>Simulation Steps</h2>
          <ul>
            {steps.map((step, index) => (
              <li key={index}>
                <strong>Step {index + 1}:</strong> State: {step.currentState}{" "}
                {"->"} {step.nextState}, Tape: {step.tape}, Head Position:{" "}
                {step.headPosition}, Write: {step.writeSymbol}, Move:{" "}
                {step.moveDirection}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

function getElementsFromConfig(config) {
  const elements = [];

  // Add nodes
  config.states.forEach((state) => {
    elements.push({ data: { id: state, label: state } });
  });

  // Add edges
  Object.keys(config.transitions).forEach((state) => {
    Object.keys(config.transitions[state]).forEach((symbol) => {
      const [nextState] = config.transitions[state][symbol];
      elements.push({
        data: { source: state, target: nextState, label: symbol },
      });
    });
  });

  return elements;
}
