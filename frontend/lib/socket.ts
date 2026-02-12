/**
 * Frontend Socket.io Connection Helper with Authentication
 * 
 * Usage:
 * import { socketService } from '@/lib/socket';
 * 
 * // In component
 * useEffect(() => {
 *   socketService.connect(accessToken);
 *   socketService.joinRoom(userId);
 *   
 *   socketService.on('newMessage', handleNewMessage);
 *   
 *   return () => {
 *     socketService.disconnect();
 *   };
 * }, []);
 */

import { io, Socket } from 'socket.io-client';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000';

class SocketService {
    private socket: Socket | null = null;
    private token: string | null = null;

    /**
     * Connect to Socket.io server with JWT authentication
     */
    connect(accessToken: string) {
        if (this.socket?.connected) {
            console.log('Socket already connected');
            return;
        }

        this.token = accessToken;

        this.socket = io(API_URL, {
            auth: {
                token: accessToken,
            },
            transports: ['websocket', 'polling'],
            reconnection: true,
            reconnectionDelay: 1000,
            reconnectionAttempts: 5,
        });

        this.socket.on('connect', () => {
            console.log('Socket connected:', this.socket?.id);
        });

        this.socket.on('connect_error', (error) => {
            console.error('Socket connection error:', error.message);
            // Handle authentication errors
            if (error.message.includes('Authentication')) {
                console.error('Socket authentication failed - token may be invalid');
                this.disconnect();
            }
        });

        this.socket.on('error', (error) => {
            console.error('Socket error:', error);
        });

        this.socket.on('disconnect', (reason) => {
            console.log('Socket disconnected:', reason);
        });

        return this.socket;
    }

    /**
     * Join a room (user's own room for receiving messages/notifications)
     */
    joinRoom(roomId: string) {
        if (!this.socket?.connected) {
            console.error('Socket not connected. Call connect() first.');
            return;
        }

        this.socket.emit('join', roomId);

        this.socket.once('joined', (data) => {
            console.log('Joined room:', data.roomId);
        });
    }

    /**
     * Send a message to another user
     */
    sendMessage(recipientId: string, message: string, conversationId?: string) {
        if (!this.socket?.connected) {
            console.error('Socket not connected');
            return;
        }

        this.socket.emit('sendMessage', {
            recipientId,
            message,
            conversationId,
        });
    }

    /**
     * Send typing indicator
     */
    sendTyping(recipientId: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('typing', { recipientId });
    }

    /**
     * Send stop typing indicator
     */
    sendStopTyping(recipientId: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('stopTyping', { recipientId });
    }

    // --- Career Coach Methods ---

    startCareerCoachSession() {
        if (!this.socket?.connected) return;
        this.socket.emit('careerCoach:start');
    }

    sendCareerCoachMessage(message: string) {
        if (!this.socket?.connected) return;
        this.socket.emit('careerCoach:message', { message });
    }

    resetCareerCoachSession() {
        if (!this.socket?.connected) return;
        this.socket.emit('careerCoach:reset');
    }

    /**
     * Listen for events
     */
    on(event: string, callback: (...args: any[]) => void) {
        if (!this.socket) {
            console.error('Socket not initialized');
            return;
        }
        this.socket.on(event, callback);
    }

    /**
     * Remove event listener
     */
    off(event: string, callback?: (...args: any[]) => void) {
        if (!this.socket) return;
        this.socket.off(event, callback);
    }

    /**
     * Disconnect socket
     */
    disconnect() {
        if (this.socket) {
            this.socket.disconnect();
            this.socket = null;
            this.token = null;
        }
    }

    /**
     * Check if connected
     */
    isConnected(): boolean {
        return this.socket?.connected || false;
    }

    /**
     * Get socket instance (for advanced usage)
     */
    getSocket(): Socket | null {
        return this.socket;
    }
}

// Export singleton instance
export const socketService = new SocketService();
export default socketService;
