"use client";

import { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import Button from './Button';

export default function Modal({ 
  isOpen, 
  onClose, 
  title, 
  content, 
  ctaButton = null,
  size = 'md',  // sm, md, lg
}) {
  const modalRef = useRef(null);
  
  // Close modal when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // Add overflow hidden to body to prevent scrolling when modal is open
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // Restore scroll when modal is closed
      document.body.style.overflow = 'auto';
    };
  }, [isOpen, onClose]);
  
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event) => {
      if (event.key === 'Escape') {
        onClose();
      }
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
    };
  }, [isOpen, onClose]);
  
  // Handle CTA button click - close modal and navigate
  const handleCtaClick = () => {
    onClose();
    // The Button component will handle the navigation via href
  };
  
  // Don't render anything if modal is not open
  if (!isOpen) return null;
  
  // Use a portal to render modal at the top level of the DOM
  return createPortal(
    <div className="modal-overlay">
      <div 
        className={`modal-container modal-${size}`}
        ref={modalRef}
      >
        <button className="close-button-top" onClick={onClose}>
          <span>×</span>
        </button>
        
        <div className="modal-header">
          <h3 className="modal-title">{title}</h3>
        </div>
        
        <div className="modal-content">
          {typeof content === 'string' ? <p>{content}</p> : content}
        </div>
        
        {ctaButton && (
          <div className="modal-footer">
            <Button 
              href={ctaButton.href} 
              variant="action"
              size="lg"
              onClick={handleCtaClick}
              className="modal-cta-button"
            >
              {ctaButton.text}
            </Button>
          </div>
        )}
        
        <style jsx global>{`
          .modal-overlay {
            position: fixed;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: rgba(0, 0, 0, 0.6);
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 1000;
            backdrop-filter: blur(5px);
          }
          
          .modal-container {
            background: var(--card-bg, white);
            border-radius: 20px;
            box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
            overflow: hidden;
            max-width: 95%;
            animation: modalFadeIn 0.3s ease-out forwards;
            border: 1px solid var(--card-border, rgba(0, 0, 0, 0.1));
            position: relative;
            padding-top: 20px;
          }
          
          .modal-sm {
            width: 400px;
          }
          
          .modal-md {
            width: 550px;
          }
          
          .modal-lg {
            width: 800px;
          }
          
          .close-button-top {
            position: absolute;
            top: 15px;
            right: 15px;
            background: rgba(0, 0, 0, 0.05);
            border: none;
            width: 30px;
            height: 30px;
            border-radius: 50%;
            font-size: 20px;
            line-height: 0;
            color: var(--text-secondary);
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: all 0.2s ease;
            z-index: 5;
          }
          
          .close-button-top:hover {
            background: rgba(0, 0, 0, 0.1);
            color: var(--text-primary);
          }
          
          .modal-header {
            padding: 1.5rem 2rem 0.5rem;
            text-align: center;
          }
          
          .modal-title {
            margin: 0;
            font-size: 1.8rem;
            font-weight: 700;
            color: var(--text-primary);
            letter-spacing: -0.01em;
            line-height: 1.3;
            position: relative;
            display: inline-block;
            padding-bottom: 12px;
          }
          
          .modal-title::after {
            content: "";
            position: absolute;
            bottom: -4px;
            left: 50%;
            transform: translateX(-50%);
            width: 80px;
            height: 3px;
            background: -webkit-linear-gradient(left, #8b5cf6, transparent);
            background: -moz-linear-gradient(left, #8b5cf6, transparent);
            background: -o-linear-gradient(left, #8b5cf6, transparent);
            background: linear-gradient(90deg, #8b5cf6, transparent);
            -webkit-border-radius: 3px;
            -moz-border-radius: 3px;
            border-radius: 3px;
          }
          
          .modal-content {
            padding: 1rem 2rem;
            font-size: 1.1rem;
            line-height: 1.6;
            color: var(--text-secondary);
            text-align: center;
          }
          
          .modal-content p {
            margin-bottom: 0.5rem;
          }
          
          .modal-footer {
            padding: 1.25rem 2rem 2rem;
            display: flex;
            justify-content: center;
          }
          
          .modal-footer button {
            min-width: 200px;
            padding: 0.75rem 2rem;
          }
          
          /* Add a subtle glow effect to the button */
          .modal-footer button::after {
            content: '';
            position: absolute;
            bottom: -10px;
            left: 50%;
            transform: translateX(-50%);
            width: 80%;
            height: 15px;
            background: var(--secondary);
            filter: blur(15px);
            opacity: 0.4;
            border-radius: 50%;
            z-index: -1;
          }
          
          /* Specific styling for the modal CTA button */
          .modal-cta-button {
            background-color: var(--secondary) !important;
            color: white !important;
            transition: all 0.3s ease;
            box-shadow: 0 4px 14px rgba(255, 111, 97, 0.25);
          }
          
          .modal-cta-button:hover {
            background-color: var(--btn-action-hover-bg) !important;
            transform: translateY(-3px);
            box-shadow: 0 8px 20px rgba(255, 111, 97, 0.35);
          }
          
          .modal-cta-button:active {
            background-color: var(--btn-action-active-bg) !important;
            transform: translateY(-1px);
            box-shadow: 0 4px 10px rgba(255, 111, 97, 0.25);
          }
          
          @keyframes modalFadeIn {
            from {
              opacity: 0;
              transform: translateY(20px) scale(0.98);
            }
            to {
              opacity: 1;
              transform: translateY(0) scale(1);
            }
          }
          
          @media (max-width: 768px) {
            .modal-sm, .modal-md, .modal-lg {
              width: 90%;
            }
            
            .modal-title {
              font-size: 1.5rem;
            }
            
            .modal-content {
              font-size: 1rem;
              padding: 1rem 1.5rem;
            }
            
            .modal-header {
              padding: 1.5rem 1.5rem 0.5rem;
            }
            
            .modal-footer {
              padding: 1rem 1.5rem 1.5rem;
            }
          }
        `}</style>
      </div>
    </div>,
    document.body
  );
} 