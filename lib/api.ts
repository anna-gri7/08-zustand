import axios from "axios";
import type { Note } from '../types/note'; 


interface FetchNotesResponse { 
    notes: Note[];
    totalPages: number;
}

export interface CreateNotePayload {
    title: Note["title"];
    content: Note["content"]
    tag: Note["tag"];
 }

const api = axios.create({
    baseURL: "https://notehub-public.goit.study/api",
    headers: {
        Authorization: `Bearer ${process.env.NEXT_PUBLIC_NOTEHUB_TOKEN}`
    }
});

export const fetchNotes = async (search: string,  tag: string | undefined, page: number): Promise<FetchNotesResponse> => { 
    const { data } = await api.get<FetchNotesResponse>("/notes", {
        params: {
            search,
            page,
            perPage: 12,
            tag
        }
    });
    
    return data;
};


export const createNote = async (payload: CreateNotePayload): Promise<Note> => { 
    const { data } = await api.post<Note>("/notes", payload);
    return data; 
}
 
export const deleteNote = async (id: Note["id"]): Promise<Note> => { 
    const { data } = await api.delete<Note>(`/notes/${id}`);
    return data; 
}

export const fetchNoteById = async (id: string) => {
  const res = await api.get<Note>(`/notes/${id}`);
  return res.data;
};
    