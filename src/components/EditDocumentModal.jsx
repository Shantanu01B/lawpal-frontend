import React, { useState } from "react";

export default function EditDocumentModal({ doc, onClose, onSave }) {
  const [content, setContent] = useState(doc.content);
  const [saving, setSaving] = useState(false);

  async function handleSave() {
    setSaving(true);
    await onSave(doc._id, content);
    setSaving(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
        <h3 className="text-lg font-bold mb-2">Edit Document</h3>
        <textarea
          className="w-full h-40 border rounded p-2"
          value={content}
          onChange={e => setContent(e.target.value)}
        />
        <div className="mt-4 flex justify-end space-x-2">
          <button onClick={onClose} className="px-4 py-2 bg-gray-300 rounded">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="px-4 py-2 bg-indigo-600 text-white rounded">
            {saving ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
