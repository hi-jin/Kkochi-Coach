export default class Notifier {
    constructor() {
        this._callbacks = [];
    };

    /**
     * Data 변경 시 실행할 함수 등록
     * 
     * @param {Function} callback 
     */
    addListener(callback) {
        this._callbacks.push(callback);
    }

    /**
     * callbacks 전체 실행
     */
    notifyListener() {
        for (const callback of this._callbacks) {
            callback();
        }
    }
}