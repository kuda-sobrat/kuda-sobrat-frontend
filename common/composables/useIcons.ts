const iconComponents = {} as Record<string, ReturnType<typeof defineAsyncComponent>>

const icons = import.meta.glob('@/assets/icons/**/*.svg', {
    import: 'default',
    eager: true,
})

for (const path in icons) {
    iconComponents[path.replace('/assets/icons', '')] = icons[path] as any
}

export function getIconComponent(name: string) {
    return iconComponents[name] || null
}