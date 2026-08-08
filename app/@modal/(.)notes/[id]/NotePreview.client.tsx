"use client"; 
import css from "./NotePreview.module.css"

import { useQuery, keepPreviousData } from '@tanstack/react-query';  
import { useParams, useRouter } from "next/navigation";
import { fetchNoteById } from "@/lib/api";
import Modal from "@/components/Modal/Modal";

function NotePreviewClient() { 
    const { id } = useParams<{ id: string }>();
     const router = useRouter();

      const { data, isLoading, isError } = useQuery({
        queryKey: ['note', id ],
        queryFn: () => fetchNoteById(id),
          placeholderData: keepPreviousData,
        refetchOnMount: false
      })
    
     const handleClose = () => {
    router.back();
  };
    
    if (isLoading) {
        return ( <Modal onClose={handleClose}>
        <p>Loading, please wait...</p>
      </Modal>)
    };

    if (isError || !data) {
        return (<Modal onClose={handleClose}>
        <p>Something went wrong.</p>
      </Modal>)
    }

    return (
         <Modal onClose={handleClose}>
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
            </Modal>
    );
}
export default NotePreviewClient