import React, { useEffect, useRef } from 'react';

interface Particle {
  x: number;
  y: number;
  radius: number;
  color: string;
  speedX: number;
  speedY: number;
  lastMouse: { x: number, y: number };
}

const ParticlesBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight * 3; // Make canvas taller to cover scrolled content
    };

    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    // Mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Initialize particles
    const initParticles = () => {
      particles.current = [];
      const particleCount = Math.min(100, Math.floor(window.innerWidth * window.innerHeight / 10000));

      for (let i = 0; i < particleCount; i++) {
        const radius = Math.random() * 2 + 1;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          radius,
          color: getRandomColor(),
          speedX: Math.random() * 0.5 - 0.25,
          speedY: Math.random() * 0.5 - 0.25,
          lastMouse: { x: 0, y: 0 }
        });
      }
    };

    const getRandomColor = () => {
      const colors = [
        'rgba(42, 0, 68, 0.7)',    // Deep Purple
        'rgba(138, 43, 226, 0.7)',  // Electric Purple
        'rgba(0, 255, 255, 0.7)',   // Cyan
        'rgba(157, 0, 255, 0.7)'    // Neon Purple
      ];
      return colors[Math.floor(Math.random() * colors.length)];
    };

    const drawParticles = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      // Draw particles
      particles.current.forEach(particle => {
        ctx.beginPath();
        ctx.arc(particle.x, particle.y, particle.radius, 0, Math.PI * 2);
        ctx.fillStyle = particle.color;
        ctx.fill();

        // Update particle position
        particle.x += particle.speedX;
        particle.y += particle.speedY;

        // Bounce off the edges
        if (particle.x < 0 || particle.x > canvas.width) particle.speedX *= -1;
        if (particle.y < 0 || particle.y > canvas.height) particle.speedY *= -1;

        // Mouse interaction
        const dx = mousePosition.current.x - particle.x;
        const dy = mousePosition.current.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
          // Move particles away from mouse
          const angle = Math.atan2(dy, dx);
          const force = (100 - distance) / 500;
          particle.speedX -= Math.cos(angle) * force;
          particle.speedY -= Math.sin(angle) * force;
          
          // Limit speed
          const maxSpeed = 1.5;
          const speed = Math.sqrt(particle.speedX * particle.speedX + particle.speedY * particle.speedY);
          if (speed > maxSpeed) {
            particle.speedX = (particle.speedX / speed) * maxSpeed;
            particle.speedY = (particle.speedY / speed) * maxSpeed;
          }
        }
      });

      // Draw connections
      ctx.strokeStyle = 'rgba(138, 43, 226, 0.1)';
      ctx.lineWidth = 0.5;

      for (let i = 0; i < particles.current.length; i++) {
        for (let j = i + 1; j < particles.current.length; j++) {
          const p1 = particles.current[i];
          const p2 = particles.current[j];
          const dx = p1.x - p2.x;
          const dy = p1.y - p2.y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          if (distance < 150) {
            ctx.beginPath();
            ctx.moveTo(p1.x, p1.y);
            ctx.lineTo(p2.x, p2.y);
            ctx.stroke();
          }
        }
      }

      requestAnimationFrame(drawParticles);
    };

    initParticles();
    drawParticles();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return <canvas ref={canvasRef} className="particles-container" />;
};

export default ParticlesBackground;