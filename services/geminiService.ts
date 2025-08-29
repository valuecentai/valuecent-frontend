import { CANNED_RESPONSES } from '../data/cannedResponses';

/**
 * Gets a pre-written career suggestion. Simulates an async API call
 * without actually making one, returning a random canned response.
 * @param _goal The user's career goal (unused).
 * @returns A promise that resolves to a string with a helpful suggestion.
 */
export const getAiCareerSuggestion = (_goal: string): Promise<string> => {
    // This function no longer uses the Gemini API.
    // It returns a promise to maintain compatibility with the calling component's async structure.
    return new Promise((resolve) => {
        // Simulate a short delay to mimic a real network request for better UX.
        const delay = 500 + Math.random() * 500;
        setTimeout(() => {
            const randomIndex = Math.floor(Math.random() * CANNED_RESPONSES.length);
            resolve(CANNED_RESPONSES[randomIndex]);
        }, delay);
    });
};
