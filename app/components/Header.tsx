"use client";

export const scrollToSection = (id: string) => {
  const target = document.getElementById(id);
  if (target) {
    target.scrollIntoView({ behavior: "smooth", block: "start" });
  }
};

export const createScrollHandler = (id: string) => (e: React.MouseEvent) => {
  e.preventDefault();
  scrollToSection(id);
};

export default function Header() {
  return (
    <header className="flex min-h-20 items-center justify-between ">
      <div className="m-10">крутое лого</div>
      <nav className="flex gap-5">
        <button
          onClick={() => scrollToSection("calc")}
          className="hover:text-gray-600 transition-colors cursor-pointer"
        >
          Рассчитать стоимость
        </button>
        <button
          onClick={() => scrollToSection("form")}
          className="hover:text-gray-600 transition-colors cursor-pointer"
        >
          Оставить заявку
        </button>
      </nav>
    </header>
  );
}
