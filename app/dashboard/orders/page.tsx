import { updateOrderStatus } from "@app/actions";
import { requireAppSession } from "@lib/auth";
import { createClient } from "@lib/supabase/server";
import { formatTZS } from "@utils";

type OrderListItem = {
  id: string;
  buyer_id: string;
  vehicle_id: string;
  status: "PLACED" | "CONFIRMED" | "CANCELLED";
  total_amount: number;
  created_at: string;
  vehicles: {
    make: string;
    model: string;
    year: number;
    stock_number: string;
  } | null;
};

interface OrdersPageProps {
  searchParams: { success?: string };
}

export default async function OrdersPage({ searchParams }: OrdersPageProps) {
  const session = await requireAppSession();
  const supabase = createClient();

  let query = supabase
    .from("orders")
    .select("id, buyer_id, vehicle_id, status, total_amount, created_at, vehicles(make, model, year, stock_number)")
    .order("created_at", { ascending: false });

  if (session.role === "BUYER") {
    query = query.eq("buyer_id", session.userId);
  }

  const { data } = await query;
  const orders = (data ?? []) as OrderListItem[];

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Orders</h1>
      {searchParams.success && (
        <p className='mb-4 rounded-lg bg-green-50 text-green-700 px-4 py-2 text-sm'>{searchParams.success}</p>
      )}

      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Stock #</th>
              <th>Amount</th>
              <th>Status</th>
              <th>Date</th>
              {session.role !== "BUYER" && <th>Actions</th>}
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order.id}>
                <td>{order.vehicles ? `${order.vehicles.year} ${order.vehicles.make} ${order.vehicles.model}` : "-"}</td>
                <td className='font-mono text-xs'>{order.vehicles?.stock_number || "-"}</td>
                <td className='font-mono'>{formatTZS(order.total_amount)}</td>
                <td>{order.status}</td>
                <td>{new Date(order.created_at).toLocaleDateString()}</td>
                {session.role !== "BUYER" && (
                  <td>
                    <form action={updateOrderStatus} className='flex items-center gap-2'>
                      <input type='hidden' name='id' value={order.id} />
                      <select className='form-select text-sm' name='status' defaultValue={order.status}>
                        <option value='PLACED'>PLACED</option>
                        <option value='CONFIRMED'>CONFIRMED</option>
                        <option value='CANCELLED'>CANCELLED</option>
                      </select>
                      <button type='submit' className='px-3 py-2 rounded-lg bg-brand-accent text-white text-sm'>Update</button>
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
