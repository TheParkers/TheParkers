export interface bookingspace {
    tpk_parkingspace: number;
    tpk_book_start_datetime : Date;
    tpk_book_end_datetime: Date;
    tpk_booking_user: {
        tpk_firebaseid: String
    }
}