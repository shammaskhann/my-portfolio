import { useMemo, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useTransform, animate } from 'framer-motion';
import './OrbitImages.css';

function generateEllipsePath(cx, cy, rx, ry) {
  return `M ${cx - rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx + rx} ${cy} A ${rx} ${ry} 0 1 0 ${cx - rx} ${cy}`;
}

function OrbitItem({ item, index, totalItems, path, itemSize, rotation, progress, fill }) {
  const itemOffset = fill ? (index / totalItems) * 100 : 0;
  const offsetDistance = useTransform(progress, (p) => {
    const offset = (((p + itemOffset) % 100) + 100) % 100;
    return `${offset}%`;
  });

  return (
    <motion.div
      className="orbit-item"
      style={{
        width: itemSize,
        height: itemSize,
        offsetPath: `path("${path}")`,
        offsetRotate: '0deg',
        offsetAnchor: 'center center',
        offsetDistance,
      }}
    >
      <div className="orbit-inner-wrapper" style={{ transform: `rotate(${-rotation}deg)` }}>
        {item}
      </div>
    </motion.div>
  );
}

export default function OrbitImages({
  images = [],
  baseWidth = 800,
  radiusX = 300,
  radiusY = 300,
  rotation = -8,
  duration = 40,
  itemSize = 64,
  direction = 'normal',
  fill = true,
  className = '',
  responsive = true,
}) {
  const containerRef = useRef(null);
  const [scale, setScale] = useState(null);

  const designCenterX = baseWidth / 2;
  const designCenterY = baseWidth / 2;

  const path = useMemo(() => {
    return generateEllipsePath(designCenterX, designCenterY, radiusX, radiusY);
  }, [designCenterX, designCenterY, radiusX, radiusY]);

  useLayoutEffect(() => {
    if (!responsive || !containerRef.current) return;
    const updateScale = () => {
      if (!containerRef.current) return;
      setScale(containerRef.current.clientWidth / baseWidth);
    };
    updateScale();
    window.addEventListener('resize', updateScale);
    return () => window.removeEventListener('resize', updateScale);
  }, [responsive, baseWidth]);

  const progress = useMotionValue(0);

  useEffect(() => {
    const controls = animate(progress, direction === 'reverse' ? -100 : 100, {
      duration,
      ease: "linear",
      repeat: Infinity,
    });
    return () => controls.stop();
  }, [progress, duration, direction]);

  return (
    <div
      ref={containerRef}
      className={`orbit-container ${className}`}
      style={{ width: '100%', height: '100%' }}
    >
      <div
        className="orbit-scaling-container"
        style={{
          width: baseWidth,
          height: baseWidth,
          transform: scale !== null ? `translate(-50%, -50%) scale(${scale})` : 'translate(-50%, -50%)',
          left: '50%',
          top: '50%',
          position: 'absolute'
        }}
      >
        <div className="orbit-rotation-wrapper" style={{ transform: `rotate(${rotation}deg)` }}>
          {images.map((src, index) => (
            <OrbitItem
              key={index}
              item={<img src={src} alt="skill" className="orbit-img" />}
              index={index}
              totalItems={images.length}
              path={path}
              itemSize={itemSize}
              rotation={rotation}
              progress={progress}
              fill={fill}
            />
          ))}
        </div>
      </div>
    </div>
  );
}