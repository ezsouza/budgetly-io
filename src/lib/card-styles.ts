/**
 * Shared utility functions for Apple-style interactive card styling
 */

export const getCardStyle = (value: number, type?: 'income' | 'expense' | 'net') => {
  if (type === 'income' || (type === 'net' && value > 0)) {
    return "bg-gradient-to-br from-green-50 to-emerald-100 dark:from-green-900/20 dark:to-emerald-900/30 border-green-200 dark:border-green-800 hover:shadow-green-200/50 dark:hover:shadow-green-900/30 hover:border-green-300 dark:hover:border-green-700"
  } else if (type === 'expense' || (type === 'net' && value < 0)) {
    return "bg-gradient-to-br from-red-50 to-rose-100 dark:from-red-900/20 dark:to-rose-900/30 border-red-200 dark:border-red-800 hover:shadow-red-200/50 dark:hover:shadow-red-900/30 hover:border-red-300 dark:hover:border-red-700"
  } else {
    return "bg-gradient-to-br from-gray-50 to-slate-100 dark:from-gray-900/20 dark:to-slate-900/30 border-gray-200 dark:border-gray-700 hover:shadow-gray-200/50 dark:hover:shadow-gray-900/30 hover:border-gray-300 dark:hover:border-gray-600"
  }
}

export const getValueColor = (value: number, type?: 'income' | 'expense' | 'net') => {
  if (type === 'income' || (type === 'net' && value > 0)) {
    return "text-green-700 dark:text-green-400"
  } else if (type === 'expense' || (type === 'net' && value < 0)) {
    return "text-red-700 dark:text-red-400"
  } else {
    return "text-gray-700 dark:text-gray-300"
  }
}

export const getProgressColor = (value: number, type?: 'income' | 'expense' | 'net') => {
  if (type === 'income' || (type === 'net' && value > 0)) {
    return "bg-green-500"
  } else if (type === 'expense' || (type === 'net' && value < 0)) {
    return "bg-red-500"
  } else {
    return "bg-gray-400"
  }
}

export const baseCardClasses = `
  relative overflow-hidden rounded-2xl p-6 border transition-all duration-300 ease-out
  hover:scale-105 hover:shadow-2xl hover:-translate-y-1 transform-gpu
  active:scale-95 active:transition-none
`

export const cardBackgroundPatterns = `
  /* Background pattern */
  .card-pattern::before {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.2) 0%, transparent 100%);
    pointer-events: none;
  }
  
  .dark .card-pattern::before {
    background: linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, transparent 100%);
  }
  
  /* Subtle radial gradient for depth */
  .card-pattern::after {
    content: '';
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, transparent 0%, transparent 70%, rgba(0, 0, 0, 0.05) 100%);
    pointer-events: none;
  }
  
  .dark .card-pattern::after {
    background: radial-gradient(circle at center, transparent 0%, transparent 70%, rgba(255, 255, 255, 0.05) 100%);
  }
`