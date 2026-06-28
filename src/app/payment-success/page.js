'use client';
import { useRouter, useSearchParams } from 'next/navigation';
import { Suspense } from 'react';

function SuccessContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const bookingId = searchParams.get('bookingId');

  return (
    <div className="min-h-screen bg-[#0d1117] flex items-center justify-center p-4">
      <div className="bg-[#161b22] p-8 rounded-2xl shadow-2xl border border-gray-700 max-w-md w-full text-center">
        {/* সাকসেস আইকন */}
        <div className="text-green-500 mb-4">
          <svg className="w-20 h-20 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h2 className="text-2xl font-bold text-white mb-2">Payment Successful!</h2>
        <p className="text-gray-400 mb-6">Thank you! Your payment was successfully processed.</p>
        
        <div className="bg-[#0d1117] p-4 rounded-lg mb-6 border border-gray-600">
          <p className="text-sm text-gray-500 uppercase tracking-wider">Booking ID</p>
          <p className="text-white font-mono mt-1">{bookingId || "N/A"}</p>
        </div>

        <button 
          onClick={() => router.push('/dashboard/user/booked-tickets')}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold py-3 rounded-xl transition duration-300"
        >
          Go to Booked Tickets
        </button>
      </div>
    </div>
  );
}

export default function PaymentSuccess() {
  return (
    <Suspense fallback={<div className="text-white text-center mt-20">Loading...</div>}>
      <SuccessContent />
    </Suspense>
  );
}