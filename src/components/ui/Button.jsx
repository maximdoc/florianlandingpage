'use client';

import Link from 'next/link';
import React from 'react';

/**
 * Универсальный компонент кнопки, который поддерживает как обычные кнопки, так и кнопки-ссылки.
 * Имеет поддержку различных вариантов стилей и размеров.
 */
const Button = ({
  children,
  href,
  variant = 'primary',
  size = 'md',
  className = '',
  startIcon,
  endIcon,
  isIconOnly = false,
  disabled = false,
  onClick,
  type = 'button',
  ...props
}) => {
  // Определяем базовый класс
  const baseClass = 'btn';
  
  // Определяем классы в зависимости от варианта
  const variantClass = `btn-${variant}`;
  
  // Определяем классы в зависимости от размера
  const sizeClass = size === 'lg' ? 'btn-lg' : size === 'sm' ? 'btn-sm' : '';
  
  // Определяем класс для кнопки с иконкой
  const iconClass = startIcon || endIcon ? 'btn-icon' : '';
  const iconOnlyClass = isIconOnly ? 'btn-icon-only' : '';
  
  // Собираем все классы вместе
  const classes = [
    baseClass,
    variantClass,
    sizeClass,
    iconClass,
    iconOnlyClass,
    className,
  ].filter(Boolean).join(' ');
  
  // Если у нас есть href, рендерим Link
  if (href) {
    return (
      <Link
        href={href}
        className={classes}
        {...props}
      >
        {startIcon && <span className="btn-icon-start">{startIcon}</span>}
        {!isIconOnly && children}
        {endIcon && <span className="btn-icon-end">{endIcon}</span>}
      </Link>
    );
  }
  
  // Иначе рендерим кнопку
  return (
    <button
      type={type}
      className={classes}
      onClick={onClick}
      disabled={disabled}
      {...props}
    >
      {startIcon && <span className="btn-icon-start">{startIcon}</span>}
      {!isIconOnly && children}
      {endIcon && <span className="btn-icon-end">{endIcon}</span>}
    </button>
  );
};

export default Button; 