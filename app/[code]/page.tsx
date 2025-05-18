"use client"

import { getOriginalUrl } from "@/lib/api";
import { useParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react'

const Page = () => {
  const { code } = useParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchOriginalUrlAndRedirect = async () => {
      try {
        setLoading(true);
        const response = await getOriginalUrl(code as string);


        console.log('Response from API:', response.originalUrl);
        if (!response.originalUrl) {
          //  redirect to 404 page
          setError('URL not found');
          setLoading(false);
          return;
        }

        // Redirect to the original URL
        window.location.href = response.originalUrl;
        setLoading(false);

      } catch (err) {
        console.error('Error fetching original URL:', err);
        setError('Something went wrong. Please try again.');
        setLoading(false);
      }
    };

    if (code) {
      fetchOriginalUrlAndRedirect();
    }
  }, [code, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-lg">Redirecting you...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center bg-red-50 p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600 mb-2">Oops!</h2>
          <p className="text-gray-700">{error}</p>
          <button
            onClick={() => router.push('/')}
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
          >
            Go Home
          </button>
        </div>
      </div>
    );
  }

  return null;
};

export default Page;