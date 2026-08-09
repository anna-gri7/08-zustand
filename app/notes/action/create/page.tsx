import NoteForm from "@/components/NoteForm/NoteForm";
import css from "./CreateNote.module.css"

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "NoteHub | CreateNote",
  description: "Page for creating and saving new notes.",
  openGraph: {
      title: "NoteHub | CreateNote",
      description: "Page for creating and saving new notes.",
      url: "https://notehub.com/",
      siteName: 'NoteHub',
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: "Notehub",
        },
      ],
      type: 'website',
    },
};

export default function CreateNote() {
    return (<main className={css.main}>
  <div className={css.container}>
            <h1 className={css.title}>Create note</h1>
            <NoteForm/>
  </div>
</main>)
}