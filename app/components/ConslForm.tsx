"use client";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useState } from "react";



export const formSchema = z.object({
  name: z.string().min(2, "Минимум 2 символа"),
  phone: z.string().regex(/^\+?[0-9\s-()]{10,18}$/, "Неверный формат телефона"),
  message: z.string().max(500).optional().default(""),
  // ✅ Убрали .coerce(), оставили строгий boolean + refine. Тип выводится корректно.
  consent: z.boolean().refine((val) => val === true, {
    message: "Необходимо согласие на обработку персональных данных",
  }),
  honeypot: z.string().optional(),
});

export type FormData = z.infer<typeof formSchema>;

export default function ConslForm() {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      phone: "",
      message: "",
      consent: false,
      honeypot: "",
    },
  });

  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  const [serverError, setServerError] = useState<string>("");

  const onSubmit = async (data: FormData) => {
    setStatus("idle");
    setServerError("");
    try {
      const res = await fetch("/api/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = await res.json();
      if (!res.ok) throw new Error(json.error || "Ошибка отправки");
      
      setStatus("success");
      reset();
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Неизвестная ошибка";
      setStatus("error");
      setServerError(msg);
    }
  };

  if (status === "success") {
    return (
      <div className="rounded-xl border border-green-200 bg-green-50 p-6 text-center">
        <h3 className="text-lg font-semibold text-green-800">✅ Заявка отправлена!</h3>
        <p className="mt-2 text-sm text-green-700">Перезвоним в течение 15 минут для уточнения деталей.</p>
        <button onClick={() => setStatus("idle")} className="mt-4 text-sm underline text-green-700 hover:text-green-900">
          Отправить ещё одну
        </button>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 rounded-xl border p-6 shadow-sm bg-white">
      <h3 className="text-xl text-black font-bold mb-4">Оставить заявку</h3>
      
      <input type="text" {...register("honeypot")} className="hidden" tabIndex={-1} autoComplete="off" />

      <div>
        <label className="block text-black text-sm font-medium mb-1">Ваше имя *</label>
        <input {...register("name")} className="bg-gray-200 text-black w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="Иван" />
        {errors.name && <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>}
      </div>

      <div>
        <label className="block text-black text-sm font-medium mb-1">Телефон *</label>
        <input {...register("phone")} className="bg-gray-200 w-full text-black rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none" placeholder="+7 (999) 000-00-00" />
        {errors.phone && <p className="mt-1 text-sm text-red-600">{errors.phone.message}</p>}
      </div>

      <div>
        <label className="block text-sm text-black font-medium mb-1">Комментарий</label>
        <textarea {...register("message")} rows={3} className="bg-gray-200 text-black w-full rounded-md border px-3 py-2 focus:ring-2 focus:ring-blue-500 outline-none resize-none" placeholder="Тип объекта, площадь, желаемые сроки..." />
        {errors.message && <p className="mt-1 text-sm text-red-600">{errors.message.message}</p>}
      </div>

      <div className="flex items-start gap-2">
        <input type="checkbox" {...register("consent")} id="consent" className="mt-1 h-4 w-4" />
        <label htmlFor="consent" className="text-xs text-black leading-tight">
          Нажимая кнопку, вы соглашаетесь с <a href="/privacy" target="_blank" className="underline hover:text-blue-600">политикой обработки персональных данных (152-ФЗ)</a>
        </label>
      </div>
      {errors.consent && <p className="text-sm text-red-600">{errors.consent.message}</p>}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-lg bg-blue-600 px-4 py-3 font-medium text-gray transition hover:bg-blue-700 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {isSubmitting ? "Отправка..." : "Получить смету"}
      </button>

      {serverError && <p className="mt-2 text-sm text-red-600 text-center">{serverError}</p>}
    </form>
  );
}