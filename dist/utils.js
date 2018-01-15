export function bem(widgetName) {
    var cx = function (element, subElement) {
        if (element) {
            var scoppedWidgetName = "ais-" + widgetName + "-" + element;
            // output `ais-Widget-Header|Body|Footer ais-Header|Body|Footer`
            if (element === "header" || element === "body" || element === "footer") {
                var nonScoppedWidgetName = "ais-" + element;
                return scoppedWidgetName + " " + nonScoppedWidgetName;
            }
            // output `ais-Widget-Xyz--abc`
            if (subElement) {
                return scoppedWidgetName + "--" + subElement;
            }
            // output `ais-Widget-Xyz`
            return scoppedWidgetName;
        }
        else {
            // output `ais-Widget`
            return "ais-" + widgetName;
        }
    };
    return cx;
}
export function parseNumberInput(input) {
    return typeof input === "string" ? parseInt(input, 10) : input;
}
//# sourceMappingURL=utils.js.map