// app/layout.tsx
import Header from "./components/Header";
import "./globals.css";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ru">
      <body className="min-h-screen bg-[#2c2c2c] text-white">
        {/* Обёртка-контейнер: центрирование + ограничение ширины */}
        <main className="w-full mx-auto px-4 flex flex-col items-center p-0 m-0">
          <Header></Header>
          {children}
        </main>
      </body>
    </html>
  );
}