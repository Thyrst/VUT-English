function get_quest(elem) {
    quest = elem.prop("name");
    quest = quest.split(":")[1];

    return quest;
}

function selected(elem) {
    select = elem.children("select");

    question = get_quest(select);

    select.children("option").each(function() {
        if ($(this).text() == answers[question]) {
            $(this).prop("selected", true);
            return false;
        }
    })
}

answers = localStorage.getItem("answers");

if (answers == null) {
    console.log("no answers loaded");

} else {
    answers = JSON.parse(answers);

    $(".subquestion").each(
        function() {
            input = $(this).children("input");
            
            if (input.length) {
                question = get_quest(input);

                input.val(answers[question]);

            } else {
                selected($(this));
            }
        }
    )

    $("div.answer input").each(
        function() {
            question = get_quest($(this));

            answer = $(this).next();
            answer = answer.text();

            if (answer == answers[question]) {
                $(this).prop("checked", true);
            }
        }
    )

    $("tbody tr td.control").each(
        function() {
            selected($(this));
        }
    )
}

if ($("input.mod_quiz-next-nav").length) {
    $("input.mod_quiz-next-nav").trigger("click")
}