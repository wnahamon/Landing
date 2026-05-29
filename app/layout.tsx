// app/layout.tsx
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="bg-gray-50 text-gray-900 antialiased">
        {/* Единый контейнер для ВСЕГО сайта */}
        <div className="w-full max-w-6xl mx-auto px-4">
          <Header />
          <main className="py-8 space-y-8">
            {children}
          </main>
        </div>
      </body>
    </html>
  );
}