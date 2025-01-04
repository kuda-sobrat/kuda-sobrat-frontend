// TODO: Определить подробно формирование to, logo
export type NavigationItem = {
    name: string
    title: string
    to?: string | Object
    icon?: string
    callback?: Function
    isBlocked?: boolean
    image?: string
}

export type Interest = {
    attributes: {
        id: number,
        name: string,
        description: string,
        is_paid: boolean,
    },
    children?: Interest[]
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

export type Community = {
    id: number
    name: string
    description: string
    last_checked_at: string
    verification_status: string
    is_verified: boolean
}

export type ContextPost = {
    id: number
    social_link_id: number
    event_id: number
    status: string
    source_id: string
    text: string
    processed_text?: string
    unique_hash: string
    tags: any
    created_at: string
    updated_at?: string
    community?: Community
}

export type EventPostAttachment = {
    id: number,
    context_id: number,
    type: string,
    url: string,
    title: string,
    text?: string,
    created_at?: string,
    updated_at?: string,
}

export type EventPost = {
    id: number
    community_id: number
    status: string
    tags?: string[]
    name: string
    description: string
    views: number
    shares: number
    attendees: number
    start_datetime: string
    end_datetime: string
    location: string
    unique_hash: string
    created_at: string
    updated_at: string
    context_posts: ContextPost[]
    attachments: EventPostAttachment[]
    location_name: string
    formatted_address?: string
    popularity_score: number
    is_archived: number
    archived_at?: string
    marked_for_deletion_at?: string
    deleted_at?: string
    is_interest_matched: 1
    ranking_score: number
    event_group: EventGroup
}

export type EventGroup = {
    id: number,
    name?: string,
    description?: string,
    created_at?: string,
    updated_at?: string,
    events: EventPost[]
}