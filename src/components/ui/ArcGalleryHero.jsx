import React, { useEffect, useState } from 'react';
import { cn } from "../../lib/utils";

// --- The ArcGalleryHero Component ---

export const ArcGalleryHero = ({
    images,
    startAngle = 20,
    endAngle = 160,
    radiusLg = 480,
    radiusMd = 360,
    radiusSm = 260,
    cardSizeLg = 120,
    cardSizeMd = 100,
    cardSizeSm = 80,
    className = '',
}) => {
    const [dimensions, setDimensions] = useState({
        radius: radiusLg,
        cardSize: cardSizeLg,
        startAngle: startAngle,
        endAngle: endAngle,
    });
    const [offset, setOffset] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setOffset((prev) => (prev + 1) % images.length);
        }, 3000);
        return () => clearInterval(interval);
    }, [images.length]);

    // Effect to handle responsive resizing of the arc and cards
    useEffect(() => {
        const handleResize = () => {
            const width = window.innerWidth;
            if (width < 640) {
                // Mobile: Narrower arc to fit screen width without being tiny
                // 45 to 135 deg => cos(45)=0.7. Width ~ 1.4 * R.
                // If R=220, Width=308. Fits in 360px.
                setDimensions({
                    radius: 200,
                    cardSize: cardSizeSm,
                    startAngle: 45,
                    endAngle: 135
                });
            } else if (width < 1024) {
                setDimensions({
                    radius: radiusMd,
                    cardSize: cardSizeMd,
                    startAngle: startAngle,
                    endAngle: endAngle
                });
            } else {
                setDimensions({
                    radius: radiusLg,
                    cardSize: cardSizeLg,
                    startAngle: startAngle,
                    endAngle: endAngle
                });
            }
        };

        handleResize(); // Set initial size
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [radiusLg, radiusMd, cardSizeLg, cardSizeMd, cardSizeSm, startAngle, endAngle]);

    // Ensure at least 2 points to distribute angles for the arc calculation
    const count = Math.max(images.length, 2);
    const step = (dimensions.endAngle - dimensions.startAngle) / (count - 1);

    return (
        <section className={cn("relative overflow-hidden bg-black text-white min-h-screen flex flex-col", className)}>
            {/* Background ring container that controls geometry */}
            <div
                className="relative mx-auto"
                style={{
                    width: '100%',
                    // Give it a bit more height to prevent clipping
                    height: dimensions.radius * 1.2,
                }}
            >
                {/* Center pivot for transforms - positioned at bottom center */}
                <div className="absolute left-1/2 bottom-0 -translate-x-1/2">
                    {/* Each image is positioned on the circle and rotated to face outward */}
                    {images.map((_, i) => {
                        const angle = dimensions.startAngle + step * i; // degrees
                        const angleRad = (angle * Math.PI) / 180;

                        // Calculate x and y positions on the arc
                        const x = Math.cos(angleRad) * dimensions.radius;
                        const y = Math.sin(angleRad) * dimensions.radius;

                        const imageIndex = (i + offset) % images.length;
                        const src = images[imageIndex];

                        return (
                            <div
                                key={`${i}-${src}`}
                                className="absolute animate-fade-in-up"
                                style={{
                                    width: dimensions.cardSize,
                                    height: dimensions.cardSize,
                                    left: `calc(50% + ${x}px)`,
                                    bottom: `${y}px`,
                                    transform: `translate(-50%, 50%)`,
                                    animationDelay: `${i * 100}ms`,
                                    animationFillMode: 'forwards',
                                    zIndex: count - i,
                                }}
                            >
                                <div
                                    className="rounded-2xl shadow-xl overflow-hidden ring-1 ring-gray-200 dark:ring-gray-700 bg-white dark:bg-gray-800 transition-transform hover:scale-105 w-full h-full"
                                    style={{ transform: `rotate(${angle / 4}deg)` }}
                                >
                                    <img
                                        src={src}
                                        alt={`Memory ${i + 1}`}
                                        className="block w-full h-full object-cover"
                                        draggable={false}
                                        // Add a fallback in case an image fails to load
                                        onError={(e) => {
                                            e.target.src = `https://placehold.co/400x400/334155/e2e8f0?text=Memory`;
                                        }}
                                    />
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Content positioned below the arc */}
            <div className="absolute inset-0 z-10 flex items-center justify-center px-6 pointer-events-none mt-10">
                <div className="text-center max-w-2xl px-6 animate-fade-in pointer-events-auto" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
                    <h1 className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-white">
                        Delicious Food, Delivered Fresh
                    </h1>
                    <p className="text-lg text-gray-300 mt-4">
                        Taste the best dishes made with love. Order now & enjoy freshness!
                    </p>
                    <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                        <a href="#about-items" className="btn btn-danger btn-lg rounded-pill hero-btn px-6 py-3 rounded-full bg-indigo-600 dark:bg-indigo-500 text-white hover:bg-indigo-700 dark:hover:bg-indigo-400 transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                            Explore Menu
                        </a>
                    </div>
                </div>
            </div>

            {/* CSS for animations */}
            <style>{`
        @keyframes fade-in-up {
          from {
            opacity: 0;
            transform: translate(-50%, 70%);
          }
          to {
            opacity: 1;
            transform: translate(-50%, 50%);
          }
        }
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fade-in-up {
          animation-name: fade-in-up;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
        .animate-fade-in {
          animation-name: fade-in;
          animation-duration: 0.8s;
          animation-timing-function: ease-out;
        }
      `}</style>
        </section>
    );
};
