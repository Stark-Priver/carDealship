import { getDashboardStats } from "@lib/data";
import { createClient } from "@lib/supabase/server";
import { requireAppSession } from "@lib/auth";

export default async function DashboardPage() {
  const session = await requireAppSession();
  const supabase = createClient();
  const stats = await getDashboardStats();

  const { data: recentInquiries } = await supabase
    .from("inquiries")
    .select("id, customer_name, phone, status, created_at, vehicles(make, model, year)")
    .order("created_at", { ascending: false })
    .limit(6);

  const { data: recentSellRequests } = await supabase
    .from("sell_requests")
    .select("id, full_name, make, model, year, asking_price, status, created_at")
    .order("created_at", { ascending: false })
    .limit(6);

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-2'>Dashboard</h1>
      <p className='text-sm text-text-brand-muted mb-6'>Welcome back, {session.fullName || "User"}.</p>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5 mb-8'>
        <div className='dashboard-card'><p className='text-sm text-text-brand-muted'>Total Vehicles</p><p className='text-2xl font-bold font-mono'>{stats.totalVehicles}</p></div>
        <div className='dashboard-card'><p className='text-sm text-text-brand-muted'>Available Vehicles</p><p className='text-2xl font-bold font-mono'>{stats.availableVehicles}</p></div>
        <div className='dashboard-card'><p className='text-sm text-text-brand-muted'>Inquiries</p><p className='text-2xl font-bold font-mono'>{stats.inquiriesThisMonth}</p></div>
        <div className='dashboard-card'><p className='text-sm text-text-brand-muted'>Sell Requests</p><p className='text-2xl font-bold font-mono'>{stats.pendingSellRequests}</p></div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        <div className='dashboard-card overflow-x-auto'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Recent Inquiries</h3>
          <table className='dashboard-table'>
            <thead><tr><th>Customer</th><th>Vehicle</th><th>Status</th><th>Date</th></tr></thead>
            <tbody>
              {(recentInquiries ?? []).map((inq: any) => (
                <tr key={inq.id}>
                  <td>{inq.customer_name}</td>
                  <td>{inq.vehicles ? `${inq.vehicles.year} ${inq.vehicles.make} ${inq.vehicles.model}` : "-"}</td>
                  <td>{inq.status}</td>
                  <td>{new Date(inq.created_at).toLocaleDateString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className='dashboard-card overflow-x-auto'>
          <h3 className='font-semibold text-text-brand-primary mb-4'>Recent Sell Requests</h3>
          <table className='dashboard-table'>
            <thead><tr><th>Seller</th><th>Vehicle</th><th>Price</th><th>Status</th></tr></thead>
            <tbody>
              {(recentSellRequests ?? []).map((req) => (
                <tr key={req.id}>
                  <td>{req.full_name}</td>
                  <td>{req.make} {req.model} ({req.year})</td>
                  <td>TZS {req.asking_price.toLocaleString()}</td>
                  <td>{req.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
