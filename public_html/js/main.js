var addError = function(element, message) {
    // сообщение об ошибке уже есть, второе не нужно
    if ($(element).next("span.error").size() > 0) {
        return;
    }
    var span = $("<span />")
            .attr("class", "error")
            .text(message);
    $(element).after(span);
};

var clearErrors = function() {
    $("span.error").remove();
};

var hasErrors = function() {
    return $("span.error").size() > 0;
};

var validateYear = function(input) {
    var text = $(input).val();
    var numberPattern = /^\s*\d+\s*$/;
    var msg = "Значением поля могут быть только числа в интервале от 1900 до 2013.";
    if (!(text === null || text === undefined)) {
        var intVal = parseInt(text);
        if (!numberPattern.test(text) || intVal < 1900 || intVal > 2013) {
            addError(input, msg);
            return;
        }
    }
    $(input).next("span.error").remove();
};

var validateUrl = function(input) {
    var text = $(input).val();
    var msg = "Значением поля может быть только корректный адрес в сети Интернет";
    if (!(text === null || text === undefined)) {
        var urlPattern = /^https?:\/\/[^ "]+$/;
        if (!urlPattern.test(text)) {
            addError(input, msg);
            return;
        }
    }
    $(input).next("span.error").remove();
};

var validateFileSize = function() {
    $("input.validateFileSize[type='file']").each(function(index, input) {
        if (input.files !== undefined && (input.files[0].size / 1024) > 250) {
            addError(input, "Максимальный допустимый размер файла 250кБ");
            return;
        }
        $(input).next("span.error").remove();
    });
};

var activateInfoSource = function() {
    var field = "input[name='info_source_another']";
    $(field).hide();
    $("select[name='info_source']").change(function() {
        if ($(this).val() === "другое") {
            $(field).show();
        } else {
            $(field).hide();
        }
    });
};

var activateSubmit = function() {
    var selector = "td.submit input[type='submit']";
    var submit = $(selector).first();
    $(submit).attr("disabled", "disabled");
    $("input[name='processing_agreement'][type='checkbox']").click(function() {
        if (this.checked) {
            $(submit).removeAttr("disabled");
        } else {
            $(submit).attr("disabled", "disabled");
        }
    });
};

var validateAll = function() {
    $(".validateUrl").each(function() {
        validateUrl(this);
    });

    $(".validateYear").each(function() {
        validateYear(this);
    });

    validateFileSize();
};
