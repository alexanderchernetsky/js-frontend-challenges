// Proxify technical challenge
// task
// Given an initial functionality with a filter input and the list of articles.
// Complete the functionality by adding the following:
//
// When the user types in the filter input, the article list should be filtered and display the list of articles that contain the typed string.
// The found string(s) in each article should be highlighted
//
// Partial words, including individual letters, should be highlighted.
// The highlighted strings should at least have white color and red background.

const filterInput = document.getElementById("filterInput");
const originalArticles = [...document.querySelectorAll("#articles li")]
    .map(li => li.textContent); // !!!important to preserve the original items!!!

filterInput.oninput = (e) => {
    setTimeout(() => {
        const value = e.target.value;
        const articles = document.querySelectorAll("#articles li");
        const articlesContainer = document.querySelector("#articles");

        // clear current list
        articlesContainer.innerHTML = "";

        originalArticles.forEach(text => {
            if (!value || text.includes(value)) {
                const li = document.createElement('li');

                if (!value) {
                    li.textContent = text;
                } else {
                    // highlight
                    const splitSentence = text.split(value);
                    li.append(splitSentence[0]);
                    const span = document.createElement('span');
                    span.style.color = 'white';
                    span.style.backgroundColor = 'red';
                    span.textContent = value;
                    li.append(span);
                    li.append(splitSentence[1]);
                }

                articlesContainer.appendChild(li);
            }
        });
    }, 500);

};
