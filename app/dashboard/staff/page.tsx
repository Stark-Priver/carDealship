import { updateStaffProfile } from "@app/actions";
import { requireAnyRole } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

type StaffItem = {
  id: string;
  full_name: string | null;
  email: string;
  role: "ADMIN" | "STAFF";
  is_active: boolean;
  branch_id: string | null;
  branches: { name: string } | null;
};

type BranchOption = {
  id: string;
  name: string;
};

export default async function StaffPage() {
  await requireAnyRole(["ADMIN"]);
  const supabase = createClient();

  const { data: staff } = await supabase
    .from("profiles")
    .select("id, full_name, role, is_active, branch_id, branches(name), auth_users:auth.users(email)")
    .in("role", ["ADMIN", "STAFF"])
    .order("created_at", { ascending: false });

  const { data: branches } = await supabase.from("branches").select("id, name").order("name", { ascending: true });

  const staffList = ((staff ?? []) as any[]).map((row) => ({
    id: row.id,
    full_name: row.full_name,
    email: row.auth_users?.email ?? "",
    role: row.role,
    is_active: row.is_active,
    branch_id: row.branch_id,
    branches: row.branches,
  })) as StaffItem[];
  const branchOptions = (branches ?? []) as BranchOption[];

  return (
    <div>
      <h1 className='text-2xl font-bold text-text-brand-primary mb-6'>Staff Management</h1>
      <div className='dashboard-card overflow-x-auto'>
        <table className='dashboard-table'>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Branch</th>
              <th>Status</th>
              <th>Save</th>
            </tr>
          </thead>
          <tbody>
            {staffList.map((person) => (
              <tr key={person.id}>
                <td>{person.full_name || person.id}</td>
                <td>{person.email || "-"}</td>
                <td>
                  <form action={updateStaffProfile} className='flex items-center gap-2'>
                    <input type='hidden' name='id' value={person.id} />
                    <select name='role' defaultValue={person.role} className='form-select text-sm'>
                      <option value='STAFF'>STAFF</option>
                      <option value='ADMIN'>ADMIN</option>
                    </select>
                </td>
                <td>
                    <select name='branchId' defaultValue={person.branch_id || ""} className='form-select text-sm'>
                      <option value=''>Unassigned</option>
                      {branchOptions.map((branch) => (
                        <option key={branch.id} value={branch.id}>{branch.name}</option>
                      ))}
                    </select>
                </td>
                <td>
                    <label className='flex items-center gap-2 text-sm'>
                      <input type='checkbox' name='isActive' defaultChecked={person.is_active} />
                      {person.is_active ? "Active" : "Inactive"}
                    </label>
                </td>
                <td>
                    <button type='submit' className='px-3 py-2 rounded-lg border border-[var(--border-default)] text-sm'>
                      Update
                    </button>
                  </form>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
