class AssetManager {
    constructor() {
        this.successCount = 0;
        this.errorCount = 0;
        this.cache = new Map();
        this.downloadQueue = [];
        this.audioQueue = [];
    }

    queueDownload(path) {
        this.downloadQueue.push(path);
    }

    queueAudioDownload(path) {
        this.audioQueue.push(path);
    }

    isDone() {
        return this.downloadQueue.length + this.audioQueue.length === this.successCount + this.errorCount;
    }

    downloadAll(callback) {
        if (this.downloadQueue.length === 0 && this.audioQueue.length === 0) {
            callback();
            return;
        }

        // Download images
        this.downloadQueue.forEach(path => {
            const img = new Image();

            img.addEventListener("load", () => {
                this.successCount++;
                if (this.isDone()) callback();
            });

            img.addEventListener("error", () => {
                console.error(`Error loading image ${path}`);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            img.src = path;
            this.cache.set(path, img);
        });

        // Download audio files
        this.audioQueue.forEach(path => {
            const audio = new Audio();

            audio.addEventListener("loadeddata", () => {
                this.successCount++;
                if (this.isDone()) callback();
            });

            audio.addEventListener("error", () => {
                console.error(`Error loading audio ${path}`);
                this.errorCount++;
                if (this.isDone()) callback();
            });

            audio.addEventListener("ended", function () {
                this.currentTime = 0;
            });

            audio.src = path;
            audio.load();
            this.cache.set(path, audio);
        });
    }

    getAsset(path) {
        return this.cache.get(path);
    }

    playAsset(path) {
        let audio = this.cache.get(path);
        if (audio && audio instanceof Audio) {
            audio.currentTime = 0;
            audio.play();
            return audio;
        }
        return null;
    }

    muteAll() {
        this.cache.forEach(asset => {
            if (asset instanceof Audio) {
                asset.muted = true;
            }
        });
    }

    unmuteAll() {
        this.cache.forEach(asset => {
            if (asset instanceof Audio) {
                asset.muted = false;
            }
        });
    }

    pauseAll() {
        this.cache.forEach(asset => {
            if (asset instanceof Audio) {
                asset.pause();
            }
        });
    }

    resumeAll() {
        this.cache.forEach(asset => {
            if (asset instanceof Audio) {
                asset.play();
            }
        });
    }

    setVolume(volume) {
        this.cache.forEach(asset => {
            if (asset instanceof Audio) {
                asset.volume = volume;
            }
        });
    }

    purge() {
        this.cache.clear();
        this.downloadQueue = [];
        this.audioQueue = [];
        this.successCount = 0;
        this.errorCount = 0;
    }

    reloadAsset(path) {
        this.cache.delete(path);
        this.queueDownload(path);
        this.downloadAll(() => {
            console.log(`Reloaded asset: ${path}`);
        });
    }

    getLoadingProgress() {
        const total = this.downloadQueue.length + this.audioQueue.length;
        if (total === 0) return 1;
        return (this.successCount + this.errorCount) / total;
    }
}