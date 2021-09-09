import { useRef } from 'react';
import Paper from '@mui/material/Paper';
import Draggable from 'react-draggable';

type DraggablePaperProps = {
  handle: string;
};

export function DraggablePaper({ handle, ...otherProps }: DraggablePaperProps) {
  const nodeRef = useRef(null);

  return (
    <Draggable
      nodeRef={nodeRef}
      handle={handle}
      cancel={'[class*="MuiDialogContent-root"]'}
    >
      <Paper {...otherProps} />
    </Draggable>
  );
}
