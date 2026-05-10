// app/layout.tsx
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#2c2c2c] text-white">
        {/* Обёртка-контейнер: центрирование + ограничение ширины */}
        <main className="w-full max-w-[1100px] mx-auto px-4 flex flex-col items-center">
          <Header></Header>
          {children}
        </main>
      </body>
    </html>
  );
}