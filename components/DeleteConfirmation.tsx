"use client";

import React, { useState } from "react";

const DeleteConfirmation = ({ subject, component, onConfirm, onCancel }) => {
  const [input, setInput] = useState("");
  const [dontMatch, setDontMatch] = useState(true);

  const handleConfirm = () => {
    if (input === subject) {
      onConfirm();
    } else {
      setDontMatch(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center">
      <div className=" bg-white border border-slate-400/30 p-6 rounded-xl shadow-xl shadow-slate-300/10 w-[90%] md:w-[50%]">
        <h2 className="text-xl font-semibold mb-4 text-slate-700/60">
          Are you sure you want to delete this {component}?
        </h2>
        <p className="mb-2 text-slate-700/60">
          Type{" "}
          <strong className="font-bold text-xl text-white">{subject}</strong> to
          confirm deletion.
        </p>

        {!dontMatch && (
          <p className="text-red-500 text-sm mb-2">
            Texts do not match. Please try again.
          </p>
        )}
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="w-full p-2 my-3 border rounded-lg mb-4 bg-transparent"
          placeholder={`Type "${subject}" here...`}
        />
        <div className="flex justify-between">
          <button
            onClick={onCancel}
            className="w-2/5 rounded-lg hover:bg-slate-800/50 disabled:opacity-50 border border-slate-400/30 bg-slate-700/40 text-sm md:text-lg p-2"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="w-2/5 p-2 bg-red-700/70 text-sm rounded-lg border-black border-1 md:border-2 hover:bg-red-800/70"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmation;
