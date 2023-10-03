export class CreateCompanyvehicleDto {
  //company vehicle details
  id: number;
  registration_mark: string;
  seats: string;
  livery: string;
  default_base: string;
  fleet_no: string;
  vehicle_mobile_no: string;
  license_category: string;
  fuel_type: string;
  automatic: boolean;
  shedule: boolean;
  suspend: boolean;
  subcontractor: boolean;

  //vehicle owner contact details
  owner_mobile_no: string;
  owner_home_no: string;
  owner_email: string;
  emergency_contact_name: string;
  emergency_contact_no: string;
  owner_name: string;
  street: string;
  city: string;
  country: string;
  state: string;
  postal_code: string;

  // vehicle official details
  first_registered: Date;
  date_purchased: Date;
  purchase_distance: string;
  purchase_price: string;
  purchased_from: string;
  date_sold: Date;
  sale_distance: string;
  sale_price: string;
  sold_to: string;
  body_make: string;
  body_no: string;
  chassis_make: string;
  chassis_no: string;
  engine_make: string;

  // vehicle other documents
  images: string;
  documents: string;
  two_point_seat_belt: boolean;
  three_point_seat_belt: boolean;
  air_conditioning: boolean;
  coffee_machine: boolean;
  courier_seat: boolean;
  DVD: boolean;
  fridge: boolean;
  luggageCapacity: boolean;
  mobilePhone: boolean;
  radioPA: boolean;
  rediningSeats: boolean;
  signs: boolean;
  tables: boolean;
  toilet: boolean;
  video: boolean;

  // additional details
  additional_details: string;

  createdat: Date;
  updatedat: Date;
  created_by: number;
  updated_by: number;
  start_date: Date;
  end_date: Date;
}
