/**
 * Show or hide furigana
 */
function toggleFurigana() {
    var element = document.querySelector('#kanji')
    if (element.className.includes('furigana-hide')) {
        element.classList.remove('furigana-hide')
        element.classList.add('furigana-show')
    }
    else {
        element.classList.remove('furigana-show')
        element.classList.add('furigana-hide')
    }
}