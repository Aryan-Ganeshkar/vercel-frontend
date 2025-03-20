import { useState, useEffect } from "react";
import { addCompany, updateCompany } from "../services/api";

export default function CompanyForm({
  refresh,
  editingCompany,
  setEditingCompany,
}) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    company: "",
  });

  useEffect(() => {
    if (editingCompany) {
      setFormData(editingCompany);
    } else {
      setFormData({ name: "", email: "", number: "", company: "" });
    }
  }, [editingCompany]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingCompany) {
      await updateCompany(editingCompany._id, formData);
    } else {
      await addCompany(formData);
    }
    setEditingCompany(null); // Reset editing mode
    setFormData({ name: "", email: "", number: "", company: "" }); // Clear form
    refresh(); // Refresh the list
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 bg-white p-4 rounded-lg shadow-md"
    >
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleChange}
        placeholder="Name"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="email"
        name="email"
        value={formData.email}
        onChange={handleChange}
        placeholder="Email"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="number"
        value={formData.number}
        onChange={handleChange}
        placeholder="Number"
        required
        className="w-full p-2 border rounded"
      />
      <input
        type="text"
        name="company"
        value={formData.company}
        onChange={handleChange}
        placeholder="Company"
        required
        className="w-full p-2 border rounded"
      />
      <button
        type="submit"
        className="w-full bg-green-500 text-white py-2 rounded hover:bg-green-700"
      >
        {editingCompany ? "Update Company" : "Add Company"}
      </button>
    </form>
  );
}
