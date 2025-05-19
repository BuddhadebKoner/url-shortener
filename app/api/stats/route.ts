import { connectToDatabase } from "@/lib/db";
import { NextResponse } from "next/server";
import Url from "@/models/url.model";

export async function GET() {
   try {
      // return total number of urls , total number of clicks
      // connect to database
      await connectToDatabase();
      const urlCount = await Url.countDocuments();
      const clickCount = await Url.aggregate([
         {
            $group: {
               _id: null,
               totalClicks: { $sum: "$clicks" },
            },
         },
      ]);

      return NextResponse.json(
         {
            success: true,
            data: {
               urlCount,
               clickCount: clickCount[0] ? clickCount[0].totalClicks : 0,
            },
         },
         { status: 200 }
      );

   } catch {
      return NextResponse.json(
         {
            success: false,
            message: "Internal server error",
         },
         { status: 500 }
      );
   }
}