const startHandlers: (() => void)[] = []
const progressHandlers: ((number) => void)[] = []
const endHandlers: (() => void)[] = []

export const configure = () => {
  window.addEventListener('load', (e) => {
    /* There are some appCache events we're not currently listening to:
     * - 'cached': I think this happens on initial first-time caching, but I can't get it to trigger?
     * - 'checking': Fires more or less on pageload
     * - 'noupdate': We've confirmed there's no new version to download
     * - 'obsolete': ???
     * */

    window.applicationCache.addEventListener('error', (e) => {
      console.log("AppCache error", e)
    }, false)

    window.applicationCache.addEventListener('downloading', downloadStart, false)

    window.applicationCache.addEventListener('progress', (e: ProgressEvent) => {
      const percent = e.loaded / e.total
      downloadProgress(percent)
    })

    window.applicationCache.addEventListener('updateready', downloadEnd, false);
  }, false);
}

const downloadStart = () => {
  startHandlers.forEach(fn => fn())
}

const downloadProgress = (percent: number) => {
  progressHandlers.forEach(fn => fn(percent))
}

const downloadEnd = () => {
  endHandlers.forEach(fn => fn())
}

// Just for testing that the loading screen works in dev mode without touching app cache
export const fakeLoadingScreen = () => {
  setTimeout(downloadStart, 1000)
  setTimeout(() => downloadProgress(.05), 1500)
  setTimeout(() => downloadProgress(.15), 1800)
  setTimeout(() => downloadProgress(.3), 2200)
  setTimeout(() => downloadProgress(.5), 2400)
  setTimeout(() => downloadProgress(.75), 2700)
  setTimeout(() => downloadProgress(.9), 2900)
  setTimeout(() => downloadProgress(1), 3000)
  setTimeout(downloadEnd, 3100)
}

export const onDownloadStart = (handler: () => void) => {
  startHandlers.push(handler)
}

export const onDownloadProgress = (handler: (percent: number) => void) => {
  progressHandlers.push(handler)
}

export const onDownloadEnd = (handler: () => void) => {
  endHandlers.push(handler)
}