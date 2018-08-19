var g_calc = {
    calculator : undefined,
};

(function init() {

    function setMain() {

        g_calc.calculator = new RegisterCalculator();
        g_calc.calculator.init($('#calcContainer'));
        return;
    }

    setMain();
})();

function RegisterCalculator() {
    var _self = this;
    var _calculator = undefined;
    var _calcElem = {
        root : undefined,
        numBtn : undefined,
        decimal : undefined,
        complete : undefined,
        operation : undefined,
        reset : undefined,
        opExpression : undefined,
        calcResult : undefined
    };

    //calc 이벤트 등록을 위한 get elements
    function _getElements() {

        //숫자 elements 등록
        _calcElem.numBtn = _calcElem.root.find('button[data-elem="num"]');
        _calcElem.decimal = _calcElem.root.find('button[data-elem="decimal"]');
        _calcElem.complete = _calcElem.root.find('button[data-elem="complete"]');
        _calcElem.operation = _calcElem.root.find('button[data-elem="operation"]');
        _calcElem.reset = _calcElem.root.find('button[data-elem="reset"]');
        _calcElem.opExpression = _calcElem.root.find('div[data-elem="opExpression"]');
        _calcElem.calcResult = _calcElem.root.find('div[data-elem="calcResult"]');

        return;
    }

    //calc 이벤트 핸들러
    function _registerEventHandlers() {

        // 숫자 클릭
        _calcElem.numBtn.bind('click', function() {
            var addNum = $(this).data('num');
            _calculator._addNumber(addNum, {opExpression : _calcElem.opExpression, calcResult : _calcElem.calcResult});
            return;
        });

        // .키 클릭 (소수점)
        _calcElem.decimal.bind('click', function() {
            _calculator._addDecimalPoint({opExpression : _calcElem.opExpression, calcResult : _calcElem.calcResult});
            return;
        });

        // 연산(+, -, x, /) 클릭
        _calcElem.operation.bind('click', function() {
            var selectedOp = $(this).data('op');
            _calculator._addOperator(selectedOp, {opExpression : _calcElem.opExpression, calcResult : _calcElem.calcResult});
            return;
        });

        // = 키 클릭 (결과)
        _calcElem.complete.bind('click', function() {
            _calculator._completeCalc({opExpression : _calcElem.opExpression, calcResult : _calcElem.calcResult});
            return;
        });

        // R키 클릭 (초기화)
        _calcElem.reset.bind('click', function() {
            _calculator._clearCalc({opExpression : _calcElem.opExpression, calcResult : _calcElem.calcResult});
            return;
        });

        return;
    }


    _self.init = function (elem) {

        if(typeof elem === 'undefined'){
            return;
        }

        _calcElem.root = elem;

        _calculator = new Calculator();

        if(typeof _calculator === 'undefined'){
            return;
        }

        _getElements();
        _registerEventHandlers();
        return;
    }
}