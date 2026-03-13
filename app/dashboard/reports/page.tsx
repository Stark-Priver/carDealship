import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

export default async function ReportsPage() {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const [vehiclesRes, inquiriesRes, sellRes, ordersRes] = await Promise.all([
    supabase.from("vehicles").select("id, status, branch_id"),
    supabase.from("inquiries").select("id, status"),
    supabase.from("sell_requests").select("id, status"),
    supabase.from("orders").select("id, total_amount, status"),
  ]);

  const vehicles = vehiclesRes.data ?? [];
  const inquiries = inquiriesRes.data ?? [];
  const sellRequests = sellRes.data ?? [];
  const orders = ordersRes.data ?? [];

  const totalRevenue = orders
    .filter((o) => o.status !== "CANCELLED")
    .reduce((sum, order) => sum + order.total_amount, 0);

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Reports & Analytics</h1>

      <div className='grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 mb-8'>
        <div className='dashboard-card'><p className='text-xs text-text-brand-muted'>Total Vehicles</p><p className='text-2xl font-mono font-bold'>{vehicles.length}</p></div>
        <div className='dashboard-card'><p className='text-xs text-text-brand-muted'>Total Inquiries</p><p className='text-2xl font-mono font-bold'>{inquiries.length}</p></div>
        <div className='dashboard-card'><p className='text-xs text-text-brand-muted'>Sell Requests</p><p className='text-2xl font-mono font-bold'>{sellRequests.length}</p></div>
        <div className='dashboard-card'><p className='text-xs text-text-brand-muted'>Revenue (Orders)</p><p className='text-2xl font-mono font-bold'>TZS {totalRevenue.toLocaleString()}</p></div>
      </div>

      <div className='grid grid-cols-1 xl:grid-cols-2 gap-6'>
        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-3'>Vehicle Status</h3>
          <ul className='space-y-2 text-sm'>
            <li>Available: {vehicles.filter((v) => v.status === "AVAILABLE").length}</li>
            <li>Reserved: {vehicles.filter((v) => v.status === "RESERVED").length}</li>
            <li>Sold: {vehicles.filter((v) => v.status === "SOLD").length}</li>
          </ul>
        </div>

        <div className='dashboard-card'>
          <h3 className='font-semibold text-text-brand-primary mb-3'>Inquiry Status</h3>
          <ul className='space-y-2 text-sm'>
            <li>New: {inquiries.filter((i) => i.status === "NEW").length}</li>
            <li>Contacted: {inquiries.filter((i) => i.status === "CONTACTED").length}</li>
            <li>Negotiating: {inquiries.filter((i) => i.status === "NEGOTIATING").length}</li>
            <li>Closed Won: {inquiries.filter((i) => i.status === "CLOSED_WON").length}</li>
            <li>Closed Lost: {inquiries.filter((i) => i.status === "CLOSED_LOST").length}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
