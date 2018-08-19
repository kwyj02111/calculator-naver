function Calculator() {
    var _self = this;

    var _viewingOp = ''; // Text 창에 보여지는 전체 연산식
    var _opExpression = []; // 입력된 숫자와 연산을 저장하는 배열
    var _inputNum = ''; // 입력중인 number
    var _checkComplete = false; // = 연달아 누르는지 체크
    var _calcMaxNum = 9999999999; // 단일입력 최대값

    // 숫자 클릭
    _self._addNumber = function(addNum, elem) {

        if(typeof addNum === 'undefined'){
            return;
        }

        if(typeof elem === 'undefined'){
            return;
        }

        if(_checkComplete){
            elem.opExpression.empty().append('0');
            elem.calcResult.empty();
            _inputNum = '';
            _viewingOp = '';
            _opExpression = [];
            _checkComplete = false;
        }

        var checkMaxNum = parseInt(_inputNum + addNum);

        // 다른 숫자 입력없이 0만 눌렀을 경우 (ex. 0000)
        if(checkMaxNum < 1 && addNum < 1 && _inputNum.indexOf('.') < 0){
            return;
        }

        if(checkMaxNum > _calcMaxNum){
            alert('입력은 최대 10자리까지 가능합니다.');
            return;
        }

        _inputNum = _inputNum + addNum;

        elem.opExpression
            .empty()
            .append(_viewingOp)
            .append(_numberWithCommas(_inputNum));

        _checkComplete = false;
        return;
    };

    // .키 클릭 (소수점)
    _self._addDecimalPoint = function (elem) {

        if(typeof elem === 'undefined'){
            return;
        }

        if(_inputNum === ''){
            _inputNum = '0';
        }

        _inputNum = _inputNum + '.';
        elem.opExpression.append('.');

        _checkComplete = false;
        return;
    };

    // 연산(+, -, x, /) 클릭
    _self._addOperator = function (selectedOp, elem) {

        if(typeof selectedOp === 'undefined'){
            return;
        }

        if(typeof elem === 'undefined'){
            return;
        }

        var op = '';

        // 연산 누르기 직전 숫자 저장
        _opExpression.push(_inputNum);
        _inputNum = '';

        switch(selectedOp){
            case 'add':
                op = '+';
                break;

            case 'sub':
                op = '-';
                break;

            case 'multi':
                op = '*';
                break;

            case 'div':
                op = '/';
                break;
            default:
                break;
        }

        _opExpression.push(op);
        elem.opExpression.append(op);
        _viewingOp = elem.opExpression.text();
        _checkComplete = false;
        return;
    };

    // = 키 클릭 (결과)
    _self._completeCalc = function (elem) {

        if(typeof elem === 'undefined'){
            return;
        }

        if(_inputNum === ''){
            _inputNum = '0';
        }

        if(!_checkComplete){
            // = 버튼 누르기 직전 숫자 저장
            _opExpression.push(_inputNum);
            _inputNum = '';
        }else{ // =를 연달아 눌렀을 때

            if(_opExpression.length > 1){
                _opExpression.push(_opExpression[_opExpression.length-2]);
                _opExpression.push(_opExpression[_opExpression.length-2]);

                var addOp = _opExpression[_opExpression.length-2] + _opExpression[_opExpression.length-1];
                elem.opExpression.empty().append(_viewingOp);
                elem.opExpression.append(addOp);
            }
        }

        _viewingOp = elem.opExpression.text();

        var text = '';
        for(var i=0; i<_opExpression.length; i++){
            text += _opExpression[i];
        }

        try{
            var result = eval(text);
            result = _numberWithCommas(result.toFixed(5).replace(/\.?0*$/g,''));

            elem.calcResult.empty().append(result);
            _inputNum = '';
            _checkComplete = true;
        }catch(e){
            alert('수식이 정확한지 확인해주세요.');
        }

        return;
    };

    // R키 클릭 (초기화)
    _self._clearCalc = function (elem) {

        if(typeof elem === 'undefined'){
            return;
        }

        elem.opExpression.empty().append('0');
        elem.calcResult.empty();
        _inputNum = '';
        _viewingOp = '';
        _opExpression = [];
        _checkComplete = false;
        return;
    };

    //3자리 마다 콤마 찍어 주기
    function _numberWithCommas(nn){

        if(nn === undefined || nn === null || nn === '' || nn === '.'){
            return '';
        }

        var checkNum = nn.toString().split('.');
        var result = checkNum[0].toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        for(var i=1; i<checkNum.length; i++){
            result = result + '.' + checkNum[i];
        }

        return result;
    }

}
