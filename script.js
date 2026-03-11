let quizData = [];

fetch("questions.json")
    .then(res => res.json())
    .then(data => {
        // โหลดหัวเรื่องจาก JSON
        document.getElementById("quizTitle").textContent = data.title;
        document.getElementById("quizSubtitle").textContent = data.subtitle;

        quizData = data.questions;
        renderQuiz();
    });

function renderQuiz() {
    const quiz = document.getElementById("quiz");

    quizData.forEach((q, index) => {

        let html = `<div class="question">
        <p class="q-text"><span class="q-number">${index + 1}</span> ${q.question}</p>`;

        q.choices.forEach((choice, i) => {
            html += `
            <label class="choice-label">
            <input type="radio" name="q${index}" value="${i}">
            ${choice}
            </label>
            `;
        });

        html += `</div>`;

        quiz.innerHTML += html;
    });
}

function checkScore() {

    let score = 0;
    let resultHTML = "";

    quizData.forEach((q, index) => {

        const selected = document.querySelector(`input[name="q${index}"]:checked`);

        if (selected) {

            if (parseInt(selected.value) === q.answer) {
                score++;
                resultHTML += `<div class="result-item correct"><span class="emoji">✅</span> ข้อ ${index + 1} ถูก — ${q.explanation}</div>`;
            } else {
                resultHTML += `<div class="result-item wrong"><span class="emoji">❌</span> ข้อ ${index + 1} ผิด — ${q.explanation}</div>`;
            }

        } else {
            resultHTML += `<div class="result-item unanswered"><span class="emoji">⚠️</span> ข้อ ${index + 1} ไม่ได้ตอบ</div>`;
        }

    });

    const resultEl = document.getElementById("result");
    resultEl.innerHTML =
        `<div class="result-box">
        <div class="score-title">🏆 คะแนน ${score} / ${quizData.length}</div>
        ${resultHTML}
    </div>`;

    // Scroll to results smoothly
    resultEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
}