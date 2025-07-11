'use server'

export async function convertTextToSpeech(text: string): Promise<{ success: boolean; audioBlob?: Blob; error?: string }> {
    try {
        const apiKey = process.env.ELEVENLABS_API_KEY
        if (!apiKey) {
            return { success: false, error: 'ElevenLabs API key not found' }
        }

        const voiceId = process.env.ELEVENLABS_VOICE_ID || 'pNInz6obpgDQGcFmaJgB'

        // Call ElevenLabs API
        const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voiceId}`, {
            method: 'POST',
            headers: {
                'Accept': 'audio/mpeg',
                'Content-Type': 'application/json',
                'xi-api-key': apiKey
            },
            body: JSON.stringify({
                text: text,
                model_id: 'eleven_monolingual_v1',
                voice_settings: {
                    stability: 0.5,
                    similarity_boost: 0.5
                }
            })
        })

        if (!response.ok) {
            const errorText = await response.text()
            return { success: false, error: `ElevenLabs API error: ${response.status} - ${errorText}` }
        }

        const audioBuffer = await response.arrayBuffer()

        const audioBlob = new Blob([audioBuffer], { type: 'audio/mpeg' })

        return { success: true, audioBlob }
    } catch (error) {
        console.error('Error converting text to speech:', error)
        return {
            success: false,
            error: error instanceof Error ? error.message : 'Unknown error occurred'
        }
    }
}