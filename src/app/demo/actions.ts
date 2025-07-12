'use server';

import { parseStringPromise } from 'xml2js';

type RssItem = {
  title?: string[];
  description?: string[];
  pubDate?: string[];
};

type ParsedRss = {
  rss?: {
    channel?: {
      item?: RssItem[];
    }[];
  };
};

export async function fetchGoogleNews(
  query: string = ''
): Promise<{
  success: boolean;
  content?: { title: string; content: string; pubDate?: string }[];
  error?: string;
  fetchedAt: string;
}> {
  try {
    const baseUrl = 'https://news.google.com/rss';
    const timestamp = new Date().getTime();
    // Add time filter for recent news (last 1 hour)
    const rssUrl = query
      ? `${baseUrl}/search?q=${encodeURIComponent(query)}+when:1h&t=${timestamp}`
      : `${baseUrl}?t=${timestamp}`;

    console.log('Fetching from URL:', rssUrl); // Log the URL for debugging

    const response = await fetch(rssUrl, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/rss+xml',
        'User-Agent': 'Mozilla/5.0 (compatible; NewsFetcher/1.0)',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        Pragma: 'no-cache',
        Expires: '0',
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

    const parsedData: ParsedRss = await parseStringPromise(xmlData, {
      trim: true,
      normalizeTags: true,
      normalize: true,
    });

    const items = parsedData?.rss?.channel?.[0]?.item?.slice(0, 3) || [];

    if (items.length === 0) {
      throw new Error('No news items found in the RSS feed');
    }

    const newsItems = items.map((item: RssItem) => {
      const title = item.title?.[0] ?? 'No title';
      const content = item.description?.[0] ?? 'No content';
      const cleanContent = content.replace(/<[^>]+>/g, '').trim();
      const pubDate = item.pubDate?.[0] ?? 'No publication date';
      return { title, content: cleanContent, pubDate };
    });

    // Log the fetched items for debugging
    console.log('Fetched news items:', newsItems.map(item => ({ title: item.title, pubDate: item.pubDate })));

    return {
      success: true,
      content: newsItems,
      fetchedAt: new Date().toISOString(),
    };
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Failed to fetch news';
    console.error('Error fetching Google News:', error);
    return {
      success: false,
      error: message,
      fetchedAt: new Date().toISOString(),
    };
  }
}