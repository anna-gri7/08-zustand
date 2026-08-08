"use client";

import NoteList from '@/components/NoteList/NoteList';
import Pagination from '@/components/Pagination/Pagination';
import Modal from '@/components/Modal/Modal';
import NoteForm from '@/components/NoteForm/NoteForm';
import SearchBox from '@/components/SearchBox/SearchBox';
import Loader from '@/components/Loader/Loader';
import css from './NotesPage.module.css';

import { useState } from 'react'

import { fetchNotes} from '@/lib/api';
import { useQuery, keepPreviousData } from '@tanstack/react-query';  
import { useDebouncedCallback } from 'use-debounce';


type Props = {
  tag?: string;
};

function NotesClient({tag}: Props) { 
 
    const [searchQuery, setSearchQuery] = useState("");

    const [currentPage, setCurrentPage] = useState(1);

    const [isModalOpen, setIsModalOpen] = useState(false);

    const closeModal = () => { setIsModalOpen(false) };

      const { data, isLoading} = useQuery({
        queryKey: ['notes', searchQuery, tag, currentPage],
        queryFn: () => fetchNotes(searchQuery, tag, currentPage),
        placeholderData: keepPreviousData,

      })

    const debouncedSearch = useDebouncedCallback((value: string) => {
        setSearchQuery(value);
        setCurrentPage(1);
    }, 300);

    const handleSearchChange = (value: string) => {
    debouncedSearch(value);
};

    return (
        <div className={css.app}>
            <header className={css.toolbar}>
         
                <SearchBox onSearch={handleSearchChange} />
                
                {data && data.totalPages > 1 && <Pagination totalPages={data?.totalPages || 0} currentPage={currentPage} onPageChange={setCurrentPage} />}
                <button className={css.button} onClick={() => setIsModalOpen(true) 
                    
                }>Create note +</button>
            </header>
             {isModalOpen && (
            <Modal onClose={closeModal}>
                <NoteForm 
                    onClose={closeModal} 
                />
            </Modal>
        )}
            {isLoading && <Loader />}
            {data && data.notes.length > 0 && (
    <NoteList notes={data.notes} />
)}
    </div>
    )
}

export default NotesClient;





