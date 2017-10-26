function searchContacts(e) {
    if(e.keyCode === 13){
        const tagParent = document.getElementById('tagParent');
        const tagField = document.getElementById('tagField');

        if(tagField.value.length === 0){
            return;
        }

        let newTag = document.createElement('div');
        newTag.className = 'tag';

        let span = document.createElement('span');
        span.className = 'text';
        span.appendChild(document.createTextNode(tagField.value));

        let button = document.createElement('button');
        button.type = 'button';
        button.className = 'delete';
        button.onclick = function () {
            // const tagParen = document.getElementById('tagParent');
            // tagParen.removeChild(button.parentNode);
            tagParent.removeChild(button.parentNode);
        }

        newTag.appendChild(span)
        newTag.appendChild(button);

        tagParent.insertBefore(newTag, tagField);
        tagField.value = '';
    }
}

function deleteTag(parent) {
    const tagParent = document.getElementById('tagParent');
    tagParent.removeChild(parent);

}