const facebookList = document.querySelector('.list');
let page = 1;
let isLoading = false;

const addRepo = repo => {
  const templateElement = document.getElementById('item');
  const templateContainer = 'content' in templateElement ? templateElement.content : templateElement;
  const newRepo = templateContainer.querySelector('.item').cloneNode(true);

  newRepo.href = repo.html_url;
  newRepo.querySelector('.item__name').textContent = repo.name;
  newRepo.querySelector('.item__description').textContent = repo.description;
  newRepo.querySelector('.item__last-commit').textContent = `Updated at: ${(new Date(repo.updated_at)).toDateString()}`;
  newRepo.querySelector('.item__data-create').textContent = `Created at: ${(new Date(repo.created_at)).toDateString()}`;

  facebookList.appendChild(newRepo);
};

function getRepos(successCallback, errorCallback) {
  const xhr = new XMLHttpRequest();

  xhr.open('GET', `https://api.github.com/orgs/facebook/repos?page=${page}`, true);

  xhr.onreadystatechange = () => {
    if (xhr.readyState !== 4) { return; }

    if (xhr.status !== 200) {
      const error = new Error(`Ошибка ${xhr.status}`);

      error.code = xhr.statusText;
      errorCallback(error);
    } else {
      successCallback(xhr.responseText);
    }
  };
  xhr.send();
}

function onScroll() {
  if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight && !isLoading) {
    getRepos(response => {
      const repos = JSON.parse(response);

      for (const repo of repos) {
        addRepo(repo);
      }
      isLoading = false;
      page += 1;
    }, error => {
      console.log(error);
    });
    isLoading = true;
  }
}

document.addEventListener('scroll', onScroll);
onScroll();