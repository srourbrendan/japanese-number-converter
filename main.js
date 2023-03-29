const numDict = {
    "one": {
        "1": {
            "kanji": "一",
            "reading": "いち"
        },
        "2": {
            "kanji": "二",
            "reading": "に"
        },
        "3": {
            "kanji": "三",
            "reading": "さん"
        },
        "4": {
            "kanji": "四",
            "reading": "よん"
        },
        "5": {
            "kanji": "五",
            "reading": "ご"
        },
        "6": {
            "kanji": "六",
            "reading": "ろく"
        },
        "7": {
            "kanji": "七",
            "reading": "なな"
        },
        "8": {
            "kanji": "八",
            "reading": "はち"
        },
        "9": {
            "kanji": "九",
            "reading": "きゅう"
        }
    },
    "ten": {
        "kanji": "十",
        "reading": "じゅう"
    },
    "hundred": {
        "kanji": "百",
        "reading": "ひゃく"
    },
    "thousand": {
        "kanji": "千",
        "reading": "せん"
    },
    "tenthousand": {
        "kanji": "万",
        "reading": "まん"
    },
    "hundredmillion": {
        "kanji": "億",
        "reading": "おく"
    },
    "trillion": {
        "kanji": "兆",
        "reading": "ちょう"
    }
}


/**
 * Gets random integer in the range min to max - 1
 * @param {*} min 
 * @param {*} max 
 * @returns random integer in the range min to max - 1
 */
function getRandomInt(min, max) {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min) //The maximum is exclusive and the minimum is inclusive
}

/**
 * Get random integer in the order of hundred
 * @returns {number} random integer from 100 to 999
 */
function randomHundred() {
    return getRandomInt(100, 1000)
}


/**
 * Convert 1 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiOne(num) {
    // Convert num to string
    num += ''

    // Case where num is not 0
    if (num != '0') {
        return [[numDict.one[num].kanji], [numDict.one[num].reading]]
    }
    //Otherwise return empty list
    return [[], []]
}


/**
 * Convert 2 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiTen(num) {
    // Convert num to string
    num += ''

    // Failsafe for not enough digits
    if (num.length < 2) {
        return toKanjiOne(num)
    }

    // Case where num has one convertable digit
    if (num[0] == '0') {
        return toKanjiOne(num.substring(1))
    }

    let word = [[], []]

    // Case where first digit is not one
    if (num[0] != '1' && num[0] != '0') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push(numDict.one[num[0]].reading)
    }

    word[0].push(numDict.ten.kanji)
    word[1].push(numDict.ten.reading)

    // Case where second digit is not 0
    if (num[1] != '0') {
        let temp = toKanjiOne(num[1])
        word[0].push(temp[0][0])
        word[1].push(temp[1][0])
    }

    return word;

}

/**
 * Convert 3 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiHundred(num) {
    // Convert num to string
    num += ''
    let word = [[], []]

    // Failsafe for not enough digits
    if (num.length < 3) {
        return toKanjiTen(num)
    }

    // Case where num has two convertable digits
    if (num[0] == '0') {
        return toKanjiTen(num.substring(1))
    }

    // Special case for 300
    if (num[0] == '3') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push(numDict.one[num[0]].reading)
        word[1].push('びゃく')
    }
    // Special case for 600
    else if (num[0] == '6') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push('ろっ')
        word[1].push('ぴゃく')
    }
    // Special case for 800
    else if (num[0] == '8') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push('はっ')
        word[1].push('ぴゃく')
    }
    // Cases that aren't special and not 100
    else if (num[0] != '1') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push(numDict.one[num[0]].reading)
    }

    // Push hundred to word
    word[0].push(numDict.hundred.kanji)
    if (word[0].length != word[1].length) {
        word[1].push(numDict.hundred.reading)
    }

    // Case where there is no tens digit
    if (num[1] == '0' && num[2] != '0') {
        word[0].push(numDict.one[num[2]].kanji)
        word[1].push(numDict.one[num[2]].reading)
    }

    // Case where there is tens digit
    if (num[1] != '0') {
        let temp = toKanjiTen(num.substring(1))
        word[0] = word[0].concat(temp[0])
        word[1] = word[1].concat(temp[1])
        //return word
    }

    return word

}

/**
 * Convert 4 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiThousand(num) {
    // Convert num to string
    num += ''

    // Failsafe for not enough digits
    if (num.length < 4) {
        return toKanjiHundred(num)
    }
    let word = [[], []]

    // Case where num has three convertable digits
    if (num[0] == '0') {
        return toKanjiHundred(num.substring(1))
    }
    // Special case for 3000
    if (num[0] == '3') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push(numDict.one[num[0]].reading)
        word[1].push('ぜん')
    }
    // Special case for 8000
    else if (num[0] == '8') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push('はっ')
    }
    // Case where num is not special and not 1000
    else if (num[0] != '1') {
        word[0].push(numDict.one[num[0]].kanji)
        word[1].push(numDict.one[num[0]].reading)
    }

    // Push thousand to word
    word[0].push(numDict.thousand.kanji)
    if (word[0].length != word[1].length) {
        word[1].push(numDict.thousand.reading)
    }

    // Process and push hundred to word
    let temp = toKanjiHundred(num.substring(1))
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    return word
}

/**
 * Works from order of ten thousand to ten million
 * 
 * Convert 5-8 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiMan(num) {
    // Convert num to string
    num += ''

    // Failsafe for not enough digits
    if (num.length < 5) {
        return toKanjiThousand(num)
    }
    let word = [[], []]

    // Divide num into before and after 万
    let first = num.substring(0, num.length - 4)
    let second = num.substring(num.length - 4)

    // Pad first with zeros to length 4
    first = first.padStart(4, '0')

    // Process and push first to word
    let temp = toKanjiThousand(first)
    // Special case where 一 needs to be added
    if (temp[0][0] == '千') {
        temp[0] = ['一'].concat(temp[0])
        temp[1] = ['いっ'].concat(temp[1])
    }
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    // Push thousand to word if applicable
    if (first != '0000') {
        word[0].push(numDict.tenthousand.kanji)
        word[1].push(numDict.tenthousand.reading)
    }

    // Process and push second to word
    temp = toKanjiThousand(second)
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    return word;
}

/**
 * Works from order of hundred million to hundred billion
 * 
 * Convert 9-12 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiOku(num) {
    // Convert num to string
    num += ''

    // Failsafe for not enough digits
    if (num.length < 9) {
        return toKanjiMan(num)
    }

    let word = [[], []]

    // Divide num into before and after 億
    let first = num.substring(0, num.length - 8)
    let second = num.substring(num.length - 8)

    // Pad first with zeros to length 4
    first = first.padStart(4, '0')

    // Process and push first to word
    let temp = toKanjiThousand(first)
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    // Push hundredmillion to word if applicable
    if (first != '0000') {
        word[0].push(numDict.hundredmillion.kanji)
        word[1].push(numDict.hundredmillion.reading)
    }

    // Process and push second to word
    temp = toKanjiMan(second)
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    return word
}

/**
 * Works from order of trillion to quadrillion
 * 
 * Convert 13-16 digit num to Kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function toKanjiChou(num) {
    // Convert num to string
    num += ''

    // Failsafe for not enough digits
    if (num.length < 13) {
        return toKanjiOku(num)
    }
    let word = [[], []]

    // Divide num into before and after 兆
    let first = num.substring(0, num.length - 12)
    let second = num.substring(num.length - 12)

    // Pad first with zeros to length 4
    first = first.padStart(4, '0')

    // Process and push first to word
    let temp = toKanjiThousand(first)
    // Case where 一 is directly before 兆
    if (temp[0][temp[0].length - 1] == '一') {
        temp[1][temp[1].length - 1] = 'いっ'
    }
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    // Push trillion to word
    word[0].push(numDict.trillion.kanji)
    word[1].push(numDict.trillion.reading)

    // Process and push second to word
    temp = toKanjiOku(second)
    word[0] = word[0].concat(temp[0])
    word[1] = word[1].concat(temp[1])

    return word;
}

/**
 * Convert number to kanji
 * @param {*} num 
 * @returns [[kanji], [reading]]
 */
function numToKanji(num) {
    // Convert num to string
    num += ''
    let size = num.length

    if (size == 1) {
        return toKanjiOne(num)
    }

    else if (size == 2) {
        return toKanjiTen(num)
    }

    else if (size == 3) {
        return toKanjiHundred(num)
    }

    else if (size == 4) {
        return toKanjiThousand(num)
    }

    else if (size >= 5 && size <= 8) {
        return toKanjiMan(num)
    }

    else if (size >= 9 && size <= 12) {
        return toKanjiOku(num)
    }

    else if (size >= 13 && size <= 16) {
        return toKanjiChou(num)
    }
    // Unable to handle num, return empty list
    else {
        return [[], []]
    }
}

/**
 * Create html element with kanji and reading of number
 * @param {*} word 
 * @returns div element with kanji and reading of number
 */
function createKanjiReading(word) {
    let div = document.createElement('div');
    div.id = 'kanji'
    let ruby = document.createElement('ruby');

    // Loop through word to create furigana elements
    for (let i in word[0]) {
        let rb = document.createElement('rb');
        rb.append(document.createTextNode(word[0][i]))
        let rt = document.createElement('rt');
        rt.append(document.createTextNode(word[1][i]))
        ruby.append(rb, rt);
    }
    div.append(ruby)
    return div
}

/**
 * Create html element with kanji separated into groups with spaces
 * @param {*} word 
 * @returns div element with kanji separated into groups with spaces
 */
function createKanjiGroup(word) {
    let div = document.createElement('div');
    div.id = 'grouping'
    //let ruby = document.createElement('ruby');

    // Loop through word to create furigana elements
    /*for (let i in word[0]) {
        let rb = document.createElement('rb');
        rb.append(document.createTextNode(word[0][i]))
        let rt = document.createElement('rt');
        rt.append(document.createTextNode(word[1][i]))
        ruby.append(rb, rt);
    }*/
    div.append(document.createTextNode(word))
    return div
}

/**
 * Create html element with arabic numeral number
 * @param {*} num 
 * @returns div element with number, number with commas, and number separated into groups
 */
function createNumber(num) {
    let div = document.createElement('div');
    div.id = 'number'
    let p = document.createElement('div')
    p.append(document.createTextNode(num))
    p.id = 'num'
    div.append(p)
    p = document.createElement('div')
    p.append(document.createTextNode(addCommas(num)))
    p.id = 'comma'
    div.append(p)
    p = document.createElement('div')
    p.append(document.createTextNode(byGroup(num)))
    p.id = 'group'
    div.append(p)

    return div
}

/**
 * Adds commas to number
 * @param {*} num 
 * @returns number with commas as string
 */
function addCommas(num) {
    num += ''
    let index = num.length
    let comma = 0;

    // If number is big enough to need commas
    if (index > 3) {
        // Add a comma every three digits
        while (index > 0) {
            if (comma == 3) {
                // add comma
                comma = 0
                num = num.slice(0, index) + ',' + num.slice(index)
            }
            index--
            comma++
        }
    }
    return num;
}

/**
 * Create list from number with commas separated into groupings
 * @param {*} num 
 * @returns list of number with commas separated into groupings
 */
function commaList(num) {
    let list = []
    let index = num.length
    let group = 0;

    // If number is big enough to need commas
    if (index > 3) {
        while (index > 0) {
            if (group == 4) {
                group = 0
                list.unshift(num.slice(index))
                num = num.slice(0, index)
            }
            index--
            if (num[index] != ',') {
                group++
            }
        }
    }

    list.unshift(num)
    return list;
}

/**
 * Separates number by conceptual groupings, separated by spaces
 * @param {*} num 
 * @returns string of number separated by groupings
 */
function byGroup(num) {
    num += ''
    let index = num.length
    let group = 0

    // If number is big enough to need separating
    if (index > 4) {
        while (index > 0) {
            if (group == 4) {
                group = 0
                num = num.slice(0, index) + ' ' + num.slice(index)
            }
            index--
            group++
        }
    }
    return num;
}

/**
 * Separates number by conceptual groupings and inserts them into a list
 * @param {*} num 
 * @returns list of numbers separated by groupings
 */
function byGroupList(num) {
    num += ''
    let list = []
    let index = num.length
    let group = 0

    // If number is big enough to need separating
    if (index > 4) {
        while (index > 0) {
            if (group == 4) {
                group = 0
                list.unshift(num.slice(index))
                num = num.slice(0, index)
            }
            index--
            group++
        }
    }

    list.unshift(num)
    return list;
}

/**
 * Separates Kanji into conceptual groupings, separated by spaces
 * @param {*} word 
 * @returns string of Kanji separated by groupings
 */
function byGroupKanji(word) {
    let temp = word

    for (let i = 0; i < temp.length; i++) {
        if (temp[i] == '兆' || temp[i] == '億' || temp[i] == '万') {
            temp = temp.slice(0, i + 1) + ' ' + temp.slice(i + 1)
        }
    }

    return temp
}

/**
 * Separates Kanji into conceptual groupings and inserts them into a list
 * @param {*} word 
 * @returns {any[]} list of Kanji separated by groupings
 */
function byGroupKanjiList(word) {
    let temp = word
    let list = []

    for (let i = 0; i < temp.length; i++) {
        if (temp[i] == '兆' || temp[i] == '億' || temp[i] == '万') {
            list.push(temp.slice(0, i + 1))
            temp = temp.slice(i + 1)
            i = 0
        }
    }

    if (temp != '') {
        list.push(temp)
    }

    return list
}

/**
 * Set class name for spans of Kanji in colors
 * @param {*} list 
 * @param {*} span 
 * @param {*} index 
 */
function setClassName(list, span, index) {
    if (list[index].includes('兆')) {
        span.className = 'chou'
    }
    else if (list[index].includes('億')) {
        span.className = 'oku'
    }
    else if (list[index].includes('万')) {
        span.className = 'man'
    }
    else {
        span.className = 'sen'
    }
}

/**
 * Set class name for spans of numbers in colors
 * @param {*} span 
 */
function setNumberClass(span) {
    let size = span.length
    span[size - 1].className = 'sen'
    if (size > 1) {
        span[size - 2].className = 'man'
    }
    if (size > 2) {
        span[size - 3].className = 'oku'
    }
    if (size > 3) {
        span[size - 4].className = 'chou'
    }
}


/**
 * Create div "colors", which separates kanji and numbers into spans of conceptual groupings with appropriate class name
 * @param {object} list 
 * @param {string} id
 * @returns {HTMLDivElement} div
 */
function createElementGrouping(list, id) {
    let div = document.createElement('div')
    div.className = 'colors'
    div.id = id
    let count = 0;
    let span = document.createElement('span')

    for (let i = 0; i < list.length; i++) {
        let span = document.createElement('span')
        setClassName(list, span, i)
        span.append(document.createTextNode(list[i]))
        div.append(span)
    }
    return div;
}

// Get random number
//let num = getRandomInt(1, 10000000)
//let num = 1000000010
// let num = 10001000100000

function addFurigana(div, reading) {
    let span = div.querySelectorAll('span')
    let k = 0
    let r = 0
    for (let i = 0; i < span.length; i++) {
        let kanji = span[i].textContent
        kanji = kanji.split('')

        let ruby = document.createElement('ruby')
        for (let j = 0; j < kanji.length; j++) {
            let rb = document.createElement('rb');
            rb.append(document.createTextNode(kanji[j]))
            let rt = document.createElement('rt');
            rt.append(document.createTextNode(reading[r]))
            r++
            ruby.append(rb, rt);
        }

        let replacement = document.createElement('span')
        replacement.className = span[i].className
        replacement.append(ruby)
        span[i].replaceWith(replacement)
    }
}

/**
 * Converts number to Kanji and displays it
 */
function convertNumber() {
    let input = document.querySelector('#input').value
    let num = parseInt(input)

    // Get answer div
    let answer = document.querySelector('#answer')

    // Create answer div if it doesn't exist
    if (!answer) {
        answer = document.createElement('div')
        answer.id = 'answer'
        console.log('created answer div')
    }

    if (/^\d+$/.test(input) == false || num > 10000000000000000n || num < 1) {
        answer.textContent = 'Invalid input. Please enter a number between 1 and 10,000,000,000,000,000.'
    }
    else {
        // Add commas to number
        let comma = addCommas(input)

        // Convert number to Kanji
        let word = numToKanji(input)
        console.log(word)

        // Separate number into kanji and reading
        let kanji = word[0]
        let reading = word[1]


        // Create kanji, reading, and number elements
        let div = createKanjiReading(word)
        console.log(div)
        let number = createNumber(num)
        // output.append(div)
        // output.append(number)

        // Separate kanji into groupings
        kanji = kanji.join('')
        let groupKanji = byGroupKanji(kanji)
        
        // Create kanji grouping element
        let grouping = createKanjiGroup(groupKanji)
        // output.append(grouping)


        // Remove previous answer
        while(answer.firstChild) {
            answer.removeChild(answer.firstChild);
        }

        // Create colors grouping elements
        // Create kanji grouping element
        kanji = byGroupKanjiList(kanji)
        console.log(kanji)
        grouping = createElementGrouping(kanji, 'kanji')
        grouping.lang = 'ja'
        console.log(grouping)
        answer.append(grouping)

        addFurigana(grouping, reading)

        // Create number grouping element
        let numGroup = byGroupList(input)
        grouping = createElementGrouping(numGroup, 'number')
        answer.append(grouping)

        // Create number with commas grouping element
        let commaGroup = commaList(comma)
        grouping = createElementGrouping(commaGroup, 'comma')
        answer.append(grouping)

        // Loop through colors to fix number span classes
        let colors = document.querySelectorAll('.colors')
        for (let i = 1; i < colors.length; i++) {
            let span = colors[i].querySelectorAll('span')
            setNumberClass(span)

            // If grouping is all zeros, change class to previous grouping
            for (let j = 0; j < span.length; j++) {
                let zero = span[j].textContent
                zero = zero.replaceAll(',', '')
                if (zero == '0000') {
                    span[j].className = span[j - 1].className
                }
            }
        }
    }

    let body = document.querySelector('#main')
    body.append(answer)
    // body.append(output)
}