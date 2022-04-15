import * as React from 'react';
import { UseButtonParameters, UseButtonRootSlotProps } from '@mui/base/ButtonUnstyled/useButton.types';
import { EventHandlers } from '@mui/base/utils/types';
export default function useButton(parameters: UseButtonParameters): {
    getRootProps: <TOther extends EventHandlers = {}>(otherHandlers?: TOther) => UseButtonRootSlotProps<TOther>;
    focusVisible: boolean;
    setFocusVisible: React.Dispatch<React.SetStateAction<boolean>>;
    disabled: boolean;
    active: boolean;
};
