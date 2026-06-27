export type ObservationStatus = "idle" | "observing";

export type AppView = "captures" | "images";

export interface Capture {
  id: string;
  text: string;
  pageTitle: string;
  url: string;
  timestamp: number;
  favicon?: string;
}

export interface PageImage {
  id: string;
  src: string;
  alt: string;
  width: number;
  height: number;
}

export type Message =
  | { type: "SELECTION_CHANGED"; text: string; pageTitle: string; url: string }
  | { type: "ADD_CAPTURE"; capture: Capture }
  | { type: "GET_CAPTURES" }
  | { type: "DELETE_CAPTURE"; id: string }
  | { type: "CLEAR_ALL" }
  | { type: "SET_ACTIVE"; active: boolean }
  | { type: "GET_PAGE_IMAGES" }
  | { type: "PAGE_IMAGES"; images: PageImage[]; pageTitle: string; url: string }
  | { type: "PAGE_IMAGES_ERROR"; reason: string };
