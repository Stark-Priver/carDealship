import { createClient } from "@lib/supabase/server";

export async function getFeaturedVehicles(limit = 6) {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("id, stock_number, make, model, year, price, mileage, fuel_type, transmission, status, primary_image, is_featured, branches(name)")
    .or("is_featured.eq.true,status.eq.AVAILABLE")
    .order("created_at", { ascending: false })
    .limit(limit);

  return (data ?? []).map((row: any) => ({
    id: row.id,
    stockNumber: row.stock_number,
    make: row.make,
    model: row.model,
    year: row.year,
    price: row.price,
    mileage: row.mileage,
    fuelType: row.fuel_type,
    transmission: row.transmission,
    status: row.status,
    primaryImage: row.primary_image || "/hero.png",
    branch: row.branches?.name || "Unknown",
    isFeatured: row.is_featured,
  }));
}

export async function getVehicles() {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("id, stock_number, make, model, year, price, mileage, fuel_type, transmission, status, primary_image, is_featured, branches(name)")
    .order("created_at", { ascending: false });

  return (data ?? []).map((row: any) => ({
    id: row.id,
    stockNumber: row.stock_number,
    make: row.make,
    model: row.model,
    year: row.year,
    price: row.price,
    mileage: row.mileage,
    fuelType: row.fuel_type,
    transmission: row.transmission,
    status: row.status,
    primaryImage: row.primary_image || "/hero.png",
    branch: row.branches?.name || "Unknown",
    isFeatured: row.is_featured,
  }));
}

export async function getVehicleById(id: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicles")
    .select("*, branches(*)")
    .eq("id", id)
    .maybeSingle();

  return data;
}

export async function getVehicleImages(vehicleId: string) {
  const supabase = createClient();
  const { data } = await supabase
    .from("vehicle_images")
    .select("image_url")
    .eq("vehicle_id", vehicleId)
    .order("created_at", { ascending: true });

  return (data ?? []).map((item) => item.image_url);
}

export async function getBranches() {
  const supabase = createClient();
  const { data } = await supabase.from("branches").select("*").order("name", { ascending: true });
  return data ?? [];
}

export async function getDashboardStats() {
  const supabase = createClient();
  const [vehiclesRes, inquiriesRes, sellRequestsRes] = await Promise.all([
    supabase.from("vehicles").select("id, status", { count: "exact" }),
    supabase.from("inquiries").select("id", { count: "exact" }),
    supabase.from("sell_requests").select("id", { count: "exact" }),
  ]);

  const vehicles = vehiclesRes.data ?? [];
  const availableVehicles = vehicles.filter((v) => v.status === "AVAILABLE").length;

  return {
    totalVehicles: vehiclesRes.count ?? 0,
    availableVehicles,
    inquiriesThisMonth: inquiriesRes.count ?? 0,
    pendingSellRequests: sellRequestsRes.count ?? 0,
  };
}
