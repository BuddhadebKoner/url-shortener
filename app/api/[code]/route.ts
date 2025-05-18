import { NextRequest, NextResponse } from "next/server";
import Url from "@/models/url.model";
import { connectToDatabase } from "@/lib/db";

export async function GET(
   req: NextRequest,
   context: { params: Promise<{ code: string }> }
) {
   try {
      // Connect to database
      await connectToDatabase();

      const { params } = context;
      const resolvedParams = await params;
      const { code } = resolvedParams;

      // Find the URL in the database
      const urlDoc = await Url.findOne({ shortCode: code });

      if (!urlDoc) {
         return NextResponse.json(
            {
               success: false,
               message: "URL not found",
            },
            { status: 404 }
         );
      }

      // Increment click count
      urlDoc.clicks += 1;

      // Record visit information
      const userAgent = req.headers.get("user-agent") || "";
      const ip = req.headers.get("x-forwarded-for") || "unknown";

      urlDoc.visits.push({
         ip,
         userAgent,
         timestamp: new Date(),
      });

      await urlDoc.save();

      return NextResponse.json(
         {
            success: true,
            originalUrl: urlDoc.originalUrl,
         },
         { status: 200 }
      );
   } catch (error) {
      console.error("Error retrieving URL:", error);
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error",
         },
         { status: 500 }
      );
   }
}