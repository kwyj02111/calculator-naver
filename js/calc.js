function Calculator() {
    var _self = this;

    var _viewingOp = ''; // Text 창에 보여지는 전체 연산식
    var _opExpression = [];
    var _inputNum = ''; // 입력중인 number
    var _checkComplete = false; // = 연달아 누르는지 체크

    // 숫자 클릭
    _self._addNumber = function(addNum) {

        if(typeof addNum === 'undefined'){
            return;
        }

        _inputNum = _inputNum + addNum;
        if(_inputNum.length > 10){
            alert('입력은 최대 10자리까지 가능합니다.');
            return;
        }

        var number = _inputNum;
        if(_inputNum.length > 3){
            number = _numberWithCommas(_inputNum);
        }

        $('#calcOpExpression').empty().append(_viewingOp);
        $('#calcOpExpression').append(number);

        _checkComplete = false;
        return;
    };

    // .키 클릭 (소수점)
    _self._addDecimalPoint = function () {
        _inputNum = _inputNum + '.';
        $('#calcOpExpression').append('.');

        _checkComplete = false;
        return;
    };

    // 연산(+, -, x, /) 클릭
    _self._addOperator = function (selectedOp) {

        if(typeof selectedOp === 'undefined'){
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
        $('#calcOpExpression').append(op);
        _viewingOp = $('#calcOpExpression').text();
        _checkComplete = false;
        return;
    };

    // = 키 클릭 (결과)
    _self._completeClac = function () {
        if(!_checkComplete){
            // = 버튼 누르기 직전 숫자 저장
            _opExpression.push(_inputNum);
            _inputNum = '';
        }else{ // =를 연달아 눌렀을 때

            if(_opExpression.length > 1){
                _opExpression.push(_opExpression[_opExpression.length-2]);
                _opExpression.push(_opExpression[_opExpression.length-2]);

                var addOp = _opExpression[_opExpression.length-2] + _opExpression[_opExpression.length-1];
                $('#calcOpExpression').empty().append(_viewingOp);
                $('#calcOpExpression').append(addOp);
            }
        }

        _viewingOp = $('#calcOpExpression').text();

        var text = '';
        for(var i=0; i<_opExpression.length; i++){
            text += _opExpression[i];
        }

        // 3++1, 4+* 같은 연산식일시 예외처리 필요
        var result = eval(text);
        result = _numberWithCommas(result.toFixed(5).replace(/\.?0*$/g,''));

        $('#calcResult').empty().append(result);
        _inputNum = '';
        _checkComplete = true;
        return;
    };

    // R키 클릭 (초기화)
    _self._clearCalc = function () {
        $('#calcOpExpression').empty().append('0');
        $('#calcResult').empty();
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
        return nn.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    }

}
