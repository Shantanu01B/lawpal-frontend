import React, { useState, useEffect } from "react";

export default function EditDocumentModal({ document, onClose, onSave }) {
  // Defensive: if document is not loaded yet, show a loading state
  if (!document) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-8 w-full max-w-lg shadow-xl text-center">
          <span className="text-gray-700">Loading document...</span>
        </div>
      </div>
    );
  }

  // State for editable content
  const [content, setContent] = useState(document.content);

  // Sync state if a new document is passed in
  useEffect(() => {
    setContent(document.content);
  }, [document]);

  // Handle save
  const handleSubmit = (e) => {
    e.preventDefault();
    if (onSave) onSave(content);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-xl">
        <h3 className="text-lg font-bold mb-4 text-indigo-700">Edit Document</h3>
        <form onSubmit={handleSubmit}>
          <textarea
            className="w-full h-48 p-3 border border-gray-300 rounded mb-4 focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-all"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          />
          <div className="flex justify-end gap-2">
            <button
              type="button"
              className="px-4 py-2 rounded bg-gray-200 text-gray-800 hover:bg-gray-300"
              onClick={onClose}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 font-semibold"
            >
              Save Changes
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
