import type { Metadata } from "next";
import AboutContent from "@/components/about-content";

export const metadata: Metadata = {
  title: "About - Message Shuttle",
  description: "Learn about Message Shuttle's security and privacy features",
};

export default function AboutPage() {

  return <AboutContent />;
}