import React from "react";

export default function Case() {
  return (
    <div className="">
      <div className="flex flex-col items-center">
        <h2>Примеры наших работ</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4">
        {/* Картинка 1 */}
        <img
          src="/house-isolated-field.jpg"
          alt="Пример работы 1"
          className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />

        {/* Картинка 2 */}
        <img
          src="/wide-shot-beautiful-architecture-modern-house.jpg"
          alt="Пример работы 2"
          className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />

        {/* Картинка 3 */}
        <img
          src="/old-white-house-garden.jpg"
          alt="Пример работы 3"
          className="w-full h-64 object-cover rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300"
        />
      </div>
    </div>
  );
}
