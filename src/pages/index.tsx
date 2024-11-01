import { useState } from 'react';
import useSWR from 'swr';
import { ContestantCard } from '../components/ContestantCard';
import { VoteModal } from '../components/VoteModal';
import { Contestant } from '../types/contestant';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function Home() {
  const [selectedContestant, setSelectedContestant] = useState<Contestant | null>(null);
  const { data, error } = useSWR('http://localhost:1337/api/contestants?populate=*', fetcher);

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中...</div>;

  const handleVote = async () => {
    if (!selectedContestant) return;
    
    await fetch('/api/vote', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ contestantId: selectedContestant.id }),
    });
    window.location.href = '/results';
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">仮装コンテスト投票</h1>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {data.data.map((contestant: Contestant) => (
          <ContestantCard
            key={contestant.id}
            contestant={contestant}
            onClick={() => setSelectedContestant(contestant)}
          />
        ))}
      </div>

      {selectedContestant && (
        <VoteModal
          contestant={selectedContestant}
          onClose={() => setSelectedContestant(null)}
          onVote={handleVote}
        />
      )}
    </div>
  );
}