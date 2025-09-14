import React, { useEffect, useRef } from 'react';

interface MatrixCodeRainProps {
  className?: string;
}

const MatrixCodeRain: React.FC<MatrixCodeRainProps> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions
    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();
    
    // Matrix characters - using a mix of characters for a tech/code look
    const characters = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ{}[]<>=*/-+!@#$%^&()';
    
    const fontSize = 14;
    const columns = Math.floor(canvas.width / fontSize);
    
    // Array to track the y position of each column
    const drops: number[] = [];
    
    // Initialize all columns
    for (let i = 0; i < columns; i++) {
      // Random starting position
      drops[i] = Math.random() * -100;
    }
    
    // Colors from the HBS Automations theme
    const colors = [
      '#00FFFF', // hbs-cyan
      '#8A2BE2', // hbs-electric-purple
      '#9D00FF', // hbs-neon-purple
    ];
    
    const draw = () => {
      // Semi-transparent black to create trail effect
      ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      for (let i = 0; i < drops.length; i++) {
        // Get a random character
        const text = characters.charAt(Math.floor(Math.random() * characters.length));
        
        // Get random color from theme
        const color = colors[Math.floor(Math.random() * colors.length)];
        
        // Speed variation
        const speed = Math.random() * 1.5 + 0.5;
        
        // Set the color
        ctx.fillStyle = color;
        ctx.font = `${fontSize}px monospace`;
        
        // Draw the character
        ctx.fillText(text, i * fontSize, drops[i] * fontSize);
        
        // Move the drop down
        drops[i] += speed;
        
        // Reset the drop when it reaches the bottom
        if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
          drops[i] = 0;
        }
      }
      
      requestAnimationFrame(draw);
    };
    
    // Start the animation
    const animationId = requestAnimationFrame(draw);
    
    // Clean up
    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, []);
  
  return (
    <canvas 
      ref={canvasRef} 
      className={`absolute inset-0 z-0 ${className}`}
      style={{ pointerEvents: 'none' }}
    />
  );
};

export default MatrixCodeRain;