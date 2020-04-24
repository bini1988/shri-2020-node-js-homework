import { useState, useCallback } from 'react';

function useDialogState(initialState = false) {
  const [isOpen, setOpen] = useState(initialState);
  const openDialog = useCallback(() => setOpen(true), [setOpen]);
  const closeDialog = useCallback(() => setOpen(false), [setOpen]);

  return { isDialogOpen: isOpen, openDialog, closeDialog };
}

export default useDialogState;
