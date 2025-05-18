// make a api call to the backend to get the original url
// /api/[code]

export const getOriginalUrl = async (code: string) => {
   try {
      const res = await fetch(`/api/${code}`, {
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

// generate url 
export const generateUrl = async (URL: string) => {
   try {
      const res = await fetch('/api/shorten', {
         method: "POST",
         headers: {
            "Content-Type": "application/json",
         },
         body: JSON.stringify({ URL }),
      });

      if (!res.ok) {
         throw new Error("Failed to generate URL");
      }

      const responce = await res.json();
      return responce.data;
   } catch (error) {
      console.error("Error generating URL:", error);
      throw error;
   }
}