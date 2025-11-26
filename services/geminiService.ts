import { GoogleGenAI, Type } from "@google/genai";
import { ItineraryDay, Lead } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeLeadNotes = async (notes: string): Promise<{ sentiment: string; summary: string; potentialValue: string }> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `Analyze the following CRM notes for a travel agency lead. 
      Determine the customer sentiment (Positive, Neutral, Negative), 
      summarize their key needs in one sentence, 
      and estimate a potential budget category (Budget, Moderate, Luxury) based on clues (or "Unknown" if not clear).
      
      Notes: "${notes}"`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            sentiment: { type: Type.STRING, enum: ["Positive", "Neutral", "Negative"] },
            summary: { type: Type.STRING },
            potentialValue: { type: Type.STRING }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error analyzing lead:", error);
    return { sentiment: "Neutral", summary: "Analysis failed", potentialValue: "Unknown" };
  }
};

export const generateTripItinerary = async (
  destination: string,
  duration: number,
  interests: string,
  budget: string
): Promise<ItineraryDay[]> => {
  try {
    const prompt = `Create a detailed ${duration}-day travel itinerary for ${destination}.
    The travelers are interested in: ${interests}.
    Budget level: ${budget}.
    
    Return a JSON array where each item represents a day.
    Each day should have a 'day' (number), 'title' (string), and 'activities' (array of objects with time, activity, description).`;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              day: { type: Type.INTEGER },
              title: { type: Type.STRING },
              activities: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    time: { type: Type.STRING },
                    activity: { type: Type.STRING },
                    description: { type: Type.STRING }
                  }
                }
              }
            }
          }
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    return JSON.parse(text);
  } catch (error) {
    console.error("Error generating itinerary:", error);
    throw error;
  }
};