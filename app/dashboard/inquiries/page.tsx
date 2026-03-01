"use client";

import { useState } from "react";
import { Search, Eye, MessageCircle, Phone, Mail } from "lucide-react";
import { mockInquiries } from "@lib/mockData";

const statusTabs = ["ALL", "NEW", "CONTACTED", "NEGOTIATING", "CLOSED_WON", "CLOSED_LOST"];
const statusColors: Record<string, string> = {
  NEW: "bg-blue-100 text-blue-700",
  CONTACTED: "bg-yellow-100 text-yellow-700",
  NEGOTIATING: "bg-purple-100 text-purple-700",
  CLOSED_WON: "bg-green-100 text-green-700",
  CLOSED_LOST: "bg-red-100 text-red-700",
};

export default function InquiriesPage() {
  const [activeTab, setActiveTab] = useState("ALL");
  const [search, setSearch] = useState("");

  const filtered = mockInquiries.filter((inq) => {
    const matchesTab = activeTab === "ALL" || inq.status === activeTab;
    const q = search.toLowerCase();
    const matchesSearch =
      !search ||
      inq.customerName.toLowerCase().includes(q) ||
      inq.vehicleName.toLowerCase().includes(q);
    return matchesTab && matchesSearch;
  });

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Inquiries</h1>

      {/* Tabs */}
      <div className='flex flex-wrap items-center gap-2 mb-6'>
        {statusTabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
              activeTab === tab
                ? "bg-brand-accent text-white"
                : "bg-surface-muted text-text-brand-secondary hover:bg-gray-200"
            }`}
          >
            {tab.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Search */}
      <div className='relative mb-6'>
        <Search size={16} className='absolute left-3 top-1/2 -translate-y-1/2 text-text-brand-muted' />
        <input
          type='text'
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder='Search inquiries...'
          className='form-input pl-9 max-w-md'
        />
      </div>

      {/* Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {filtered.map((inq) => (
          <div key={inq.id} className='dashboard-card'>
            <div className='flex items-center justify-between mb-3'>
              <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[inq.status] || "bg-gray-100 text-gray-700"}`}>
                {inq.status.replace("_", " ")}
              </span>
              <span className='text-xs text-text-brand-muted'>{inq.date}</span>
            </div>
            <h4 className='font-semibold text-text-brand-primary mb-1'>{inq.customerName}</h4>
            <p className='text-sm text-text-brand-muted mb-3'>{inq.vehicleName}</p>
            <p className='text-sm text-text-brand-secondary mb-4'>Agent: {inq.agent}</p>
            <div className='flex items-center gap-2 pt-3 border-t border-[var(--border-default)]'>
              <button className='flex-1 flex items-center justify-center gap-1.5 py-2 rounded-lg bg-whatsapp-primary text-white text-sm font-medium hover:bg-whatsapp-dark transition-colors'>
                <MessageCircle size={14} />
                WhatsApp
              </button>
              <button className='p-2 rounded-lg hover:bg-surface-muted transition-colors' title='Call'>
                <Phone size={16} className='text-text-brand-muted' />
              </button>
              <button className='p-2 rounded-lg hover:bg-surface-muted transition-colors' title='Email'>
                <Mail size={16} className='text-text-brand-muted' />
              </button>
              <button className='p-2 rounded-lg hover:bg-surface-muted transition-colors' title='View Details'>
                <Eye size={16} className='text-text-brand-muted' />
              </button>
            </div>
          </div>
        ))}
      </div>

      {filtered.length === 0 && (
        <div className='text-center py-12 text-text-brand-muted'>
          No inquiries found.
        </div>
      )}
    </div>
  );
}
