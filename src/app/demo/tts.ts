'use server'

import { experimental_generateSpeech as generateSpeech } from 'ai'
import { openai } from '@ai-sdk/openai'

export async function convertTextToSpeech(text: string): Promise<{
    success: boolean
    audioBlob?: Blob
    error?: string
}> {
    try {
        const { audio } = await generateSpeech({
            model: openai.speech('tts-1'),
            text,
            voice: 'alloy',
        })

        const audioBlob = new Blob([audio.uint8Array], {
            type: audio.mimeType || 'audio/mpeg',
        })

        return { success: true, audioBlob }
    } catch (error) {
        console.error('Error converting text to speech:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred',
        }
    }
}
