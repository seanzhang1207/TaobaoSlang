import random


leet = {
    'a': ['4', '@'],
    'b': ['6'],
    'e': ['3', '€'],
    'g': ['9'],
    'i': ['1', '!'],
    'l': ['1'],
    'o': ['0'],
    's': ['5', '$'],
    't': ['7', '+'],
    'z': ['2'],
    '0': ['l'],
    '1': ['o'],
    '5': ['S'],
    '7': ['T'],
    '9': ['g']
}

separators = [
    '*',
    '|',
    '#',
    '#######',
    ' ',
    ',',
    '\'',
    '1'
]


def leet_latin(s, n):
    tmp = [ch for ch in s if ch in leet]
    repl = random.sample(tmp, min(len(tmp), n))
    for ch in repl:
        s = s.replace(ch, random.choice(leet[ch]))
    return s


def sepa_latin(s):
    sep = random.choice(separators)
    ind = random.randint(1, len(s)-1)
    return s[:ind] + sep + s[ind:]



print(sepa_latin(leet_latin("zara", 1)))
