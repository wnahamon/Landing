export default function AboutUs() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Текст */}
          <div>
            <span className="text-violet-600 font-semibold uppercase tracking-wider text-sm">О компании</span>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-2 mb-4">
              Строим дома, в которые хочется возвращаться
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-6">
              Мы не просто возводим стены — создаём пространство для жизни. За {12} лет работы сдали {340}+ объектов, используя только проверенные материалы и собственные бригады. Никакого субподряда, никаких «потом доплатим».
            </p>
            <div className="space-y-4">
              {[
                "Фиксированная смета в договоре — цена не меняется после подписания",
                "Собственный штат инженеров и прорабов, контроль на каждом этапе",
                "Гарантия 5 лет на конструктив, 2 года на инженерные системы",
                "Еженедельные фотоотчёты и онлайн-камера на объекте"
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-3">
                  <div className="mt-1 w-5 h-5 rounded-full bg-violet-100 flex items-center justify-center flex-shrink-0">
                    <svg className="w-3 h-3 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <p className="text-gray-700">{item}</p>
                </div>
              ))}
            </div>
          </div>

          
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
            <div className="grid grid-cols-2 gap-6">
              {[
                { num: "12+", label: "лет на рынке" },
                { num: "340+", label: "сданных домов" },
                { num: "0%", label: "скрытых платежей" },
                { num: "5 лет", label: "гарантия на конструктив" }
              ].map((stat, i) => (
                <div key={i} className="text-center p-4 bg-gray-50 rounded-xl">
                  <div className="text-3xl font-bold text-violet-600">{stat.num}</div>
                  <div className="text-sm text-gray-500 mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
            <button className="mt-6 w-full bg-violet-600 hover:bg-violet-700 text-white font-semibold py-3 rounded-xl transition shadow-md hover:shadow-lg">
              Посетить действующий объект →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}