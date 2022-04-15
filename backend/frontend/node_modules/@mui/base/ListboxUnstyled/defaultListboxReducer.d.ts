import { ListboxState, ListboxAction } from '@mui/base/ListboxUnstyled/useListbox.types';
export default function defaultListboxReducer<TOption>(state: Readonly<ListboxState<TOption>>, action: ListboxAction<TOption>): Readonly<ListboxState<TOption>>;
