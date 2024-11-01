export interface Contestant {
  id: number;
  attributes: {
    name: string;
    votes: number;
    picture: {
      data: {
        attributes: {
          url: string;
        };
      };
    };
  };
}