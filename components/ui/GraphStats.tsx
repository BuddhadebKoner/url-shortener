import React, { useMemo } from 'react';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const GraphStats = ({ visits }: {
   visits: {
      ip: string;
      userAgent: string;
      timestamp: Date;
      _id?: string;
   }[]
}) => {
   // Process the visit data to create chart data
   const chartData = useMemo(() => {
      if (!visits || visits.length === 0) {
         return [];
      }

      // Group visits by day
      const visitsByDay = visits.reduce((acc, visit) => {
         const date = new Date(visit.timestamp);
         const day = date.toLocaleDateString();

         if (!acc[day]) {
            acc[day] = 0;
         }

         acc[day]++;
         return acc;
      }, {} as Record<string, number>);

      // Convert to array format for Recharts
      return Object.entries(visitsByDay).map(([day, count]) => ({
         day,
         visits: count
      }));
   }, [visits]);

   if (!visits || visits.length === 0) {
      return (
         <div className="bg-card/50 p-4 rounded-lg">
            <h3 className="text-sm font-medium text-muted-foreground mb-3">Visit Statistics</h3>
            <div className="flex items-center justify-center bg-accent/20 p-6 rounded-lg">
               <p className="text-muted-foreground">No visit data available</p>
            </div>
         </div>
      );
   }

   return (
      <div className="bg-card/50 p-4 rounded-lg">
         <h3 className="text-sm font-medium text-muted-foreground mb-3">Visit Statistics</h3>
         <div className="bg-accent/20 p-4 rounded-lg">
            <ResponsiveContainer width="100%" height={200}>
               <LineChart data={chartData} margin={{ top: 10, right: 10, left: 0, bottom: 20 }}>
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis
                     dataKey="day"
                     angle={-45}
                     textAnchor="end"
                     height={60}
                     tick={{ fontSize: 12 }}
                  />
                  <YAxis allowDecimals={false} tick={{ fontSize: 12 }} />
                  <Tooltip
                     contentStyle={{
                        backgroundColor: 'rgba(15, 15, 15, 0.8)',
                        border: 'none',
                        borderRadius: '8px',
                        color: 'white'
                     }}
                  />
                  <Line
                     type="monotone"
                     dataKey="visits"
                     stroke="var(--primary)"
                     strokeWidth={2}
                     dot={{ fill: 'var(--primary)', r: 4 }}
                     activeDot={{ r: 6 }}
                     name="Visits"
                  />
               </LineChart>
            </ResponsiveContainer>

            <div className="mt-4 text-xs text-center text-muted-foreground">
               Total unique visitors: {new Set(visits.map(v => v.ip)).size}
            </div>
         </div>
      </div>
   );
};

export default GraphStats;