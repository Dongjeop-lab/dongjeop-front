'use client';

import type { PropsWithChildren } from 'react';
import { Children, useEffect, useState } from 'react';
import { createPortal } from 'react-dom';

interface PortalProps {
  id: string;
}

export const Portal = ({ id, children }: PropsWithChildren<PortalProps>) => {
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    let portalElement = document.getElementById(id);
    if (portalElement) {
      setElement(portalElement);
      return () => {
        if (portalElement) {
          portalElement.remove();
        }
      };
    }

    portalElement = document.createElement('div');
    portalElement.id = id;
    document.body.appendChild(portalElement);
    setElement(portalElement);

    return () => {
      portalElement?.remove();
    };
  }, [id]);

  if (!element) return null;

  return <>{Children.map(children, child => createPortal(child, element))}</>;
};
