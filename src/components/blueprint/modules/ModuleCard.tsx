import React from 'react';
import { motion } from 'framer-motion';
import { TechBorder } from '../../common/TechBorder';

interface ModuleCardProps {
  id: string;
  title: string;
  coords: { x: number; y: number; scale: number; rotation: number };
  status?: 'ONLINE' | 'DIAGNOSTIC' | 'ERROR';
  idLabel?: string;
  onClick?: () => void;
  isActive?: boolean;
  children: React.ReactNode;
}

export const ModuleCard: React.FC<ModuleCardProps> = ({
  id,
  title,
  coords,
  status = 'ONLINE',
  idLabel,
  onClick,
  isActive = false,
  children,
}) => {
  return (
    <motion.div
      style={{
        position: 'absolute',
        left: '50%',
        top: '50%',
        transformOrigin: 'center center',
      }}
      animate={{
        x: coords.x - 170, // Center offset (w: 340px)
        y: coords.y - 120, // Center offset (h: approximately 240px)
        scale: coords.scale,
        rotate: coords.rotation,
      }}
      transition={{
        type: 'spring',
        stiffness: 110,
        damping: 18,
        mass: 0.9,
      }}
      className="w-[340px] z-10"
    >
      <TechBorder
        title={title}
        coords={{ x: coords.x, y: coords.y }}
        status={status}
        idLabel={idLabel}
        onClick={onClick}
        isActive={isActive}
      >
        {children}
      </TechBorder>
    </motion.div>
  );
};
