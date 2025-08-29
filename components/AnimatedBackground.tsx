import React, { useRef, useEffect } from 'react';
import { useTheme } from '../contexts/ThemeContext';

// Class for a particle
class Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  radius: number;
  color: string;

  constructor(width: number, height: number, color: string) {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5; // Slow movement
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = Math.random() * 1.5 + 1; // Small particles
    this.color = color;
  }

  update(width: number, height: number) {
    this.x += this.vx;
    this.y += this.vy;

    // Wall collision (bounce)
    if (this.x < 0 || this.x > width) this.vx *= -1;
    if (this.y < 0 || this.y > height) this.vy *= -1;
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

const AnimatedBackground: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { effectiveTheme } = useTheme();
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const container = canvas.parentElement;
    if (!container) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    canvas.style.opacity = '0'; // Start transparent for fade-in

    let width = 0;
    let height = 0;
    let particles: Particle[] = [];
    const mouse = { x: -200, y: -200, radius: 150 };
    
    const PARTICLE_COLOR = effectiveTheme === 'dark' ? 'rgba(229, 231, 235, 0.4)' : 'rgba(100, 116, 139, 0.8)';
    const LINE_COLOR = effectiveTheme === 'dark' ? 'rgba(229, 231, 235, OPACITY)' : 'rgba(100, 116, 139, OPACITY)';

    const initParticles = () => {
        particles = [];
        // Adjust particle count based on screen size for optimal density
        const particleCount = Math.floor(width * height / 10000); 
        for (let i = 0; i < particleCount; i++) {
            particles.push(new Particle(width, height, PARTICLE_COLOR));
        }
    };
    
    const handleResize = () => {
      width = canvas.width = container.offsetWidth;
      height = canvas.height = container.offsetHeight;
      if (width > 0 && height > 0) {
        initParticles();
      }
    };

    // Use ResizeObserver for reliable size detection, including after font loading
    const resizeObserver = new ResizeObserver(() => {
      handleResize();
    });
    resizeObserver.observe(container);

    const handleMouseMove = (e: MouseEvent) => {
        const rect = canvas.getBoundingClientRect();
        mouse.x = e.clientX - rect.left;
        mouse.y = e.clientY - rect.top;
    };
    
    const handleMouseLeave = () => {
        mouse.x = -200; // Move mouse off-screen
        mouse.y = -200;
    };

    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);
    
    let animationFrameId: number;

    const connect = () => {
        let opacityValue = 1;
        for (let a = 0; a < particles.length; a++) {
            for (let b = a; b < particles.length; b++) {
                const dx = particles[a].x - particles[b].x;
                const dy = particles[a].y - particles[b].y;
                const distance = Math.sqrt(dx * dx + dy * dy);

                if (distance < 120) { // Connection distance
                    opacityValue = 1 - (distance / 120);
                    ctx.strokeStyle = LINE_COLOR.replace('OPACITY', (opacityValue * (effectiveTheme === 'dark' ? 0.2 : 1)).toString());
                    ctx.lineWidth = 1;
                    ctx.beginPath();
                    ctx.moveTo(particles[a].x, particles[a].y);
                    ctx.lineTo(particles[b].x, particles[b].y);
                    ctx.stroke();
                }
            }
        }
    }

    const animate = () => {
      if (!ctx) return;
      ctx.clearRect(0, 0, width, height);
      particles.forEach(particle => {
        // Mouse interaction: push particles away from cursor
        const dxMouse = mouse.x - particle.x;
        const dyMouse = mouse.y - particle.y;
        const distMouse = Math.sqrt(dxMouse * dxMouse + dyMouse * dyMouse);
        if (distMouse < mouse.radius) {
            const forceDirectionX = dxMouse / distMouse;
            const forceDirectionY = dyMouse / distMouse;
            const force = (mouse.radius - distMouse) / mouse.radius;
            const directionX = forceDirectionX * force * -1;
            const directionY = forceDirectionY * force * -1;
            particle.x += directionX;
            particle.y += directionY;
        }

        particle.update(width, height);
        particle.draw(ctx);
      });
      connect();
      animationFrameId = requestAnimationFrame(animate);
    };

    animate();

    // Fade in the canvas for a smooth appearance
    setTimeout(() => {
        canvas.style.transition = 'opacity 0.5s ease-in-out';
        canvas.style.opacity = '1';
    }, 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      resizeObserver.unobserve(container);
    };
  }, [effectiveTheme]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full z-0 bg-transparent"
    />
  );
};

export default AnimatedBackground;