import useSWR from 'swr';
import { ResultCard } from '../../components/ResultCard';
import { ContestantWithVotes } from '../../types/contestant';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ResultsPage() {
  const { data, error } = useSWR('http://localhost:1337/api/contestants?populate=*', fetcher, {
    refreshInterval: 1000,
  });

  if (error) return <div>エラーが発生しました</div>;
  if (!data) return <div>読み込み中...</div>;

  const sortedContestants = [...data.data].sort(
    (a: ContestantWithVotes, b: ContestantWithVotes) => b.attributes.votes - a.attributes.votes
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">投票結果</h1>
      
      <div className="space-y-4">
        {sortedContestants.map((contestant: ContestantWithVotes, index: number) => (
          <ResultCard
            key={contestant.id}
            contestant={contestant}
            rank={index + 1}
          />
        ))}
      </div>
    </div>
  );
}