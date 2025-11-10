"use client";

import { motion, useReducedMotion } from "framer-motion";
import React, { useMemo, useState, useEffect } from "react";

type Variant = "subtle" | "medium" | "intense";

// Fondo moderno y atractivo para el catálogo

// Posiciones fijas para las partículas (evita hydration mismatch)
const PARTICLE_POSITIONS = [
  { x: 15, y: 20, size: 4, duration: 18, delay: 0, moveX: 5 },
  { x: 85, y: 30, size: 3, duration: 22, delay: 1, moveX: -8 },
  { x: 45, y: 15, size: 5, duration: 20, delay: 2, moveX: 10 },
  { x: 70, y: 60, size: 3.5, duration: 19, delay: 0.5, moveX: -5 },
  { x: 25, y: 75, size: 4.5, duration: 21, delay: 1.5, moveX: 7 },
  { x: 90, y: 50, size: 3, duration: 23, delay: 2.5, moveX: -6 },
  { x: 10, y: 85, size: 4, duration: 17, delay: 0.8, moveX: 8 },
  { x: 60, y: 25, size: 3.8, duration: 24, delay: 1.8, moveX: -7 },
  { x: 35, y: 90, size: 5.5, duration: 19, delay: 3, moveX: 6 },
  { x: 80, y: 10, size: 3.2, duration: 22, delay: 0.3, moveX: -9 },
  { x: 50, y: 40, size: 4.2, duration: 20, delay: 2.2, moveX: 5 },
  { x: 20, y: 55, size: 3.6, duration: 21, delay: 1.2, moveX: -8 },
  { x: 75, y: 80, size: 4.8, duration: 18, delay: 2.8, moveX: 7 },
  { x: 40, y: 5, size: 3.4, duration: 23, delay: 0.6, moveX: -6 },
  { x: 95, y: 70, size: 5.2, duration: 19, delay: 1.6, moveX: 9 },
  { x: 5, y: 45, size: 3.9, duration: 22, delay: 2.4, moveX: -5 },
  { x: 65, y: 95, size: 4.6, duration: 20, delay: 0.9, moveX: 8 },
  { x: 30, y: 35, size: 3.3, duration: 21, delay: 1.9, moveX: -7 },
  { x: 88, y: 15, size: 5.4, duration: 18, delay: 2.6, moveX: 6 },
  { x: 12, y: 65, size: 4.4, duration: 24, delay: 0.4, moveX: -9 },
  { x: 55, y: 78, size: 3.7, duration: 19, delay: 1.4, moveX: 10 },
  { x: 72, y: 42, size: 4.1, duration: 22, delay: 2.9, moveX: -5 },
  { x: 18, y: 8, size: 5.8, duration: 20, delay: 0.7, moveX: 7 },
  { x: 92, y: 88, size: 3.1, duration: 21, delay: 1.7, moveX: -8 },
  { x: 42, y: 52, size: 4.9, duration: 23, delay: 2.1, moveX: 6 },
  { x: 68, y: 22, size: 3.5, duration: 18, delay: 0.2, moveX: -6 },
  { x: 8, y: 92, size: 5.1, duration: 19, delay: 2.3, moveX: 9 },
  { x: 82, y: 38, size: 4.3, duration: 22, delay: 1.1, moveX: -7 },
  { x: 38, y: 68, size: 3.8, duration: 20, delay: 2.7, moveX: 5 },
  { x: 98, y: 48, size: 5.6, duration: 21, delay: 1.3, moveX: -10 },
];

// Componente de partículas flotantes
const FloatingParticles = ({ count = 20 }: { count?: number }) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const particles = useMemo(() => 
    PARTICLE_POSITIONS.slice(0, count),
    [count]
  );

  if (!isMounted) return null;

  return (
    <>
      {particles.map((particle, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full bg-linear-to-br from-cyan-400/30 to-blue-500/20"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: particle.size,
            height: particle.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, particle.moveX, 0],
            opacity: [0.2, 0.6, 0.2],
            scale: [1, 1.2, 1],
          }}
          transition={{
            duration: particle.duration,
            repeat: Infinity,
            delay: particle.delay,
            ease: "easeInOut",
          }}
        />
      ))}
    </>
  );
};

export default function CatalogBackground({ variant = "subtle" }: { variant?: Variant }) {
  const reduce = useReducedMotion();

  const isIntense = variant === "intense";
  const isMedium = variant === "medium";

  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 -z-10 overflow-hidden">
      {/* Fondo base oscuro */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0a0f1f] via-[#0c1428] to-[#081220]" />
      
      {/* Gradiente base dinámico con múltiples colores */}
      <motion.div
        className="absolute inset-0 opacity-50"
        style={{
          background: `
            radial-gradient(ellipse 80rem 60rem at 20% 10%, rgba(0, 191, 255, 0.25), transparent 50%),
            radial-gradient(ellipse 70rem 50rem at 80% 30%, rgba(59, 130, 246, 0.22), transparent 50%),
            radial-gradient(ellipse 90rem 70rem at 50% 80%, rgba(14, 165, 233, 0.20), transparent 55%),
            radial-gradient(ellipse 60rem 50rem at 10% 60%, rgba(34, 211, 238, 0.18), transparent 50%)
          `,
        }}
        animate={reduce ? undefined : {
          scale: [1, 1.05, 1],
          rotate: [0, 2, 0],
        }}
        transition={{
          duration: 30,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Aurora boreal efecto - capas de luz ondulante */}
      <motion.div
        className="absolute inset-0"
        style={{
          background: `
            linear-gradient(135deg, 
              transparent 0%, 
              rgba(0, 191, 255, 0.04) 20%, 
              rgba(59, 130, 246, 0.06) 40%, 
              rgba(14, 165, 233, 0.04) 60%, 
              transparent 80%
            )
          `,
        }}
        animate={reduce ? undefined : {
          backgroundPosition: ['0% 0%', '100% 100%', '0% 0%'],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Mesh gradient moderno con glassmorphism */}
      <motion.div
        className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%]"
        style={{
          background: `
            radial-gradient(at 20% 30%, rgba(0, 191, 255, 0.35) 0px, transparent 50%),
            radial-gradient(at 80% 20%, rgba(59, 130, 246, 0.30) 0px, transparent 50%),
            radial-gradient(at 40% 70%, rgba(14, 165, 233, 0.28) 0px, transparent 50%),
            radial-gradient(at 90% 80%, rgba(34, 211, 238, 0.25) 0px, transparent 50%),
            radial-gradient(at 10% 90%, rgba(6, 182, 212, 0.22) 0px, transparent 50%)
          `,
        }}
        animate={reduce ? undefined : {
          x: [0, 50, 0],
          y: [0, -30, 0],
          rotate: [0, 5, 0],
        }}
        transition={{
          duration: 40,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Orbes luminosos principales con efecto glow mejorado */}
      <motion.div
        className="absolute -top-40 -left-40 w-[800px] h-[800px]"
        style={{
          background: `
            radial-gradient(circle at center, 
              rgba(0, 191, 255, 0.3) 0%, 
              rgba(0, 191, 255, 0.18) 25%, 
              rgba(0, 191, 255, 0.08) 50%, 
              transparent 70%
            )
          `,
          filter: 'blur(60px)',
        }}
        animate={reduce ? undefined : {
          x: [0, 40, 0],
          y: [0, -20, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      <motion.div
        className="absolute top-1/4 -right-40 w-[700px] h-[700px]"
        style={{
          background: `
            radial-gradient(circle at center, 
              rgba(59, 130, 246, 0.28) 0%, 
              rgba(59, 130, 246, 0.16) 30%, 
              rgba(59, 130, 246, 0.06) 55%, 
              transparent 75%
            )
          `,
          filter: 'blur(70px)',
        }}
        animate={reduce ? undefined : {
          x: [0, -30, 0],
          y: [0, 25, 0],
          scale: [1, 1.15, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
      />

      <motion.div
        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px]"
        style={{
          background: `
            radial-gradient(ellipse at center, 
              rgba(14, 165, 233, 0.25) 0%, 
              rgba(14, 165, 233, 0.14) 35%, 
              rgba(14, 165, 233, 0.05) 60%, 
              transparent 80%
            )
          `,
          filter: 'blur(80px)',
        }}
        animate={reduce ? undefined : {
          scale: [1, 1.12, 1],
          y: [0, -40, 0],
        }}
        transition={{
          duration: 32,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1,
        }}
      />

      {/* Orbes secundarios para profundidad */}
      {!reduce && (
        <>
          <motion.div
            className="absolute top-1/3 left-1/4 w-[500px] h-[500px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(34, 211, 238, 0.18) 0%, transparent 65%)',
              filter: 'blur(50px)',
            }}
            animate={{
              y: [0, -35, 0],
              x: [0, 20, 0],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 22,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 1.5,
            }}
          />

          <motion.div
            className="absolute bottom-1/4 right-1/3 w-[550px] h-[550px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(6, 182, 212, 0.16) 0%, transparent 70%)',
              filter: 'blur(55px)',
            }}
            animate={{
              y: [0, 30, 0],
              x: [0, -15, 0],
              opacity: [0.25, 0.45, 0.25],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 0.8,
            }}
          />

          <motion.div
            className="absolute top-2/3 left-1/6 w-[400px] h-[400px]"
            style={{
              background: 'radial-gradient(circle at center, rgba(56, 189, 248, 0.22) 0%, transparent 68%)',
              filter: 'blur(45px)',
            }}
            animate={{
              x: [0, 25, 0],
              y: [0, -18, 0],
              scale: [1, 1.08, 1],
            }}
            transition={{
              duration: 24,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 3,
            }}
          />
        </>
      )}

      {/* Partículas flotantes - solo en variant intense */}
      {isIntense && !reduce && <FloatingParticles count={30} />}

      {/* Grid moderno con efecto de perspectiva */}
      <div 
        className={`absolute inset-0 ${isIntense ? 'opacity-[0.08]' : isMedium ? 'opacity-[0.05]' : 'opacity-[0.03]'}`}
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(0, 191, 255, 0.15) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(0, 191, 255, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: '100px 100px',
          transform: 'perspective(1000px) rotateX(60deg)',
          transformOrigin: 'center bottom',
        }}
      />

      {/* Efectos adicionales para variant intense */}
      {isIntense && (
        <>
          {/* Glow central potente detrás del título */}
          <motion.div
            className="absolute top-32 left-1/2 -translate-x-1/2 w-[600px] h-[600px]"
            style={{
              background: `
                radial-gradient(circle at center, 
                  rgba(0, 191, 255, 0.35) 0%, 
                  rgba(0, 191, 255, 0.18) 30%, 
                  rgba(0, 191, 255, 0.06) 50%, 
                  transparent 70%
                )
              `,
              filter: 'blur(90px)',
            }}
            animate={reduce ? undefined : {
              scale: [1, 1.2, 1],
              opacity: [0.3, 0.5, 0.3],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />

          {/* Rayos de luz dinámicos */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(120deg, 
                  transparent 0%, 
                  transparent 45%, 
                  rgba(0, 191, 255, 0.08) 48%, 
                  rgba(0, 191, 255, 0.15) 50%, 
                  rgba(0, 191, 255, 0.08) 52%, 
                  transparent 55%, 
                  transparent 100%
                )
              `,
            }}
            animate={reduce ? undefined : {
              backgroundPosition: ['0% 0%', '200% 200%'],
              opacity: [0, 0.6, 0],
            }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: "linear",
            }}
          />

          {/* Segundo rayo diagonal */}
          <motion.div
            className="absolute inset-0"
            style={{
              background: `
                linear-gradient(60deg, 
                  transparent 0%, 
                  transparent 45%, 
                  rgba(59, 130, 246, 0.06) 48%, 
                  rgba(59, 130, 246, 0.12) 50%, 
                  rgba(59, 130, 246, 0.06) 52%, 
                  transparent 55%, 
                  transparent 100%
                )
              `,
            }}
            animate={reduce ? undefined : {
              backgroundPosition: ['0% 0%', '200% 200%'],
              opacity: [0, 0.5, 0],
            }}
            transition={{
              duration: 10,
              repeat: Infinity,
              ease: "linear",
              delay: 2,
            }}
          />

          {/* Efecto de ondas expansivas */}
          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '200px',
              height: '200px',
              border: '2px solid rgba(0, 191, 255, 0.3)',
              borderRadius: '50%',
            }}
            animate={reduce ? undefined : {
              scale: [1, 4],
              opacity: [0.6, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
            }}
          />

          <motion.div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
            style={{
              width: '200px',
              height: '200px',
              border: '2px solid rgba(59, 130, 246, 0.3)',
              borderRadius: '50%',
            }}
            animate={reduce ? undefined : {
              scale: [1, 4.5],
              opacity: [0.5, 0],
            }}
            transition={{
              duration: 4,
              repeat: Infinity,
              ease: "easeOut",
              delay: 1,
            }}
          />
        </>
      )}

      {/* Overlays de profundidad mejorados */}
      <div className="absolute inset-0 bg-linear-to-b from-black/20 via-transparent to-black/30" />
      <div className="absolute inset-0 bg-linear-to-t from-black/25 via-transparent to-transparent" />
      
      {/* Vignette suave pero efectivo */}
      <div 
        className="absolute inset-0"
        style={{
          background: 'radial-gradient(ellipse at center, rgba(0,0,0,0) 40%, rgba(0,0,0,0.15) 80%, rgba(0,0,0,0.25) 100%)',
        }}
      />

      {/* Textura de ruido para realismo */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
