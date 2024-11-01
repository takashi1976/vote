import type { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  const { contestantId } = req.body;

  try {
    const response = await fetch(`http://localhost:1337/api/contestants/${contestantId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          votes: {
            increment: 1
          }
        }
      }),
    });

    const data = await response.json();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ message: 'Error updating vote count' });
  }
}