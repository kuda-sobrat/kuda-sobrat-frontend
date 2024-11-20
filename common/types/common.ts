// TODO: Определить подробно формирование to, logo
export type NavigationItem = {
    name: string
    title: string
    to?: string | Object
    icon: string
    callback?: Function
}

export type CascadeItem = {
    state?: CascadeItemState
    attributes: {
        id: number,
        name: string,
        description: string,
        is_paid: boolean,
    },
    children: CascadeItem[]
}

export type CascadeItemState = {
    visible?: boolean,
    selected?: boolean,
    selectedFull?: boolean,
    childrenVisible?: boolean,
    level?: number,
}