import type { Timestamp } from "firebase/firestore";

export type TestimonialStatus = "pending" | "approved" | "rejected";

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company: string;
  message: string;
  status: TestimonialStatus;
  createdAt: Timestamp | null;
};
