'use client';

export default function UpgradePage() {

  return (
    <div className="min-h-screen flex items-center justify-center  p-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl max-w-lg w-full text-center">
        <h1 className="text-3xl font-bold text-purple-600 mb-3">
          Upgrade Your TrackNest Experience 🚀
        </h1>

        <p className="text-gray-600 mb-6">
          Help us improve TrackNest by buying us a coffee! Your support helps us add new features, and grow the platform.
        </p>

        <div className="relative mb-6">
          <img
            src="/payment.jpg"
            alt="UPI QR Code"
            className="mx-auto w-64 h-64 rounded-lg border shadow-md hover:scale-105 transition-transform duration-300"
          />
        </div>

        <p className="text-gray-700 mb-4">Scan this QR Code with your UPI app to support us.</p>

      </div>
    </div>
  );
}
