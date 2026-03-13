import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

type InspectionListItem = {
  id: string;
  status: string;
  rating: number | null;
  notes: string | null;
  scheduled_at: string | null;
  completed_at: string | null;
  sell_requests: { make: string; model: string; year: number } | null;
  vehicles: { make: string; model: string; year: number } | null;
  profiles: { full_name: string | null } | null;
};

export default async function InspectionsPage() {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const { data } = await supabase
    .from("inspections")
    .select("id, status, rating, notes, scheduled_at, completed_at, sell_requests(make, model, year), vehicles(make, model, year), profiles(full_name)")
    .order("created_at", { ascending: false });

  const inspections = (data ?? []) as InspectionListItem[];

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Inspections</h1>

      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Vehicle</th>
              <th>Inspector</th>
              <th>Status</th>
              <th>Rating</th>
              <th>Scheduled</th>
              <th>Completed</th>
              <th>Notes</th>
            </tr>
          </thead>
          <tbody>
            {inspections.map((inspection) => {
              const vehicleName = inspection.vehicles
                ? `${inspection.vehicles.year} ${inspection.vehicles.make} ${inspection.vehicles.model}`
                : inspection.sell_requests
                ? `${inspection.sell_requests.year} ${inspection.sell_requests.make} ${inspection.sell_requests.model}`
                : "-";

              return (
                <tr key={inspection.id}>
                  <td>{vehicleName}</td>
                  <td>{inspection.profiles?.full_name || "-"}</td>
                  <td>{inspection.status}</td>
                  <td>{inspection.rating ?? "-"}</td>
                  <td>{inspection.scheduled_at ? new Date(inspection.scheduled_at).toLocaleDateString() : "-"}</td>
                  <td>{inspection.completed_at ? new Date(inspection.completed_at).toLocaleDateString() : "-"}</td>
                  <td className='text-sm text-text-brand-muted'>{inspection.notes || "-"}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
