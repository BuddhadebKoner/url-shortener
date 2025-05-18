import { customAlphabet } from "nanoid";

// generate 6 char and numbers unque code
const nanoid = customAlphabet('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ', 6);

export const generateUniqueCode = () => {
   return nanoid();
};

// validate url
export const isValidUrl = (url: string) => {
   try {
      const parsedUrl = new URL(url);
      return parsedUrl.protocol === 'http:' || parsedUrl.protocol === 'https:';
   } catch {
      return false;
   }
}

// format url 
export const formatUrl = (url: string) => {
   if (!url.startsWith('http://') && !url.startsWith('https://')) {
      return `http://${url}`;
   }
   return url;
}

// get Full Short Url
export function getFullShortUrl(shortCode: string, baseUrl: string) {
   return `${baseUrl}/${shortCode}`;
}