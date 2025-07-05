"use client";

import { toast } from "sonner";
import { useState } from "react";

export default function TestToastPage() {
  const [name, setName] = useState("");

  const testBasicToast = () => {
    toast("Hello World!");
  };

  const testSuccessToast = () => {
    toast.success("Success!", {
      description: "Everything went smoothly 🎉",
      icon: "✅",
    });
  };

  const testErrorToast = () => {
    toast.error("Something went wrong", {
      description: "We couldn't complete the operation",
      icon: "❌",
    });
  };

  const testWarningToast = () => {
    toast.warning("Warning!", {
      description: "You might want to double-check that",
      icon: "⚠️",
    });
  };

  const testInfoToast = () => {
    toast.info("FYI", {
      description: "This is some information",
      icon: "ℹ️",
    });
  };

  const testLoadingToast = () => {
    const promise = new Promise((resolve) =>
      setTimeout(() => resolve("Loaded!"), 2500)
    );

    toast.promise(promise, {
      loading: "Processing...",
      success: (data) => `${data}`,
      error: "Failed to load.",
    });
  };

  const testCustomJSXToast = () => {
    toast(
      <div>
        <p className="font-semibold">🎯 Goal Achieved</p>
        <p className="text-sm text-gray-500">You just leveled up your UI</p>
      </div>,
      {
        duration: 5000,
      }
    );
  };

  const testActionToast = () => {
    toast("Item archived", {
      description: "You can restore it from the archives.",
      action: {
        label: "Undo",
        onClick: () => toast("Undo successful"),
      },
    });
  };

  const testDynamicNameToast = () => {
    if (!name) return toast.error("Please enter your name first");
    toast(`Hello, ${name}! 👋`, {
      description: "Welcome to the Sonner playground",
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-4xl font-bold mb-6">🚀 Sonner Toast Playground</h1>

        {/* Dynamic input test */}
        <div className="mb-6">
          <label className="block text-sm font-medium mb-1">Your Name:</label>
          <div className="flex gap-2">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="px-4 py-2 rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-800 w-full"
              placeholder="e.g., Redouane"
            />
            <button
              onClick={testDynamicNameToast}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-5 py-2 rounded-lg"
            >
              Greet Me
            </button>
          </div>
        </div>

        {/* Toast categories */}
        <div className="grid gap-10">
          {/* Basic */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Basic Toasts</h2>
            <div className="flex flex-wrap gap-3">
              <button onClick={testBasicToast} className="btn">Basic</button>
              <button onClick={testSuccessToast} className="btn bg-green-500">Success</button>
              <button onClick={testErrorToast} className="btn bg-red-500">Error</button>
              <button onClick={testWarningToast} className="btn bg-yellow-500 text-black">Warning</button>
              <button onClick={testInfoToast} className="btn bg-blue-500">Info</button>
            </div>
          </div>

          {/* Async */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Async & Custom</h2>
            <div className="flex flex-wrap gap-3">
              <button onClick={testLoadingToast} className="btn bg-purple-500">Loading Promise</button>
              <button onClick={testCustomJSXToast} className="btn bg-pink-500">Custom JSX</button>
              <button onClick={testActionToast} className="btn bg-gray-800">With Action</button>
            </div>
          </div>

          {/* Control */}
          <div>
            <h2 className="text-xl font-semibold mb-4">Control Toasts</h2>
            <button
              onClick={() => toast.dismiss()}
              className="btn bg-gray-700"
            >
              Dismiss All
            </button>
          </div>

          {/* Debug Info */}
          <div className="mt-12 p-6 bg-white dark:bg-gray-800 rounded-lg shadow">
            <h2 className="text-xl font-semibold mb-2">🛠 Debugging Tips</h2>
            <ul className="list-disc list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Toasts should appear in the <strong>bottom-right</strong> corner</li>
              <li>JSX toasts allow full React components</li>
              <li>Promise-based toasts are great for async feedback</li>
              <li>Custom icons and duration supported</li>
              <li><code className="bg-gray-200 px-1 rounded">npm install sonner</code> if you haven’t yet</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

// Tailwind button base class (global or scoped via `btn`)
const buttonClass = `
  bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition
`;
