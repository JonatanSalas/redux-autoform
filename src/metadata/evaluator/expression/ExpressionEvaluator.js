import getExpressionHelper from 'redux-autoform-utils/lib/helpers/expressionHelper';

export default class ExpressionEvaluator {

    /**
     * Evaluates the given expression
     * @param expression - the expression to be evaluated. This can be either a constant, a function or a text expression
     * @param data - the data scope in which the expression will be executed
     * @returns {Object}
     */
    static evaluate(expression, data, globalScope) {
        var _expressionHelper;
        switch (typeof expression) {
            case 'function':
                try {
                    if (!_expressionHelper) {
                        _expressionHelper = getExpressionHelper();
                    }

                    let evaluation = expression(data, _expressionHelper, globalScope);

                    if (typeof evaluation === 'object' && evaluation != null) {
                        // React cannot render objects. Because of that, objects are converted to strings
                        return evaluation.toString();
                    }

                    return evaluation;
                } catch (ex) {
                    // expressions shouldn't trigger an error
                    console.error('expression evaluation failed. Details: ' + ex.message);

                    return undefined;
                }

            default:
                return expression;
        }
    }
};
