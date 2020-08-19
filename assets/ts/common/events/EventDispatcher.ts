/**
 * イベント発光時に引数として渡されるEventクラス
 */
export class Event {
    currentTarget: any;
    static COMPLETE = "complete";
    static CHANGE_PROPERTY = "changeProperty";
    constructor(public type: string, public value: any = null) {}
}

/**
 * イベントリスナークラス
 */
class EventListener {

    /**
     *
     * @param type
     * @param handler
     * @param priority
     */
    constructor(public type: string, public handler: (e: Event) => void, public priority: number = 0) {
    }

    /**
     * タイプとコールバックからリスナーを比較する
     * @param type
     * @param handler
     * @returns {boolean}
     */
    equalCurrentListener(type: string, handler: (e: Event) => void): boolean {
        return this.type === type && this.handler === handler;

    }
}

/**
 * dispatcherとなるクラスでextendして使う
 */
export class EventDispatcher {

    listeners: any = {};

    /**
     * イベントを発光するメソッド
     * @param event
     */
    dispatchEvent(event: string | Event): void {
        let e: Event;
        let type: string;

        //引数がEventオブジェクトだった場合
        if (event instanceof Event) {
            type = event.type;
            e = event;

        //引数がstringだった場合
        } else {
            type = event;
            e = new Event(type);
        }

        if (this.listeners[type] != null) {
            const len: number = this.listeners[type].length;
            e.currentTarget = this;

            for (let i = 0; i < len; i++) {
                const listener: EventListener = this.listeners[type][i];
                try {
                    listener.handler(e);
                } catch (error) {
                    if (window.console) {
                        console.error(error.stack);
                    }
                }
            }
        } else {
            //TODO: 無駄なdispatchが発生している箇所がある
            console.warn('implement "addEventListener" before dispatch');
        }
    }

    /**
     * typeにひもづいたリスナーを登録する
     * @param type
     * @param callback
     * @param priority
     */
    addEventListener(type: string, callback: (e: Event) => void, priority = 0): void {
        if (this.listeners[type] == null) {
            this.listeners[type] = [];
        }

        this.listeners[type].push(new EventListener(type, callback, priority));
        this.listeners[type].sort(function (listener1: EventListener, listener2: EventListener) {
            return listener2.priority - listener1.priority;
        });
    }

    /**
     * typeにひもづいたリスナーを削除する
     * @param type
     * @param callback
     */
    removeEventListener(type: string, callback: (e: Event) => void): void {
        if (this.hasEventListener(type, callback)) {
            for (let i = 0; i < this.listeners[type].length; i++) {
                const listener: EventListener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    this.listeners[type].splice(i, 1);
                    return;
                }
            }
        }
    }

    /**
     * このインスタンスにひもづいている全てのリスナーを解除する
     */
    clearEventListener(): void {
        this.listeners = {};
    }

    /**
     * インスタンスに指定タイプのリスナーがあるかどうかをチェックする
     * @param type
     * @returns {boolean}
     */
    containEventListener(type: string): boolean {
        if (this.listeners[type] == null) return false;
        return this.listeners[type].length > 0;
    }

    /**
     * インスタンスに指定タイプかつ、指定のコールバックのリスナーがあるかどうかをチェックする
     * @param type
     * @param callback
     * @returns {boolean}
     */
    hasEventListener(type: string, callback: (e: Event) => void): boolean {
        if (this.listeners[type] == null) return false;
        for (let i = 0; i < this.listeners[type].length; i++) {
            const listener: EventListener = this.listeners[type][i];
            if (listener.equalCurrentListener(type, callback)) {
                return true;
            }
        }
        return false;
    }
}
