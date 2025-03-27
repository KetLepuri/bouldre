// lib/types.ts
export type Hold = {
    x: number;
    y: number;
    type: "hold_hand" | "hold_foot" | "unknown";
  };
  
  export type GeneratePathResponse = {
    route: Hold[];
    instructions: string;
  };
  
  export type OverlayPathResponse = {
    image: string; // base64 encoded
  };
  