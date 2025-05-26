"use client";

import { useState, useEffect } from 'react';
import Button from '../ui/Button';
import Icon from '../ui/Icon';
import Modal from '../ui/Modal';
import content from '@/data/content.json';

export default function AdditionalCtasSection() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isButtonVisible, setIsButtonVisible] = useState(false);
  
  // Get section data
  const homePageData = content.pages.find(page => page.id === 'home');
  const additionalCtasSection = homePageData?.sections.find(section => section.id === 'additionalCtas');
  
  // Don't render anything if section doesn't exist
  if (!additionalCtasSection) {
    return null;
  }
  
  // Show floating button after scroll
  useEffect(() => {
    const handleScroll = () => {
      // Show button after 300px of scroll
      setIsButtonVisible(window.scrollY > 300);
    };
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on initial load
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  // Open/close modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };
  
  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  
  return (
    <>
      {/* Floating bid tab */}
      <div 
        className={`floating-chat-btn ${isButtonVisible ? 'visible' : ''}`}
        onClick={handleOpenModal}
      >
        <div className="btn-content">
          <Icon name="chat" width={20} height={20} />
          <span className="btn-text">{additionalCtasSection.floatingButton?.text || "Ready to Bid? Let's Talk"}</span>
        </div>
      </div>
      
      {/* Modal popup */}
      <Modal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        title={additionalCtasSection.floatingButton?.modalTitle || "Let's discuss your project"}
        content={additionalCtasSection.floatingButton?.modalContent || "We're ready to help you find the right opportunities. Tell us about your needs."}
        ctaButton={additionalCtasSection.floatingButton?.modalCta || {
          text: "Schedule a Call",
          href: "#strategy-call"
        }}
        size="md"
      />
      
      {/* Global styles for floating button */}
      <style jsx global>{`
        /* Floating bid tab styles */
        .floating-chat-btn {
          position: fixed;
          top: 50%;
          right: 0;
          transform: translateY(-50%) translateX(calc(100% - 40px));
          background: linear-gradient(135deg, var(--secondary), #FF8A7E);
          color: white;
          border-radius: 8px 0 0 8px;
          padding: 12px 12px 12px 16px;
          box-shadow: -2px 2px 10px rgba(0, 0, 0, 0.15);
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 100;
          opacity: 0;
          transition: all 0.3s cubic-bezier(0.2, 0.8, 0.2, 1);
          border: 1px solid rgba(255, 255, 255, 0.2);
          border-right: none;
          writing-mode: vertical-rl;
          transform-origin: right center;
        }
        
        .floating-chat-btn.visible {
          transform: translateY(-50%) translateX(0);
          opacity: 1;
        }
        
        .floating-chat-btn:hover {
          transform: translateY(-50%) translateX(-5px);
          box-shadow: -4px 2px 15px rgba(0, 0, 0, 0.2);
        }
        
        .floating-chat-btn:active {
          transform: translateY(-50%) translateX(0);
        }
        
        .btn-content {
          display: flex;
          align-items: center;
          gap: 10px;
          transform: rotate(180deg);
        }
        
        .btn-content svg {
          transform: rotate(90deg);
          margin-top: 5px;
        }
        
        .btn-text {
          font-weight: 600;
          font-size: 14px;
          white-space: nowrap;
        }
        
        /* Glow effect */
        .floating-chat-btn::before {
          content: '';
          position: absolute;
          inset: -3px;
          background: linear-gradient(135deg, rgba(255, 111, 97, 0.5), rgba(255, 138, 126, 0.5));
          border-radius: 8px 0 0 8px;
          z-index: -1;
          filter: blur(8px);
          opacity: 0;
          transition: opacity 0.3s ease;
          right: 0;
        }
        
        .floating-chat-btn:hover::before {
          opacity: 1;
        }
        
        /* Mobile responsiveness */
        @media (max-width: 768px) {
          .floating-chat-btn {
            position: fixed;
            top: auto;
            bottom: 20px;
            right: 20px;
            transform: translateY(100px);
            opacity: 0;
            border-radius: 50%;
            padding: 15px;
            width: auto;
            height: auto;
            aspect-ratio: 1/1;
            writing-mode: horizontal-tb;
            border-right: 1px solid rgba(255, 255, 255, 0.2);
          }
          
          .floating-chat-btn.visible {
            transform: translateY(0);
            opacity: 1;
          }
          
          .floating-chat-btn:hover {
            transform: translateY(-5px);
            box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
          }
          
          .floating-chat-btn:active {
            transform: translateY(0);
          }
          
          .btn-content {
            transform: rotate(0);
          }
          
          .btn-content svg {
            transform: rotate(0);
            margin-top: 0;
          }
          
          .btn-text {
            display: none;
          }
          
          .floating-chat-btn::before {
            border-radius: 50%;
          }
        }
        
        @media (max-width: 576px) {
          .floating-chat-btn {
            padding: 12px;
          }
        }
      `}</style>
    </>
  );
} 