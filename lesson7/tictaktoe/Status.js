class Status{
    constructor(){
        this.status = 'playing';
    }
    
    isStatusPlaying() {
        return this.status === 'playing';
    }

    /**
     * Ставит статус игры в "остановлена".
     */
    setStatusStopped() {
        this.status = 'stopped';
    }
}