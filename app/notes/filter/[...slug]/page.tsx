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
