import Image from 'next/image';
import { Contestant } from '../types/contestant';

interface ContestantCardProps {
  contestant: Contestant;
  onClick: () => void;
}

export function ContestantCard({ contestant, onClick }: ContestantCardProps) {
  return (
    <button 
      className="w-full text-left hover:opacity-90 transition-opacity" 
      onClick={onClick}
    >
      <div className="relative aspect-square mb-2">
        <Image
          src={`http://localhost:1337${contestant.attributes.picture.data.attributes.url}`}
          alt={contestant.attributes.name}
          layout="fill"
          objectFit="cover"
          className="rounded-lg"
        />
      </div>
      <h3 className="text-lg font-medium text-center">
        {contestant.attributes.name}
      </h3>
    </button>
  );
}