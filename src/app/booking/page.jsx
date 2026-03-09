import BookingBox from "../components/BookingBox";

export default function Booking() {
  return (
    <div className=" flex flex-col mt-10 items-center justify-center bg-gray-100">
      <h1 className="text-4xl font-bold text-gray-800">Booking Page</h1>
      <p className="mt-4 text-lg text-gray-600">This is where the booking form will go.</p>
      <BookingBox />

    </div>
  );
}