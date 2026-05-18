import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Message Shuttle - Secure private message delivery";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background:
            "linear-gradient(135deg, #fdf2f8 0%, #f9a8d4 50%, #db2777 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 160, marginBottom: 24 }}>💬</div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#831843",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Message Shuttle
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#9d174d",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Secure · Private · Easy message delivery
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "#9d174d",
            opacity: 0.7,
          }}
        >
          msg.shuttlelab.org
        </div>
      </div>
    ),
    { ...size }
  );
}
