import { openai } from './openai';

export const image_gen = {
  text2im: async ({ prompt, size }) => {
    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt,
      size,
      n: 1,
    });

    return { data: response.data };
  },
};
