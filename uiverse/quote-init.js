function renderSingleQuoteCard(card) {
    // 防止重复渲染
    if (card.dataset.rendered === "true") return;

    const contentEl = card.querySelector('content');
    const sourceEl = card.querySelector('source');
    const nameEl = sourceEl?.querySelector('name');
    const noteEl = sourceEl?.querySelector('note');

    const contentText = contentEl?.textContent.trim() || '';
    const nameText = nameEl?.textContent.trim() || '';
    const noteText = noteEl?.textContent.trim() || '';

    // 如果连内容都没有，直接跳过
    if (!contentText) return;

    // 创建卡片
    const newCard = document.createElement('div');
    newCard.className = 'card';

    const contentDiv = document.createElement('div');
    contentDiv.className = 'content';

    const wordsDiv = document.createElement('div');
    wordsDiv.className = 'words';

    const iconImg = document.createElement('img');
    iconImg.src = "https://moita2025.github.io/assets-custom/uiverse/quote-icon.svg";
    iconImg.alt = "icon";
    iconImg.className = "quotes";

    const paraContent = document.createElement('p');
    paraContent.className = "para";
    paraContent.textContent = contentText;

    wordsDiv.append(iconImg, paraContent);
    contentDiv.appendChild(wordsDiv);

    // footer 判断
    if (nameText || noteText) {
        const footerDiv = document.createElement('div');
        footerDiv.className = 'footer';

        if (nameText) {
            const strongName = document.createElement('strong');
            strongName.textContent = nameText;
            footerDiv.appendChild(strongName);
        }

        if (noteText) {
            const paraNote = document.createElement('p');
            paraNote.className = "para";
            paraNote.textContent = noteText;
            footerDiv.appendChild(paraNote);
        }

        contentDiv.appendChild(footerDiv);
    }

    newCard.appendChild(contentDiv);

    // 标记已渲染
    newCard.dataset.rendered = "true";

    card.replaceWith(newCard);
}

// 渲染全部
function quoteCardRender(root = document) {
    const cards = root.querySelectorAll('.quotecard');
    cards.forEach(renderSingleQuoteCard);
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    quoteCardRender();
});
