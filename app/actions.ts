"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

import { requireAnyRole, requireAppSession } from "@lib/auth";
import { createClient } from "@lib/supabase/server";

export async function submitInquiry(formData: FormData) {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  const vehicleId = String(formData.get("vehicleId") || "");
  const customerName = String(formData.get("customerName") || "").trim();
  const phone = String(formData.get("phone") || "").trim();
  const email = String(formData.get("email") || "").trim() || null;
  const message = String(formData.get("message") || "").trim() || null;

  if (!vehicleId || !customerName || !phone) {
    redirect(`/vehicles/${vehicleId}?error=Missing%20required%20fields`);
  }

  await supabase.from("inquiries").insert({
    vehicle_id: vehicleId,
    buyer_id: authData.user?.id ?? null,
    customer_name: customerName,
    phone,
    email,
    message,
  });

  redirect(`/vehicles/${vehicleId}?success=Inquiry%20submitted`);
}

export async function placeOrder(formData: FormData) {
  const session = await requireAppSession();
  const supabase = createClient();

  const vehicleId = String(formData.get("vehicleId") || "");
  const totalAmount = Number(formData.get("totalAmount") || 0);

  if (!vehicleId || totalAmount <= 0) {
    redirect(`/vehicles/${vehicleId}?error=Invalid%20order`);
  }

  await supabase.from("orders").insert({
    buyer_id: session.userId,
    vehicle_id: vehicleId,
    total_amount: totalAmount,
  });

  revalidatePath("/dashboard");
  redirect("/dashboard/orders?success=Order%20placed");
}

export async function submitSellRequest(formData: FormData) {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  const payload = {
    seller_id: authData.user?.id ?? null,
    full_name: String(formData.get("fullName") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim() || null,
    city: String(formData.get("city") || "").trim(),
    make: String(formData.get("make") || "").trim(),
    model: String(formData.get("model") || "").trim(),
    year: Number(formData.get("year") || 0),
    mileage: Number(formData.get("mileage") || 0),
    transmission: String(formData.get("transmission") || "").trim(),
    fuel_type: String(formData.get("fuelType") || "").trim(),
    condition: String(formData.get("condition") || "").trim(),
    asking_price: Number(formData.get("askingPrice") || 0),
    notes: String(formData.get("notes") || "").trim() || null,
  };

  const { data, error } = await supabase
    .from("sell_requests")
    .insert(payload)
    .select("id")
    .single();

  if (error || !data) {
    redirect("/sell-your-car?error=Failed%20to%20submit%20request");
  }

  const uploadedPhotos = formData.getAll("photos").filter((item) => item instanceof File) as File[];
  for (const photo of uploadedPhotos.slice(0, 10)) {
    if (photo.size <= 0) continue;
    const ext = photo.name.split(".").pop() || "jpg";
    const fileName = `${data.id}/${crypto.randomUUID()}.${ext}`;

    const { error: uploadError } = await supabase.storage
      .from("sell-request-images")
      .upload(fileName, photo, { cacheControl: "3600", upsert: false });

    if (!uploadError) {
      const { data: publicUrlData } = supabase.storage.from("sell-request-images").getPublicUrl(fileName);
      await supabase.from("sell_request_photos").insert({
        sell_request_id: data.id,
        image_url: publicUrlData.publicUrl,
      });
    }
  }

  redirect("/sell-your-car?success=Request%20submitted");
}

export async function submitImportRequest(formData: FormData) {
  const supabase = createClient();
  const { data: authData } = await supabase.auth.getUser();

  await supabase.from("import_requests").insert({
    requester_id: authData.user?.id ?? null,
    full_name: String(formData.get("fullName") || "").trim(),
    phone: String(formData.get("phone") || "").trim(),
    email: String(formData.get("email") || "").trim() || null,
    country: String(formData.get("country") || "").trim(),
    make: String(formData.get("make") || "").trim(),
    model: String(formData.get("model") || "").trim(),
    year_from: Number(formData.get("yearFrom") || 0) || null,
    year_to: Number(formData.get("yearTo") || 0) || null,
    budget: Number(formData.get("budget") || 0) || null,
    fuel_type: String(formData.get("fuelType") || "").trim() || null,
    transmission: String(formData.get("transmission") || "").trim() || null,
    additional_notes: String(formData.get("additionalNotes") || "").trim() || null,
  });

  redirect("/import/request?success=Request%20submitted");
}

export async function submitContactMessage(formData: FormData) {
  const supabase = createClient();
  await supabase.from("contact_messages").insert({
    name: String(formData.get("name") || "").trim(),
    email: String(formData.get("email") || "").trim(),
    phone: String(formData.get("phone") || "").trim() || null,
    subject: String(formData.get("subject") || "").trim(),
    message: String(formData.get("message") || "").trim(),
  });
  redirect("/contact?success=Message%20sent");
}

export async function createVehicle(formData: FormData) {
  const session = await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const { data, error } = await supabase
    .from("vehicles")
    .insert({
      stock_number: String(formData.get("stockNumber") || ""),
      make: String(formData.get("make") || ""),
      model: String(formData.get("model") || ""),
      year: Number(formData.get("year") || 0),
      price: Number(formData.get("price") || 0),
      mileage: Number(formData.get("mileage") || 0),
      fuel_type: String(formData.get("fuelType") || ""),
      transmission: String(formData.get("transmission") || ""),
      body_type: String(formData.get("bodyType") || "") || null,
      color: String(formData.get("color") || "") || null,
      engine_size: String(formData.get("engineSize") || "") || null,
      import_country: String(formData.get("importCountry") || "") || null,
      description: String(formData.get("description") || "") || null,
      description_sw: String(formData.get("descriptionSw") || "") || null,
      status: String(formData.get("status") || "AVAILABLE") as "AVAILABLE" | "RESERVED" | "SOLD",
      branch_id: String(formData.get("branchId") || ""),
      is_featured: formData.get("isFeatured") === "on",
      created_by: session.userId,
    })
    .select("id")
    .single();

  if (error || !data) {
    redirect("/dashboard/vehicles/add?error=Failed%20to%20save%20vehicle");
  }

  const primaryPhoto = formData.get("primaryPhoto");
  if (primaryPhoto instanceof File && primaryPhoto.size > 0) {
    const ext = primaryPhoto.name.split(".").pop() || "jpg";
    const fileName = `${data.id}/primary-${crypto.randomUUID()}.${ext}`;
    const uploadRes = await supabase.storage.from("vehicle-images").upload(fileName, primaryPhoto);
    if (!uploadRes.error) {
      const { data: urlData } = supabase.storage.from("vehicle-images").getPublicUrl(fileName);
      await supabase.from("vehicles").update({ primary_image: urlData.publicUrl }).eq("id", data.id);
      await supabase.from("vehicle_images").insert({ vehicle_id: data.id, image_url: urlData.publicUrl });
    }
  }

  revalidatePath("/vehicles");
  revalidatePath("/dashboard/vehicles");
  redirect("/dashboard/vehicles?success=Vehicle%20saved");
}

export async function updateSellRequestStatus(formData: FormData) {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PENDING");

  await supabase.from("sell_requests").update({ status: status as any }).eq("id", id);
  revalidatePath("/dashboard/sell-requests");
}

export async function updateInquiryStatus(formData: FormData) {
  const session = await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "NEW");
  await supabase
    .from("inquiries")
    .update({ status: status as any, assigned_to: session.userId })
    .eq("id", id);

  revalidatePath("/dashboard/inquiries");
}

export async function updateOrderStatus(formData: FormData) {
  await requireAnyRole(["ADMIN", "STAFF"]);
  const supabase = createClient();

  const id = String(formData.get("id") || "");
  const status = String(formData.get("status") || "PLACED");
  await supabase.from("orders").update({ status: status as any }).eq("id", id);
  revalidatePath("/dashboard/orders");
}
