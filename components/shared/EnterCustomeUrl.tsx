"use client"

import React, { useState } from 'react'
import {
   Link as LinkIcon,
   MoveRight,
   Copy,
   CheckCircle,
   AlertCircle,
   Loader2,
   Link2,
   Edit3,
   Info
} from 'lucide-react'
import { generateCustomUrl } from '@/lib/api';

type CustomUrlData = {
   originalUrl: string;
   shortCode: string;
   shortUrl: string;
   isExisting?: boolean; // Track if this is an existing URL
}

const EnterCustomeUrl = () => {
   const [url, setUrl] = useState('')
   const [customCode, setCustomCode] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [shortenedUrl, setShortenedUrl] = useState<CustomUrlData | null>(null)
   const [copied, setCopied] = useState(false)
   const [errorType, setErrorType] = useState<'validation' | 'taken' | 'server' | null>(null)

   const validateInputs = (): boolean => {
      // Reset states
      setError(null)
      setErrorType(null)

      if (!url.trim()) {
         setError("Please enter a URL")
         setErrorType('validation')
         return false
      }

      // Basic URL validation
      try {
         new URL(url.startsWith('http') ? url : `https://${url}`)
      } catch {
         setError("Please enter a valid URL")
         setErrorType('validation')
         return false
      }

      if (!customCode.trim()) {
         setError("Please enter a custom code for your URL")
         setErrorType('validation')
         return false
      }

      // Validate custom code (alphanumeric only)
      if (!/^[a-zA-Z0-9-_]+$/.test(customCode)) {
         setError("Custom code can only contain letters, numbers, hyphens and underscores")
         setErrorType('validation')
         return false
      }

      if (customCode.includes(" ")) {
         setError("Custom code should not contain spaces")
         setErrorType('validation')
         return false
      }

      return true
   }

   const handleCreateCustomUrl = async () => {
      // Reset states
      setShortenedUrl(null)
      setCopied(false)

      if (!validateInputs()) {
         return
      }

      setIsLoading(true)

      try {
         const response = await generateCustomUrl(url, customCode);

         console.log("Response from API:", response)
         setIsLoading(false)

         if (!response.success) {
            setError(response.message || "Failed to create custom URL")

            // Set appropriate error type
            if (response.message?.includes("already taken")) {
               setErrorType('taken')
            } else {
               setErrorType('server')
            }
            return
         }

         setShortenedUrl({
            originalUrl: response.data.originalUrl,
            shortCode: response.data.shortCode,
            shortUrl: response.data.shortUrl,
            isExisting: response.message === "URL already exists"
         })
      } catch {
         setError("Failed to create custom URL. Please try again.")
         setErrorType('server')
         setIsLoading(false)
      }
   }

   const copyToClipboard = async () => {
      if (shortenedUrl) {
         try {
            await navigator.clipboard.writeText(shortenedUrl.shortUrl)
            setCopied(true)
            setTimeout(() => setCopied(false), 2000)
         } catch {
            setError("Failed to copy to clipboard")
            setErrorType('server')
         }
      }
   }

   return (
      <div className="w-full max-w-xl glass-card p-5 sm:p-8 rounded-xl relative group">
         <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-sidebar-primary/50 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
         <div className="relative">
            {/* URL Input */}
            <div className="flex items-center gap-2 mb-3">
               <LinkIcon className="h-4 w-4 text-primary" />
               <label htmlFor="url-input" className="block text-sm font-medium text-card-foreground">
                  Enter the URL you want to shorten
               </label>
            </div>
            <div className="flex flex-col gap-3 mb-4">
               <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className={`flex-1 px-4 py-3 bg-input text-foreground rounded-md border ${error && errorType === 'validation' ? 'border-destructive' : 'border-border/50'
                     } focus:ring-2 focus:ring-accent focus:outline-none shadow-inner transition-all duration-300`}
                  disabled={isLoading}
               />
            </div>

            {/* Custom Code Input */}
            <div className="flex items-center gap-2 mb-3">
               <Edit3 className="h-4 w-4 text-primary" />
               <label htmlFor="custom-code-input" className="block text-sm font-medium text-card-foreground">
                  Create your custom URL
               </label>
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-2 mb-4">
               <div className="flex items-center bg-input text-foreground rounded-md border border-border/50 shadow-inner px-3 py-2 text-sm text-muted-foreground">
                  <span className="text-primary font-medium">
                     {process.env.NEXT_PUBLIC_BASE_URL}/
                  </span>
               </div>
               <input
                  id="custom-code-input"
                  type="text"
                  value={customCode}
                  onChange={(e) => setCustomCode(e.target.value)}
                  placeholder="my-custom-url"
                  className={`flex-1 px-4 py-3 bg-input text-foreground rounded-md border ${error && (errorType === 'validation' || errorType === 'taken') ? 'border-destructive' : 'border-border/50'
                     } focus:ring-2 focus:ring-accent focus:outline-none shadow-inner transition-all duration-300`}
                  disabled={isLoading}
               />
            </div>

            {/* Submit Button */}
            <button
               onClick={handleCreateCustomUrl}
               disabled={isLoading}
               className="w-full px-6 py-3 bg-gradient-to-r from-primary to-sidebar-primary text-primary-foreground font-medium rounded-md hover:opacity-90 focus:outline-none transition-all duration-300 shadow-[0_0_15px_rgba(167,139,255,0.2)] hover:shadow-[0_0_20px_rgba(167,139,255,0.4)] border border-white/10 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
               <span className="relative z-10 flex items-center justify-center gap-1.5">
                  {isLoading ? (
                     <>
                        <Loader2 className="h-4 w-4 animate-spin" />
                        <span>Creating...</span>
                     </>
                  ) : (
                     <>
                        <span>Create Custom URL</span>
                        <MoveRight className="h-4 w-4" />
                     </>
                  )}
               </span>
            </button>

            {/* Error Message */}
            {error && (
               <div className={`mt-4 p-3 ${errorType === 'taken' ? 'bg-amber-500/10 border-amber-500/20' : 'bg-destructive/10 border-destructive/20'
                  } border rounded-md flex items-start gap-2`}>
                  {errorType === 'taken' ? (
                     <AlertCircle className="h-5 w-5 text-amber-500 shrink-0 mt-0.5" />
                  ) : (
                     <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  )}
                  <p className={`text-sm ${errorType === 'taken' ? 'text-amber-500' : 'text-destructive'
                     }`}>
                     {error}
                     {errorType === 'taken' && (
                        <span className="block mt-1 text-xs">
                           Try a different custom code to continue.
                        </span>
                     )}
                  </p>
               </div>
            )}

            {/* Loading State */}
            {isLoading && !error && (
               <div className="mt-4 p-4 bg-card/50 border border-border rounded-md animate-pulse">
                  <div className="flex items-center gap-2 mb-3">
                     <div className="h-4 w-4 rounded-full bg-primary/30"></div>
                     <div className="h-4 w-32 bg-primary/30 rounded"></div>
                  </div>
                  <div className="flex items-center gap-2">
                     <div className="flex-1 h-9 bg-background/80 rounded-md"></div>
                     <div className="h-9 w-9 bg-primary/20 rounded-md"></div>
                  </div>
               </div>
            )}

            {/* Result */}
            {shortenedUrl && !isLoading && (
               <div className="mt-4 p-4 bg-card/50 border border-border rounded-md animate-in fade-in-50 duration-300">
                  {shortenedUrl.isExisting && (
                     <div className="mb-3 p-2 bg-blue-500/10 border border-blue-500/20 rounded-md flex items-start gap-2">
                        <Info className="h-4 w-4 text-blue-500 shrink-0 mt-0.5" />
                        <p className="text-xs text-blue-500">
                           This URL already exists in our system. We&apos;ve returned the existing shortened link.
                        </p>
                     </div>
                  )}

                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                     <Link2 className="h-4 w-4 text-primary" />
                     Your {shortenedUrl.isExisting ? "existing" : "custom"} URL:
                  </h3>
                  <div className="flex items-center gap-2">
                     <input
                        type="text"
                        value={shortenedUrl.shortUrl}
                        readOnly
                        className="flex-1 px-3 py-2 bg-background text-foreground rounded-md border border-border/50 text-sm"
                     />
                     <button
                        onClick={copyToClipboard}
                        className="p-2 bg-primary/10 hover:bg-primary/20 rounded-md transition-colors"
                        aria-label="Copy to clipboard"
                     >
                        {copied ?
                           <CheckCircle className="h-5 w-5 text-success" /> :
                           <Copy className="h-5 w-5 text-primary" />
                        }
                     </button>
                  </div>
                  {shortenedUrl.originalUrl && (
                     <p className="text-xs text-muted-foreground mt-2">
                        Original URL: {shortenedUrl.originalUrl.length > 50 ?
                           `${shortenedUrl.originalUrl.substring(0, 50)}...` :
                           shortenedUrl.originalUrl}
                     </p>
                  )}
               </div>
            )}

            <p className="text-xs text-muted-foreground mt-3">
               Choose a memorable custom URL for easy sharing
            </p>
         </div>
      </div>
   )
}

export default EnterCustomeUrl