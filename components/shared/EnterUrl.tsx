import React, { useState } from 'react'
import { 
  Link as LinkIcon, 
  MoveRight, 
  Copy, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  Link2 
} from 'lucide-react'
import { generateUrl } from '@/lib/api'

type ShortenedUrlData = {
  originalUrl: string;
  shortCode: string;
  shortUrl: string;
}

const EnterUrl = () => {
   const [url, setUrl] = useState('')
   const [isLoading, setIsLoading] = useState(false)
   const [error, setError] = useState<string | null>(null)
   const [shortenedUrl, setShortenedUrl] = useState<ShortenedUrlData | null>(null)
   const [copied, setCopied] = useState(false)

   const handleShortenUrl = async () => {
      // Reset states
      setError(null)
      setShortenedUrl(null)
      setCopied(false)
      
      if (!url) {
         setError("Please enter a URL")
         return
      }

      try {
         setIsLoading(true)
         const res = await generateUrl(url)

         console.log("API Response:", res)
         
         // Check if the response has the expected structure
         if (!res || typeof res !== 'object') {
            throw new Error("Invalid response format from server")
         }
         
         // Create a properly structured object based on the API response
         const formattedResponse: ShortenedUrlData = {
            originalUrl: res.originalUrl || url,
            shortCode: res.shortCode || '',
            shortUrl: res.shortUrl || ''
         }
         
         setShortenedUrl(formattedResponse)
      } catch (err) {
         console.error("Error details:", err)
         setError("Failed to shorten URL. Please try again.")
      } finally {
         setIsLoading(false)
      }
   }

   const copyToClipboard = async () => {
      if (shortenedUrl) {
         await navigator.clipboard.writeText(shortenedUrl.shortUrl)
         setCopied(true)
         setTimeout(() => setCopied(false), 2000)
      }
   }

   return (
      <div className="w-full max-w-xl glass-card p-5 sm:p-8 rounded-xl relative group">
         <div className="absolute -inset-0.5 bg-gradient-to-r from-primary/50 to-sidebar-primary/50 rounded-xl blur opacity-40 group-hover:opacity-70 transition duration-500 animate-pulse"></div>
         <div className="relative">
            <div className="flex items-center gap-2 mb-3">
               <LinkIcon className="h-4 w-4 text-primary" />
               <label htmlFor="url-input" className="block text-sm font-medium text-card-foreground">
                  Enter the URL you want to shorten
               </label>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
               <input
                  id="url-input"
                  type="url"
                  value={url}
                  onChange={(e) => setUrl(e.target.value)}
                  placeholder="https://example.com/very-long-url"
                  className="flex-1 px-4 py-3 bg-input text-foreground rounded-md border border-border/50 focus:ring-2 focus:ring-accent focus:outline-none shadow-inner transition-all duration-300"
                  disabled={isLoading}
               />
               <button
                  onClick={handleShortenUrl}
                  disabled={isLoading}
                  className="relative px-6 py-3 bg-gradient-to-r from-primary to-sidebar-primary text-primary-foreground font-medium rounded-md hover:opacity-90 focus:outline-none transition-all duration-300 shadow-[0_0_15px_rgba(167,139,255,0.2)] hover:shadow-[0_0_20px_rgba(167,139,255,0.4)] border border-white/10 sm:whitespace-nowrap cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
               >
                  <span className="relative z-10 flex items-center justify-center gap-1.5">
                     {isLoading ? (
                        <>
                           <Loader2 className="h-4 w-4 animate-spin" />
                           <span>Shortening...</span>
                        </>
                     ) : (
                        <>
                           <span>Shorten</span>
                           <MoveRight className="h-4 w-4" />
                        </>
                     )}
                  </span>
                  <span className={`absolute inset-0 bg-gradient-to-r from-primary via-accent to-sidebar-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-md`}></span>
               </button>
            </div>
            
            {error && (
               <div className="mt-4 p-3 bg-destructive/10 border border-destructive/20 rounded-md flex items-start gap-2">
                  <AlertCircle className="h-5 w-5 text-destructive shrink-0 mt-0.5" />
                  <p className="text-sm text-destructive">{error}</p>
               </div>
            )}

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
                  <div className="h-3 w-48 bg-muted-foreground/20 rounded mt-2"></div>
               </div>
            )}

            {shortenedUrl && !isLoading && (
               <div className="mt-4 p-4 bg-card/50 border border-border rounded-md animate-in fade-in-50 duration-300">
                  <h3 className="text-sm font-medium mb-2 flex items-center gap-2">
                     <Link2 className="h-4 w-4 text-primary" />
                     Your shortened URL:
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
               Our links never expire and include analytics tracking
            </p>
         </div>
      </div>
   )
}

export default EnterUrl