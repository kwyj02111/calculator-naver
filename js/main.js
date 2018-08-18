var g_calc = {
    calculator : undefined,
};

(function init() {

    function setMain() {

        g_calc.calculator = new Calculator();

        if(typeof g_calc.calculator === 'undefined'){
            return;
        }

        registerEventHandlers();
        return;
    }

    setMain();
})();

//calc 이벤트 핸들러
function registerEventHandlers() {

    // 숫자 클릭
    $('.calc-num-btn').bind('click', function() {
        var addNum = $(this).data('num');
        g_calc.calculator._addNumber(addNum);
        return;
    });

    // .키 클릭 (소수점)
    $('#calcNumDecimalBtn').bind('click', function() {
        g_calc.calculator._addDecimalPoint();
        return;
    });

    // 연산(+, -, x, /) 클릭
    $('.calc-operation-btn').bind('click', function() {
        var selectedOp = $(this).data('op');
        g_calc.calculator._addOperator(selectedOp);
        return;
    });

    // = 키 클릭 (결과)
    $('#calcNumCompleteBtn').bind('click', function() {
        g_calc.calculator._completeClac();
        return;
    });

    // R키 클릭 (초기화)
    $('#calcResetBtn').bind('click', function() {
        g_calc.calculator._clearCalc();
        return;
    });
}
