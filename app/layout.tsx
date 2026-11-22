import "./globals.css";

export const metadata = {
  title: "ReHome - Don't throw it. ReHome it.",
  description: "Turn your old stuff into cash",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body style={{ margin: 0, fontFamily: "Inter, system-ui, sans-serif", background: "#F8FAF9", color: "#0F172A" }}>
        {children}
      </body>
    </html>
  );
}
