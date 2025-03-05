import OpenAI from 'openai';

console.log('process',process.env.OPENAI_API_KEY)
 
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY});

export default async function handler(req, res) {
 
  if (req.method === 'POST') {
    try {
      const { prompt } = req.body;
      
      const result = await openai.images.generate({
        model: "dall-e-3",
        prompt: prompt,
        n: 1,
        size: '1024x1024'
      });

      res.status(200).json({ imageUrl: result.data[0].url });
    } catch (error) {
      console.error('Error generating image:', error);
      res.status(500).json({ error: 'Image generation failed' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
}
