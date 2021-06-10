const APIURL = 'https://api.github.com/users/';

const form = document.getElementById('form');
const search = document.getElementById('search');
const main = document.getElementById('main');

async function getUser(username) {
  try {
    const { data } = await axios(APIURL + username);
    createUserCard(data);
    getRepos(username);
    console.log(getRepos(username));
  } catch (err) {
    console.error('jghjhgjhgjhg: ', err);
    if (err.response.status == 404) {
      createErrorCard('No profile with this username');
    }
  }
}

async function getRepos(username) {
  try {
    const { data } = await axios(
      APIURL + username + '/repos?sort=created'
    );
    addReposToCard(data);
  } catch (err) {
    console.error('jghjhgjhgjhg: ', err);
    createErrorCard('Problem fetching repository');
  }
}

// Get user
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const user = search.value;

  if (user) {
    getUser(user);

    search.value = '';
  }
});

// Create user card
const createUserCard = (user) => {
  const cardHTML = `
    <div class="card">
    <div>
        <img src='${user.avatar_url}' alt="${user.name} " class='avatar'>
    </div>
    <div class="user-info">
        <h2>${user.name}</h2>
        <p>${user.bio}</p>
        <ul>
           
            <li>${user.following} <strong>Following</strong></li>
            <li>${user.followers} <strong>Followers</strong></li>
            <li>${user.public_repos} <strong>Repos</strong></li>
        </ul>
        <div id="repos"></div>
    </div>
</div>
    `;
  main.innerHTML = cardHTML;
};

// Show error
const createErrorCard = (msg) => {
  const cardHTML = `
    <div class='card'>
         <p>${msg}</p>   
    </div>
    `;
  main.innerHTML = cardHTML;
};

// Add repos to card
const addReposToCard = (repos) => {
  const reposEl = document.getElementById('repos');
  repos.slice(0, 5).forEach((repo) => {
    const repoEl = document.createElement('a');
    repoEl.classList.add('repo');
    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.appendChild(repoEl);
  });
};
