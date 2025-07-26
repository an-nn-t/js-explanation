// script.js

document.addEventListener('DOMContentLoaded', () => {
    const allCards = document.querySelectorAll('.card');
    const overlay = document.getElementById('overlay');
    const body = document.body;

    // 現在開いているカードを追跡する変数
    let currentlyExpandedCard = null;

    /**
     * 指定されたカードを開く関数
     * @param {HTMLElement} card - 対象のカード要素
     */
    function expandCard(card) {
        // 他に開いているカードがあれば閉じる
        if (currentlyExpandedCard && currentlyExpandedCard !== card) {
            collapseCard(currentlyExpandedCard);
        }

        card.classList.add('expanded');
        overlay.classList.add('active');
        body.classList.add('no-scroll');
        currentlyExpandedCard = card;
    }

    /**
     * 指定されたカードを閉じる関数
     * @param {HTMLElement} card - 対象のカード要素
     */
    function collapseCard(card) {
        card.classList.remove('expanded');
        overlay.classList.remove('active');
        body.classList.remove('no-scroll');
        currentlyExpandedCard = null;
    }

    // 各カードにクリックイベントを設定
    allCards.forEach(card => {
        card.addEventListener('click', function(event) {
            // カード自身がクリックされ、かつ展開されていない場合のみ展開する
            // 既に展開されているカード内でのクリックや、閉じるボタンのクリックは無視する
            if (!this.classList.contains('expanded') && !event.target.closest('.close-button')) {
                expandCard(this);
            }
        });

        // 各カード内の閉じるボタンにイベントを設定
        const closeButton = card.querySelector('.close-button');
        if (closeButton) {
            closeButton.addEventListener('click', (event) => {
                event.stopPropagation(); // 親要素(カード)へのイベント伝播を停止
                collapseCard(card);
            });
        }
    });

    // オーバーレイをクリックしたときにカードを閉じる
    overlay.addEventListener('click', () => {
        if (currentlyExpandedCard) {
            collapseCard(currentlyExpandedCard);
        }
    });
});