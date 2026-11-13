'use client';
import { useState } from 'react';

const COUNTRIES = ['Panamá', 'Costa Rica', 'Honduras', 'El Salvador', 'Guatemala', 'México', 'Colombia', 'Perú', 'Ecuador', 'Otro'];
const INTERESTS = ['Software', 'Hardware', 'Curso / capacitación', 'Consultoría BIM', 'Certificación', 'Otro'];

const field =
  'w-full rounded-[6px] border border-brand-deep/20 bg-transparent px-3.5 py-3 text-[15px] text-brand-deep outline-none transition-colors placeholder:text-brand-deep/35 focus:border-brand';
const label = 't-mono mb-2 block text-brand-deep/45';

export default function ContactForm({ tone = 'light', compact = false }: { tone?: 'light' | 'dark'; compact?: boolean }) {
  const [sent, setSent] = useState(false);
  const dark = tone === 'dark';

  if (sent) {
    return (
      <div
        className={`rounded-lg border p-8 ${
          dark ? 'border-beige/20 text-beige' : 'border-brand-deep/15 text-brand-deep'
        }`}
      >
        <p className={`t-mono mb-3 ${dark ? 'text-beige/40' : 'text-brand-deep/40'}`}>Enviado</p>
        <p className="t-display text-[26px] leading-[1.15]">Gracias. Te contactamos en breve.</p>
        <p className={`mt-3 text-[14px] ${dark ? 'text-beige/60' : 'text-brand-deep/60'}`}>
          Un especialista del país que elegiste revisará tu solicitud y te escribirá el mismo día hábil.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setSent(true);
      }}
      className="grid gap-5"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="nombre">
            Nombre
          </label>
          <input id="nombre" required className={dark ? `${field} border-beige/25 text-beige placeholder:text-beige/35 focus:border-sun` : field} placeholder="Nombre" />
        </div>
        <div>
          <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="apellido">
            Apellido
          </label>
          <input id="apellido" required className={dark ? `${field} border-beige/25 text-beige placeholder:text-beige/35 focus:border-sun` : field} placeholder="Apellido" />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="email">
            Correo electrónico
          </label>
          <input id="email" type="email" required className={dark ? `${field} border-beige/25 text-beige placeholder:text-beige/35 focus:border-sun` : field} placeholder="nombre@empresa.com" />
        </div>
        <div>
          <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="telefono">
            Teléfono
          </label>
          <input id="telefono" className={dark ? `${field} border-beige/25 text-beige placeholder:text-beige/35 focus:border-sun` : field} placeholder="+507" />
        </div>
      </div>

      <div className={compact ? '' : 'grid gap-5 sm:grid-cols-2'}>
        <div>
          <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="pais">
            País
          </label>
          <select id="pais" required className={dark ? `${field} border-beige/25 text-beige` : field} defaultValue="">
            <option value="" disabled>
              Selecciona un país
            </option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c} className="text-black">
                {c}
              </option>
            ))}
          </select>
        </div>
        {!compact && (
          <div>
            <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="interes">
              Me interesa
            </label>
            <select id="interes" required className={dark ? `${field} border-beige/25 text-beige` : field} defaultValue="">
              <option value="" disabled>
                Selecciona una opción
              </option>
              {INTERESTS.map((c) => (
                <option key={c} value={c} className="text-black">
                  {c}
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      <div>
        <label className={dark ? 't-mono mb-2 block text-beige/40' : label} htmlFor="mensaje">
          Cuéntanos qué necesitas
        </label>
        <textarea
          id="mensaje"
          rows={4}
          className={dark ? `${field} resize-none border-beige/25 text-beige placeholder:text-beige/35 focus:border-sun` : `${field} resize-none`}
          placeholder="Proyecto, herramientas, número de usuarios, fechas…"
        />
      </div>

      <div className="flex flex-wrap items-center gap-4 pt-1">
        <button
          type="submit"
          className={`btn ${dark ? 'bg-beige text-brand-deep hover:bg-white' : 'bg-brand text-white hover:bg-[#e56400]'}`}
        >
          Enviar solicitud
        </button>
        <p className={`text-[11px] leading-[1.5] ${dark ? 'text-beige/40' : 'text-brand-deep/40'}`}>
          Al enviar aceptas ser contactado por PCCAD. No compartimos tus datos.
        </p>
      </div>
    </form>
  );
}
