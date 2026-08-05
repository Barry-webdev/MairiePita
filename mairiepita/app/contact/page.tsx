'use client';

import { useState } from 'react';
import TopBar from '@/components/TopBar';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  return (
    <main>
      <TopBar />
      <Navbar />

      {/* Green banner */}
      <div className="py-12 px-4 text-white" style={{ backgroundColor: '#1a5c2a' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-2 text-sm mb-3" style={{ color: 'rgba(255,255,255,0.75)' }}>
            <a href="/" className="hover:text-white transition-colors">Accueil</a>
            <span>/</span>
            <span className="text-white">Contact</span>
          </div>
          <h1 className="text-3xl md:text-4xl font-black uppercase tracking-wide">
            Nous Contacter
          </h1>
          <p className="mt-2 text-sm max-w-xl" style={{ color: 'rgba(255,255,255,0.8)' }}>
            Notre équipe est à votre écoute. N&apos;hésitez pas à nous écrire ou à nous appeler.
          </p>
        </div>
      </div>

      {/* Content */}
      <div className="py-12 px-4" style={{ backgroundColor: '#f5f5f5' }}>
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col lg:flex-row gap-8">

            {/* Left: contact info */}
            <div className="flex flex-col gap-5 lg:w-96 flex-shrink-0">

              {/* Address */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 text-white"
                  style={{ backgroundColor: '#1a5c2a' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Adresse</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Rue Administrative, Quartier Daremagnan,<br />
                    Commune Urbaine de Pita, Guinée
                  </p>
                </div>
              </div>

              {/* Phone */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 text-white"
                  style={{ backgroundColor: '#1a5c2a' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Téléphone</h3>
                  <a href="tel:+22412345679" className="text-sm text-gray-600 hover:text-green-700 transition-colors">
                    +224 123 45 67 89
                  </a>
                </div>
              </div>

              {/* Email */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 text-white"
                  style={{ backgroundColor: '#1a5c2a' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-1">Email</h3>
                  <a href="mailto:contact@mairiepita.gov.gn" className="text-sm text-gray-600 hover:text-green-700 transition-colors">
                    contact@mairiepita.gov.gn
                  </a>
                </div>
              </div>

              {/* Horaires */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5 flex gap-4">
                <div
                  className="flex items-center justify-center w-12 h-12 rounded-xl flex-shrink-0 text-white"
                  style={{ backgroundColor: '#1a5c2a' }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-gray-800 text-sm mb-2">Horaires d&apos;ouverture</h3>
                  <div className="flex flex-col gap-1 text-sm text-gray-600">
                    <div className="flex justify-between gap-6">
                      <span>Lundi - Vendredi</span>
                      <span className="font-semibold">08h00 - 17h00</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Samedi</span>
                      <span className="font-semibold">08h00 - 12h00</span>
                    </div>
                    <div className="flex justify-between gap-6">
                      <span>Dimanche</span>
                      <span className="font-semibold text-red-500">Fermé</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Social media */}
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-5">
                <h3 className="font-bold text-gray-800 text-sm mb-4">Suivez-nous</h3>
                <div className="flex items-center gap-3">
                  {/* Facebook */}
                  <a
                    href="#"
                    aria-label="Facebook"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: '#1877f2' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                    </svg>
                  </a>
                  {/* Twitter */}
                  <a
                    href="#"
                    aria-label="Twitter"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: '#000' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                  {/* YouTube */}
                  <a
                    href="#"
                    aria-label="YouTube"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:brightness-110"
                    style={{ backgroundColor: '#ff0000' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M22.54 6.42a2.78 2.78 0 00-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 001.46 6.42 29 29 0 001 12a29 29 0 00.46 5.58 2.78 2.78 0 001.95 1.95C5.12 20 12 20 12 20s6.88 0 8.59-.47a2.78 2.78 0 001.95-1.95A29 29 0 0023 12a29 29 0 00-.46-5.58zM9.75 15.02V8.98L15.5 12z" />
                    </svg>
                  </a>
                  {/* Instagram */}
                  <a
                    href="#"
                    aria-label="Instagram"
                    className="flex items-center justify-center w-10 h-10 rounded-full text-white transition-all hover:brightness-110"
                    style={{ background: 'linear-gradient(45deg, #f09433, #e6683c, #dc2743, #cc2366, #bc1888)' }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
                    </svg>
                  </a>
                </div>
              </div>
            </div>

            {/* Right: contact form */}
            <div className="flex-1">
              <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                <h2 className="text-xl font-black uppercase tracking-wide mb-6" style={{ color: '#1a5c2a' }}>
                  Envoyer un message
                </h2>

                {submitted ? (
                  <div className="flex items-start gap-4 p-5 rounded-xl" style={{ backgroundColor: '#f0fdf4', border: '1px solid #bbf7d0' }}>
                    <div className="flex items-center justify-center w-10 h-10 rounded-full flex-shrink-0" style={{ backgroundColor: '#dcfce7' }}>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" style={{ color: '#15803d' }} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <div>
                      <p className="font-bold text-sm mb-1" style={{ color: '#15803d' }}>Message envoyé !</p>
                      <p className="text-sm text-gray-600">
                        Votre message a été envoyé avec succès. Nous vous répondrons dans les plus brefs délais.
                      </p>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="name" className="text-sm font-semibold text-gray-700">
                          Nom complet <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="name"
                          name="name"
                          type="text"
                          value={form.name}
                          onChange={handleChange}
                          required
                          placeholder="Votre nom"
                          className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                      </div>
                      <div className="flex flex-col gap-1.5">
                        <label htmlFor="email" className="text-sm font-semibold text-gray-700">
                          Email <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="email"
                          name="email"
                          type="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="votre@email.com"
                          className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                        />
                      </div>
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="subject" className="text-sm font-semibold text-gray-700">
                        Objet
                      </label>
                      <input
                        id="subject"
                        name="subject"
                        type="text"
                        value={form.subject}
                        onChange={handleChange}
                        placeholder="Objet de votre message"
                        className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600"
                      />
                    </div>

                    <div className="flex flex-col gap-1.5">
                      <label htmlFor="message" className="text-sm font-semibold text-gray-700">
                        Message <span className="text-red-500">*</span>
                      </label>
                      <textarea
                        id="message"
                        name="message"
                        rows={6}
                        value={form.message}
                        onChange={handleChange}
                        required
                        placeholder="Votre message..."
                        className="px-4 py-2.5 text-sm border border-gray-300 rounded-lg focus:outline-none focus:border-green-600 focus:ring-1 focus:ring-green-600 resize-none"
                      />
                    </div>

                    <button
                      type="submit"
                      className="inline-flex items-center justify-center gap-2 px-8 py-3 text-sm font-bold text-white rounded-lg transition-all hover:brightness-110 w-full sm:w-auto"
                      style={{ backgroundColor: '#1a5c2a' }}
                    >
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                      Envoyer le message
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </main>
  );
}
