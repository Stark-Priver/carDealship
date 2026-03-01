"use client";

import { ClipboardCheck, Star, AlertCircle, CheckCircle2 } from "lucide-react";

const mockInspections = [
  {
    id: "insp-1",
    vehicleTitle: "2020 Toyota Hilux",
    stockNumber: "BM-2024-004",
    inspector: "John Mwangi",
    date: "2024-01-18",
    status: "COMPLETED",
    rating: 4.2,
    notes: "Vehicle in good condition. Minor scratches on rear bumper.",
  },
  {
    id: "insp-2",
    vehicleTitle: "2019 Honda CR-V",
    stockNumber: "BM-2024-006",
    inspector: "Grace Nyambura",
    date: "2024-01-17",
    status: "IN_PROGRESS",
    rating: null,
    notes: "Awaiting engine diagnostics results.",
  },
  {
    id: "insp-3",
    vehicleTitle: "2023 Suzuki Vitara",
    stockNumber: "BM-2024-008",
    inspector: "Alex Kimani",
    date: "2024-01-16",
    status: "SCHEDULED",
    rating: null,
    notes: "Scheduled for full 150-point inspection.",
  },
  {
    id: "insp-4",
    vehicleTitle: "2021 Toyota Land Cruiser Prado",
    stockNumber: "BM-2024-001",
    inspector: "John Mwangi",
    date: "2024-01-15",
    status: "COMPLETED",
    rating: 4.8,
    notes: "Excellent condition. All systems operational. Clean import.",
  },
];

const statusColors: Record<string, string> = {
  COMPLETED: "bg-green-100 text-green-700",
  IN_PROGRESS: "bg-blue-100 text-blue-700",
  SCHEDULED: "bg-yellow-100 text-yellow-700",
};

const statusIcons: Record<string, typeof CheckCircle2> = {
  COMPLETED: CheckCircle2,
  IN_PROGRESS: ClipboardCheck,
  SCHEDULED: AlertCircle,
};

export default function InspectionsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Inspections</h1>

      <div className='space-y-4'>
        {mockInspections.map((insp) => {
          const StatusIcon = statusIcons[insp.status] || AlertCircle;
          return (
            <div key={insp.id} className='dashboard-card'>
              <div className='flex flex-col sm:flex-row sm:items-center justify-between gap-4'>
                <div className='flex items-start gap-4'>
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    insp.status === "COMPLETED" ? "bg-green-100" :
                    insp.status === "IN_PROGRESS" ? "bg-blue-100" : "bg-yellow-100"
                  }`}>
                    <StatusIcon size={20} className={
                      insp.status === "COMPLETED" ? "text-green-600" :
                      insp.status === "IN_PROGRESS" ? "text-blue-600" : "text-yellow-600"
                    } />
                  </div>
                  <div>
                    <h4 className='font-semibold text-text-brand-primary'>{insp.vehicleTitle}</h4>
                    <p className='text-xs font-mono text-text-brand-muted'>{insp.stockNumber}</p>
                    <p className='text-sm text-text-brand-secondary mt-1'>{insp.notes}</p>
                  </div>
                </div>
                <div className='flex items-center gap-4 sm:text-right'>
                  <div>
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColors[insp.status]}`}>
                      {insp.status.replace("_", " ")}
                    </span>
                    <p className='text-xs text-text-brand-muted mt-1'>{insp.date}</p>
                    <p className='text-xs text-text-brand-muted'>By: {insp.inspector}</p>
                  </div>
                  {insp.rating && (
                    <div className='flex items-center gap-1 bg-yellow-50 px-3 py-1.5 rounded-lg'>
                      <Star size={14} className='text-yellow-500 fill-yellow-500' />
                      <span className='text-sm font-semibold'>{insp.rating}</span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
