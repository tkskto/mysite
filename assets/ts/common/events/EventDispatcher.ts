module events {

    /**
     * dispatcherとなるクラスでextendして使う
     */
    export class EventDispatcher {

        listeners: any = {};

        /**
         * イベントを発光するメソッド
         * @param event
         */
        dispatchEvent(event: string | events.Event): void {
            let e: Event;
            let type: string;

            //引数がEventオブジェクトだった場合
            if (event instanceof events.Event) {
                type = event.type;
                e = event;

            //引数がstringだった場合
            } else {
                type = event;
                e = new events.Event(type);
            }

            if (this.listeners[type] != null) {
                let len: number = this.listeners[type].length;
                e.currentTarget = this;

                for (let i: number = 0; i < len; i++) {
                    let listener: EventListener = this.listeners[type][i];
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
        addEventListener(type: string, callback: Function, priority: number = 0): void {
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
        removeEventListener(type: string, callback: Function): void {
            if (this.hasEventListener(type, callback)) {
                for (let i: number = 0; i < this.listeners[type].length; i++) {
                    let listener: EventListener = this.listeners[type][i];
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
        hasEventListener(type: string, callback: Function): boolean {
            if (this.listeners[type] == null) return false;
            for (let i: number = 0; i < this.listeners[type].length; i++) {
                let listener: EventListener = this.listeners[type][i];
                if (listener.equalCurrentListener(type, callback)) {
                    return true;
                }
            }
            return false;
        }
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
        constructor(public type: string, public handler: Function, public priority: number = 0) {
        }

        /**
         * タイプとコールバックからリスナーを比較する
         * @param type
         * @param handler
         * @returns {boolean}
         */
        equalCurrentListener(type: string, handler: Function): boolean {
            return this.type === type && this.handler === handler;

        }
    }

    /**
     * イベント発光時に引数として渡されるEventクラス
     */
    export class Event {

        currentTarget: any;
        static COMPLETE: string = "complete";
        static CHANGE_PROPERTY: string = "changeProperty";
        constructor(public type: string, public value: any = null) {

        }
    }
}
