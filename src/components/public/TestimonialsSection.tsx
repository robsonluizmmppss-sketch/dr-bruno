"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { Star, Quote } from "lucide-react";
import type { Testimonial } from "@/types";

export default function TestimonialsSection({ testimonials }: { testimonials: Testimonial[] }) {
  if (testimonials.length === 0) return null;

  return (
    <section className="py-24 bg-[#F7FAFC]" id="depoimentos">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          className="mb-12"
        >
          <span className="text-[#1B7A8A] text-xs font-semibold uppercase tracking-[0.15em]">
            Depoimentos
          </span>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#07141C] mt-2">
            O que nossos pacientes dizem
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 items-stretch">
          {testimonials.map((testimonial, i) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: i * 0.1 }}
              className="bg-white rounded-xl p-6 border border-gray-100 hover:shadow-md transition-shadow duration-300 flex flex-col h-full"
            >
              <Quote className="w-7 h-7 text-gray-200 mb-3 flex-shrink-0" />

              <p className="text-[#0B2029]/70 text-sm leading-relaxed mb-5 flex-1">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-gray-100 flex-shrink-0">
                <div className="flex items-center gap-3">
                  {testimonial.photo ? (
                    <Image
                      src={testimonial.photo}
                      alt={testimonial.name}
                      width={40}
                      height={40}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center">
                      <span className="text-[#0F2830] text-sm font-semibold">
                        {testimonial.name.charAt(0)}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="text-[#07141C] font-semibold text-sm">{testimonial.name}</p>
                    <p className="text-[#0B2029]/40 text-xs">Paciente</p>
                  </div>
                </div>
                <div className="flex gap-0.5">
                  {Array.from({ length: 5 }).map((_, starIdx) => (
                    <Star
                      key={starIdx}
                      className={`w-3.5 h-3.5 ${
                        starIdx < testimonial.rating
                          ? "text-amber-400 fill-amber-400"
                          : "text-gray-200"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
