export interface ISteps<T> {
    current: number,
    direction: number,
    next: () => void,
    previous: () => void,
    isFirst: boolean,
    isLast: boolean,
    context: T
}

export interface IBathrobeContext<T> {
    steps: ISteps<T>
}