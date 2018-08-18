function Calculator() {
    var _self = this;
    var _elem = null; //target element

    //calc elements 생성
    function _setElements(){
        return;
    }

    //calc 이벤트 핸들러
    function _registerEventHandlers() {
    }

    //calc init 함수
    _self.init = function(elem){
        _elem = elem;
        _setElements();
        _registerEventHandlers();
        return;
    };

}
