import { User } from "../responses/user";

export interface ParkingSpace {
    tpk_parking_features: ParkingFeatures;
    tpk_ps_location: ParkingLocation;
    tpk_rating: number;
    tpk_description: string;
    tpk_access_information: string;
    tpk_parking_area: number;
    tpk_has_features: boolean;
    tpk_price_per_hour: number;
    tpk_vehicle_capacity: number;
    tpk_created_on: Date;
    tpk_last_booked: Date;
    tpk_is_booked: boolean;
    tpk_user: User;
    tpk_parkingspace_images: Array <{
        tpk_base64_image: string;
    }>;
  }
  export interface ParkingFeatures{
    tpk_car_charging: boolean;
    tpk_has_car_wash: boolean;
    tpk_has_indoor_parking: boolean;
  }
  export interface ParkingLocation{
      type: string;
      gemoetry: {
          type: string;
          coordinates: number[]
      };
      properties:  {
          address: string;
          city: string;
          country: string;
          area_code: string;
      };
  }