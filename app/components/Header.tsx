// Header.tsx
"use client";

export default function Header() {
  const scrollToCalc = (e: React.MouseEvent) => {
    e.preventDefault();
    
    const target = document.getElementById("calc");
    target?.scrollIntoView({ 
      behavior: "smooth", 
      block: "start" 
    });
  };

  return (
    <header className="flex min-h-8 items-center justify-between p-4">
      <div>Охуенное лого</div>
      <nav>
        <button 
          onClick={scrollToCalc}
          className="hover:text-gray-600 transition-colors cursor-pointer">
          Рассчитать стоимость
        </button>
      </nav>
    </header>
  );
}