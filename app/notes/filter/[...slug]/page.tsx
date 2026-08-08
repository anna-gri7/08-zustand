import { Metadata } from "next"

import {
  QueryClient,
  HydrationBoundary,
  dehydrate,
} from "@tanstack/react-query";

import NotesClient from './Notes.client';
import { fetchNotes } from '@/lib/api';

type Props = {
  params: Promise<{ slug: string[] }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
  const title = tag ? `Note tag:${tag}` : 'All notes';
const description = tag ? `Notes with tag: ${tag}` : 'All notes on NoteHub';
  return {
    title,
    description,
     openGraph: {
      title,
      description,
      url: "https://notehub.com/",
      siteName: `NoteHub`,
      images: [
        {
          url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
          width: 1200,
          height: 630,
          alt: `Notehub`,
        },
      ],
      type: 'article',
    },
  }
}



export default async function NotesApp({ params }: Props) {
  const { slug } = await params;
  const tag = slug[0] === 'all' ? undefined : slug[0];
    const queryClient = new QueryClient()
    
    await queryClient.prefetchQuery({
        queryKey: ['noteList', '', tag, 1],
      queryFn: () => fetchNotes('', tag, 1),
    });

    return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient tag={tag}/>
    </HydrationBoundary>
  );
}
