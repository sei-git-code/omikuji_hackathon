const API_BASE_URL = '/api/omikuji';

let results = [];

// DOM要素の取得
const drawButton = document.getElementById('drawButton');
const resultDisplay = document.getElementById('resultDisplay');
const resultText = document.getElementById('resultText');
const toggleButton = document.getElementById('toggleButton');
const managementPanel = document.getElementById('managementPanel');
const newResultName = document.getElementById('newResultName');
const newResultOrder = document.getElementById('newResultOrder');
const addButton = document.getElementById('addButton');
const resultsList = document.getElementById('resultsList');

// おみくじを引く
drawButton.addEventListener('click', async () => {
    drawButton.disabled = true;
    drawButton.textContent = '引いています...';
    resultDisplay.style.display = 'none';

    try {
        const response = await fetch(`${API_BASE_URL}/draw`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({})
        });

        if (response.ok) {
            const data = await response.json();
            resultText.textContent = data.result;
            resultDisplay.style.display = 'flex';
        } else {
            alert('おみくじを引くのに失敗しました');
        }
    } catch (error) {
        console.error('エラー:', error);
        alert('おみくじを引くのに失敗しました');
    } finally {
        drawButton.disabled = false;
        drawButton.textContent = 'おみくじを引く';
    }
});

// 管理画面の表示/非表示
toggleButton.addEventListener('click', () => {
    const isVisible = managementPanel.style.display !== 'none';
    managementPanel.style.display = isVisible ? 'none' : 'block';
    toggleButton.textContent = isVisible ? '結果を管理する' : '管理画面を閉じる';
    
    if (!isVisible) {
        loadResults();
    }
});

// 結果一覧の読み込み
async function loadResults() {
    try {
        const response = await fetch(`${API_BASE_URL}/results`);
        if (response.ok) {
            results = await response.json();
            displayResults();
        } else {
            console.error('結果の読み込みに失敗しました');
        }
    } catch (error) {
        console.error('エラー:', error);
    }
}

// 結果一覧の表示
function displayResults() {
    resultsList.innerHTML = '';
    results.forEach(item => {
        const li = document.createElement('li');
        li.innerHTML = `
            <span class="result-item-name">${item.name}</span>
            <span class="result-item-order">順序: ${item.displayOrder}</span>
            <button class="delete-button" data-id="${item.id}">削除</button>
        `;
        resultsList.appendChild(li);
    });

    // 削除ボタンのイベントリスナー
    document.querySelectorAll('.delete-button').forEach(button => {
        button.addEventListener('click', async (e) => {
            const id = e.target.getAttribute('data-id');
            if (confirm('この結果を削除しますか？')) {
                await deleteResult(id);
            }
        });
    });
}

// 結果の追加
addButton.addEventListener('click', async () => {
    const name = newResultName.value.trim();
    if (!name) {
        alert('結果名を入力してください');
        return;
    }

    const order = newResultOrder.value ? parseInt(newResultOrder.value) : results.length + 1;

    try {
        const response = await fetch(`${API_BASE_URL}/results`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                name: name,
                displayOrder: order
            })
        });

        if (response.ok || response.status === 201) {
            newResultName.value = '';
            newResultOrder.value = '';
            await loadResults();
        } else {
            alert('結果の追加に失敗しました');
        }
    } catch (error) {
        console.error('エラー:', error);
        alert('結果の追加に失敗しました');
    }
});

// 結果の削除
async function deleteResult(id) {
    try {
        const response = await fetch(`${API_BASE_URL}/results/${id}`, {
            method: 'DELETE'
        });

        if (response.ok || response.status === 204) {
            await loadResults();
        } else {
            alert('結果の削除に失敗しました');
        }
    } catch (error) {
        console.error('エラー:', error);
        alert('結果の削除に失敗しました');
    }
}
