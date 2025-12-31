import { Server } from 'socket.io';
import { aiService } from '../services/aiService';
import logger from '../utils/logger';

// Simple in-memory session store for MVP
// UserId -> History[]
const sessions = new Map<string, { role: string; content: string }[]>();

export const handleCareerCoachEvents = (socket: any, io: Server) => {
    const userId = socket.userId;

    socket.on('careerCoach:start', async () => {
        sessions.set(userId, []);
        socket.emit('careerCoach:ready', { message: "Hello! I'm your AI Career Coach. How can I help you today?" });
        logger.info(`Career Coach session started for user ${userId}`);
    });

    socket.on('careerCoach:reset', () => {
        sessions.delete(userId);
        socket.emit('careerCoach:reset', { message: "Conversation history cleared." });
    });

    socket.on('careerCoach:message', async (data: { message: string }) => {
        if (!data.message || typeof data.message !== 'string') return;

        try {
            // 1. Retrieve History
            const history = sessions.get(userId) || [];

            // 2. Add User Message
            history.push({ role: 'user', content: data.message });
            // Limit history to last 10 messages to prevent token overflow
            if (history.length > 20) history.shift();
            sessions.set(userId, history);

            // 3. Notify Client
            socket.emit('careerCoach:typing');

            // 4. Construct Prompt with Context
            // We assume the AI service handles the 'current query', so we pass history as context
            // Since getCareerAdvice takes (query, userContext), we'll encode history into the query or context.
            // A robust implementation would pass history separately, but for MVP we prepend it.
            const conversationContext = history.slice(-6).map(m => `${m.role.toUpperCase()}: ${m.content}`).join('\n');
            const augmentedQuery = `\n[Conversation History using ${conversationContext}]\n\nUser Question: ${data.message}`;

            // 5. Call AI Service
            const response = await aiService.getCareerAdvice(augmentedQuery, {
                // You could inject user profile data here from DB if needed
            });

            // 6. Add AI Response
            history.push({ role: 'assistant', content: response });
            sessions.set(userId, history);

            // 7. Emit Response
            socket.emit('careerCoach:response', { message: response });

        } catch (error) {
            logger.error('Career Coach Socket Error:', error);
            socket.emit('careerCoach:error', { message: 'I encountered an error processing your request.' });
        }
    });
};
