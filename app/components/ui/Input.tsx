// app/components/ui/Input.tsx
import React, { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  error?: string
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ className = '', error, ...props }, ref) => {
    return (
      <div className="w-full">
        <input
          ref={ref}
          className={`
            w-full px-3 py-2 rounded-lg bg-zinc-800/60 border border-white/10 
            text-white placeholder-gray-400 
            focus:outline-none focus:ring-2 focus:ring-azul-electrico/60 focus:border-azul-electrico/60 
            transition-all duration-200
            ${error ? 'border-red-500 focus:border-red-500 focus:ring-red-500/60' : ''}
            ${className}
          `}
          {...props}
        />
        {error && (
          <p className="mt-1 text-sm text-red-400">{error}</p>
        )}
      </div>
    )
  }
)

Input.displayName = 'Input'

export default Input