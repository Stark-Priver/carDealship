export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type AppRole = "ADMIN" | "STAFF" | "BUYER" | "SELLER";
export type VehicleStatus = "AVAILABLE" | "RESERVED" | "SOLD";
export type InquiryStatus = "NEW" | "CONTACTED" | "NEGOTIATING" | "CLOSED_WON" | "CLOSED_LOST";
export type SellRequestStatus = "PENDING" | "INSPECTION_ASSIGNED" | "INSPECTED" | "APPROVED" | "REJECTED";
export type ImportRequestStatus = "NEW" | "REVIEWING" | "QUOTED" | "CLOSED";
export type InspectionStatus = "SCHEDULED" | "IN_PROGRESS" | "COMPLETED";

export interface Database {
  public: {
    Tables: {
      branches: {
        Row: {
          id: string;
          name: string;
          city: string;
          address: string;
          phone: string;
          upcoming: boolean;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          city: string;
          address: string;
          phone: string;
          upcoming?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["branches"]["Insert"]>;
        Relationships: [];
      };
      profiles: {
        Row: {
          id: string;
          full_name: string | null;
          phone: string | null;
          role: AppRole;
          branch_id: string | null;
          is_active: boolean;
          created_at: string;
        };
        Insert: {
          id: string;
          full_name?: string | null;
          phone?: string | null;
          role?: AppRole;
          branch_id?: string | null;
          is_active?: boolean;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["profiles"]["Insert"]>;
        Relationships: [];
      };
      vehicles: {
        Row: {
          id: string;
          stock_number: string;
          make: string;
          model: string;
          year: number;
          price: number;
          mileage: number;
          fuel_type: string;
          transmission: string;
          body_type: string | null;
          color: string | null;
          engine_size: string | null;
          import_country: string | null;
          description: string | null;
          description_sw: string | null;
          status: VehicleStatus;
          branch_id: string;
          primary_image: string | null;
          is_featured: boolean;
          created_by: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          stock_number: string;
          make: string;
          model: string;
          year: number;
          price: number;
          mileage: number;
          fuel_type: string;
          transmission: string;
          body_type?: string | null;
          color?: string | null;
          engine_size?: string | null;
          import_country?: string | null;
          description?: string | null;
          description_sw?: string | null;
          status?: VehicleStatus;
          branch_id: string;
          primary_image?: string | null;
          is_featured?: boolean;
          created_by?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicles"]["Insert"]>;
        Relationships: [];
      };
      vehicle_images: {
        Row: {
          id: string;
          vehicle_id: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          image_url: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["vehicle_images"]["Insert"]>;
        Relationships: [];
      };
      inquiries: {
        Row: {
          id: string;
          vehicle_id: string;
          buyer_id: string | null;
          customer_name: string;
          phone: string;
          email: string | null;
          message: string | null;
          status: InquiryStatus;
          assigned_to: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          vehicle_id: string;
          buyer_id?: string | null;
          customer_name: string;
          phone: string;
          email?: string | null;
          message?: string | null;
          status?: InquiryStatus;
          assigned_to?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["inquiries"]["Insert"]>;
        Relationships: [];
      };
      sell_requests: {
        Row: {
          id: string;
          seller_id: string | null;
          full_name: string;
          phone: string;
          email: string | null;
          city: string;
          make: string;
          model: string;
          year: number;
          mileage: number;
          transmission: string;
          fuel_type: string;
          condition: string;
          asking_price: number;
          status: SellRequestStatus;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          seller_id?: string | null;
          full_name: string;
          phone: string;
          email?: string | null;
          city: string;
          make: string;
          model: string;
          year: number;
          mileage: number;
          transmission: string;
          fuel_type: string;
          condition: string;
          asking_price: number;
          status?: SellRequestStatus;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sell_requests"]["Insert"]>;
        Relationships: [];
      };
      sell_request_photos: {
        Row: {
          id: string;
          sell_request_id: string;
          image_url: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          sell_request_id: string;
          image_url: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["sell_request_photos"]["Insert"]>;
        Relationships: [];
      };
      import_requests: {
        Row: {
          id: string;
          requester_id: string | null;
          full_name: string;
          phone: string;
          email: string | null;
          country: string;
          make: string;
          model: string;
          year_from: number | null;
          year_to: number | null;
          budget: number | null;
          fuel_type: string | null;
          transmission: string | null;
          additional_notes: string | null;
          status: ImportRequestStatus;
          created_at: string;
        };
        Insert: {
          id?: string;
          requester_id?: string | null;
          full_name: string;
          phone: string;
          email?: string | null;
          country: string;
          make: string;
          model: string;
          year_from?: number | null;
          year_to?: number | null;
          budget?: number | null;
          fuel_type?: string | null;
          transmission?: string | null;
          additional_notes?: string | null;
          status?: ImportRequestStatus;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["import_requests"]["Insert"]>;
        Relationships: [];
      };
      inspections: {
        Row: {
          id: string;
          sell_request_id: string | null;
          vehicle_id: string | null;
          inspector_id: string | null;
          scheduled_at: string | null;
          completed_at: string | null;
          status: InspectionStatus;
          rating: number | null;
          notes: string | null;
          created_at: string;
        };
        Insert: {
          id?: string;
          sell_request_id?: string | null;
          vehicle_id?: string | null;
          inspector_id?: string | null;
          scheduled_at?: string | null;
          completed_at?: string | null;
          status?: InspectionStatus;
          rating?: number | null;
          notes?: string | null;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["inspections"]["Insert"]>;
        Relationships: [];
      };
      orders: {
        Row: {
          id: string;
          buyer_id: string;
          vehicle_id: string;
          status: "PLACED" | "CONFIRMED" | "CANCELLED";
          total_amount: number;
          created_at: string;
        };
        Insert: {
          id?: string;
          buyer_id: string;
          vehicle_id: string;
          status?: "PLACED" | "CONFIRMED" | "CANCELLED";
          total_amount: number;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["orders"]["Insert"]>;
        Relationships: [];
      };
      contact_messages: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          subject: string;
          message: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          subject: string;
          message: string;
          created_at?: string;
        };
        Update: Partial<Database["public"]["Tables"]["contact_messages"]["Insert"]>;
        Relationships: [];
      };
    };
    Views: Record<string, never>;
    Functions: Record<string, never>;
    Enums: Record<string, never>;
    CompositeTypes: Record<string, never>;
  };
}
