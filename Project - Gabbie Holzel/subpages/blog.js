// Uncomment the following if you want to clear local storage
// localStorage.removeItem("blogPosts");

const blogPostsContainer = document.getElementById("blogPosts");

// Format: hh:mm DD/MM/YYYY a given date
function formatDate(date = new Date()) {
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = String(date.getFullYear() % 100).padStart(2, "0");
    return `${hours}:${minutes} ${day}/${month}/${year}`;
}


function addPostToDOM(title, content, saveToStorage, date, insertAtTop = true) {
    // Get date and format it 
    const postDate = date ? new Date(date) : new Date();
    const postDateFormatted = formatDate(postDate);

    // Create a new element here, not in HTML
    // Adds a class so we can modify it in CSS
    const postRow = document.createElement("div");
    postRow.classList.add("blog-post-row");

    // Create a new element here, not in HTML
    const postDiv = document.createElement("div");
    postDiv.classList.add("blog-post");
    postDiv.style.display = "flex";
    postDiv.style.justifyContent = "space-between";
    postDiv.style.padding = "20px 40px";
    postDiv.style.borderBottom = "1px solid #ccc";

    // Title column
    const titleCell = document.createElement("div");
    titleCell.innerHTML = `<b>${title}</b>`;
    titleCell.style.flex = "1";

    // Content column
    const contentCell = document.createElement("div");
    contentCell.textContent = content;
    contentCell.style.flex = "2";

    // Date column
    const dateCell = document.createElement("div");
    dateCell.textContent = postDateFormatted;
    dateCell.style.flex = "1";
    dateCell.style.textAlign = "right";

    // Append cells to row
    postDiv.appendChild(titleCell);
    postDiv.appendChild(contentCell);
    postDiv.appendChild(dateCell);

    // Insert at top or bottom
    if (insertAtTop && blogPostsContainer.firstChild) {
        blogPostsContainer.insertBefore(postDiv, blogPostsContainer.firstChild);
    } else {
        blogPostsContainer.appendChild(postDiv);
    }


    // Save to localStorage if needed
    if (saveToStorage) {
        const posts = JSON.parse(localStorage.getItem("blogPosts")) || []; // Parses the str 
        posts.unshift({ title, content, date: postDate.toISOString() }); // Adds to the start
        localStorage.setItem("blogPosts", JSON.stringify(posts)); // Saves it as string
    }
}

document.addEventListener("DOMContentLoaded", () => {
    const blogForm = document.getElementById("blogForm");
    
    // Load saved posts from localStorage
    const savedPosts = JSON.parse(localStorage.getItem("blogPosts")) || [];

    // This goes trhough posts that were ALREADY SAVED 
    // so we don't need to save it again, just SHOW them
    savedPosts.forEach(post => {
        addPostToDOM(post.title, post.content, false, post.date, false);
    });

    // This is for form submission
    blogForm.addEventListener("submit", (e) => {
        // This prevents page reload
        // Without this, the page refreshes and we lose the submission of info
        e.preventDefault(); 

        // Get the title and the content from post
        const title = document.getElementById("title").value.trim();
        const content = document.getElementById("content").value.trim();

        // If any or both of them are missing, (like only spaces) -> "required" field allows spaces
        // popup message to warn user
        if (!title || !content) {
            alert("Please enter both a title and content.");
            return;
        }

        // Here we're SAVING the post, so it's true
        addPostToDOM(title, content, true); 

        // So every time we post, the fields are emptied again
        blogForm.reset();
    }); 
});