import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

export default async function BranchesPage() {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const { data: branches } = await supabase.from("branches").select("*").order("name", { ascending: true });
  const { data: vehicles } = await supabase.from("vehicles").select("branch_id, status");
  const { data: staff } = await supabase.from("profiles").select("id, branch_id, role").in("role", ["ADMIN", "STAFF"]);

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Branches</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {(branches ?? []).map((branch) => {
          const branchVehicles = (vehicles ?? []).filter((v) => v.branch_id === branch.id);
          const available = branchVehicles.filter((v) => v.status === "AVAILABLE").length;
          const reserved = branchVehicles.filter((v) => v.status === "RESERVED").length;
          const sold = branchVehicles.filter((v) => v.status === "SOLD").length;
          const branchStaff = (staff ?? []).filter((person) => person.branch_id === branch.id).length;

          return (
            <div key={branch.id} className='dashboard-card'>
              <h3 className='font-semibold text-lg text-text-brand-primary'>{branch.name}</h3>
              <p className='text-sm text-text-brand-muted mt-1'>{branch.address}</p>
              <p className='text-sm text-text-brand-muted'>{branch.phone}</p>

              <div className='grid grid-cols-2 gap-3 mt-4'>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Staff</p>
                  <p className='text-xl font-mono font-bold'>{branchStaff}</p>
                </div>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Available</p>
                  <p className='text-xl font-mono font-bold text-brand-accent'>{available}</p>
                </div>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Reserved</p>
                  <p className='text-xl font-mono font-bold text-status-warning'>{reserved}</p>
                </div>
                <div className='bg-surface-muted rounded-lg p-3'>
                  <p className='text-xs text-text-brand-muted'>Sold</p>
                  <p className='text-xl font-mono font-bold text-status-success'>{sold}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
