import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Autosalon, AutosalonState } from './types.ts';
import { BASE_URL } from '../../../scripts/utils.ts';

export interface AutosalonState {
    autosalons: Autosalon[];
    selectedAutosalon: Autosalon | null; 
    error: string | null;
}


export const getAutosalons = createAsyncThunk('/admin/autosalons/getAutosalons', async () => {
    try {
        const response = await fetch(BASE_URL + '/admin/autosalons');
        if (!response.ok) {
            throw new Error('Не удалось получить список автосалонов');
        }
        return response.json();
    } catch (error) {
        console.error('Ошибка при получении автосалонов:', error);
        throw error; 
    }
});


export const createAutosalon = createAsyncThunk(
    '/admin/autosalons/create',
    async (autosalonData: FormData) => {
        const response = await fetch(BASE_URL + '/admin/autosalons', {
            method: 'POST',
            body: autosalonData, });
        if (!response.ok) {
            throw new Error('Failed to create autosalon');
        }
        return response.json();
    }
);

export const editAutosalon = createAsyncThunk(
    '/admin/autosalons/edit',
    async ({ _id, autosalonData }: { _id: string; autosalonData: FormData }) => {
        const response = await fetch(BASE_URL + `/admin/autosalons/edit/${_id}`, { 
            method: 'PUT',
            body: autosalonData, 
        });
        if (!response.ok) {
            throw new Error('Failed to update autosalon');
        }
        return response.json();
    }
);

export const getAutosalonById = createAsyncThunk(
    '/admin/autosalons/getAutosalonById',
    async (_id: string) => {
        const response = await fetch(BASE_URL + `/admin/autosalons/get/${_id}`);
        if (!response.ok) {
            throw new Error('Failed to fetch autosalon');
        }
        return response.json();
    }
);

export const deleteAutosalon = createAsyncThunk(
    '/admin/autosalons/delete',
    async (_id: string) => {
        const response = await fetch(BASE_URL + `/admin/autosalons/delete/${_id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error('Failed to delete autosalon');
        }
        return _id;
    }
);


const autosalonsSlice = createSlice({
    name: 'autosalon',
    initialState: {
        autosalons: [],
        status: 'idle',
        error: null,
        selectedAutosalon: null, 
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getAutosalons.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAutosalons.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.autosalons = action.payload;
            })
            .addCase(getAutosalons.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(createAutosalon.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(createAutosalon.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.autosalons.push(action.payload);
            })
            .addCase(createAutosalon.rejected, (state, action) => {
                state.status = 'failed'; state.error = action.error.message; 
            })
            .addCase(editAutosalon.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(editAutosalon.fulfilled, (state, action) => {
                state.status = 'succeeded';
                const index = state.autosalons.findIndex(autosalon => autosalon._id === action.payload._id);
                if (index !== -1) {
                    state.autosalons[index] = action.payload;
                }
            })
            .addCase(editAutosalon.rejected, (state, action) => {
                state.status = 'failed'; state.error = action.error.message; 
            }).addCase(getAutosalonById.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getAutosalonById.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.selectedAutosalon = action.payload;
            })
            .addCase(getAutosalonById.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            })
            .addCase(deleteAutosalon.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(deleteAutosalon.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.autosalons = state.autosalons.filter(autosalon => autosalon._id !== action.payload);
            })
            .addCase(deleteAutosalon.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.error.message;
            });
    }
});

export default autosalonsSlice.reducer;
