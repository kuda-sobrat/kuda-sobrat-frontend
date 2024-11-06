export const useLoader = () => useState('loader', (): {
    isLoading?: boolean,
    percentages?: number,
} => ({
    isLoading: undefined,
    percentages: undefined
}))