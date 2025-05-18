import { connectToDatabase } from "@/lib/db";
import { formatUrl, generateUniqueCode, isValidUrl } from "@/lib/util";
import { NextRequest, NextResponse } from "next/server";
import Url from "@/models/url.model";

export async function POST(req: NextRequest) {
   try {
      const body = await req.json();
      let { URL } = body;

      // Get user information
      const ip = req.headers.get('x-forwarded-for') || 
                req.headers.get('x-real-ip') || 
                '0.0.0.0';
      
      // Get user agent information
      const userAgent = req.headers.get('user-agent') || 'Unknown';

      if (!URL) {
         return NextResponse.json(
            {
               success: false,
               message: "URL is required",
            },
            { status: 400 }
         );
      }

      // format URL
      URL = formatUrl(URL);

      // validate URL
      if (!isValidUrl(URL)) {
         return NextResponse.json(
            {
               success: false,
               message: "Invalid URL",
            },
            { status: 400 }
         );
      }

      // connect to database
      await connectToDatabase();

      const urlDoc = await Url.findOne({ originalUrl: URL });

      if (urlDoc) {
         return NextResponse.json(
            {
               success: true,
               message: "URL already exists",
               data: {
                  originalUrl: urlDoc.originalUrl,
                  shortCode: urlDoc.shortCode,
                  shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${urlDoc.shortCode}`,
               },
            },
            { status: 200 }
         );
      }

      // generate short code
      const shortCode = generateUniqueCode();

      const newUrl = new Url({
         originalUrl: URL,
         shortCode: shortCode,
         creatorInfo: {
            ip: ip,
            userAgent: userAgent,
            createdAt: new Date()
         }
      });
      await newUrl.save();


      return NextResponse.json(
         {
            success: true,
            message: "URL shortened successfully",
            data: {
               originalUrl: newUrl.originalUrl,
               shortCode: newUrl.shortCode,
               shortUrl: `${process.env.NEXT_PUBLIC_BASE_URL}/${newUrl.shortCode}`,
            },
         },
         { status: 201 }
      );
   } catch (error) {
      console.error("Error in URL shortening:", error);
      return NextResponse.json(
         {
            success: false,
            message: "Internal Server Error",
         },
         { status: 500 }
      );
   }
}