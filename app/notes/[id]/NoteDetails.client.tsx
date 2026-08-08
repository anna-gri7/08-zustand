"use client";
import css from "./NoteDetails.module.css";
import { useQuery, keepPreviousData } from '@tanstack/react-query';  
import { useParams } from "next/navigation";
import { fetchNoteById } from "@/lib/api";

function NoteDetailsClient() { 
    const { id } = useParams<{ id: string }>();

      const { data, isLoading, isError } = useQuery({
        queryKey: ['selectedNote', id ],
        queryFn: () => fetchNoteById(id),
          placeholderData: keepPreviousData,
        refetchOnMount: false

      })
    
    if (isLoading) {
        return (<p>Loading, please wait...</p>)
    };

    if (isError || !data) {
        return (<p>Something went wrong.</p>)
    }

    return (
        <main className={css.main}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{data.title}</h2>
                    </div>
                    <p className={css.tag}>{data.tag}</p>
                    <p className={css.content}>{data.content}</p>
                    <p className={css.date}>{data.createdAt}</p>
                </div>
            </div>
        </main>
    );
}
export default NoteDetailsClient