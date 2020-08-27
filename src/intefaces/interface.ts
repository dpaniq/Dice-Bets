interface Bet {
    total: number
    cube: number
    set: boolean
    chips: Stack[]
}
interface Cubes{
    id: number
    name: number
    fullname: string
    picked: boolean
}

interface Chips {
    id: number
    cost: number
    color: string
    disabled: boolean
}

interface Stack {
    name: number
    occurance?: number
}

export {
    Bet,
    Cubes,
    Chips,
    Stack
}