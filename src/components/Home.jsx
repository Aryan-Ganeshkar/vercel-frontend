import { useEffect, useState } from "react";
import { fetchCompanies, deleteCompany, updateCompany } from "../services/api";
import CompanyForm from "../components/CompanyForm";

export default function Home() {
  const [companies, setCompanies] = useState([]);
  const [editingCompany, setEditingCompany] = useState(null);

  const getCompanies = async () => {
    const { data } = await fetchCompanies();
    setCompanies(data);
  };

  useEffect(() => {
    getCompanies();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl font-bold text-center mb-6">Company Directory</h1>
      <CompanyForm refresh={getCompanies} editingCompany={editingCompany} setEditingCompany={setEditingCompany} />
      <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
        {companies.map((c) => (
          <div key={c._id} className="p-4 bg-white border rounded-lg shadow-md flex justify-between items-center">
            <div>
              <p className="text-lg font-semibold">{c.name}</p>
              <p className="text-gray-600">{c.company}</p>
              <p className="text-gray-500 text-sm">{c.email}</p>
              <p className="text-gray-500 text-sm">{c.number}</p>
            </div>
            <div className="flex space-x-2">
              <button 
                onClick={() => setEditingCompany(c)} 
                className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-700 transition"
              >
                Edit
              </button>
              <button 
                onClick={() => deleteCompany(c._id).then(getCompanies)} 
                className="px-3 py-1 bg-red-500 text-white rounded-lg hover:bg-red-700 transition"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}