// components/Header.tsx
export default function Header() {
  return (
    <header className=" bg-white border-b border-gray-200">
      <div className="mx-auto px-4 min-h-16 flex items-center justify-between">
        <div className="text-xl font-bold">Наше Лого</div>
        <nav className="flex gap-6" aria-label="Основная навигация">
          <a href="#calc" className="hover:text-gray-600 transition-colors">Рассчитать стоимость</a>
          <a href="#form" className="hover:text-gray-600 transition-colors">Оставить заявку</a>
        </nav>
      </div>
    </header>
  );
}