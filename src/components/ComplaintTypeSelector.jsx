// src/components/ComplaintTypeSelector.jsx
export default function ComplaintTypeSelector({ value, onChange }) {
  const types = ["Theft", "Harassment", "Cybercrime", "Domestic Violence"];
  return (
    <select
      className="w-full p-3 rounded border-2 border-blue-200 shadow focus:outline-none focus:border-blue-500"
      value={value}
      onChange={onChange}
    >
      <option value="">Select Complaint Type</option>
      {types.map(type => (
        <option key={type} value={type}>{type}</option>
      ))}
    </select>
  );
}
