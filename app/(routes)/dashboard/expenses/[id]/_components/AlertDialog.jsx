'use client';

import React, { useState } from 'react';
import { cn } from '/lib/utils';
import { buttonVariants } from '/components/ui/button';

const CustomAlertDialog = ({ title, description, onConfirm, trigger }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleOpen = () => setIsOpen(true);
  const handleClose = () => setIsOpen(false);
  const handleConfirm = () => {
    onConfirm();
    handleClose();
  };

  return (
    <>
      <div onClick={handleOpen}>{trigger}</div>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg">
            <div className="text-lg font-semibold">{title}</div>
            <div className="text-sm text-muted-foreground mt-2">
              {description}
            </div>
            <div className="flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2 mt-4">
              <button
                className={cn(
                  buttonVariants({ variant: 'outline' }),
                  'mt-2 sm:mt-0'
                )}
                onClick={handleClose}>
                Cancel
              </button>
              <button
                className={cn(buttonVariants(), 'mt-2 sm:mt-0')}
                onClick={handleConfirm}>
                Continue
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CustomAlertDialog;
