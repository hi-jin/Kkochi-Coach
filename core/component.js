export default class Component {
    constructor() {
        this.state = {};
    }

    /**
     * Component가 사용하는 상태에 newState를 추가
     * 
     * @param {Map} newState 
     */
    setState(newState) {
        this.state = { ...this.state, ...newState };
        this.render();
    }

    /**
     * this.state를 이용하여 화면에 출력
     */
    render() {
        if (this.html === undefined || this.html === null) return;
        while (this.html.hasChildNodes()) {
            this.html.removeChild(this.html.firstChild);
        }
    }
}