// app/actions/fetchGoogleNews.ts
'use server';

import { parseStringPromise } from 'xml2js';

export async function fetchGoogleNews(query: string = ''): Promise<{
  success: boolean;
  content?: { title: string; content: string }[];
  error?: string;
  fetchedAt: string;
}> {
  try {
    const baseUrl = 'https://news.google.com/rss';
    const rssUrl = query ? `${baseUrl}/search?q=${encodeURIComponent(query)}` : baseUrl;

    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/rss+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; NewsFetcher/1.0)',
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch RSS feed: ${response.status} ${response.statusText}`);
    }

    const xmlData = await response.text();

    if (!xmlData || xmlData.length < 100) {
      throw new Error('Invalid or empty RSS feed received');
    }

    const parsedData = await parseStringPromise(xmlData, {
      trim: true,
      normalizeTags: true,
      normalize: true,
    });

    const items = parsedData?.rss?.channel?.[0]?.item?.slice(0, 3) || [];

    if (items.length === 0) {
      throw new Error('No news items found in the RSS feed');
    }

    const newsItems = items.map((item: any) => {
      const title = item.title?.[0] || 'No title';
      const content = item.description?.[0] || 'No content';
      const cleanContent = content.replace(/<[^>]+>/g, '').trim();
      return { title, content: cleanContent };
    });

    return {
      success: true,
      content: newsItems,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error: any) {
    console.error('Error fetching Google News:', error);
    return {
      success: false,
      error: error.message || 'Failed to fetch news',
      fetchedAt: new Date().toISOString(),
    };
  }
}