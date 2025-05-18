"use client"

import Footer from '@/components/shared/Footer'
import Navbar from '@/components/shared/Navbar'
import AnalysisResult from '@/components/shared/AnalysisResult'
import { findAnalysisData } from '@/lib/api'
import { AlertCircle, Link2, LinkIcon, Search } from 'lucide-react'
import React from 'react'

// Define the type for analysis data
type AnalysisData = {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
  clicks: number;
  visits: {
    ip: string;
    userAgent: string;
    timestamp: Date;
  }[];
}

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || ''

const Page = () => {
  const [searchType, setSearchType] = React.useState<'url' | 'code'>('url')
  const [searchValue, setSearchValue] = React.useState('')
  const [error, setError] = React.useState<string | null>(null)
  const [isLoading, setIsLoading] = React.useState(false)
  const [analysisData, setAnalysisData] = React.useState<AnalysisData | null>(null)

  // Extract code from full URL or return the code itself
  const extractShortCode = (input: string): string => {
    if (!input) return '';

    try {
      // Check if it's a full URL
      if (input.startsWith('http')) {
        const url = new URL(input);
        // Get the last part of the path
        const pathParts = url.pathname.split('/').filter(Boolean);
        return pathParts[pathParts.length - 1] || '';
      }
      // If it contains slashes but isn't a valid URL, try to extract the last part
      if (input.includes('/')) {
        const parts = input.split('/').filter(Boolean);
        return parts[parts.length - 1] || '';
      }
      // Otherwise, assume it's just the code
      return input;
    } catch  {
      // If URL parsing fails, return the original value
      return input;
    }
  };

  const validateInput = (): boolean => {
    if (!searchValue.trim()) {
      setError('Please enter a value to search');
      return false;
    }

    if (searchType === 'url') {
      try {
        new URL(searchValue);
        // URL is valid
      } catch {
        setError('Please enter a valid URL');
        return false;
      }
    } else {
      // For code validation, extract the code first
      const code = extractShortCode(searchValue);
      if (!code) {
        setError('Please enter a valid short code');
        return false;
      }

      // Basic validation for short code format (alphanumeric)
      if (!/^[a-zA-Z0-9]+$/.test(code)) {
        setError('Short code should only contain letters and numbers');
        return false;
      }
    }

    return true;
  };

  const handleSearch = async () => {
    if (!validateInput()) return;

    setError(null);
    setIsLoading(true);
    setAnalysisData(null);

    try {
      const findUrl = {
        originalUrl: searchType === 'url' ? searchValue : undefined,
        shortCode: searchType === 'code' ? extractShortCode(searchValue) : undefined,
      }

      const res = await findAnalysisData(findUrl);

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || 'Failed to fetch analysis data');
      }

      const responseData = await res.json();

      if (responseData.success && responseData.data) {
        setAnalysisData(responseData.data);
      } else {
        throw new Error(responseData.message || 'No data found');
      }
    } catch {
      console.error('Error fetching analysis data:');
      setError('Failed to fetch analysis data. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Handle Enter key press in input field
  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !isLoading) {
      handleSearch();
    }
  };

  return (
    <>
      <div className="min-h-screen bg-background text-foreground flex flex-col relative overflow-hidden">
        <Navbar />
        {/* main content */}
        <main className="flex-1 flex flex-col items-center justify-start px-4 sm:px-6 py-10 sm:py-2 max-w-4xl mx-auto w-full">
          <h3 className="text-3xl font-bold mb-6 text-center">URL Analytics</h3>
          <p className="text-center text-muted-foreground mb-8">
            Analyze your shortened URLs to track performance and visitor data
          </p>

          <div className="w-full max-w-xl glass-card p-5 sm:p-8 rounded-xl relative group mb-8">
            <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-sidebar-primary/50 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
            <div className="relative">
              {/* Tab selection */}
              <div className="flex mb-6 border-b border-border">
                <button
                  onClick={() => setSearchType('url')}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${searchType === 'url' ? 'border-primary text-primary' : 'border-transparent hover:text-primary/80'
                    }`}
                >
                  <LinkIcon className="h-4 w-4" />
                  <span>Original URL</span>
                </button>
                <button
                  onClick={() => setSearchType('code')}
                  className={`flex items-center gap-2 px-4 py-2 border-b-2 transition-colors ${searchType === 'code' ? 'border-primary text-primary' : 'border-transparent hover:text-primary/80'
                    }`}
                >
                  <Link2 className="h-4 w-4" />
                  <span>Short URL</span>
                </button>
              </div>

              {/* Search input */}
              <div className="flex flex-col sm:flex-row gap-3">
                {searchType === 'code' ? (
                  <div className="flex-1 relative">
                    <div className="absolute left-0 top-0 bottom-0 flex items-center pl-4 text-muted-foreground pointer-events-none">
                      {BASE_URL}
                    </div>
                    <input
                      type="text"
                      value={searchValue}
                      onChange={(e) => setSearchValue(e.target.value)}
                      onKeyPress={handleKeyPress}
                      placeholder="AeeoET"
                      className="w-full px-4 py-3 pl-[calc(1rem+var(--base-url-width))] bg-input text-foreground rounded-md border border-border/50 focus:ring-2 focus:ring-accent focus:outline-none shadow-inner transition-all duration-300"
                      disabled={isLoading}
                      style={{ "--base-url-width": `${BASE_URL.length * 0.5}rem` } as React.CSSProperties}
                    />
                  </div>
                ) : (
                  <input
                    type="text"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="https://example.com/long-url"
                    className="flex-1 px-4 py-3 bg-input text-foreground rounded-md border border-border/50 focus:ring-2 focus:ring-accent focus:outline-none shadow-inner transition-all duration-300"
                    disabled={isLoading}
                  />
                )}
                <button
                  onClick={handleSearch}
                  disabled={isLoading}
                  className="relative px-6 py-3 bg-gradient-to-r from-primary to-sidebar-primary text-primary-foreground font-medium rounded-md hover:opacity-90 focus:outline-none transition-all duration-300 shadow-[0_0_15px_rgba(167,139,255,0.2)] hover:shadow-[0_0_20px_rgba(167,139,255,0.4)] border border-white/10 sm:whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                    {isLoading ? (
                      <>
                        <div className="h-4 w-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                        <span>Searching...</span>
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4" />
                        <span>Analyze</span>
                      </>
                    )}
                  </span>
                </button>
              </div>

              {error && (
                <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
                </div>
              )}

              <p className="text-xs text-muted-foreground mt-3">
                {searchType === 'url'
                  ? "Enter the original URL to find its analytics"
                  : "Enter a short code or complete short URL to analyze its performance"}
              </p>
            </div>
          </div>

          {/* Use the AnalysisResult component */}
          {analysisData && <AnalysisResult analysisData={analysisData} />}

        </main>
        <Footer />
      </div>
    </>
  )
}

export default Page