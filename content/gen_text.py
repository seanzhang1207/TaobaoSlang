from pypinyin import lazy_pinyin, Style
from pprint import pprint
import random


def latin(word):
        return ''.join(lazy_pinyin(word, style=Style.NORMAL)).lower()


def first(word):
        return lazy_pinyin(word, style=Style.FIRST_LETTER)[0].upper()


def GenerateEtymology(dictionary):
    chsnum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九", "十"]
    for entry in dictionary.entries:
        if entry.source:
            entry.etymology = ""
            ground = entry.source[-1][2]
            for src in entry.source:
                if src[0] in ["引申", "缩写", "替换"]:
                    entry.etymology += "%s自%s「%s」；" % (src[0], "大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] in ["拼音", "谐音", "同近义词"]:
                    entry.etymology += "取自%s%s「%s」；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[0], src[1].replace('_', ' '))
                elif src[0] == "功用":
                    entry.etymology += "取自功用「%s」；" % (src[1].replace('_', ' '))
                elif src[0] == "内容":
                    entry.etymology += "取自「%s」；" % (src[1].replace('_', ' '))
                elif src[0] == "产地":
                    entry.etymology += "取自产地「%s」；" % (src[1].replace('_', ' '))
                elif src[0] == "分隔符":
                    entry.etymology += "%s「%s」加入分隔符而来；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "反转":
                    entry.etymology += "%s「%s」词序反转而来；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "形近字":
                    entry.etymology += "%s「%s」使用形近字替换而来；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "特殊符号":
                    entry.etymology += "%s「%s」使用特殊符号替换而来；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "其他语言":
                    entry.etymology += "取自其他语言%s「%s」；" % ("大众词汇" if src[3] else "%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
                elif src[0] == "其他":
                    entry.etymology += "来自%s「%s」；" % ("%s级黑话词汇" % chsnum[ground - src[2]], src[1].replace('_', ' '))
            entry.etymology = entry.etymology[:-1] + "。"
        else:
            entry.etymology = "暂无收录。"
    return dictionary


def GenerateUsage(dictionary):
    for entry in dictionary.entries:
        entry.usage = "；".join(entry.s_usage) if entry.usage else "暂无收录。"
    return dictionary


def GenerateSameMeaning(dictionary):
    for entry in dictionary.entries:
        entry.synonym = "；".join(random.sample(entry.same, min(len(entry.same), 5)))  if entry.same else "暂无收录。"
    return dictionary


def GenerateCloseMeaning(dictionary):
    return dictionary


def GenerateIndex(dictionary):
    temp = {}
    tempindex = {}
    index = []
    for entry in dictionary.entries:
        if not entry.name[0].upper() in temp:
            temp[entry.name[0].upper()] = []
        temp[entry.name[0].upper()].append(entry.id)

    for char in temp.keys():
        if not first(char) in tempindex:
            tempindex[first(char)] = {}
        if not latin(char) in tempindex[first(char)]:
            tempindex[first(char)][latin(char)] = []
        tempindex[first(char)][latin(char)].append([char, temp[char]])

    for initial in tempindex.keys():
        index.append({
            'initial': initial,
            'pinyins': []
        })
        for pinyin in tempindex[initial].keys():
            index[-1]['pinyins'].append({
                'pinyin': pinyin,
                'words': tempindex[initial][pinyin]
            })

    # pprint(index)
    return index


def GenerateFullText(dictionary):
    text = {}

    dictionary = GenerateEtymology(dictionary)
    dictionary = GenerateSameMeaning(dictionary)
    dictionary = GenerateCloseMeaning(dictionary)
    dictionary = GenerateUsage(dictionary)

    text['index'] = GenerateIndex(dictionary)
    text['entries'] = []

    for i, entry in enumerate(dictionary.entries):
        text['entries'].append({
                               'id': entry.id,
                               'name': entry.name,
                               'pinyin': entry.pinyin,
                               'explanation': entry.explanation,
                               'etymology': entry.etymology,
                               'usage': entry.usage,
                               'synonym': entry.synonym
                               })
    # pprint(text)

    return text
