'use server';

import { z } from 'zod';
import { generateObject } from 'ai';
import { openai } from '@ai-sdk/openai';

const schema = z.object({
    content: z.string(),
});

const model = openai('gpt-4o-mini');

let systemPrompt = "You are a helpful assistant that summarizes (make sure dont add any special characters like *) in to one para news articles ";

const summarize = async (prompt: string) => {
    const { object } = await generateObject({
        model,
        prompt,
        system: systemPrompt,
        output: 'object',
        schema: schema,
    });

    return object;
};

const summarizeNews = async (news: { title: string, content: string }[] | string) => {
    try {
        if (typeof news === 'string') {
            systemPrompt += "in max 200 wrods"
            const res = await summarize(news);
            return res.content;
        }

        systemPrompt += "in max 100 words"
        const results = await Promise.all(
            news.map(async (item, index) => {
                const res = await summarize(item.content);
                return `News ${index + 1}:\n${item.title}\n${res.content}\n\n-----------------------------------\n`;
            })
        );
        return results.join('');
    } catch (error) {
        console.log(error);
        return null;
    }
};

export default summarizeNews;
