import Image from 'next/image';
import { Contestant } from '../types/contestant';

interface ResultCardProps {
  contestant: Contestant;
  rank: number;
}

export function ResultCard({ contestant, rank }: ResultCardProps) {
  return (
    <div className="flex items-center bg-white rounded-lg shadow p-4">
      <div className="flex-shrink-0 w-24 h-24 relative">
        <Image
          src={`http://localhost:1337${contestant.attributes.picture.data.attributes.url}`}
          alt={contestant.attributes.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <div className="ml-4 flex-grow">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-2xl font-bold mr-2">{rank}位</span>
            <span className="text-xl">{contestant.attributes.name}</span>
          </div>
          <div className="text-2xl font-bold">{contestant.attributes.votes}票</div>
        </div>
      </div>
    </div>
  );
}