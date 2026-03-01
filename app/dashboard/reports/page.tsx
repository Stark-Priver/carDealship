"use client";

import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell, Legend } from "recharts";
import { mockMonthlySales, mockInventoryByStatus, mockDashboardStats } from "@lib/mockData";
import { Download, TrendingUp } from "lucide-react";

const weeklyInquiries = [
  { day: "Mon", count: 12 },
  { day: "Tue", count: 19 },
  { day: "Wed", count: 15 },
  { day: "Thu", count: 22 },
  { day: "Fri", count: 28 },
  { day: "Sat", count: 18 },
  { day: "Sun", count: 5 },
];

const branchPerformance = [
  { branch: "DSM", sold: 45, revenue: 3200000000 },
  { branch: "Mwanza", sold: 22, revenue: 1500000000 },
  { branch: "Arusha", sold: 18, revenue: 1200000000 },
  { branch: "Dodoma", sold: 12, revenue: 800000000 },
];

export default function ReportsPage() {
  return (
    <div>
      <div className='flex items-center justify-between mb-6'>
        <h1 className='text-2xl font-bold text-text-brand-primary'>Reports & Analytics</h1>
        <button className='flex items-center gap-2 px-4 py-2 rounded-xl border border-[var(--border-default)] text-sm font-medium text-text-brand-secondary hover:bg-surface-muted transition-colors'>
          <Download size={16} />
          Export Report
        </button>
      </div>

      {/* KPI Summary */}
      <div className='grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {[
          { label: "Total Vehicles", value: String(mockDashboardStats.totalVehicles), change: "+24%" },
          { label: "Vehicles Sold", value: "97", change: "+18%" },
          { label: "Available", value: String(mockDashboardStats.availableVehicles), change: "+5%" },
          { label: "Inquiries", value: String(mockDashboardStats.inquiriesThisMonth), change: "+2%" },
        ].map((kpi) => (
          <div key={kpi.label} className='dashboard-card'>
            <p className='text-xs text-text-brand-muted mb-1'>{kpi.label}</p>
            <p className='text-xl font-bold font-mono text-text-brand-primary'>{kpi.value}</p>
            <div className='flex items-center gap-1 mt-1 text-xs text-status-success'>
              <TrendingUp size={12} />
              {kpi.change}
            </div>
          </div>
        ))}
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8'>
        {/* Revenue Chart */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Monthly Revenue</h3>
          <div className='h-[280px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <BarChart data={mockMonthlySales}>
                <XAxis dataKey='month' tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-default)" }}
                />
                <Bar dataKey='sales' fill='var(--brand-accent)' radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Weekly Inquiries Line Chart */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Weekly Inquiries</h3>
          <div className='h-[280px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <LineChart data={weeklyInquiries}>
                <XAxis dataKey='day' tick={{ fontSize: 12 }} />
                <YAxis tick={{ fontSize: 12 }} />
                <Tooltip
                  contentStyle={{ borderRadius: "12px", border: "1px solid var(--border-default)" }}
                />
                <Line
                  type='monotone'
                  dataKey='count'
                  stroke='var(--brand-accent)'
                  strokeWidth={2}
                  dot={{ r: 4, fill: 'var(--brand-accent)' }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* Inventory Status */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Inventory Breakdown</h3>
          <div className='h-[280px]'>
            <ResponsiveContainer width='100%' height='100%'>
              <PieChart>
                <Pie
                  data={mockInventoryByStatus}
                  cx='50%'
                  cy='50%'
                  innerRadius={60}
                  outerRadius={90}
                  dataKey='value'
                  nameKey='name'
                  paddingAngle={3}
                >
                  {mockInventoryByStatus.map((entry, index) => (
                    <Cell key={index} fill={entry.color} />
                  ))}
                </Pie>
                <Legend verticalAlign='bottom' />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Branch Performance */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Branch Performance</h3>
          <div className='overflow-x-auto'>
            <table className='dashboard-table'>
              <thead>
                <tr>
                  <th>Branch</th>
                  <th>Sold</th>
                  <th>Revenue</th>
                </tr>
              </thead>
              <tbody>
                {branchPerformance.map((bp) => (
                  <tr key={bp.branch}>
                    <td className='font-medium'>{bp.branch}</td>
                    <td className='font-mono'>{bp.sold}</td>
                    <td className='font-mono text-sm'>TZS {bp.revenue.toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
