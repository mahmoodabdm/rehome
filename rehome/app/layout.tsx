import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "ReHome - Don't throw it. ReHome it.",
  description: "Turn your old stuff into cash",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          padding: 0,
          fontFamily:
            "Inter, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif",
          background: "#F8FAF9",
          color: "#0F172A",
          WebkitFontSmoothing: "antialiased",
          MozOsgrTextSizeAdjust: "100%",
        }}
      >
        {children}
      </body>
    </html>
  );
}
