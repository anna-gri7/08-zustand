"use client";

import css from './NoteForm.module.css'
import { useId } from "react";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';

import { createNote } from "..//../lib/api";
import { useNoteDraftStore } from '@/lib/store/noteStore';

import type { NoteTag } from '../../types/note'; 


export default function NoteForm() {
    
const draft = useNoteDraftStore((state) => state.draft);
const setDraft = useNoteDraftStore((state) => state.setDraft);
const clearDraft = useNoteDraftStore((state) => state.clearDraft);

    const router = useRouter();
    const fieldId = useId();
     const queryClient = useQueryClient();

      const createNoteM = useMutation({
        mutationFn: createNote,
        onSuccess: () => { 
            queryClient.invalidateQueries({ queryKey: ['noteList'] });
            clearDraft();
            router.push('/notes/filter/all');
           }
      });
    
    const handleCreate = (formData: FormData) => {
        const values = {
            title: formData.get('title') as string,
            content: formData.get('content') as string,
            tag: formData.get('tag') as NoteTag,
  };
  createNoteM.mutate(values);
};


    return (
       
            <form className={css.form} action={handleCreate}>
                <div className={css.formGroup}>
                    <label htmlFor={`${fieldId}-title`}>Title</label>
                <input type="text" id={`${fieldId}-title`} name="title" className={css.input} defaultValue={draft.title}
                    onChange={(e) => setDraft({ title: e.target.value })} />
                </div>
                <div className={css.formGroup}>
                     <label htmlFor={`${fieldId}-content`} >Content</label>
                    <textarea id={`${fieldId}-content` }
                    name="content"
                    rows={8}
                    className={css.textarea}
                    defaultValue={draft.content}
                    onChange={(e) => setDraft({ content: e.target.value })} />
                </div>

                <div className={css.formGroup}>
                    
                    <label htmlFor={`${fieldId}-tag`}>Tag</label>
                <select id={`${fieldId}-tag`} name="tag" className={css.select} defaultValue={draft.tag}
                onChange={(e) => setDraft({ tag: e.target.value as NoteTag})}>
                        <option value="Todo">Todo</option>
                        <option value="Work">Work</option>
                        <option value="Personal">Personal</option>
                        <option value="Meeting">Meeting</option>
                        <option value="Shopping">Shopping</option>
                </select>
                </div>

                <div className={css.actions}>
                    <button type="button" className={css.cancelButton} onClick={() => router.back() }> Cancel  </button>
                    <button type="submit" className={css.submitButton} disabled={ createNoteM.isPending} > {createNoteM.isPending ? "Creating..." : "Create note"} </button>
                </div>
            </form>
    )
}