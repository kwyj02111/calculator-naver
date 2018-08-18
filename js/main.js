var g_calc = {
    calculator : undefined
};

(function init() {

    function setMain() {

        g_calc.calculator = new Calculator();
        g_calc.calculator.init();

        return;
    }

    setMain();
})();
