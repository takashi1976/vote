import Image from 'next/image';
import { Contestant } from '../types/contestant';

interface VoteModalProps {
  contestant: Contestant;
  onClose: () => void;
  onVote: () => Promise<void>;
}

export function VoteModal({ contestant, onClose, onVote }: VoteModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-lg p-6 max-w-lg w-full">
        <div className="relative aspect-square mb-4">
          <Image
            src={`http://localhost:1337${contestant.attributes.picture.data.attributes.url}`}
            alt={contestant.attributes.name}
            layout="fill"
            objectFit="cover"
            className="rounded-lg"
          />
        </div>
        <h2 className="text-xl font-bold mb-4 text-center">
          {contestant.attributes.name}に投票しますか？
        </h2>
        <div className="flex justify-between gap-4">
          <button
            className="flex-1 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600 transition-colors"
            onClick={onClose}
          >
            キャンセル
          </button>
          <button
            className="flex-1 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors"
            onClick={onVote}
          >
            投票する
          </button>
        </div>
      </div>
    </div>
  );
}