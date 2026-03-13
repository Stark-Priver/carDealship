import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

export default async function StaffPage() {
  await requireAnyRole(["ADMIN"]);
  const supabase = createClient();

  const { data: staff } = await supabase
    .from("profiles")
    .select("id, full_name, role, is_active, branches(name)")
    .in("role", ["ADMIN", "STAFF"])
    .order("created_at", { ascending: false });

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Staff Management</h1>
      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {(staff ?? []).map((person) => (
              <tr key={person.id}>
                <td>{person.full_name || person.id}</td>
                <td>{person.role}</td>
                <td>{person.branches?.name || "-"}</td>
                <td>{person.is_active ? "Active" : "Inactive"}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
