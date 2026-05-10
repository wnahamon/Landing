"use client";
import { useState, useMemo } from "react";

export default function Calc() {
  const [area, setArea] = useState(120);
  const [tech, setTech] = useState("gasbeton");
  const [foundation, setFoundation] = useState("strip");

  // Плавное обновление площади с защитой от невалидных значений
  const updateArea = (value: string) => {
    if (value === "") return setArea(30);
    const num = Number(value);
    if (!isNaN(num)) setArea(Math.min(300, Math.max(30, Math.round(num))));
  };

  // Базовые ставки за м² (предчистовая, 2026 РФ)
  const BASE_RATES: Record<string, number> = {
    frame: 42000,
    gasbeton: 58000,
    brick: 79000,
    wood: 51000,
  };

  // Коэффициенты фундамента
  const F_COEF: Record<string, number> = {
    pile: 1.0,
    strip: 1.15,
    slab: 1.3,
    ush: 1.4,
  };

  // Мгновенный пересчёт цены
  const { min, max } = useMemo(() => {
    const base = BASE_RATES[tech] * area * F_COEF[foundation];
    return {
      min: Math.round(base * 0.92).toLocaleString("ru-RU"),
      max: Math.round(base * 1.08).toLocaleString("ru-RU"),
    };
  }, [area, tech, foundation]);

  return (
    <section id="calc" className="max-w-4xl mx-auto bg-white  shadow-xl border border-gray-100 overflow-hidden">
      {/* Шапка */}
      <div className="bg-gradient-to-r from-gray-600 to-indigo-600 p-6 text-white">
        <h2 className="text-2xl md:text-3xl font-bold">
          Рассчитайте стоимость дома
        </h2>
        <p className="text-gray-100 mt-1">
          Точный расчёт за 1 минуту • Без скрытых платежей
        </p>
      </div>

      <div className="p-6 md:p-8 space-y-8">
        {/* 1. Площадь */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Площадь дома
          </label>
          <div className="flex items-center gap-4">
            <input
              type="range"
              min={30}
              max={300}
              step={5}
              value={area}
              onChange={(e) => updateArea(e.target.value)}
              className="w-full accent-gray-600 cursor-pointer h-2 bg-gray-200 rounded-lg appearance-none"
            />
            <div className="relative w-24">
              <input
                type="number"
                min={30}
                max={300}
                value={area}
                onChange={(e) => updateArea(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg text-center font-medium focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none text-gray-900"
              />
              <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm pointer-events-none">
                м²
              </span>
            </div>
          </div>
        </div>

        {/* 2. Технология */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Технология строительства
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { id: "frame", label: "Каркасный", sub: "Быстро, экономично" },
              { id: "gasbeton", label: "Газобетон", sub: "Тёпло, надёжно" },
              { id: "brick", label: "Кирпич", sub: "Долговечно, премиум" },
              { id: "wood", label: "Брус", sub: "Экологично, уютно" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setTech(opt.id)}
                className={`p-4 rounded-xl border-2 transition-all text-left ${
                  tech === opt.id
                    ? "border-gray-600 bg-gray-50 shadow-md scale-[1.02]"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                <div className="font-semibold text-gray-900">{opt.label}</div>
                <div className="text-xs text-gray-500 mt-1">{opt.sub}</div>
              </button>
            ))}
          </div>
        </div>

        {/* 3. Фундамент */}
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Тип фундамента
          </label>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 text-gray-900">
            {[
              { id: "pile", label: "Свайный" },
              { id: "strip", label: "Ленточный" },
              { id: "slab", label: "Монолитная плита" },
              { id: "ush", label: "УШП" },
            ].map((opt) => (
              <button
                key={opt.id}
                onClick={() => setFoundation(opt.id)}
                className={`p-4 rounded-xl border-2 transition-all text-center font-medium ${
                  foundation === opt.id
                    ? "border-gray-600 bg-gray-50 shadow-md"
                    : "border-gray-200 hover:border-gray-300 hover:bg-gray-50"
                }`}
              >
                {opt.label}
              </button>
            ))}
          </div>
        </div>

        {/* Результат */}
        <div className="bg-gray-50 rounded-xl p-6 border border-gray-200">
          <p className="text-sm text-gray-600 mb-1">
            Примерная стоимость «под ключ»:
          </p>
          <div className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            {min} – {max} ₽
          </div>
          <p className="text-xs text-gray-500 mt-2">
            * Расчёт ориентировочный. Точная смета формируется после выезда
            инженера и учёта особенностей участка.
          </p>
        </div>

        {/* CTA */}
        <button className="w-full bg-gray-600 hover:bg-gray-700 text-white font-semibold py-4 px-6 transition-all shadow-lg hover:shadow-xl active:scale-[0.98]">
          Получить детальную смету + каталог проектов
        </button>
      </div>
    </section>
  );
}
