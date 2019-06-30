import { haptics } from "./haptics"

declare global {
    interface Window {
        // iOS
        isAppleApp: boolean
        webkit: {
            messageHandlers: { [key: string]: WebkitHandler }
        }

        // Android
        ModalAdPresenter?: {
            requestAd: (currentState: number) => void
            prepareAd: (currentState: number) => void
        }

        Analytics?: {
            event: (name: string, params: any) => void
            userProperty: (name: string, value: string) => void
            setId: (id: string) => void
        }

        Sharing?: {
            shareScreenshot: (name: string) => void
        }

        URLLoader?: {
            openURL: (url: string) => void
        }

        playfabAuth?: {
            method: string
            payload: any
        }
    }
}

interface WebkitHandler {
    postMessage: (args: any) => void
}
