import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { Providers } from "@/lib/providers";
import { Navigation } from "@/components/Navigation";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Next.js Demo - Streamlit Alternative",
  description: "A production-ready alternative to Streamlit built with Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen bg-gray-50">
            <Navigation />
            <main className="flex-1 overflow-x-hidden">
              <header className="bg-white shadow-sm border-b border-gray-200">
                <div className="px-8 py-6">
                  <h1 className="text-2xl font-bold text-gray-900">
                    🚀 Next.js Features Demo
                  </h1>
                  <p className="text-gray-700 mt-1">
                    Production-ready alternative to Streamlit
                  </p>
                </div>
              </header>
              <div className="p-8">
                {children}
              </div>
            </main>
          </div>
        </Providers>
      </body>
    </html>
  );
}