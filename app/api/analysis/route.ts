import { connectToDatabase } from "@/lib/db";
import { NextRequest, NextResponse } from "next/server";
import Url from "@/models/url.model";

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      const {
         originalUrl,
         shortCode,
      } = body;

      // any one of these is required
      if (!originalUrl && !shortCode) {
         return NextResponse.json(
            {
               success: false,
               message: "URL or short code is required",
            },
            { status: 400 }
         );
      }

      await connectToDatabase();

      // if originalUrl is provided, find the URL
      if (originalUrl) {
         const urlDoc = await Url.findOne({ originalUrl });

         if (!urlDoc) {
            return NextResponse.json(
               {
                  success: false,
                  message: "URL not found",
               },
               { status: 404 }
            );
         }

         return NextResponse.json(
            {
               success: true,
               message: "URL found",
               data: {
                  originalUrl: urlDoc.originalUrl,
                  shortCode: urlDoc.shortCode,
                  shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${urlDoc.shortCode}`,
                  clicks: urlDoc.clicks,
                  visits: urlDoc.visits,
               },
            },
            { status: 200 }
         );
      }

      // if shortCode is provided, find the URL
      if (shortCode) {
         const urlDoc = await Url.findOne({ shortCode });
         if (!urlDoc) {
            return NextResponse.json(
               {
                  success: false,
                  message: "Short code not found",
               },
               { status: 404 }
            );
         }
         return NextResponse.json(
            {
               success: true,
               message: "Short code found",
               data: {
                  originalUrl: urlDoc.originalUrl,
                  shortCode: urlDoc.shortCode,
                  shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${urlDoc.shortCode}`,
                  clicks: urlDoc.clicks,
                  visits: urlDoc.visits,
               },
            },
            { status: 200 }
         );
      }

      return NextResponse.json(
         {
            success: false,
            message: "URL or short code is required",
         },
         { status: 400 }
      );
   } catch {
      return NextResponse.json(
         {
            success: false,
            message: "An error occurred",
         },
         { status: 500 }
      );
   }
};