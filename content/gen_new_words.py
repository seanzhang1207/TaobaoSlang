import random
from Pinyin2Hanzi import DefaultDagParams
from Pinyin2Hanzi import dag

from pypinyin import pinyin,lazy_pinyin
import pypinyin
from copy import copy, deepcopy


dagparams = DefaultDagParams()

leet = {
    'a': ['4', '@'],
    'b': ['6'],
    'B': ['8'],
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
    ' ',
    ',',
    '\'',
    '1',
    '||'
]


def leet_latin(s, n, forcefirst=False):
    tmp = [ch for ch in s if ch in leet]
    repl = random.sample(tmp, min(len(tmp), n))
    for ch in repl:
        s = s.replace(ch, random.choice(leet[ch]))
    if forcefirst and s[0] in leet:
        s = random.choice(leet[s[0]]) + s[1:]
    return s


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
        tmp = random.sample(s[1:], min(len(s[1:]), n))
        for ind in tmp:
            s = s.replace(ind, lazy_pinyin(ind)[0])
        s = lazy_pinyin(s[0])[0] + s[1:]

    else:
        tmp = random.sample(range(len(s)), min(len(s), n))
        for ind in tmp:
            s = s.replace(s[ind], lazy_pinyin(s[ind])[0])
    return s


def samepinyin_hans(s, forcefirst=False):
    result = dag(dagparams, lazy_pinyin(s), path_num=8)
    rets = set()
    if len(result) > 1:
        i = 0
        for r in result:
            if "".join(r.path) != s:
                rets.add("".join(r.path))
                i += 1
                if i > 15:
                    break;
    else:
        for char in random.choice(s):
            result = dag(dagparams, lazy_pinyin(char), path_num=15)
            for r in result:
                a = s.replace(char, r.path[0])
                if a != s:
                    rets.add(a)
        result = dag(dagparams, lazy_pinyin(s[0]), path_num=15)
        for r in result:
            a = s.replace(s[0], r.path[0])
            if a != s:
                rets.add(a)
                return rets
    return rets


def mutate(word, forcefirst=False):
    is_ascii = lambda s: len(s) == len(s.encode())
    results = set()
    if is_ascii(word):
        for i in range(5):
            w = leet_latin(word, random.randint(1, 3), forcefirst)
            results.add(w)
        results.add(word[0] + "家")
        results.add(word[0] + "牌")
        if ' ' in word:
            results.add(''.join([sw[0] for sw in word.split(' ')]).upper())
        if len(word) > 3:
            results.add(word[1:])
    else:
        for i in range(6):
            w = pinyin_hans(word, 1, False)
            results.add(w)
        if len(word) > 3 and random.random() < 2:
            results.add(word[1:])
        ws = samepinyin_hans(word, forcefirst)
        results = results.union(ws)

    return results


def GenerateMoreWords(dictionary):
    entries = copy(dictionary.entries)
    for i, entry in enumerate(entries):
        print(i, '/', len(entries))
        mutations = mutate(entry.name).union(mutate(entry.name, forcefirst=True))
        # mutations = mutate(entry.name, forcefirst=True)


        for name in mutations:
            e = deepcopy(entry)
            e.name = name
            e.s_source = [entry.name]
            e.s_commonsource = None
            e.s_construction = ["其他"]
            dictionary.add(e)
            if len(name) > 3:
                if random.random() < 0.3:
                    tw = separator_any(name)
                    e2 = deepcopy(e)
                    e2.name = tw
                    e2.s_source = [e.name]
                    e2.s_commonsource = None
                    e2.s_construction = ["其他"]
                    dictionary.add(e2)
        print(len(dictionary.entries))
    return dictionary
