export const registerServiceWorker = (): void => {
    if ('serviceWorker' in navigator) {
        navigator.serviceWorker.register('/service-worker.js', { type: 'module' })
            .then(registration => {
                console.log('Service Worker registered with scope:', registration.scope);
            })
            .catch(error => {
                console.error('Service Worker registration failed:', error);
            });
    } else {
        console.log('Service Workers are not supported by this browser.');
    }
};
