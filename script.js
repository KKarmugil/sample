let currentQuestion = 0;
    let score = 0;
    let quizData = null;

    // Fetch the quiz data from the JSON file
    fetch('quiz_data.json')
      .then(response => response.json())
      .then(data => {
        quizData = data;
        showQuestion();
      })
      .catch(error => console.error('Error fetching quiz data:', error));

    const questionContainer = document.getElementById('questionContainer');
    const nextButton = document.getElementById('nextButton');
    const resultContainer = document.getElementById('resultContainer');
    const scoreSpan = document.getElementById('scoreSpan');
    const totalSpan = document.getElementById('totalSpan');

    nextButton.addEventListener('click', () => showNextQuestion());

    function showQuestion() {
      if (currentQuestion < quizData.length) {
        const questionData = quizData[currentQuestion];
        let quizHTML = '';

        quizHTML += `<h2>Question ${currentQuestion + 1}:</h2>`;
        quizHTML += `<p>${questionData.question}</p>`;

        questionData.options.forEach(option => {
          quizHTML += `<label><input type="radio" name="q${currentQuestion}" value="${option.value}"> ${option.text}</label><br>`;
        });

        questionContainer.innerHTML = quizHTML;
      } else {
        showResult();
      }
    }

    function showNextQuestion() {
      const selectedOption = document.querySelector(`input[name=q${currentQuestion}]:checked`);
      if (selectedOption) {
        const answer = selectedOption.value;
        const correctAnswer = quizData[currentQuestion].answer;
        if (answer === correctAnswer) {
          score++;
        }
        currentQuestion++;
        showQuestion();
      } else {
        alert('Please select an option before proceeding.');
      }
    }

    function showResult() {
      questionContainer.style.display = 'none';
      resultContainer.style.display = 'block';
      scoreSpan.textContent = score;
      totalSpan.textContent = quizData.length;
      nextButton.style.display = 'none'; // Hide the "Next" button on the score page
    }