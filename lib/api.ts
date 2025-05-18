// make a api call to the backend to get the original url
// /api/[code]

export const getOriginalUrl = async (code: string) => { 
   try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/${code}`, {
         method: "GET",
         headers: {
            "Content-Type": "application/json",
         },
      });

      if (!res.ok) {
         throw new Error("Failed to fetch the original URL");
      }

      const data = await res.json();
      return data;
   } catch (error) {
      console.error("Error fetching original URL:", error);
      throw error;
   }
}