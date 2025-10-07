'use client';

import {
  AnimatePresence,
  motion,
  PanInfo,
  useDragControls,
} from 'motion/react';
import { PropsWithChildren, ReactNode, useId } from 'react';
import ReactFocusLock from 'react-focus-lock';

import { Portal } from './portal';

interface BottomSheetProps extends PropsWithChildren {
  isOpen: boolean;
  sheetHeight?: string;
  bottom?: ReactNode;
  onClose: () => void;
}

const BottomSheet = ({
  isOpen,
  sheetHeight = '50vh',
  children,
  bottom,
  onClose,
}: BottomSheetProps) => {
  const portalId = useId();
  const dragControls = useDragControls();

  const handleDragEnd = async (_: unknown, info: PanInfo) => {
    const shouldClose = info.velocity.y >= 0 && info.point.y > 0;
    if (shouldClose) {
      onClose();
    }
  };

  return (
    <Portal id={portalId}>
      <ReactFocusLock disabled={!isOpen}>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              className='fixed top-0 right-0 bottom-0 left-0 z-10 bg-black'
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.6 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={onClose}
            />
          )}
        </AnimatePresence>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              aria-modal
              role='dialog'
              aria-hidden={!isOpen}
              drag='y'
              initial={{ y: '100%' }}
              animate={{ y: 0, transition: { ease: 'easeOut', duration: 0.2 } }}
              exit={{
                y: '100%',
                transition: { ease: 'easeIn', duration: 0.2 },
              }}
              dragControls={dragControls}
              style={{ height: sheetHeight }}
              className='fixed right-0 bottom-0 left-0 z-20 w-full rounded-t-2xl bg-white'
              dragConstraints={{ top: 0 }}
              onDragEnd={handleDragEnd}
            >
              <motion.div
                onPointerDown={event => dragControls.start(event)}
                className='mx-auto mt-1.5 mb-[19px] h-[5px] w-9 rounded-full bg-[#3D3D3D50]'
              />
              {children}
              {bottom && (
                <div className='sticky right-0 bottom-0 left-0'>{bottom}</div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </ReactFocusLock>
    </Portal>
  );
};

export default BottomSheet;
