export interface ParkingFeatures
{
    id?: number;
    tpk_has_car_charging: boolean;
    tpk_has_car_wash: boolean;
    tpk_has_indoor_parking: boolean;
}


export interface ParkingLocation
{
    id?:number;
    type: string;
    geometry: 
    {
        type: string;
        coordinates: number[]
    };
    properties:  
    {
        address: string;
        city: string;
        country: string;
        area_code: string;
    };
}



export interface bookings
{   
    id?: number;
    tpk_booking_user: 
    {
        tpk_firebaseid: string;
    },
    tpk_parkingspace: 
    {
        id?: number,
        tpk_ps_name: string;
        tpk_parking_features: ParkingFeatures,
        tpk_ps_location: ParkingLocation
        tpk_user: string;
        tpk_parkingspace_images: Array <
            {
                tpk_base64_image: string;
            }
        >;
        tpk_rating?: number;
        tpk_description: string;
        tpk_access_information: string;
        tpk_price_per_hour: number;
        tpk_parking_area: number;
        tpk_has_features: boolean;
        tpk_vehicle_capacity: number;
        tpk_created_on: Date;
        tpk_last_booked: Date;
        tpk_is_booked: boolean;
    },
    tpk_book_start_datetime: Date;
    tpk_book_end_datetime: Date;
    tpk_book_cancelled: boolean;
}