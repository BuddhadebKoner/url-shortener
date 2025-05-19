import React from 'react';

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
      _id?: string;
   }[];
}

type AnalysisResultProps = {
   analysisData: AnalysisData;
}

// Function to extract OS and browser information from userAgent
const parseUserAgent = (userAgent: string) => {
   let os = "Unknown";
   let browser = "Unknown";
   
   // OS detection
   if (userAgent.includes("Windows")) os = "Windows";
   else if (userAgent.includes("Mac OS")) os = "macOS";
   else if (userAgent.includes("Linux")) os = "Linux";
   else if (userAgent.includes("Android")) os = "Android";
   else if (userAgent.includes("iOS") || userAgent.includes("iPhone") || userAgent.includes("iPad")) os = "iOS";
   
   // Browser detection
   if (userAgent.includes("Chrome") && !userAgent.includes("Edg")) browser = "Chrome";
   else if (userAgent.includes("Firefox")) browser = "Firefox";
   else if (userAgent.includes("Safari") && !userAgent.includes("Chrome")) browser = "Safari";
   else if (userAgent.includes("Edg")) browser = "Edge";
   else if (userAgent.includes("OPR") || userAgent.includes("Opera")) browser = "Opera";

   return { os, browser };
};

// Function to get the OS icon
const getOSIcon = (os: string) => {
   switch (os) {
      case "Windows": return "🪟";
      case "macOS": return "🍎";
      case "Linux": return "🐧";
      case "Android": return "📱";
      case "iOS": return "📱";
      default: return "💻";
   }
};

// Function to get the browser icon
const getBrowserIcon = (browser: string) => {
   switch (browser) {
      case "Chrome": return "🌐";
      case "Firefox": return "🦊";
      case "Safari": return "🧭";
      case "Edge": return "🌐";
      case "Opera": return "🌐";
      default: return "🌐";
   }
};

const AnalysisResult = ({ analysisData }: AnalysisResultProps) => {
   return (
      <div className="w-full max-w-xl glass-card p-5 sm:p-8 rounded-xl mt-2">
         <h2 className="text-xl font-bold mb-4">URL Analysis Results</h2>

         <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
               <div className="bg-card/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Original URL</h3>
                  <p className="text-sm break-all">{analysisData.originalUrl}</p>
               </div>

               <div className="bg-card/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Short Code</h3>
                  <p className="text-sm">{analysisData.shortCode}</p>
               </div>

               <div className="bg-card/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-1">Short URL</h3>
                  <div className="flex items-center gap-2">
                     <p className="text-sm break-all">{analysisData.shortUrl}</p>
                     <button
                        onClick={() => navigator.clipboard.writeText(analysisData.shortUrl)}
                        className="p-1 hover:bg-accent rounded-md transition-colors"
                        title="Copy to clipboard"
                     >
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                           <rect width="14" height="14" x="8" y="8" rx="2" ry="2" />
                           <path d="M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" />
                        </svg>
                     </button>
                  </div>
               </div>
            </div>

            <div className="bg-card/50 p-4 rounded-lg">
               <h3 className="text-sm font-medium text-muted-foreground mb-3">Performance</h3>
               <div className="flex items-center justify-center bg-accent/20 p-6 rounded-lg">
                  <div className="text-center">
                     <p className="text-3xl font-bold">{analysisData.clicks}</p>
                     <p className="text-sm text-muted-foreground">Total Clicks</p>
                  </div>
               </div>
            </div>

            {analysisData.visits && analysisData.visits.length > 0 && (
               <div className="bg-card/50 p-4 rounded-lg">
                  <h3 className="text-sm font-medium text-muted-foreground mb-3">Recent Visits</h3>
                  <div className="max-h-60 overflow-y-auto">
                     <table className="w-full text-sm">
                        <thead>
                           <tr className="text-left border-b border-border">
                              <th className="pb-2">Time</th>
                              <th className="pb-2">IP</th>
                              <th className="pb-2">Device</th>
                              <th className="pb-2">Browser</th>
                           </tr>
                        </thead>
                        <tbody>
                           {analysisData.visits.slice(0, 10).map((visit, idx) => {
                              const { os, browser } = parseUserAgent(visit.userAgent);
                              return (
                                 <tr key={idx} className="border-b border-border/50">
                                    <td className="py-2">{new Date(visit.timestamp).toLocaleString()}</td>
                                    <td className="py-2">{visit.ip}</td>
                                    <td className="py-2">
                                       <span title={visit.userAgent}>
                                          {getOSIcon(os)} {os}
                                       </span>
                                    </td>
                                    <td className="py-2">
                                       <span>
                                          {getBrowserIcon(browser)} {browser}
                                       </span>
                                    </td>
                                 </tr>
                              );
                           })}
                        </tbody>
                     </table>
                  </div>
               </div>
            )}
         </div>
      </div>
   );
};

export default AnalysisResult;