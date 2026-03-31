function renderSingleQuoteCard(card) {
    // 防止重复渲染
    if (card.dataset.rendered === "true") return;

    const contentEl = card.querySelector('.quote-content');
    const nameEl = card.querySelector('.quote-name');
    const titleEl = card.querySelector('.quote-title');

    const contentText = contentEl?.innerHTML.trim() || '';
    const nameText = nameEl?.innerHTML.trim() || '';
    const titleText = titleEl?.innerHTML.trim() || '';

    // 如果没有内容就跳过
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
    paraContent.innerHTML = contentText;

    wordsDiv.append(iconImg, paraContent);
    contentDiv.appendChild(wordsDiv);

    // footer 判断
    if (nameText || titleText) {
        const footerDiv = document.createElement('div');
        footerDiv.className = 'footer';

        if (nameText) {
            const strongName = document.createElement('strong');
            strongName.innerHTML = nameText;
            footerDiv.appendChild(strongName);
        }

        if (titleText) {
            const paraTitle = document.createElement('p');
            paraTitle.className = "para";
            paraTitle.innerHTML = titleText;
            footerDiv.appendChild(paraTitle);
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
    const cards = root.querySelectorAll('.quote-card');
    cards.forEach(renderSingleQuoteCard);
}

// 初始化
document.addEventListener("DOMContentLoaded", () => {
    quoteCardRender();
});
