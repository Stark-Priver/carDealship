import { updateSellRequestStatus } from "@app/actions";
import { requireAppSession } from "@lib/auth";
import { createClient } from "@lib/supabase/server";
import { formatTZS } from "@utils";

interface SellRequestsPageProps {
  searchParams: { q?: string };
}

const statuses = ["PENDING", "INSPECTION_ASSIGNED", "INSPECTED", "APPROVED", "REJECTED"] as const;

export default async function SellRequestsPage({ searchParams }: SellRequestsPageProps) {
  const session = await requireAppSession();
  const supabase = createClient();

  let query = supabase
    .from("sell_requests")
    .select("id, seller_id, full_name, phone, make, model, year, asking_price, status, created_at")
    .order("created_at", { ascending: false });

  if (session.role === "SELLER") {
    query = query.eq("seller_id", session.userId);
  }

  const { data } = await query;

  const filtered = (data ?? []).filter((req) => {
    const q = (searchParams.q || "").toLowerCase();
    if (!q) return true;
    return req.full_name.toLowerCase().includes(q) || `${req.make} ${req.model}`.toLowerCase().includes(q);
  });

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Sell Requests</h1>

      <form className='dashboard-card mb-6 max-w-md flex gap-2'>
        <input name='q' defaultValue={searchParams.q || ""} className='form-input' placeholder='Search requests' />
        <button type='submit' className='px-4 py-2 rounded-lg border border-[var(--border-default)]'>Search</button>
      </form>

      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Seller</th>
              <th>Vehicle</th>
              <th>Asking Price</th>
              <th>Status</th>
              <th>Date</th>
              {session.role !== "SELLER" && <th>Action</th>}
            </tr>
          </thead>
          <tbody>
            {filtered.map((req) => (
              <tr key={req.id}>
                <td>
                  <p className='font-medium'>{req.full_name}</p>
                  <p className='text-xs text-text-brand-muted'>{req.phone}</p>
                </td>
                <td>{req.make} {req.model} ({req.year})</td>
                <td className='font-mono'>{formatTZS(req.asking_price)}</td>
                <td>{req.status}</td>
                <td>{new Date(req.created_at).toLocaleDateString()}</td>
                {session.role !== "SELLER" && (
                  <td>
                    <form action={updateSellRequestStatus} className='flex items-center gap-2'>
                      <input type='hidden' name='id' value={req.id} />
                      <select name='status' defaultValue={req.status} className='form-select text-sm'>
                        {statuses.map((status) => <option key={status} value={status}>{status}</option>)}
                      </select>
                      <button type='submit' className='px-3 py-2 rounded-lg bg-brand-accent text-white text-sm'>Save</button>
                    </form>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
