'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { formatPrice } from '../../lib/formatPrice';
import { Product } from '../../types/product';

type Props = {
  results: Product[];
  visible: boolean;
  highlightedIndex: number;
  onItemHover?: (index: number) => void;
  onClose?: () => void;
  query?: string;
};

function highlight(text: string, query?: string) {
  if (!query || query.trim().length < 3) return text;
  const normalize = (s: string) => s.normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase();
  const lowerText = normalize(text);
  const lowerQuery = normalize(query);
  if (!lowerQuery) return text;

  const ranges: Array<{ start: number; end: number }> = [];
  let from = 0;
  while (true) {
    const idx = lowerText.indexOf(lowerQuery, from);
    if (idx === -1) break;
    ranges.push({ start: idx, end: idx + lowerQuery.length });
    from = idx + lowerQuery.length;
  }
  if (ranges.length === 0) return text;

  const out: React.ReactNode[] = [];
  let last = 0;
  ranges.forEach((r, i) => {
    if (r.start > last) out.push(text.slice(last, r.start));
    out.push(
      <mark key={`srch-${i}-${r.start}`} className="bg-transparent text-azul-electrico font-semibold">{text.slice(r.start, r.end)}</mark>
    );
    last = r.end;
  });
  if (last < text.length) out.push(text.slice(last));
  return out;
}

export default function SearchResults({ results, visible, highlightedIndex, onItemHover, onClose, query }: Props) {
  return (
    <AnimatePresence>
      {visible && results.length > 0 && (
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 8 }}
          transition={{ duration: 0.15, ease: 'easeOut' }}
          className="absolute left-0 right-0 top-full mt-2 z-[60] rounded-xl border border-azul-electrico/20 bg-[#0d1a2b]/90 backdrop-blur-md shadow-xl overflow-hidden"
        >
          <ul className="divide-y divide-white/5" role="listbox" aria-label="Resultados de búsqueda">
            {results.map((p, i) => (
              <li key={p.id} onMouseEnter={() => onItemHover?.(i)} role="option" aria-selected={highlightedIndex === i}>
                <Link
                  href={`/products/${p.id}`}
                  onClick={onClose}
                  className={`flex items-center gap-3 p-3 transition-colors ${
                    highlightedIndex === i ? 'bg-azul-electrico/15' : 'hover:bg-white/5'
                  }`}
                >
                  <div className="relative w-12 h-12 flex-shrink-0 rounded-md overflow-hidden bg-zinc-700">
                    <Image src={p.imagenUrl} alt={p.nombre} fill style={{ objectFit: 'cover' }} />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-white truncate">{highlight(p.nombre, query)}</p>
                    <p className="text-xs text-gray-400 truncate">{highlight(p.marca || '', query)}{p.modeloCompatible ? <> • {highlight(p.modeloCompatible, query)}</> : ''}</p>
                  </div>
                  <div className="text-sm font-semibold text-azul-electrico whitespace-nowrap">
                    {formatPrice(p.precio)}
                  </div>
                </Link>
              </li>
            ))}
            <li>
              <Link
                href={query && query.trim().length ? `/products?q=${encodeURIComponent(query.trim())}` : '/products'}
                onClick={onClose}
                className="block text-center p-3 text-sm text-azul-electrico hover:bg-white/5"
              >
                Ver todos los resultados
              </Link>
            </li>
          </ul>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
