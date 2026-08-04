export interface BoundingBox {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export function resolveCollisions(boxes: BoundingBox[]): Record<string, { dx: number; dy: number }> {
  const adjustments: Record<string, { dx: number; dy: number }> = {};
  boxes.forEach((b) => {
    adjustments[b.id] = { dx: 0, dy: 0 };
  });

  // Perform a collision check between all pairs
  for (let i = 0; i < boxes.length; i++) {
    for (let j = i + 1; j < boxes.length; j++) {
      const b1 = boxes[i];
      const b2 = boxes[j];

      // Calculate bounding box centers
      const c1x = b1.x + b1.w / 2;
      const c1y = b1.y + b1.h / 2;
      const c2x = b2.x + b2.w / 2;
      const c2y = b2.y + b2.h / 2;

      const dx = c2x - c1x;
      const dy = c2y - c1y;

      const minDistX = (b1.w + b2.w) / 2 + 15; // 15px safety buffer
      const minDistY = (b1.h + b2.h) / 2 + 15;

      if (Math.abs(dx) < minDistX && Math.abs(dy) < minDistY) {
        // Overlap found. Resolve along the shallowest axis.
        const overlapX = minDistX - Math.abs(dx);
        const overlapY = minDistY - Math.abs(dy);

        if (overlapX < overlapY) {
          const pushX = (dx >= 0 ? 1 : -1) * (overlapX / 2);
          adjustments[b1.id].dx -= pushX;
          adjustments[b2.id].dx += pushX;
        } else {
          const pushY = (dy >= 0 ? 1 : -1) * (overlapY / 2);
          adjustments[b1.id].dy -= pushY;
          adjustments[b2.id].dy += pushY;
        }
      }
    }
  }

  return adjustments;
}
