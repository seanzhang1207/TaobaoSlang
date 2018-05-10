import random
from Pinyin2Hanzi import DefaultHmmParams
from Pinyin2Hanzi import viterbi
from pypinyin import pinyin,lazy_pinyin
import pypinyin


hmmparams = DefaultHmmParams()

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
    '1',
    '**',
    '***',
    '######',
    '||'
]


def leet_latin(s, n, forcefirst=False):
    tmp = [ch for ch in s if ch in leet]
    repl = random.sample(tmp, min(len(tmp), n))
    for ch in repl:
        out = s.replace(ch, random.choice(leet[ch]))
    if forcefirst and s[0] in leet:
        out = random.choice(leet[s[0]]) + out[1:]
    return out


def separator_any(s):
    sep = random.choice(separators)
    ind = random.randint(1, len(s)-1)
    if ' ' in s and random.random() < 0.6:
            return s.replace(' ', sep)
    return s[:ind] + sep + s[ind:]


def samepinyin(ch):
    n = 0
    result = []
    for i in range(0x4e00,0x9fa6):
        if(pinyin(chr(i))[0][0] == pinyin(ch)[0][0]):
            result.append(chr(i))
    return result


def pinyin_hans(s, n, forcefirst=False):
    if forcefirst:
        tmp = random.sample(s[1:], n)
        for ind in tmp:
            s = s.replace(s[ind], lazy_pinyin(s[ind])[0])
        s = lazy_pinyin(s[0]) + s[1:]

    else:
        tmp = random.sample(range(len(s)), n)
        for ind in tmp:
            s = s.replace(s[ind], lazy_pinyin(s[ind])[0])
    return s


def samepinyin_hans(s, n, forcefirst=False):
    if forcefirst:
        tmp = random.sample(s[1:], n)
        for ind in tmp:
            s = s.replace(s[ind], random.choice(samepinyin(s[ind])))
        s = random.choice(samepinyin(s[0])) + s[1:]
    else:
        tmp = random.sample(range(len(s)), n)
        for ind in tmp:
            s = s.replace(s[ind], random.choice(samepinyin(s[ind])))
    return s


def mutate(word, forcefirst=False):
    is_ascii = lambda s: len(s) == len(s.encode())
    results = set()
    if is_ascii(word):
        for i in range(4):
            w = leet_latin(word, random.randint(1, 3), forcefirst)
            results.add(w)
        results.append(word[0] + "家")
        if ' ' in word:
            results.add(''.join([sw[0] for sw in word.split(' ')]))
        tmp = []
        for w in results:
            tw = separator_any(w)
            print(tw)
            tmp.add(tw)
        results += tmp

    else:
        for i in range(5):
            w = pinyin_hans(word, random.randint(1, 3), forcefirst)
            results.add(w)
        for i in range(3):
            w = samepinyin_hans(word, 1, forcefirst)
            results.add(w)
        tmp = []
        for w in results:
            tw = separator_any(w)
            tmp.add(tw)
        results += tmp

    return results


def GenerateMoreWords(dictionary):
    for entry in dictionary.entries:
        mutations = mutate(entry.name).union(mutate(entry.name, forcefirst))
        print(mutations)
