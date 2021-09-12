import { ThemeOptions } from '@mui/material/styles/createTheme';
import { styled } from '@mui/material/styles';

type OffsetType = {
  theme?: ThemeOptions;
};

export const Offset = styled('div')(
  ({ theme }: OffsetType) => theme?.mixins?.toolbar
);
