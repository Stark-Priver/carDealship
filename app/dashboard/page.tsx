"use client";

import { Car, MessageSquare, HandCoins, Building2, TrendingUp, TrendingDown } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, Legend } from "recharts";
import { mockDashboardStats, mockMonthlySales, mockInventoryByStatus, mockInquiries, mockSellRequests } from "@lib/mockData";

const statCards = [
  {
    label: "Total Vehicles",
    value: mockDashboardStats.totalVehicles,
    change: `+${mockDashboardStats.totalVehiclesTrend}%`,
    trend: "up" as const,
    icon: Car,
    color: "text-brand-accent",
    bg: "bg-brand-accent/10",
  },
  {
    label: "Inquiries (Month)",
    value: mockDashboardStats.inquiriesThisMonth,
    change: `+${mockDashboardStats.inquiriesTrend}%`,
    trend: "up" as const,
    icon: MessageSquare,
    color: "text-status-success",
    bg: "bg-status-success/10",
  },
  {
    label: "Sell Requests",
    value: mockDashboardStats.pendingSellRequests,
    change: `+${mockDashboardStats.sellRequestsTrend}%`,
    trend: "up" as const,
    icon: HandCoins,
    color: "text-status-warning",
    bg: "bg-status-warning/10",
  },
  {
    label: "Available Vehicles",
    value: mockDashboardStats.availableVehicles,
    change: `${mockDashboardStats.availableTrend}%`,
    trend: "down" as const,
    icon: Building2,
    color: "text-brand-navy",
    bg: "bg-brand-navy/10",
  },
];

export default function DashboardPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Dashboard</h1>

      {/* Stat Cards */}
      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8'>
        {statCards.map((card) => (
          <div
            key={card.label}
            className='dashboard-card'
          >
            <div className='flex items-center justify-between mb-3'>
              <div className={`w-10 h-10 rounded-xl ${card.bg} flex items-center justify-center`}>
                <card.icon size={20} className={card.color} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                card.trend === "up" ? "text-status-success" : "text-status-error"
              }`}>
                {card.trend === "up" ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                {card.change}
              </div>
            </div>
            <p className='text-2xl font-bold text-text-brand-primary font-mono'>{card.value}</p>
            <p className='text-sm text-text-brand-muted mt-1'>{card.label}</p>
          </div>
        ))}
      </div>

      {/* Charts */}
      <div className='grid grid-cols-1 xl:grid-cols-[2fr_1fr] gap-6 mb-8'>
        {/* Monthly Sales Bar Chart */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Monthly Sales</h3>
          <div className='h-[300px]'>
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

        {/* Inventory Doughnut */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Inventory Status</h3>
          <div className='h-[300px]'>
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
                <Legend
                  verticalAlign='bottom'
                  formatter={(value: string) => (
                    <span className='text-sm text-text-brand-secondary'>{value}</span>
                  )}
                />
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Tables Row */}
      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        {/* Recent Inquiries */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Recent Inquiries</h3>
          <div className='overflow-x-auto'>
            <table className='dashboard-table'>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Status</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {mockInquiries.slice(0, 5).map((inq) => (
                  <tr key={inq.id}>
                    <td className='font-medium'>{inq.customerName}</td>
                    <td className='text-text-brand-muted'>{inq.vehicleName}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        inq.status === "NEW" ? "bg-blue-100 text-blue-700" :
                        inq.status === "CONTACTED" ? "bg-yellow-100 text-yellow-700" :
                        inq.status === "CLOSED_WON" ? "bg-green-100 text-green-700" :
                        inq.status === "NEGOTIATING" ? "bg-purple-100 text-purple-700" :
                        "bg-gray-100 text-gray-700"
                      }`}>
                        {inq.status}
                      </span>
                    </td>
                    <td className='text-text-brand-muted text-xs'>{inq.date}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent Sell Requests */}
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Recent Sell Requests</h3>
          <div className='overflow-x-auto'>
            <table className='dashboard-table'>
              <thead>
                <tr>
                  <th>Customer</th>
                  <th>Vehicle</th>
                  <th>Price</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {mockSellRequests.slice(0, 5).map((req) => (
                  <tr key={req.id}>
                    <td className='font-medium'>{req.sellerName}</td>
                    <td className='text-text-brand-muted'>{req.make} {req.model} ({req.year})</td>
                    <td className='font-mono text-xs'>TZS {req.askingPrice.toLocaleString()}</td>
                    <td>
                      <span className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs font-medium ${
                        req.status === "PENDING" ? "bg-yellow-100 text-yellow-700" :
                        req.status === "INSPECTION_ASSIGNED" ? "bg-blue-100 text-blue-700" :
                        req.status === "INSPECTED" ? "bg-purple-100 text-purple-700" :
                        req.status === "APPROVED" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"
                      }`}>
                        {req.status}
                      </span>
                    </td>
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
