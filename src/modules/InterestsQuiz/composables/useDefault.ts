export const useDefaultState = () => useState('interests-quiz', (): {questions: any[]} => ({
    questions: [
        {
            state: [],
            stateTmp: [],
            answers: []
        },
        [],
    ]
}))