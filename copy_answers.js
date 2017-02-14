answers = new Object();
$(".subquestion").each(
    function() {
        question = $(this).children("label");
        question = question.prop("for");
        question = question.split(":")[1];

        answer = $(this).children("div").children(".feedbackspan").html();
        answer = answer.split("<br>")[1];
        answer = answer.split(": ")[1];

        answers[question] = answer;
    }
)

choose = new Object();
$("tbody").each(
	function() {
		$(this).children("tr").each(
			function() {
				t = $(this).children("td.text");
				if (!t.length) {
					return true;
				}

				question = $(this).children("td.control");
				question = question.children("label");
				question = question.prop("for");
		        question = question.split(":")[1];

		        t = t.text();
		        choose[t] = question;
		    }
		)

		if (!Object.keys(choose).length) {
			return true;
		}

        answer = $(this).closest("div.formulation.clearfix").next();
        answer = answer.children("div.feedback").text();
		answer = answer.replace("The correct answer is:", ",");

		for (var q in choose) {
			if (answer.indexOf(q) != -1) {
				answer = answer.replace(", " + q + " – ", "\", \"" + choose[q] + "\": \"");
				delete choose[q];
			}
		}

		answer = "{" + answer.substr(3) + "\"}";
		Object.assign(answers, JSON.parse(answer));
	}
)

$("input[type='radio'][value='0']").each(
	function() {
		question = $(this).prop("name");
		question = question.split(":")[1];

		answer = $(this).closest("div.formulation.clearfix").next();
        answer = answer.children("div.feedback").text();
        answer = answer.substr(23); // remove "The correct answer is: "

        answers[question] = answer;
	}
)

answers = JSON.stringify(answers);
localStorage.setItem("answers", answers);