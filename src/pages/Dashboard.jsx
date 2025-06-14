import React, { useState, useEffect } from "react";
import axios from "axios";
import ComplaintForm from "../components/ComplaintForm";
import jsPDF from "jspdf";
import EditDocumentModal from "../components/EditDocumentModal";
import toast from "react-hot-toast";

const BACKEND_URL = "https://lawpal-backend.onrender.com";

export default function Dashboard({ user }) {
  const [generatedDoc, setGeneratedDoc] = useState("");
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [saving, setSaving] = useState(false);
  const [editingDoc, setEditingDoc] = useState(null);
  const [activeTab, setActiveTab] = useState("generate");

  // Fetch documents on mount
  useEffect(() => {
    async function fetchDocs() {
      try {
        const res = await axios.get(
          `${BACKEND_URL}/api/documents/my`,
          { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
        );
        setDocuments(res.data);
      } catch (err) {
        toast.error("Failed to load documents");
      }
    }
    fetchDocs();
  }, []);

  // Generate document using AI API
  async function handleGenerate(formData) {
    setLoading(true);
    setGeneratedDoc("");
    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/ai/generate-document`,
        formData,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setGeneratedDoc(res.data.document);
      toast.success("Document generated successfully!");
    } catch (err) {
      toast.error("Failed to generate document");
    }
    setLoading(false);
  }

  // Save generated document to history
  async function handleSave() {
    if (!generatedDoc) return;
    setSaving(true);
    try {
      await axios.post(
        `${BACKEND_URL}/api/documents/save`,
        { content: generatedDoc },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      const res = await axios.get(
        `${BACKEND_URL}/api/documents/my`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setDocuments(res.data);
      setGeneratedDoc("");
      toast.success("Document saved to history!");
    } catch (err) {
      toast.error("Failed to save document");
    }
    setSaving(false);
  }

  // Update a document's content
  async function handleUpdateDocument(id, newContent) {
    try {
      await axios.put(
        `${BACKEND_URL}/api/documents/update/${id}`,
        { content: newContent },
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      const res = await axios.get(
        `${BACKEND_URL}/api/documents/my`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setDocuments(res.data);
      toast.success("Document updated successfully!");
    } catch {
      toast.error("Failed to update document");
    }
  }

  // Delete a document
  async function handleDeleteDocument(id) {
    try {
      await axios.delete(
        `${BACKEND_URL}/api/documents/delete/${id}`,
        { headers: { Authorization: "Bearer " + localStorage.getItem("token") } }
      );
      setDocuments((docs) => docs.filter((doc) => doc._id !== id));
      toast.success("Document deleted successfully!");
    } catch {
      toast.error("Failed to delete document");
    }
  }

  // Format document content for PDF
  function formatDocumentContent(text) {
    const paragraphs = text.split('\n\n');
    return paragraphs.map(para => {
      const cleaned = para.replace(/\s+/g, ' ').trim();
      if (cleaned.match(/^[A-Z][A-Z\s]+:$/)) {
        return cleaned;
      }
      return `    ${cleaned}`;
    }).join('\n\n');
  }

  // Download document as PDF
  function handleDownloadPDF(docText) {
    const doc = new jsPDF();
    doc.setProperties({
      title: 'Legal Complaint Document',
      subject: 'Formal Complaint Submission',
      author: user?.name || 'LawPal User'
    });
    doc.setFontSize(16);
    doc.setFont('helvetica', 'bold');
    doc.setTextColor(40, 53, 147);
    doc.text('FORMAL LEGAL COMPLAINT', 105, 20, { align: 'center' });
    doc.setDrawColor(40, 53, 147);
    doc.setLineWidth(0.5);
    doc.line(20, 25, 190, 25);
    doc.setFontSize(12);
    doc.setFont('times', 'normal');
    doc.setTextColor(0, 0, 0);
    const formattedText = formatDocumentContent(docText);
    const lines = doc.splitTextToSize(formattedText, 170);
    let yPosition = 35;
    let isFirstLine = true;
    lines.forEach(line => {
      if (line.match(/^[A-Z][A-Z\s]+:$/)) {
        if (!isFirstLine) yPosition += 10;
        doc.setFont('helvetica', 'bold');
        doc.setTextColor(40, 53, 147);
        doc.text(line, 20, yPosition);
        doc.setFont('times', 'normal');
        doc.setTextColor(0, 0, 0);
        yPosition += 10;
      } else {
        doc.text(line, 20, yPosition);
        yPosition += 7;
      }
      isFirstLine = false;
      if (yPosition > 270) {
        doc.addPage();
        yPosition = 20;
      }
    });
    doc.setFontSize(10);
    doc.setTextColor(100, 100, 100);
    doc.text('Generated by LawPal - Confidential Legal Document', 105, 285, { align: 'center' });
    doc.save(`Complaint_${new Date().toISOString().slice(0,10)}.pdf`);
  }

  // Format generated document for preview
  function formatGeneratedDocument(text) {
    const sections = text.split('\n\n');
    return sections.map((section, index) => {
      const cleaned = section.replace(/\s+/g, ' ').trim();
      if (cleaned.match(/^[A-Z][A-Z\s]+:$/)) {
        return (
          <h4 key={index} className="font-bold text-indigo-700 mt-6 mb-3 uppercase text-sm tracking-wider">
            {cleaned.replace(':', '')}
          </h4>
        );
      } else if (cleaned.match(/^\d+\./)) {
        return (
          <div key={index} className="ml-6 pl-4 border-l-2 border-indigo-200 my-3">
            <p className="text-gray-800">{cleaned}</p>
          </div>
        );
      } else {
        return (
          <p key={index} className="my-4 text-gray-800 text-justify leading-relaxed">
            {cleaned}
          </p>
        );
      }
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 to-blue-50 py-8 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8">
          <div>
            <h2 className="text-2xl sm:text-3xl font-bold text-indigo-800">Welcome Back, {user?.name || 'User'}!</h2>
            <p className="text-indigo-600">Manage your legal documents</p>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex gap-2 bg-white/80 backdrop-blur-sm p-1 rounded-xl shadow-sm border border-gray-200">
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "generate"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md"
                  : "bg-transparent text-indigo-600 hover:bg-indigo-50"
              }`}
              onClick={() => setActiveTab("generate")}
            >
              Generate
            </button>
            <button
              className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                activeTab === "history"
                  ? "bg-gradient-to-r from-indigo-600 to-blue-600 text-white shadow-md"
                  : "bg-transparent text-indigo-600 hover:bg-indigo-50"
              }`}
              onClick={() => setActiveTab("history")}
            >
              History
            </button>
          </div>
        </div>

        {/* Generate Tab */}
        {activeTab === "generate" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Generate New Legal Document
                </h3>
              </div>
              
              <ComplaintForm onGenerate={handleGenerate} loading={loading} />
              
              {/* Preview Section */}
              {generatedDoc && (
                <div className="mt-8">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <h4 className="text-lg font-semibold text-indigo-700">
                      Document Preview
                    </h4>
                    <div className="flex flex-wrap gap-2 w-full sm:w-auto">
                      <button
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gradient-to-r from-green-600 to-emerald-600 text-white font-medium hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={handleSave}
                        disabled={saving}
                      >
                        {saving ? (
                          <>
                            <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                            </svg>
                            Saving...
                          </>
                        ) : (
                          <>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7H5a2 2 0 00-2 2v9a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-3m-1 4l-3 3m0 0l-3-3m3 3V4" />
                            </svg>
                            Save to History
                          </>
                        )}
                      </button>
                      <button
                        className="flex-1 sm:flex-none px-4 py-2 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:shadow-md transition-all duration-300 flex items-center justify-center gap-2"
                        onClick={() => handleDownloadPDF(generatedDoc)}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>
                        Download PDF
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-6 border border-gray-200 prose max-w-none">
                    {formatGeneratedDocument(generatedDoc)}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}

        {/* History Tab */}
        {activeTab === "history" && (
          <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
            <div className="p-6 sm:p-8">
              <div className="flex items-center gap-3 mb-6">
                <div className="p-2 rounded-lg bg-indigo-100 text-indigo-600">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900">
                  Your Document History
                </h3>
              </div>
              
              {documents.length === 0 ? (
                <div className="text-center py-12">
                  <div className="mx-auto w-24 h-24 bg-indigo-100 rounded-full flex items-center justify-center mb-4">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-indigo-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-medium text-gray-700 mb-2">No documents found</h4>
                  <p className="text-gray-500 mb-4">Generate your first legal document to get started</p>
                  <button
                    onClick={() => setActiveTab("generate")}
                    className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-300"
                  >
                    Generate Document
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {documents.map((doc) => (
                    <div key={doc._id} className="group bg-white rounded-xl border border-gray-200 hover:border-indigo-300 transition-all duration-300 overflow-hidden shadow-sm hover:shadow-md">
                      <div className="p-4 sm:p-6">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-3">
                          <h4 className="font-semibold text-indigo-700 truncate">
                            {doc.title || `Document ${doc._id.slice(-6)}`}
                          </h4>
                          <div className="flex gap-2">
                            <button
                              className="px-3 py-1.5 rounded-lg bg-indigo-100 text-indigo-600 hover:bg-indigo-200 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
                              onClick={() => setEditingDoc(doc)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                              </svg>
                              Edit
                            </button>
                            <button
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-600 hover:bg-red-200 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
                              onClick={() => handleDeleteDocument(doc._id)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                              </svg>
                              Delete
                            </button>
                            <button
                              className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-600 hover:bg-blue-200 transition-colors duration-300 text-sm font-medium flex items-center gap-1"
                              onClick={() => handleDownloadPDF(doc.content)}
                            >
                              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                              </svg>
                              PDF
                            </button>
                          </div>
                        </div>
                        <div className="bg-gray-50 rounded-lg p-4 text-gray-700 text-sm whitespace-pre-line border border-gray-100">
                          {doc.content.length > 300 ? (
                            <>
                              {doc.content.slice(0, 300)}...
                              <span className="text-indigo-600 font-medium ml-2">[Read more]</span>
                            </>
                          ) : doc.content}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Edit Document Modal */}
        {editingDoc && (
          <EditDocumentModal
            document={editingDoc}
            onClose={() => setEditingDoc(null)}
            onSave={async (newContent) => {
              await handleUpdateDocument(editingDoc._id, newContent);
              setEditingDoc(null);
            }}
          />
        )}
      </div>
    </div>
  );
}