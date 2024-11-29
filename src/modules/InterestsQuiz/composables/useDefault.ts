export const useDefaultState = () => useState('interests-quiz', () => ({
    questions: [
        {
            state: [],
            answers: []
        },
        {
            state: [],
            answers: []
        }
    ]
}))