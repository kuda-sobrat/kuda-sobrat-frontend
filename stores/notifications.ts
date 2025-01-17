import {defineStore} from "pinia"

export const useNotificationStore = defineStore('notification', () => {

    // Состояние: список уведомлений
    const notifications: Ref<string[]> = ref([])
    const appended: Ref<number> = ref(0)

    // Метод для добавления уведомления
    function addNotification(message: string) {
        notifications.value.push(message)
        appended.value++
    }

    // Метод для удаления уведомления (по желанию)
    function removeNotification(index: number) {
        console.log('removeNotification')
        notifications.value.splice(index, 1)
    }

    return {
        notifications,
        appended,
        addNotification,
        removeNotification,
    }
})