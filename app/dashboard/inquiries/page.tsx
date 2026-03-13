import { updateInquiryStatus } from "@app/actions";
import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

interface InquiriesPageProps {
  searchParams: { status?: string; q?: string };
}

const statusOptions = ["NEW", "CONTACTED", "NEGOTIATING", "CLOSED_WON", "CLOSED_LOST"] as const;

export default async function InquiriesPage({ searchParams }: InquiriesPageProps) {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const { data } = await supabase
    .from("inquiries")
    .select("id, customer_name, phone, email, status, message, created_at, vehicles(make, model, year)")
    .order("created_at", { ascending: false });

  const filtered = (data ?? []).filter((inq) => {
    const q = (searchParams.q || "").toLowerCase();
    const matchesQ =
      !q ||
      inq.customer_name.toLowerCase().includes(q) ||
      `${inq.vehicles?.make || ""} ${inq.vehicles?.model || ""}`.toLowerCase().includes(q);
    const matchesStatus = !searchParams.status || searchParams.status === "ALL" || inq.status === searchParams.status;
    return matchesQ && matchesStatus;
  });

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Inquiries</h1>

      <form className='dashboard-card mb-6 grid grid-cols-1 sm:grid-cols-[1fr_220px_auto] gap-3'>
        <input name='q' defaultValue={searchParams.q || ""} className='form-input' placeholder='Search inquiries' />
        <select name='status' defaultValue={searchParams.status || "ALL"} className='form-select'>
          <option value='ALL'>All statuses</option>
          {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
        </select>
        <button type='submit' className='px-4 py-2 rounded-lg border border-[var(--border-default)]'>Apply</button>
      </form>

      <div className='grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5'>
        {filtered.map((inq) => (
          <div key={inq.id} className='dashboard-card'>
            <p className='text-xs text-text-brand-muted'>{new Date(inq.created_at).toLocaleString()}</p>
            <h4 className='font-semibold mt-1'>{inq.customer_name}</h4>
            <p className='text-sm text-text-brand-muted mt-1'>{inq.phone}{inq.email ? ` • ${inq.email}` : ""}</p>
            <p className='text-sm mt-2'>
              {inq.vehicles ? `${inq.vehicles.year} ${inq.vehicles.make} ${inq.vehicles.model}` : "-"}
            </p>
            {inq.message && <p className='text-sm text-text-brand-muted mt-2'>{inq.message}</p>}

            <form action={updateInquiryStatus} className='mt-4 flex gap-2'>
              <input type='hidden' name='id' value={inq.id} />
              <select name='status' defaultValue={inq.status} className='form-select text-sm'>
                {statusOptions.map((status) => <option key={status} value={status}>{status}</option>)}
              </select>
              <button type='submit' className='px-3 py-2 rounded-lg bg-brand-accent text-white text-sm'>Update</button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
